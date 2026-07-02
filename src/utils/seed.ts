import { MenuItemKind } from "../generated/prisma/browser.js";
import { prisma } from "./prisma.js";

async function main() {
	await prisma.menuItemPerMenu.deleteMany();
	await prisma.menu.deleteMany();
	await prisma.menuItem.deleteMany();

	const items = await Promise.all([
		createItem("dashboard", "Dashboard", "home", "#3b82f6"),
		createItem("customers", "Customers", "users", "#10b981"),
		createItem("suppliers", "Suppliers", "truck", "#8b5cf6"),
		createItem("products", "Products", "box", "#f59e0b"),
		createItem("sales", "Sales", "chart-line", "#ef4444"),
		createItem("purchases", "Purchases", "shopping-cart", "#06b6d4"),
		createItem("inventory", "Inventory", "warehouse", "#6366f1"),
		createItem("reports", "Reports", "chart-bar", "#84cc16", MenuItemKind.FOLDER),
		createItem("settings", "Settings", "cog", "#6b7280", MenuItemKind.FOLDER),
		createItem("users", "Users", "user", "#ec4899"),
		createItem("roles", "Roles", "shield", "#14b8a6"),
		createItem("audit", "Audit Log", "history", "#f97316"),
		createItem("production", "Production", "industry", "#22c55e"),
		createItem("workorders", "Work Orders", "tasks", "#a855f7"),
		createItem("analytics", "Analytics", "chart-pie", "#0ea5e9"),
	]);

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

function createItem(
	code: string,
	text: string,
	icon: string,
	iconColor: string,
	kind: MenuItemKind = MenuItemKind.ITEM,
) {
	return prisma.menuItem.create({
		data: {
			code,
			text,
			icon,
			iconColor,
			kind,
		},
	});
}

await main();
