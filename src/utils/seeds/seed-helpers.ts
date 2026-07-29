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
type SeedColumnType = SeedColumn["type"];
type SeedCriteria = SeedColumn["retrieve"]["criteria"];
type SeedLookupHandler = SeedColumn["lookup"]["criteria"]["handler"];

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

type SeedLookupOptions = {
	criteria?: boolean;
	criteriaMultiple?: boolean;
	insert?: boolean;
	update?: boolean;
	grid?: boolean;
};

export function createFolderItemData(code: string, text: string, icon: string, iconColor: string): SeedMenuItemData {
	return {
		code,
		text,
		icon,
		iconColor,
		kind: MenuItemKind.FOLDER,
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
		lookup: options.lookup ?? createDisabledLookup(),
	};
}

export function createQueryLookup(src: string, options?: SeedLookupOptions): SeedColumn["lookup"] {
	return createLookup({ kind: "query", src }, options);
}

export function createFunctionQueryLookup(src: string, options?: SeedLookupOptions): SeedColumn["lookup"] {
	return createLookup({ kind: "function-query", src }, options);
}

export function createFunctionDataLookup(src: string, options?: SeedLookupOptions): SeedColumn["lookup"] {
	return createLookup({ kind: "function-data", src }, options);
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

function createLookup(handler: SeedLookupHandler, options: SeedLookupOptions = {}): SeedColumn["lookup"] {
	return {
		criteria: {
			enabled: options.criteria ?? true,
			multiple: options.criteriaMultiple ?? true,
			handler: { ...handler },
		},
		insert: {
			enabled: options.insert ?? true,
			multiple: false,
			handler: { ...handler },
		},
		update: {
			enabled: options.update ?? true,
			multiple: false,
			handler: { ...handler },
		},
		grid: {
			enabled: options.grid ?? true,
			handler: { ...handler },
		},
	};
}

function createDisabledLookup(): SeedColumn["lookup"] {
	const handler = { kind: "query", src: "" } as const;

	return {
		criteria: {
			enabled: false,
			multiple: false,
			handler: { ...handler },
		},
		insert: {
			enabled: false,
			multiple: false,
			handler: { ...handler },
		},
		update: {
			enabled: false,
			multiple: false,
			handler: { ...handler },
		},
		grid: {
			enabled: false,
			handler: { ...handler },
		},
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
