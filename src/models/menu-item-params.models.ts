type ColumnType = "boolean" | "date" | "datetime" | "number" | "text" | "time" | "code";

type Operator =
	| "equals"
	| "notEquals"
	| "contains"
	| "notContains"
	| "startsWith"
	| "endsWith"
	| "greaterThan"
	| "lessThan"
	| "greaterThanOrEqual"
	| "lessThanOrEqual"
	| "between"
	| "notBetween"
	| "in"
	| "notIn"
	| "javascript"
	| "typescript"
	| "sql"
	| "plaintext"
	| "json"
	| "css";

type ColumnParams = {
	name: string;
	label: string;
	type: ColumnType;

	primaryKey: boolean;

	visible: boolean;
	sortable: boolean;
	filterable: boolean;

	retrieve: {
		enabled: boolean;
		criteria: {
			enabled: boolean;
			required: boolean;
			operators: Operator[];
			defaultOperator: Operator;
		};
	};

	insert: {
		enabled: boolean;
		required: boolean;
	};

	update: {
		enabled: boolean;
		required: boolean;
	};

	lookup: {
		enabled: boolean;
		handler: string;
	};
};

type RelationColumnMap = {
	parentColumn: string;
	childColumn: string;
};

type RelationParams = {
	name: string;
	columns: RelationColumnMap[];
};

type MenuItemParamsChild = {
	relation: RelationParams;
	params: MenuItemParams;
};

export type MenuItemParams = {
	tableName: string;

	columns: ColumnParams[];

	handlers: {
		select: string;
		insert: string;
		update: string;
		delete: string;
	};

	permissions: {
		insert: boolean;
		update: boolean;
		delete: boolean;
	};

	children: MenuItemParamsChild[];
};
