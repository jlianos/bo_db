import * as v from "valibot";

const CodeLanguageSchema = v.picklist(["javascript", "typescript", "sql", "plaintext", "json", "css"]);

const DataColumnTypeSchema = v.picklist(["boolean", "date", "datetime", "number", "text", "time"]);

const ColumnTypeSchema = v.union([DataColumnTypeSchema, v.literal("code")]);

const OperatorSchema = v.picklist([
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
]);

const HandlerKindSchema = v.picklist(["query", "function-query", "function-data"]);

const HandlerSchema = v.object({
	kind: v.optional(HandlerKindSchema, "query"),
	src: v.optional(v.string(), ""),
});

const DefaultHandler = () =>
	({
		kind: "query",
		src: "",
	}) as const;

const LookupConfigSchema = v.object({
	enabled: v.optional(v.boolean(), false),
	multiple: v.optional(v.boolean(), false),
	handler: v.optional(HandlerSchema, DefaultHandler),
});

const ColumnLookupParamsSchema = v.object({
	criteria: v.optional(LookupConfigSchema, { enabled: false, multiple: false, handler: DefaultHandler() }),
	insert: v.optional(LookupConfigSchema, { enabled: false, multiple: false, handler: DefaultHandler() }),
	update: v.optional(LookupConfigSchema, { enabled: false, multiple: false, handler: DefaultHandler() }),
	grid: v.optional(v.omit(LookupConfigSchema, ["multiple"]), { enabled: false, handler: DefaultHandler() }),
});

const ColumnParamsSchema = v.pipe(
	v.object({
		name: v.string(),
		label: v.optional(v.string()),
		type: v.optional(ColumnTypeSchema, "text"),
		language: v.optional(CodeLanguageSchema, "plaintext"),

		primaryKey: v.optional(v.boolean(), false),

		visible: v.optional(v.boolean(), true),
		sortable: v.optional(v.boolean(), true),
		filterable: v.optional(v.boolean(), true),

		retrieve: v.optional(
			v.object({
				enabled: v.optional(v.boolean(), true),
				criteria: v.optional(
					v.object({
						enabled: v.optional(v.boolean(), true),
						required: v.optional(v.boolean(), false),
						operators: v.optional(v.array(OperatorSchema), ["equals"]),
						defaultOperator: v.optional(OperatorSchema, "equals"),
					}),
					{
						enabled: true,
						required: false,
						operators: ["equals"],
						defaultOperator: "equals",
					},
				),
			}),
			{
				enabled: true,
				criteria: {
					enabled: true,
					required: false,
					operators: ["equals"],
					defaultOperator: "equals",
				},
			},
		),
		insert: v.optional(
			v.object({
				enabled: v.optional(v.boolean(), true),
				required: v.optional(v.boolean(), false),
			}),
			{ enabled: true, required: false },
		),

		update: v.optional(
			v.object({
				enabled: v.optional(v.boolean(), true),
				required: v.optional(v.boolean(), false),
			}),
			{ enabled: true, required: false },
		),

		lookup: v.optional(ColumnLookupParamsSchema, {
			criteria: {
				enabled: false,
				multiple: false,
				handler: DefaultHandler(),
			},
			insert: {
				enabled: false,
				multiple: false,
				handler: DefaultHandler(),
			},
			update: {
				enabled: false,
				multiple: false,
				handler: DefaultHandler(),
			},
			grid: {
				enabled: false,
				handler: DefaultHandler(),
			},
		}),
	}),
	v.transform((input) => ({ ...input, label: input.label ?? input.name })),
);

const RelationColumnMapSchema = v.object({
	parentColumn: v.string(),
	childColumn: v.string(),
});

const RelationParamsSchema = v.object({
	name: v.string(),
	columns: v.array(RelationColumnMapSchema),
});

const MenuItemParamsChildSchema = v.object({
	tableName: v.optional(v.string(), ""),

	columns: v.optional(v.array(ColumnParamsSchema), []),

	handlers: v.optional(
		v.object({
			select: v.optional(HandlerSchema, DefaultHandler()),
			insert: v.optional(HandlerSchema, DefaultHandler()),
			update: v.optional(HandlerSchema, DefaultHandler()),
			delete: v.optional(HandlerSchema, DefaultHandler()),
		}),
		{
			select: DefaultHandler(),
			insert: DefaultHandler(),
			update: DefaultHandler(),
			delete: DefaultHandler(),
		},
	),

	permissions: v.optional(
		v.object({
			insert: v.optional(v.boolean(), false),
			update: v.optional(v.boolean(), false),
			delete: v.optional(v.boolean(), false),
		}),
		{ insert: false, update: false, delete: false },
	),
});

const MenuItemParamsSchema = v.object({
	...MenuItemParamsChildSchema.entries,

	children: v.optional(
		v.array(
			v.object({
				relation: RelationParamsSchema,
				params: MenuItemParamsChildSchema,
			}),
		),
		[],
	),
});

type MenuItemParams = v.InferOutput<typeof MenuItemParamsSchema>;

export { type MenuItemParams, MenuItemParamsSchema };
