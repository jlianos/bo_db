import * as v from "valibot";
import { MenuItemKind } from "../generated/prisma/browser.js";
import { type MenuItemParams, MenuItemParamsSchema } from "../models/menu-item-params.valibot.models.js";
import { prisma } from "./prisma.js";

async function main() {
	const itemData = [
		createItemData("dashboard", "Dashboard", "home", "#3b82f6"),
		createItemData("customers", "Customers", "users", "#10b981"),
		createItemData("suppliers", "Suppliers", "truck", "#8b5cf6"),
		createItemData("products", "Products", "box", "#f59e0b"),
		createItemData("sales", "Sales", "chart-line", "#ef4444"),
		createItemData("purchases", "Purchases", "shopping-cart", "#06b6d4"),
		createItemData("inventory", "Inventory", "warehouse", "#6366f1"),
		createItemData("reports", "Reports", "chart-bar", "#84cc16", MenuItemKind.FOLDER),
		createItemData("settings", "Settings", "cog", "#6b7280", MenuItemKind.FOLDER),
		createItemData("users", "Users", "user", "#ec4899"),
		createItemData("roles", "Roles", "shield", "#14b8a6"),
		createItemData("audit", "Audit Log", "history", "#f97316"),
		createItemData("production", "Production", "industry", "#22c55e"),
		createItemData("workorders", "Work Orders", "tasks", "#a855f7"),
		createItemData("analytics", "Analytics", "chart-pie", "#0ea5e9"),
	];

	await prisma.menuItemPerMenu.deleteMany();
	await prisma.menu.deleteMany();
	await prisma.menuItem.deleteMany();

	const items = await Promise.all(itemData.map((data) => prisma.menuItem.create({ data })));

	const byCode = new Map(items.map((item) => [item.code, item]));

	const item = (code: string) => {
		const value = byCode.get(code);

		if (!value) {
			throw new Error(`MenuItem '${code}' not found`);
		}

		return value;
	};

	const adminMenu = await prisma.menu.create({
		data: {
			code: "admin",
			mainText: "Administration",
			subText: "System Management",
		},
	});

	const salesMenu = await prisma.menu.create({
		data: {
			code: "sales",
			mainText: "Sales",
			subText: "Commercial Operations",
		},
	});

	const manufacturingMenu = await prisma.menu.create({
		data: {
			code: "manufacturing",
			mainText: "Manufacturing",
			subText: "Production Operations",
		},
	});

	//
	// ADMIN
	//

	const adminReports = await prisma.menuItemPerMenu.create({
		data: {
			menuId: adminMenu.id,
			menuItemId: item("reports").id,
			order: 100,
		},
	});

	const adminSettings = await prisma.menuItemPerMenu.create({
		data: {
			menuId: adminMenu.id,
			menuItemId: item("settings").id,
			order: 200,
		},
	});

	await prisma.menuItemPerMenu.createMany({
		data: [
			{
				menuId: adminMenu.id,
				menuItemId: item("dashboard").id,
				order: 1,
			},
			{
				menuId: adminMenu.id,
				menuItemId: item("users").id,
				parentId: adminSettings.id,
				order: 1,
			},
			{
				menuId: adminMenu.id,
				menuItemId: item("roles").id,
				parentId: adminSettings.id,
				order: 2,
			},
			{
				menuId: adminMenu.id,
				menuItemId: item("audit").id,
				parentId: adminReports.id,
				order: 1,
			},
			{
				menuId: adminMenu.id,
				menuItemId: item("analytics").id,
				parentId: adminReports.id,
				order: 2,
			},
		],
	});

	//
	// SALES
	//

	const salesReports = await prisma.menuItemPerMenu.create({
		data: {
			menuId: salesMenu.id,
			menuItemId: item("reports").id,
			order: 100,
		},
	});

	await prisma.menuItemPerMenu.createMany({
		data: [
			{
				menuId: salesMenu.id,
				menuItemId: item("dashboard").id,
				order: 1,
			},
			{
				menuId: salesMenu.id,
				menuItemId: item("customers").id,
				order: 2,
			},
			{
				menuId: salesMenu.id,
				menuItemId: item("products").id,
				order: 3,
			},
			{
				menuId: salesMenu.id,
				menuItemId: item("sales").id,
				order: 4,
			},
			{
				menuId: salesMenu.id,
				menuItemId: item("analytics").id,
				parentId: salesReports.id,
				order: 1,
			},
		],
	});

	//
	// MANUFACTURING
	//

	const manufacturingReports = await prisma.menuItemPerMenu.create({
		data: {
			menuId: manufacturingMenu.id,
			menuItemId: item("reports").id,
			order: 100,
		},
	});

	await prisma.menuItemPerMenu.createMany({
		data: [
			{
				menuId: manufacturingMenu.id,
				menuItemId: item("dashboard").id,
				order: 1,
			},
			{
				menuId: manufacturingMenu.id,
				menuItemId: item("production").id,
				order: 2,
			},
			{
				menuId: manufacturingMenu.id,
				menuItemId: item("workorders").id,
				order: 3,
			},
			{
				menuId: manufacturingMenu.id,
				menuItemId: item("inventory").id,
				order: 4,
			},
			{
				menuId: manufacturingMenu.id,
				menuItemId: item("suppliers").id,
				order: 5,
			},
			{
				menuId: manufacturingMenu.id,
				menuItemId: item("analytics").id,
				parentId: manufacturingReports.id,
				order: 1,
			},
			{
				menuId: manufacturingMenu.id,
				menuItemId: item("purchases").id,
				parentId: manufacturingReports.id,
				order: 2,
			},
		],
	});

	console.log("Seed completed");
}

function createItemData(
	code: string,
	text: string,
	icon: string,
	iconColor: string,
	kind: MenuItemKind = MenuItemKind.ITEM,
) {
	return {
		code,
		text,
		icon,
		iconColor,
		kind,
		params: kind === MenuItemKind.ITEM ? createItemParams(code, text) : undefined,
	};
}

function createItemParams(code: string, text: string): MenuItemParams {
	const tableName = code.replaceAll("-", "_");
	const childTableName = `${tableName}_notes`;

	return v.parse(MenuItemParamsSchema, {
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

await main();
