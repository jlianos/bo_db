let menus = [];
let items = [];
let placements = [];

let dragged = null;

async function api(url, options) {
	const res = await fetch(url, {
		headers: {
			"Content-Type": "application/json",
		},
		...options,
	});

	if (!res.ok) {
		alert(await res.text());
		throw new Error("Request failed");
	}

	return res.json();
}

async function load() {
	menus = await api("/api/menus");
	items = await api("/api/menu-items");

	menuSelect.innerHTML = menus.map((m) => `<option value="${m.id}" data-code="${m.code}">${m.code}</option>`).join("");

	renderAvailableItems();
	await loadPlacements();
}

async function loadPlacements() {
	const menuId = Number(menuSelect.value);

	placements = await api(`/api/menus/${menuId}/placements`);

	renderTree();
	await refreshPreview();
}

function renderAvailableItems() {
	availableItems.innerHTML = "";

	for (const item of items) {
		const el = document.createElement("div");
		el.className = "item";
		el.draggable = true;
		el.textContent = item.text;

		el.addEventListener("dragstart", () => {
			dragged = {
				type: "new-item",
				menuItemId: item.id,
			};
		});

		availableItems.appendChild(el);
	}
}

function buildTree() {
	const map = new Map();

	for (const p of placements) {
		map.set(p.id, {
			...p,
			children: [],
		});
	}

	const roots = [];

	for (const p of map.values()) {
		if (p.parentId == null) {
			roots.push(p);
		} else {
			const parent = map.get(p.parentId);
			if (parent) parent.children.push(p);
		}
	}

	return roots;
}

function renderTree() {
	menuTree.innerHTML = "";

	const roots = buildTree();

	for (const node of roots) {
		menuTree.appendChild(renderNode(node));
	}

	setupDropZone(menuTree, null);
}

function renderNode(node) {
	const wrapper = document.createElement("div");

	const el = document.createElement("div");
	el.className = "node";
	el.draggable = true;
	el.textContent = node.menuItem.text;

	el.addEventListener("dragstart", () => {
		dragged = {
			type: "existing-placement",
			placementId: node.id,
		};
	});

	setupDropZone(el, node.id);

	wrapper.appendChild(el);

	const children = document.createElement("div");
	children.className = "children";

	for (const child of node.children) {
		children.appendChild(renderNode(child));
	}

	setupDropZone(children, node.id);

	wrapper.appendChild(children);

	return wrapper;
}

function setupDropZone(el, parentId) {
	el.addEventListener("dragover", (event) => {
		event.preventDefault();
		el.classList.add("drop-hover");
	});

	el.addEventListener("dragleave", () => {
		el.classList.remove("drop-hover");
	});

	el.addEventListener("drop", async (event) => {
		event.preventDefault();
		event.stopPropagation();

		el.classList.remove("drop-hover");

		if (!dragged) return;

		const menuId = Number(menuSelect.value);

		if (dragged.type === "new-item") {
			await api(`/api/menus/${menuId}/items`, {
				method: "POST",
				body: JSON.stringify({
					menuItemId: dragged.menuItemId,
					parentId,
					order: 0,
				}),
			});
		}

		if (dragged.type === "existing-placement") {
			await api(`/api/placements/${dragged.placementId}`, {
				method: "PATCH",
				body: JSON.stringify({
					parentId,
					order: 0,
				}),
			});
		}

		dragged = null;
		await loadPlacements();
	});
}

async function refreshPreview() {
	const selected = menuSelect.selectedOptions[0];
	const code = selected.dataset.code;

	const json = await api(`/api/menus/${code}/json`);

	preview.textContent = JSON.stringify(json, null, 2);
}

menuSelect.addEventListener("change", loadPlacements);

load();
