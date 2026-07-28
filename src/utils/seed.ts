import { prisma } from "./prisma.js";
import { seedAdminMenu } from "./seeds/admin-seed.js";
import { seedManufacturingMenu } from "./seeds/manufacturing-seed.js";
import { createMenuItemData, seedMenuItems } from "./seeds/menu-items-seed.js";
import { seedOrganizationMenu } from "./seeds/organization-seed.js";
import { seedSalesMenu } from "./seeds/sales-seed.js";

async function main() {
	const itemData = createMenuItemData();

	await prisma.menuItemPerMenu.deleteMany();
	await prisma.menu.deleteMany();
	await prisma.menuItem.deleteMany();

	const item = await seedMenuItems(itemData);

	await seedAdminMenu(item);
	await seedSalesMenu(item);
	await seedManufacturingMenu(item);
	await seedOrganizationMenu(item);

	console.log("Seed completed");
}

await main();
