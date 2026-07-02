const state = {
	menus: [],
	items: [],
	placements: [],
	dragged: null,
	isLoading: false,
};

const elements = {
	availableItems: document.getElementById("availableItems"),
	itemCount: document.getElementById("itemCount"),
	menuSelect: document.getElementById("menuSelect"),
	menuTree: document.getElementById("menuTree"),
	placementCount: document.getElementById("placementCount"),
	preview: document.getElementById("preview"),
	refreshButton: document.getElementById("refreshButton"),
	selectedMenuMeta: document.getElementById("selectedMenuMeta"),
	selectedMenuTitle: document.getElementById("selectedMenuTitle"),
	statusMessage: document.getElementById("statusMessage"),
};

async function api(url, options = {}) {
	const res = await fetch(url, {
		headers: {
			"Content-Type": "application/json",
		},
		...options,
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(text || "Request failed");
	}

	return res.json();
}

async function load() {
	setLoading(true);
	showStatus("Loading menu data...");

	try {
		const [menus, items] = await Promise.all([api("/api/menus"), api("/api/menu-items")]);

		state.menus = menus;
		state.items = items;

		renderMenus();
		renderAvailableItems();
		await loadPlacements();
		showStatus("");
	} catch (error) {
		showError(error);
	} finally {
		setLoading(false);
	}
}

async function loadPlacements() {
	const menu = getSelectedMenu();

	if (!menu) {
		state.placements = [];
		renderMenuContext();
		renderTree();
		renderPreview(null);
		return;
	}

	showStatus(`Loading ${menu.code}...`);

	try {
		state.placements = await api(`/api/menus/${menu.id}/placements`);
		renderMenuContext();
		renderTree();
		await refreshPreview();
		showStatus("");
	} catch (error) {
		showError(error);
	}
}

function renderMenus() {
	elements.menuSelect.innerHTML = "";

	for (const menu of state.menus) {
		const option = document.createElement("option");
		option.value = String(menu.id);
		option.dataset.code = menu.code;
		option.textContent = `${menu.code} - ${menu.mainText || "Untitled"}`;
		elements.menuSelect.appendChild(option);
	}
}

function renderAvailableItems() {
	elements.availableItems.innerHTML = "";
	elements.itemCount.textContent = String(state.items.length);

	if (state.items.length === 0) {
		elements.availableItems.appendChild(createEmptyState("No reusable items are available."));
		return;
	}

	const folders = state.items.filter((item) => item.kind === "FOLDER");
	const items = state.items.filter((item) => item.kind !== "FOLDER");

	elements.availableItems.appendChild(createLibrarySection("Folders", folders));
	elements.availableItems.appendChild(createLibrarySection("Items", items));
}

function createLibrarySection(title, sectionItems) {
	const section = document.createElement("section");
	section.className = "library-section";

	const header = document.createElement("div");
	header.className = "library-section-header";
	header.innerHTML = `
		<h3>${escapeHtml(title)}</h3>
		<span class="count">${sectionItems.length}</span>
	`;
	section.appendChild(header);

	if (sectionItems.length === 0) {
		section.appendChild(createEmptyState(`No ${title.toLowerCase()} available.`));
		return section;
	}

	const list = document.createElement("div");
	list.className = "library-section-list";

	for (const item of sectionItems) {
		list.appendChild(renderLibraryItem(item));
	}

	section.appendChild(list);
	return section;
}

function renderLibraryItem(item) {
	const el = document.createElement("button");
	el.type = "button";
	el.className = "library-item";
	el.draggable = true;
	el.innerHTML = `
		<span class="swatch" style="background:${escapeColor(item.iconColor)}"></span>
		<span class="item-copy">
			<strong>${escapeHtml(item.text)}</strong>
			<small>${escapeHtml(item.code)} · ${escapeHtml(item.kind)}</small>
		</span>
		<span class="drag-handle" aria-hidden="true">⋮⋮</span>
	`;

	el.addEventListener("dragstart", () => {
		state.dragged = {
			type: "new-item",
			menuItemId: item.id,
		};
		el.classList.add("dragging");
	});

	el.addEventListener("dragend", () => {
		state.dragged = null;
		el.classList.remove("dragging");
	});

	return el;
}

function renderMenuContext() {
	const menu = getSelectedMenu();
	const rootCount = state.placements.filter((placement) => placement.parentId == null).length;

	elements.placementCount.textContent = String(state.placements.length);

	if (!menu) {
		elements.selectedMenuMeta.textContent = "No menu selected";
		elements.selectedMenuTitle.textContent = "Structure";
		return;
	}

	elements.selectedMenuMeta.textContent = `${menu.code} · ${rootCount} root items`;
	elements.selectedMenuTitle.textContent = menu.mainText || menu.code;
}

function buildTree() {
	const map = new Map();

	for (const placement of state.placements) {
		map.set(placement.id, {
			...placement,
			children: [],
		});
	}

	const roots = [];

	for (const placement of map.values()) {
		if (placement.parentId == null) {
			roots.push(placement);
			continue;
		}

		const parent = map.get(placement.parentId);

		if (parent) {
			parent.children.push(placement);
		}
	}

	return roots.sort(sortByOrder);
}

function renderTree() {
	elements.menuTree.innerHTML = "";

	const roots = buildTree();
	const rootDrop = createDropZone(null, "Drop items here to place them at the root");
	elements.menuTree.appendChild(rootDrop);

	if (roots.length === 0) {
		elements.menuTree.appendChild(createEmptyState("Drag items from the library to build this menu."));
		return;
	}

	const list = document.createElement("div");
	list.className = "node-list";

	for (const node of roots) {
		list.appendChild(renderNode(node, roots));
	}

	elements.menuTree.appendChild(list);
}

function renderNode(node, siblings) {
	const wrapper = document.createElement("article");
	wrapper.className = "tree-node";

	const item = node.menuItem;
	const sortedSiblings = [...siblings].sort(sortByOrder);
	const nodeIndex = sortedSiblings.findIndex((sibling) => sibling.id === node.id);
	const canMoveUp = nodeIndex > 0;
	const canMoveDown = nodeIndex >= 0 && nodeIndex < sortedSiblings.length - 1;
	const row = document.createElement("div");
	row.className = `node-row ${item.kind === "FOLDER" ? "is-folder" : ""}`;
	row.draggable = true;
	row.innerHTML = `
		<span class="swatch" style="background:${escapeColor(item.iconColor)}"></span>
		<span class="node-copy">
			<strong>${escapeHtml(item.text)}</strong>
			<small>${escapeHtml(item.code)} · order ${node.order}</small>
		</span>
		<span class="node-actions">
			<span class="kind-pill">${escapeHtml(item.kind)}</span>
			<button type="button" class="order-button" data-direction="up" ${canMoveUp ? "" : "disabled"} aria-label="Move ${escapeAttribute(item.text)} up" title="Move up">↑</button>
			<button type="button" class="order-button" data-direction="down" ${canMoveDown ? "" : "disabled"} aria-label="Move ${escapeAttribute(item.text)} down" title="Move down">↓</button>
			<button type="button" class="remove-button" data-action="remove" aria-label="Remove ${escapeAttribute(item.text)}" title="Remove">×</button>
		</span>
	`;

	row.addEventListener("dragstart", () => {
		state.dragged = {
			type: "existing-placement",
			placementId: node.id,
		};
		row.classList.add("dragging");
	});

	row.addEventListener("dragend", () => {
		state.dragged = null;
		row.classList.remove("dragging");
	});

	const upButton = row.querySelector('[data-direction="up"]');
	const downButton = row.querySelector('[data-direction="down"]');

	upButton.addEventListener("click", async (event) => {
		event.stopPropagation();
		await reorderPlacement(node.id, "up");
	});

	downButton.addEventListener("click", async (event) => {
		event.stopPropagation();
		await reorderPlacement(node.id, "down");
	});

	const removeButton = row.querySelector('[data-action="remove"]');

	removeButton.addEventListener("click", async (event) => {
		event.stopPropagation();
		await removePlacement(node.id);
	});

	wrapper.appendChild(row);

	if (item.kind === "FOLDER") {
		wrapper.appendChild(createDropZone(node.id, `Drop here to nest under ${item.text}`));
	}

	if (item.kind === "FOLDER" && node.children.length > 0) {
		const children = document.createElement("div");
		children.className = "children";

		const sortedChildren = [...node.children].sort(sortByOrder);

		for (const child of sortedChildren) {
			children.appendChild(renderNode(child, sortedChildren));
		}

		wrapper.appendChild(children);
	}

	return wrapper;
}

async function removePlacement(placementId) {
	const placement = state.placements.find((item) => item.id === placementId);

	if (!placement) {
		return;
	}

	setLoading(true);

	try {
		await api(`/api/placements/${placementId}`, {
			method: "DELETE",
		});
		await loadPlacements();
	} catch (error) {
		showError(error);
	} finally {
		setLoading(false);
	}
}

async function reorderPlacement(placementId, direction) {
	const placement = state.placements.find((item) => item.id === placementId);

	if (!placement) {
		return;
	}

	const siblings = state.placements
		.filter((item) => item.parentId === placement.parentId)
		.sort(sortByOrder);
	const currentIndex = siblings.findIndex((item) => item.id === placementId);
	const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

	if (targetIndex < 0 || targetIndex >= siblings.length) {
		return;
	}

	const nextSiblings = [...siblings];
	const [moved] = nextSiblings.splice(currentIndex, 1);
	nextSiblings.splice(targetIndex, 0, moved);

	setLoading(true);

	try {
		await Promise.all(
			nextSiblings.map((sibling, index) =>
				api(`/api/placements/${sibling.id}`, {
					method: "PATCH",
					body: JSON.stringify({
						parentId: sibling.parentId,
						order: index + 1,
					}),
				}),
			),
		);
		await loadPlacements();
	} catch (error) {
		showError(error);
	} finally {
		setLoading(false);
	}
}

function createDropZone(parentId, label) {
	const zone = document.createElement("div");
	zone.className = "drop-zone";
	zone.textContent = label;

	zone.addEventListener("dragover", (event) => {
		event.preventDefault();
		zone.classList.add("drop-hover");
	});

	zone.addEventListener("dragleave", () => {
		zone.classList.remove("drop-hover");
	});

	zone.addEventListener("drop", async (event) => {
		event.preventDefault();
		event.stopPropagation();
		zone.classList.remove("drop-hover");

		if (!state.dragged) {
			return;
		}

		await moveDraggedItem(parentId);
	});

	return zone;
}

async function moveDraggedItem(parentId) {
	const menu = getSelectedMenu();

	if (!menu || !state.dragged) {
		return;
	}

	if (!canPlaceUnder(parentId, state.dragged)) {
		showError(new Error("Items can only be placed at the root or under folders."));
		state.dragged = null;
		return;
	}

	const nextOrder = getNextOrder(parentId);
	setLoading(true);

	try {
		if (state.dragged.type === "new-item") {
			await api(`/api/menus/${menu.id}/items`, {
				method: "POST",
				body: JSON.stringify({
					menuItemId: state.dragged.menuItemId,
					parentId,
					order: nextOrder,
				}),
			});
		}

		if (state.dragged.type === "existing-placement") {
			await api(`/api/placements/${state.dragged.placementId}`, {
				method: "PATCH",
				body: JSON.stringify({
					parentId,
					order: nextOrder,
				}),
			});
		}

		state.dragged = null;
		await loadPlacements();
	} catch (error) {
		showError(error);
	} finally {
		setLoading(false);
	}
}

function canPlaceUnder(parentId, dragged) {
	if (parentId == null) {
		return true;
	}

	const parent = state.placements.find((placement) => placement.id === parentId);

	if (!parent || parent.menuItem.kind !== "FOLDER") {
		return false;
	}

	if (dragged.type !== "existing-placement") {
		return true;
	}

	if (dragged.placementId === parentId) {
		return false;
	}

	return !isDescendantPlacement(parentId, dragged.placementId);
}

function isDescendantPlacement(candidateParentId, placementId) {
	let current = state.placements.find((placement) => placement.id === candidateParentId);

	while (current) {
		if (current.parentId === placementId) {
			return true;
		}

		current = state.placements.find((placement) => placement.id === current.parentId);
	}

	return false;
}

async function refreshPreview() {
	const menu = getSelectedMenu();

	if (!menu) {
		renderPreview(null);
		return;
	}

	try {
		const json = await api(`/api/menus/${menu.code}/json`);
		renderPreview(json);
	} catch (error) {
		showError(error);
	}
}

function renderPreview(json) {
	elements.preview.textContent = json ? JSON.stringify(json, null, 2) : "{}";
}

function getSelectedMenu() {
	const id = Number(elements.menuSelect.value);
	return state.menus.find((menu) => menu.id === id) ?? null;
}

function getNextOrder(parentId) {
	const siblings = state.placements.filter((placement) => {
		if (parentId == null) {
			return placement.parentId == null;
		}

		return placement.parentId === parentId;
	});

	const maxOrder = siblings.reduce((max, placement) => Math.max(max, placement.order ?? 0), 0);
	return maxOrder + 1;
}

function sortByOrder(a, b) {
	return (a.order ?? 0) - (b.order ?? 0) || a.id - b.id;
}

function createEmptyState(message) {
	const empty = document.createElement("div");
	empty.className = "empty-state";
	empty.textContent = message;
	return empty;
}

function setLoading(isLoading) {
	state.isLoading = isLoading;
	document.body.classList.toggle("is-loading", isLoading);
	elements.refreshButton.disabled = isLoading;
	elements.menuSelect.disabled = isLoading;
}

function showStatus(message) {
	elements.statusMessage.textContent = message;
	elements.statusMessage.classList.toggle("is-visible", Boolean(message));
	elements.statusMessage.classList.remove("is-error");
}

function showError(error) {
	const message = error instanceof Error ? error.message : "Unexpected error";
	elements.statusMessage.textContent = message;
	elements.statusMessage.classList.add("is-visible", "is-error");
}

function escapeHtml(value) {
	return String(value ?? "")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
	return escapeHtml(value);
}

function escapeColor(value) {
	const text = String(value ?? "");
	return /^#[0-9a-fA-F]{3,8}$/.test(text) ? text : "#64748b";
}

elements.menuSelect.addEventListener("change", loadPlacements);
elements.refreshButton.addEventListener("click", refreshPreview);

load();
