import { prisma } from "../prisma.js";
import type { SeedItemLookup } from "./menu-items-seed.js";

export async function seedSalesMenu(item: SeedItemLookup) {
	const menu = await prisma.menu.create({
		data: {
			code: "sales",
			mainText: "Sales",
			subText: "Commercial Operations",
		},
	});

	const reports = await prisma.menuItemPerMenu.create({
		data: {
			menuId: menu.id,
			menuItemId: item("reports").id,
			order: 100,
		},
	});

	await prisma.menuItemPerMenu.createMany({
		data: [
			{
				menuId: menu.id,
				menuItemId: item("dashboard").id,
				order: 1,
			},
			{
				menuId: menu.id,
				menuItemId: item("customers").id,
				order: 2,
			},
			{
				menuId: menu.id,
				menuItemId: item("products").id,
				order: 3,
			},
			{
				menuId: menu.id,
				menuItemId: item("sales").id,
				order: 4,
			},
			{
				menuId: menu.id,
				menuItemId: item("analytics").id,
				parentId: reports.id,
				order: 1,
			},
		],
	});
}
