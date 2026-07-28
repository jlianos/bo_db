import { prisma } from "../prisma.js";
import type { SeedItemLookup } from "./menu-items-seed.js";

export async function seedAdminMenu(item: SeedItemLookup) {
	const menu = await prisma.menu.create({
		data: {
			code: "admin",
			mainText: "Administration",
			subText: "System Management",
		},
	});

	const reports = await prisma.menuItemPerMenu.create({
		data: {
			menuId: menu.id,
			menuItemId: item("reports").id,
			order: 100,
		},
	});

	const settings = await prisma.menuItemPerMenu.create({
		data: {
			menuId: menu.id,
			menuItemId: item("settings").id,
			order: 200,
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
				menuItemId: item("users").id,
				parentId: settings.id,
				order: 1,
			},
			{
				menuId: menu.id,
				menuItemId: item("roles").id,
				parentId: settings.id,
				order: 2,
			},
			{
				menuId: menu.id,
				menuItemId: item("audit").id,
				parentId: reports.id,
				order: 1,
			},
			{
				menuId: menu.id,
				menuItemId: item("analytics").id,
				parentId: reports.id,
				order: 2,
			},
		],
	});
}
