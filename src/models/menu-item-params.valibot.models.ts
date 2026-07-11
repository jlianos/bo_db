import * as v from "valibot";

const ColumnTypeSchema = v.picklist(["boolean", "date", "datetime", "number", "text", "time", "code"]);

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
	"javascript",
	"typescript",
	"sql",
	"plaintext",
	"json",
	"css",
]);

const HandlerKindSchema = v.picklist(["query", "function-query", "function-data"]);

const HandlerSchema = v.object({
	kind: v.optional(HandlerKindSchema, "query"),
	src: v.optional(v.string(), ""),
});

const ColumnParamsSchema = v.pipe(
	v.object({
		name: v.string(),
		label: v.optional(v.string()),
		type: v.optional(ColumnTypeSchema, "text"),

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

		lookup: v.optional(
			v.object({
				enabled: v.optional(v.boolean(), false),
				multiple: v.optional(v.boolean(), false),
				handler: v.optional(HandlerSchema, { kind: "query", src: "" }),
			}),
			{ enabled: false, multiple: false, handler: { kind: "query", src: "" } },
		),
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
			select: v.optional(HandlerSchema, { kind: "query", src: "" }),
			insert: v.optional(HandlerSchema, { kind: "query", src: "" }),
			update: v.optional(HandlerSchema, { kind: "query", src: "" }),
			delete: v.optional(HandlerSchema, { kind: "query", src: "" }),
		}),
		{
			select: { kind: "query", src: "" },
			insert: { kind: "query", src: "" },
			update: { kind: "query", src: "" },
			delete: { kind: "query", src: "" },
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
	tableName: v.optional(v.string(), ""),

	columns: v.optional(v.array(ColumnParamsSchema), []),

	handlers: v.optional(
		v.object({
			select: v.optional(HandlerSchema, { kind: "query", src: "" }),
			insert: v.optional(HandlerSchema, { kind: "query", src: "" }),
			update: v.optional(HandlerSchema, { kind: "query", src: "" }),
			delete: v.optional(HandlerSchema, { kind: "query", src: "" }),
		}),
		{
			select: { kind: "query", src: "" },
			insert: { kind: "query", src: "" },
			update: { kind: "query", src: "" },
			delete: { kind: "query", src: "" },
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
