import { prisma } from "../prisma.js";
import type { SeedItemLookup } from "./menu-items-seed.js";

export async function seedManufacturingMenu(item: SeedItemLookup) {
	const menu = await prisma.menu.create({
		data: {
			code: "manufacturing",
			mainText: "Manufacturing",
			subText: "Production Operations",
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
				menuItemId: item("production").id,
				order: 2,
			},
			{
				menuId: menu.id,
				menuItemId: item("workorders").id,
				order: 3,
			},
			{
				menuId: menu.id,
				menuItemId: item("inventory").id,
				order: 4,
			},
			{
				menuId: menu.id,
				menuItemId: item("suppliers").id,
				order: 5,
			},
			{
				menuId: menu.id,
				menuItemId: item("analytics").id,
				parentId: reports.id,
				order: 1,
			},
			{
				menuId: menu.id,
				menuItemId: item("purchases").id,
				parentId: reports.id,
				order: 2,
			},
		],
	});
}
