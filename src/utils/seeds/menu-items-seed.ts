import { prisma } from "../prisma.js";
import { createOrganizationItemData } from "./organization-seed.js";
import type { SeedMenuItemData } from "./seed-helpers.js";

type SeedMenuItem = Awaited<ReturnType<typeof prisma.menuItem.create>>;

export type SeedItemLookup = (code: string) => SeedMenuItem;

export function createMenuItemData(): SeedMenuItemData[] {
	return createOrganizationItemData();
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
