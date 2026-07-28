import * as v from "valibot";
import { MenuItemKind } from "../../generated/prisma/browser.js";
import { type MenuItemParams, MenuItemParamsSchema } from "../../models/menu-item-params.valibot.models.js";

export type SeedMenuItemData = {
	code: string;
	text: string;
	icon: string;
	iconColor: string;
	kind: MenuItemKind;
	params?: MenuItemParams;
};

export type SeedColumn = MenuItemParams["columns"][number];
export type SeedColumnType = SeedColumn["type"];
type SeedCriteria = SeedColumn["retrieve"]["criteria"];

type SeedColumnOptions = {
	primaryKey?: boolean;
	visible?: boolean;
	sortable?: boolean;
	filterable?: boolean;
	retrieveEnabled?: boolean;
	criteriaEnabled?: boolean;
	criteriaRequired?: boolean;
	operators?: SeedCriteria["operators"];
	defaultOperator?: SeedCriteria["defaultOperator"];
	insertEnabled?: boolean;
	insertRequired?: boolean;
	updateEnabled?: boolean;
	updateRequired?: boolean;
	lookup?: SeedColumn["lookup"];
};

export function createItemData(
	code: string,
	text: string,
	icon: string,
	iconColor: string,
	kind: MenuItemKind = MenuItemKind.ITEM,
): SeedMenuItemData {
	return {
		code,
		text,
		icon,
		iconColor,
		kind,
		params: kind === MenuItemKind.ITEM ? createItemParams(code, text) : undefined,
	};
}

export function createConfiguredItemData(
	code: string,
	text: string,
	icon: string,
	iconColor: string,
	params: MenuItemParams,
): SeedMenuItemData {
	return {
		code,
		text,
		icon,
		iconColor,
		kind: MenuItemKind.ITEM,
		params,
	};
}

export function parseMenuItemParams(input: unknown): MenuItemParams {
	return v.parse(MenuItemParamsSchema, input);
}

export function createColumn(
	name: string,
	label: string,
	type: SeedColumnType,
	options: SeedColumnOptions = {},
): SeedColumn {
	const criteria = createDefaultCriteria(type);

	return {
		name,
		label,
		type,
		primaryKey: options.primaryKey ?? false,
		visible: options.visible ?? true,
		sortable: options.sortable ?? true,
		filterable: options.filterable ?? true,
		retrieve: {
			enabled: options.retrieveEnabled ?? true,
			criteria: {
				enabled: options.criteriaEnabled ?? true,
				required: options.criteriaRequired ?? false,
				operators: options.operators ?? criteria.operators,
				defaultOperator: options.defaultOperator ?? criteria.defaultOperator,
			},
		},
		insert: {
			enabled: options.insertEnabled ?? true,
			required: options.insertRequired ?? false,
		},
		update: {
			enabled: options.updateEnabled ?? true,
			required: options.updateRequired ?? false,
		},
		lookup: options.lookup ?? {
			enabled: false,
			multiple: false,
			handler: { kind: "query", src: "" },
		},
	};
}

export function createQueryLookup(src: string): SeedColumn["lookup"] {
	return {
		enabled: true,
		multiple: false,
		handler: { kind: "query", src },
	};
}

export function createFunctionQueryLookup(src: string): SeedColumn["lookup"] {
	return {
		enabled: true,
		multiple: false,
		handler: { kind: "function-query", src },
	};
}

export function createFunctionDataLookup(src: string): SeedColumn["lookup"] {
	return {
		enabled: true,
		multiple: false,
		handler: { kind: "function-data", src },
	};
}

export function createDeletePreviewHandler(primaryKey: string): MenuItemParams["handlers"]["delete"] {
	return {
		kind: "function-data",
		src: `({ ${primaryKey} = 0 }) => ({
	success: true,
	data: [{ ${primaryKey}: Number(${primaryKey}), action: "delete-preview" }]
})`,
	};
}

export function createFullPermissions(): MenuItemParams["permissions"] {
	return {
		insert: true,
		update: true,
		delete: true,
	};
}

