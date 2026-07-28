import { MenuItemKind } from "../../generated/prisma/browser.js";
import { prisma } from "../prisma.js";
import { createOrganizationItemData } from "./organization-seed.js";
import { createItemData, type SeedMenuItemData } from "./seed-helpers.js";

type SeedMenuItem = Awaited<ReturnType<typeof prisma.menuItem.create>>;

export type SeedItemLookup = (code: string) => SeedMenuItem;

export function createMenuItemData(): SeedMenuItemData[] {
	return [
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
		...createOrganizationItemData(),
	];
}

export async function seedMenuItems(itemData: SeedMenuItemData[]): Promise<SeedItemLookup> {
	const items = await Promise.all(itemData.map((data) => prisma.menuItem.create({ data })));
	const byCode = new Map(items.map((item) => [item.code, item]));

	return (code: string) => {
		const value = byCode.get(code);

		if (!value) {
			throw new Error(`MenuItem '${code}' not found`);
		}

		return value;
	};
}
