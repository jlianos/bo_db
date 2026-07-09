(() => {
	const COLUMN_TYPES = ["boolean", "date", "datetime", "number", "text", "time", "code"];
	const OPERATORS = [
		"equals",
		"notEquals",
		"contains",
		"notContains",
		"startsWith",
		"endsWith",
		"greaterThan",
		"lessThan",
		"greaterThanOrEqual",
		"lessThanOrEqual",
		"between",
		"notBetween",
		"in",
		"notIn",
		"javascript",
		"typescript",
		"sql",
		"plaintext",
		"json",
		"css",
	];
	const HANDLER_KINDS = ["query", "function-query", "function-data"];
	const HANDLER_NAMES = ["select", "insert", "update", "delete"];

	function createParamsEditor(options) {
		const state = {
			activeTab: "form",
			currentParams: createDefaultParams(),
			input: options.input,
			summary: options.summary,
			onError: options.onError ?? console.error,
		};

		const modal = createModal();
		document.body.appendChild(modal.root);

		options.openButton.addEventListener("click", () => openEditor(state, modal));
		options.clearButton.addEventListener("click", () => {
			state.input.value = "";
			updateSummary(state);
		});

		modal.root.addEventListener("click", (event) => handleModalClick(event, state, modal));
		modal.root.addEventListener("change", (event) => {
			if (event.target === modal.jsonTextarea) {
				return;
			}

			state.currentParams = readForm(modal.formBody);
		});

		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape" && !modal.root.hidden) {
				closeEditor(modal);
			}
		});

		updateSummary(state);

		return {
			refresh() {
				updateSummary(state);
			},
		};
	}

	function createModal() {
		const root = document.createElement("div");
		root.className = "params-modal";
		root.hidden = true;
		root.innerHTML = `
			<div class="params-modal-backdrop" data-action="close"></div>
			<section class="params-dialog" role="dialog" aria-modal="true" aria-labelledby="paramsDialogTitle">
				<header class="params-dialog-header">
					<div>
						<p class="eyebrow">Menu item params</p>
						<h2 id="paramsDialogTitle">Configure Params</h2>
					</div>
					<button type="button" class="params-close-button" data-action="close" aria-label="Close params editor">x</button>
				</header>
				<div class="params-tabs" role="tablist">
					<button type="button" class="params-tab is-active" data-tab="form">Form</button>
					<button type="button" class="params-tab" data-tab="json">Advanced JSON</button>
				</div>
				<div class="params-dialog-body">
					<div class="params-tab-panel" data-panel="form"></div>
					<div class="params-tab-panel is-hidden" data-panel="json">
						<label class="field">
							<span>Params JSON</span>
							<textarea class="params-json-textarea" spellcheck="false"></textarea>
						</label>
					</div>
				</div>
				<footer class="params-dialog-footer">
					<button type="button" class="secondary-button" data-action="close">Cancel</button>
					<button type="button" class="primary-button" data-action="apply">Apply params</button>
				</footer>
			</section>
		`;

		return {
			root,
			formBody: root.querySelector('[data-panel="form"]'),
			jsonPanel: root.querySelector('[data-panel="json"]'),
			jsonTextarea: root.querySelector(".params-json-textarea"),
		};
	}

	function openEditor(state, modal) {
		try {
			state.currentParams = parseInputParams(state.input.value);
			state.activeTab = "form";
			renderModal(state, modal);
			modal.root.hidden = false;
			document.body.classList.add("has-params-modal");
		} catch (error) {
			state.onError(error);
		}
	}

	function closeEditor(modal) {
		modal.root.hidden = true;
		document.body.classList.remove("has-params-modal");
	}

	function handleModalClick(event, state, modal) {
		const actionButton = event.target.closest("[data-action]");
		const tabButton = event.target.closest("[data-tab]");
		const addButton = event.target.closest("[data-add]");
		const removeButton = event.target.closest("[data-remove]");

		if (tabButton) {
			switchTab(tabButton.dataset.tab, state, modal);
			return;
		}

		if (actionButton) {
			const action = actionButton.dataset.action;

			if (action === "close") {
				closeEditor(modal);
				return;
			}

			if (action === "apply") {
				applyParams(state, modal);
				return;
			}
		}

		if (addButton) {
			state.currentParams = readActiveParams(state, modal);
			addNestedItem(addButton.dataset.add, addButton.dataset.childIndex, state.currentParams);
			renderModal(state, modal);
			return;
		}

		if (removeButton) {
			state.currentParams = readActiveParams(state, modal);
			removeNestedItem(
				removeButton.dataset.remove,
				removeButton.dataset.index,
				removeButton.dataset.childIndex,
				state.currentParams,
			);
			renderModal(state, modal);
		}
	}

	function switchTab(tab, state, modal) {
		if (tab === state.activeTab) {
			return;
		}

		try {
			state.currentParams = readActiveParams(state, modal);
			state.activeTab = tab;
			renderModal(state, modal);
		} catch (error) {
			state.onError(error);
		}
	}

	function applyParams(state, modal) {
		try {
			const params = readActiveParams(state, modal);
			state.input.value = JSON.stringify(params, null, 2);
			state.currentParams = params;
			updateSummary(state);
			closeEditor(modal);
		} catch (error) {
			state.onError(error);
		}
	}

	function readActiveParams(state, modal) {
		if (state.activeTab === "json") {
			return parseInputParams(modal.jsonTextarea.value);
		}

		return readForm(modal.formBody);
	}

	function renderModal(state, modal) {
		const tabs = modal.root.querySelectorAll("[data-tab]");
		const panels = modal.root.querySelectorAll("[data-panel]");

		for (const tab of tabs) {
			tab.classList.toggle("is-active", tab.dataset.tab === state.activeTab);
		}

		for (const panel of panels) {
			panel.classList.toggle("is-hidden", panel.dataset.panel !== state.activeTab);
		}

		modal.formBody.innerHTML = renderParamsSection(state.currentParams, { childIndex: null, includeChildren: true });
		modal.jsonTextarea.value = JSON.stringify(state.currentParams, null, 2);
	}

	function addNestedItem(kind, childIndex, params) {
		if (kind === "root-column") {
			params.columns.push(createDefaultColumn());
			return;
		}

		if (kind === "child") {
			params.children.push({
				relation: {
					name: "",
					columns: [{ parentColumn: "", childColumn: "" }],
				},
				params: createDefaultChildParams(),
			});
			return;
		}

		if (kind === "relation-column") {
			params.children[Number(childIndex)]?.relation.columns.push({ parentColumn: "", childColumn: "" });
			return;
		}

		if (kind === "child-column") {
			params.children[Number(childIndex)]?.params.columns.push(createDefaultColumn());
		}
	}

	function removeNestedItem(kind, index, childIndex, params) {
		const numericIndex = Number(index);

		if (kind === "root-column") {
			params.columns.splice(numericIndex, 1);
			return;
		}

		if (kind === "child") {
			params.children.splice(numericIndex, 1);
			return;
		}

		if (kind === "relation-column") {
			params.children[Number(childIndex)]?.relation.columns.splice(numericIndex, 1);
			return;
		}

		if (kind === "child-column") {
			params.children[Number(childIndex)]?.params.columns.splice(numericIndex, 1);
		}
	}

	function renderParamsSection(params, options) {
		const childIndex = options.childIndex;
		const includeChildren = options.includeChildren;
		const scope = childIndex === null ? "root" : `child-${childIndex}`;
		const columnAdd = childIndex === null ? "root-column" : "child-column";
		const columnRemove = childIndex === null ? "root-column" : "child-column";
		const childData = childIndex === null ? "" : ` data-child-index="${childIndex}"`;

		return `
			<div class="params-form-section" data-section="${scope}">
				<label class="field">
					<span>Table name</span>
					<input type="text" data-field="tableName" value="${escapeAttribute(params.tableName)}" autocomplete="off">
				</label>
				${renderPermissions(params.permissions)}
				${renderHandlers(params.handlers)}
				<section class="params-subsection">
					<div class="params-subsection-header">
						<h3>Columns</h3>
						<button type="button" class="secondary-button" data-add="${columnAdd}"${childData}>Add column</button>
					</div>
					<div class="params-columns" data-role="columns">
						${params.columns.map((column, index) => renderColumn(column, index, columnRemove, childIndex)).join("")}
					</div>
				</section>
				${includeChildren ? renderChildren(params.children) : ""}
			</div>
		`;
	}

	function renderPermissions(permissions) {
		return `
			<section class="params-subsection">
				<h3>Permissions</h3>
				<div class="params-checkbox-grid">
					${renderCheckbox("permission-insert", "Insert", permissions.insert)}
					${renderCheckbox("permission-update", "Update", permissions.update)}
					${renderCheckbox("permission-delete", "Delete", permissions.delete)}
				</div>
			</section>
		`;
	}

	function renderHandlers(handlers) {
		return `
			<section class="params-subsection">
				<h3>Handlers</h3>
				<div class="params-handler-grid">
					${HANDLER_NAMES.map((name) => renderHandler(name, handlers[name])).join("")}
				</div>
			</section>
		`;
	}

	function renderHandler(name, handler) {
		return `
			<div class="params-handler" data-handler="${name}">
				<div class="field">
					<span>${capitalize(name)} kind</span>
					<select data-field="handlerKind">
						${renderOptions(HANDLER_KINDS, handler.kind)}
					</select>
				</div>
				<label class="field">
					<span>${capitalize(name)} source</span>
					<textarea data-field="handlerSrc" spellcheck="false">${escapeHtml(handler.src)}</textarea>
				</label>
			</div>
		`;
	}

	function renderColumn(column, index, removeKind, childIndex) {
		const childData = childIndex === null ? "" : ` data-child-index="${childIndex}"`;

		return `
			<article class="params-column" data-column-index="${index}">
				<div class="params-card-header">
					<h4>Column ${index + 1}</h4>
					<button type="button" class="params-remove-button" data-remove="${removeKind}" data-index="${index}"${childData}>Remove</button>
				</div>
				<div class="params-two-col">
					<label class="field">
						<span>Name</span>
						<input type="text" data-field="name" value="${escapeAttribute(column.name)}" autocomplete="off">
					</label>
					<label class="field">
						<span>Label</span>
						<input type="text" data-field="label" value="${escapeAttribute(column.label)}" autocomplete="off">
					</label>
					<label class="field">
						<span>Type</span>
						<select data-field="type">${renderOptions(COLUMN_TYPES, column.type)}</select>
					</label>
					<div class="params-checkbox-stack">
						${renderCheckbox("primaryKey", "Primary key", column.primaryKey)}
						${renderCheckbox("visible", "Visible", column.visible)}
						${renderCheckbox("sortable", "Sortable", column.sortable)}
						${renderCheckbox("filterable", "Filterable", column.filterable)}
					</div>
				</div>
				<div class="params-column-groups">
					${renderRetrieve(column.retrieve)}
					${renderMutation("insert", "Insert", column.insert)}
					${renderMutation("update", "Update", column.update)}
					${renderLookup(column.lookup)}
				</div>
			</article>
		`;
	}

	function renderRetrieve(retrieve) {
		return `
			<section class="params-mini-section" data-role="retrieve">
				<h5>Retrieve</h5>
				${renderCheckbox("retrieve-enabled", "Enabled", retrieve.enabled)}
				${renderCheckbox("criteria-enabled", "Criteria enabled", retrieve.criteria.enabled)}
				${renderCheckbox("criteria-required", "Criteria required", retrieve.criteria.required)}
				<label class="field">
					<span>Operators</span>
					<select data-field="operators" multiple size="6">${renderOptions(OPERATORS, retrieve.criteria.operators)}</select>
				</label>
				<label class="field">
					<span>Default operator</span>
					<select data-field="defaultOperator">${renderOptions(OPERATORS, retrieve.criteria.defaultOperator)}</select>
				</label>
			</section>
		`;
	}

	function renderMutation(key, label, value) {
		return `
			<section class="params-mini-section" data-role="${key}">
				<h5>${label}</h5>
				${renderCheckbox(`${key}-enabled`, "Enabled", value.enabled)}
				${renderCheckbox(`${key}-required`, "Required", value.required)}
			</section>
		`;
	}

	function renderLookup(lookup) {
		return `
			<section class="params-mini-section" data-role="lookup">
				<h5>Lookup</h5>
				${renderCheckbox("lookup-enabled", "Enabled", lookup.enabled)}
				${renderHandler("lookup", lookup.handler)}
			</section>
		`;
	}

	function renderChildren(children) {
		return `
			<section class="params-subsection">
				<div class="params-subsection-header">
					<h3>Children</h3>
					<button type="button" class="secondary-button" data-add="child">Add child</button>
				</div>
				<div class="params-children">
					${children.map((child, index) => renderChild(child, index)).join("")}
				</div>
			</section>
		`;
	}

	function renderChild(child, index) {
		return `
			<article class="params-child" data-child-index="${index}">
				<div class="params-card-header">
					<h4>Child ${index + 1}</h4>
					<button type="button" class="params-remove-button" data-remove="child" data-index="${index}">Remove</button>
				</div>
				<label class="field">
					<span>Relation name</span>
					<input type="text" data-field="relationName" value="${escapeAttribute(child.relation.name)}" autocomplete="off">
				</label>
				<section class="params-mini-section">
					<div class="params-subsection-header">
						<h5>Relation columns</h5>
						<button type="button" class="secondary-button" data-add="relation-column" data-child-index="${index}">Add mapping</button>
					</div>
					<div class="params-relation-columns">
						${child.relation.columns.map((column, relationIndex) => renderRelationColumn(column, relationIndex, index)).join("")}
					</div>
				</section>
				${renderParamsSection(child.params, { childIndex: index, includeChildren: false })}
			</article>
		`;
	}

	function renderRelationColumn(column, index, childIndex) {
		return `
			<div class="params-relation-column" data-relation-column-index="${index}">
				<label class="field">
					<span>Parent column</span>
					<input type="text" data-field="parentColumn" value="${escapeAttribute(column.parentColumn)}" autocomplete="off">
				</label>
				<label class="field">
					<span>Child column</span>
					<input type="text" data-field="childColumn" value="${escapeAttribute(column.childColumn)}" autocomplete="off">
				</label>
				<button type="button" class="params-remove-button" data-remove="relation-column" data-index="${index}" data-child-index="${childIndex}">Remove</button>
			</div>
		`;
	}

	function renderCheckbox(field, label, checked) {
		return `
			<label class="params-checkbox">
				<input type="checkbox" data-field="${field}" ${checked ? "checked" : ""}>
				<span>${escapeHtml(label)}</span>
			</label>
		`;
	}

	function renderOptions(options, selected) {
		const selectedValues = Array.isArray(selected) ? selected : [selected];

		return options
			.map(
				(option) =>
					`<option value="${escapeAttribute(option)}" ${selectedValues.includes(option) ? "selected" : ""}>${escapeHtml(option)}</option>`,
			)
			.join("");
	}

	function readForm(formBody) {
		const root = formBody.querySelector('[data-section="root"]');
		const params = readParamsSection(root);
		params.children = [
			...formBody.querySelectorAll(":scope > [data-section='root'] > .params-subsection .params-child"),
		].map((child) => readChild(child));
		return normalizeParams(params);
	}

	function readParamsSection(section) {
		return {
			tableName: readValue(section, "tableName"),
			columns: [...section.querySelector('[data-role="columns"]').children].map((column) => readColumn(column)),
			handlers: readHandlers(section),
			permissions: readPermissions(section),
			children: [],
		};
	}

	function readChild(child) {
		const childSection = child.querySelector("[data-section^='child-']");

		return {
			relation: {
				name: readValue(child, "relationName"),
				columns: [...child.querySelectorAll(".params-relation-column")].map((column) => ({
					parentColumn: readValue(column, "parentColumn"),
					childColumn: readValue(column, "childColumn"),
				})),
			},
			params: removeChildren(readParamsSection(childSection)),
		};
	}

	function readColumn(column) {
		const retrieve = column.querySelector('[data-role="retrieve"]');
		const insert = column.querySelector('[data-role="insert"]');
		const update = column.querySelector('[data-role="update"]');
		const lookup = column.querySelector('[data-role="lookup"]');
		const selectedOperators = [...retrieve.querySelector('[data-field="operators"]').selectedOptions].map(
			(option) => option.value,
		);

		return {
			name: readValue(column, "name"),
			label: readValue(column, "label"),
			type: readValue(column, "type"),
			primaryKey: readChecked(column, "primaryKey"),
			visible: readChecked(column, "visible"),
			sortable: readChecked(column, "sortable"),
			filterable: readChecked(column, "filterable"),
			retrieve: {
				enabled: readChecked(retrieve, "retrieve-enabled"),
				criteria: {
					enabled: readChecked(retrieve, "criteria-enabled"),
					required: readChecked(retrieve, "criteria-required"),
					operators: selectedOperators.length > 0 ? selectedOperators : ["equals"],
					defaultOperator: readValue(retrieve, "defaultOperator"),
				},
			},
			insert: {
				enabled: readChecked(insert, "insert-enabled"),
				required: readChecked(insert, "insert-required"),
			},
			update: {
				enabled: readChecked(update, "update-enabled"),
				required: readChecked(update, "update-required"),
			},
			lookup: {
				enabled: readChecked(lookup, "lookup-enabled"),
				handler: readHandler(lookup.querySelector('[data-handler="lookup"]')),
			},
		};
	}

	function readHandlers(section) {
		return Object.fromEntries(
			HANDLER_NAMES.map((name) => [name, readHandler(section.querySelector(`[data-handler="${name}"]`))]),
		);
	}

	function readHandler(section) {
		return {
			kind: readValue(section, "handlerKind") || "query",
			src: readValue(section, "handlerSrc"),
		};
	}

	function readPermissions(section) {
		return {
			insert: readChecked(section, "permission-insert"),
			update: readChecked(section, "permission-update"),
			delete: readChecked(section, "permission-delete"),
		};
	}

	function readValue(root, field) {
		return root.querySelector(`[data-field="${field}"]`)?.value.trim() ?? "";
	}

	function readChecked(root, field) {
		return root.querySelector(`[data-field="${field}"]`)?.checked ?? false;
	}

	function parseInputParams(value) {
		const text = String(value ?? "").trim();

		if (!text) {
			return createDefaultParams();
		}

		try {
			return normalizeParams(JSON.parse(text));
		} catch {
			throw new Error("Params JSON is not valid.");
		}
	}

	function normalizeParams(value) {
		const input = isObject(value) ? value : {};

		return {
			tableName: String(input.tableName ?? ""),
			columns: Array.isArray(input.columns) ? input.columns.map(normalizeColumn) : [],
			handlers: normalizeHandlers(input.handlers),
			permissions: normalizePermissions(input.permissions),
			children: Array.isArray(input.children) ? input.children.map(normalizeChild) : [],
		};
	}

	function normalizeChild(value) {
		const input = isObject(value) ? value : {};
		const relation = isObject(input.relation) ? input.relation : {};

		return {
			relation: {
				name: String(relation.name ?? ""),
				columns: Array.isArray(relation.columns)
					? relation.columns.map((column) => ({
							parentColumn: String(column?.parentColumn ?? ""),
							childColumn: String(column?.childColumn ?? ""),
						}))
					: [],
			},
			params: removeChildren(normalizeParams(input.params)),
		};
	}

	function normalizeColumn(value) {
		const input = isObject(value) ? value : {};
		const retrieve = isObject(input.retrieve) ? input.retrieve : {};
		const criteria = isObject(retrieve.criteria) ? retrieve.criteria : {};
		const insert = isObject(input.insert) ? input.insert : {};
		const update = isObject(input.update) ? input.update : {};
		const lookup = isObject(input.lookup) ? input.lookup : {};
		const operators =
			Array.isArray(criteria.operators) && criteria.operators.length > 0 ? criteria.operators : ["equals"];

		return {
			name: String(input.name ?? ""),
			label: String(input.label ?? input.name ?? ""),
			type: pick(COLUMN_TYPES, input.type, "text"),
			primaryKey: Boolean(input.primaryKey),
			visible: input.visible !== false,
			sortable: input.sortable !== false,
			filterable: input.filterable !== false,
			retrieve: {
				enabled: retrieve.enabled !== false,
				criteria: {
					enabled: criteria.enabled !== false,
					required: Boolean(criteria.required),
					operators: operators.map((operator) => pick(OPERATORS, operator, "equals")),
					defaultOperator: pick(OPERATORS, criteria.defaultOperator, "equals"),
				},
			},
			insert: {
				enabled: insert.enabled !== false,
				required: Boolean(insert.required),
			},
			update: {
				enabled: update.enabled !== false,
				required: Boolean(update.required),
			},
			lookup: {
				enabled: Boolean(lookup.enabled),
				handler: normalizeHandler(lookup.handler),
			},
		};
	}

	function normalizeHandlers(value) {
		const input = isObject(value) ? value : {};

		return Object.fromEntries(HANDLER_NAMES.map((name) => [name, normalizeHandler(input[name])]));
	}

	function normalizeHandler(value) {
		const input = isObject(value) ? value : {};

		return {
			kind: pick(HANDLER_KINDS, input.kind, "query"),
			src: String(input.src ?? ""),
		};
	}

	function normalizePermissions(value) {
		const input = isObject(value) ? value : {};

		return {
			insert: Boolean(input.insert),
			update: Boolean(input.update),
			delete: Boolean(input.delete),
		};
	}

	function createDefaultParams() {
		return {
			tableName: "",
			columns: [],
			handlers: normalizeHandlers({}),
			permissions: normalizePermissions({}),
			children: [],
		};
	}

	function createDefaultChildParams() {
		return removeChildren(createDefaultParams());
	}

	function createDefaultColumn() {
		return normalizeColumn({ name: "", label: "" });
	}

	function removeChildren(params) {
		const { children: _children, ...rest } = params;
		return rest;
	}

	function updateSummary(state) {
		const text = String(state.input.value ?? "").trim();

		if (!text) {
			state.summary.textContent = "No params configured";
			return;
		}

		try {
			const params = normalizeParams(JSON.parse(text));
			const table = params.tableName || "Untitled table";
			const columns = `${params.columns.length} column${params.columns.length === 1 ? "" : "s"}`;
			const children = `${params.children.length} child relation${params.children.length === 1 ? "" : "s"}`;
			const permissions = ["insert", "update", "delete"].filter((key) => params.permissions[key]);
			const permissionText = permissions.length > 0 ? permissions.join("/") : "read-only";
			state.summary.textContent = `${table} - ${columns}, ${children}, ${permissionText}`;
		} catch {
			state.summary.textContent = "Params JSON needs attention";
		}
	}

	function pick(options, value, fallback) {
		return options.includes(value) ? value : fallback;
	}

	function isObject(value) {
		return value !== null && typeof value === "object" && !Array.isArray(value);
	}

	function capitalize(value) {
		return value.charAt(0).toUpperCase() + value.slice(1);
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

	window.createParamsEditor = createParamsEditor;
})();
