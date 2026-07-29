import { prisma } from "./prisma.js";
import { createMenuItemData, seedMenuItems } from "./seeds/menu-items-seed.js";
import { seedOrganizationMenu } from "./seeds/organization-seed.js";

async function main() {
	const itemData = createMenuItemData();

	await prisma.menuItemPerMenu.deleteMany();
	await prisma.menu.deleteMany();
	await prisma.menuItem.deleteMany();

	const item = await seedMenuItems(itemData);

	await seedOrganizationMenu(item);

	console.log("Seed completed");
}

await main();