export function createChildRelation(
	name: string,
	parentColumn: string,
	childColumn: string,
	params: MenuItemParams,
): MenuItemParams["children"][number] {
	const { children: _children, ...childParams } = params;

	return {
		relation: {
			name,
			columns: [{ parentColumn, childColumn }],
		},
		params: childParams,
	};
}

function createDefaultCriteria(type: SeedColumnType): SeedCriteria {
	switch (type) {
		case "number":
			return {
				enabled: true,
				required: false,
				operators: ["equals", "notEquals", "greaterThan", "lessThan", "between"],
				defaultOperator: "equals",
			};
		case "date":
		case "datetime":
		case "time":
			return {
				enabled: true,
				required: false,
				operators: ["equals", "greaterThanOrEqual", "lessThanOrEqual", "between"],
				defaultOperator: "between",
			};
		case "boolean":
			return {
				enabled: true,
				required: false,
				operators: ["equals", "notEquals"],
				defaultOperator: "equals",
			};
		default:
			return {
				enabled: true,
				required: false,
				operators: ["contains", "startsWith", "equals", "notEquals"],
				defaultOperator: "contains",
			};
	}
}

function createItemParams(code: string, text: string): MenuItemParams {
	const tableName = code.replaceAll("-", "_");
	const childTableName = `${tableName}_notes`;

	return parseMenuItemParams({
		tableName,
		columns: [
			{
				name: "id",
				label: "ID",
				type: "number",
				primaryKey: true,
				visible: true,
				sortable: true,
				filterable: true,
				retrieve: {
					enabled: true,
					criteria: {
						enabled: true,
						required: false,
						operators: ["equals", "in", "greaterThan", "lessThan"],
						defaultOperator: "equals",
					},
				},
				insert: { enabled: false, required: false },
				update: { enabled: false, required: false },
				lookup: {
					enabled: false,
					multiple: false,
					handler: { kind: "query", src: "" },
				},
			},
			{
				name: "name",
				label: `${text} name`,
				type: "text",
				primaryKey: false,
				visible: true,
				sortable: true,
				filterable: true,
				retrieve: {
					enabled: true,
					criteria: {
						enabled: true,
						required: false,
						operators: ["contains", "startsWith", "equals", "notEquals"],
						defaultOperator: "contains",
					},
				},
				insert: { enabled: true, required: true },
				update: { enabled: true, required: true },
				lookup: {
					enabled: false,
					multiple: false,
					handler: { kind: "query", src: "" },
				},
			},
			{
				name: "status",
				label: "Status",
				type: "text",
				primaryKey: false,
				visible: true,
				sortable: true,
				filterable: true,
				retrieve: {
					enabled: true,
					criteria: {
						enabled: true,
						required: false,
						operators: ["equals", "notEquals", "in", "notIn"],
						defaultOperator: "equals",
					},
				},
				insert: { enabled: true, required: true },
				update: { enabled: true, required: false },
				lookup: {
					enabled: true,
					multiple: false,
					handler: {
						kind: "function-query",
						src: `({ includeInactive = false }) => includeInactive
	? "SELECT code, label FROM ${tableName}_statuses ORDER BY label"
	: "SELECT code, label FROM ${tableName}_statuses WHERE active = 1 ORDER BY label"`,
					},
				},
			},
			{
				name: "active",
				label: "Active",
				type: "boolean",
				primaryKey: false,
				visible: true,
				sortable: true,
				filterable: true,
				retrieve: {
					enabled: true,
					criteria: {
						enabled: true,
						required: false,
						operators: ["equals", "notEquals"],
						defaultOperator: "equals",
					},
				},
				insert: { enabled: true, required: false },
				update: { enabled: true, required: false },
				lookup: {
					enabled: false,
					multiple: false,
					handler: { kind: "query", src: "" },
				},
			},
			{
				name: "createdAt",
				label: "Created at",
				type: "datetime",
				primaryKey: false,
				visible: true,
				sortable: true,
				filterable: true,
				retrieve: {
					enabled: true,
					criteria: {
						enabled: true,
						required: false,
						operators: ["between", "greaterThanOrEqual", "lessThanOrEqual"],
						defaultOperator: "between",
					},
				},
				insert: { enabled: false, required: false },
				update: { enabled: false, required: false },
				lookup: {
					enabled: false,
					multiple: false,
					handler: { kind: "query", src: "" },
				},
			},
			{
				name: "metadata",
				label: "Metadata",
				type: "code",
				primaryKey: false,
				visible: false,
				sortable: false,
				filterable: false,
				retrieve: {
					enabled: true,
					criteria: {
						enabled: false,
						required: false,
						operators: ["json", "plaintext"],
						defaultOperator: "json",
					},
				},
				insert: { enabled: true, required: false },
				update: { enabled: true, required: false },
				lookup: {
					enabled: false,
					multiple: false,
					handler: { kind: "query", src: "" },
				},
			},
		],
		handlers: {
			select: {
				kind: "function-query",
				src: `({ includeInactive = false }) => includeInactive
	? "SELECT * FROM ${tableName} ORDER BY name"
	: "SELECT * FROM ${tableName} WHERE active = 1 ORDER BY name"`,
			},
			insert: {
				kind: "query",
				src: `INSERT INTO ${tableName} (name, status, active, metadata)
VALUES (:name, :status, :active, :metadata)`,
			},
			update: {
				kind: "function-query",
				src: `({ id = 0 }) => "UPDATE ${tableName} SET updated_at = CURRENT_TIMESTAMP WHERE id = " + Number(id)`,
			},
			delete: {
				kind: "function-data",
				src: `({ id = 0 }) => ({
	success: true,
	data: [{ id: Number(id), status: "delete-preview" }]
})`,
			},
		},
		permissions: {
			insert: true,
			update: true,
			delete: true,
		},
		children: [
			{
				relation: {
					name: `${text} notes`,
					columns: [{ parentColumn: "id", childColumn: `${tableName}_id` }],
				},
				params: {
					tableName: childTableName,
					columns: [
						{
							name: "id",
							label: "Note ID",
							type: "number",
							primaryKey: true,
							visible: false,
							sortable: true,
							filterable: false,
							retrieve: {
								enabled: true,
								criteria: {
									enabled: false,
									required: false,
									operators: ["equals"],
									defaultOperator: "equals",
								},
							},
							insert: { enabled: false, required: false },
							update: { enabled: false, required: false },
							lookup: {
								enabled: false,
								multiple: false,
								handler: { kind: "query", src: "" },
							},
						},
						{
							name: `${tableName}_id`,
							label: `${text} ID`,
							type: "number",
							primaryKey: false,
							visible: false,
							sortable: false,
							filterable: true,
							retrieve: {
								enabled: true,
								criteria: {
									enabled: true,
									required: true,
									operators: ["equals"],
									defaultOperator: "equals",
								},
							},
							insert: { enabled: true, required: true },
							update: { enabled: false, required: false },
							lookup: {
								enabled: false,
								multiple: false,
								handler: { kind: "query", src: "" },
							},
						},
						{
							name: "note",
							label: "Note",
							type: "text",
							primaryKey: false,
							visible: true,
							sortable: false,
							filterable: true,
							retrieve: {
								enabled: true,
								criteria: {
									enabled: true,
									required: false,
									operators: ["contains", "notContains"],
									defaultOperator: "contains",
								},
							},
							insert: { enabled: true, required: true },
							update: { enabled: true, required: true },
							lookup: {
								enabled: false,
								multiple: false,
								handler: { kind: "query", src: "" },
							},
						},
					],
					handlers: {
						select: {
							kind: "query",
							src: `SELECT * FROM ${childTableName} WHERE ${tableName}_id = :parentId ORDER BY id`,
						},
						insert: {
							kind: "function-query",
							src: `() => "INSERT INTO ${childTableName} (${tableName}_id, note) VALUES (:parentId, :note)"`,
						},
						update: {
							kind: "function-data",
							src: `({ id = 0, note = "" }) => ({
	success: true,
	data: [{ id: Number(id), note: String(note) }]
})`,
						},
						delete: {
							kind: "query",
							src: `DELETE FROM ${childTableName} WHERE id = :id`,
						},
					},
					permissions: {
						insert: true,
						update: true,
						delete: true,
					},
				},
			},
		],
	});
}
