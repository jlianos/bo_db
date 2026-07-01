import { prisma } from "./prisma.js";

export type MenuDataModel = {
	mainHeaderText: string;
	subHeaderText: string;
	menuItems: MenuItemModel[];
};

export type MenuItemModel = {
	id: string;
	text: string;
	icon: string;
	iconColor: string;
	isFolder: boolean;
	order: number;
	items: MenuItemModel[];
};

export async function getMenuJson(code: string): Promise<MenuDataModel | null> {
	const menu = await prisma.menu.findUnique({
		where: { code },
		include: {
			items: {
				orderBy: { order: "asc" },
				include: {
					menuItem: true,
				},
			},
		},
	});

	if (!menu) {
		return null;
	}

	const nodesByPlacementId = new Map<number, MenuItemModel>();

	for (const placement of menu.items) {
		nodesByPlacementId.set(placement.id, {
			id: placement.menuItem.code,
			text: placement.menuItem.text,
			icon: placement.menuItem.icon,
			iconColor: placement.menuItem.iconColor,
			isFolder: placement.menuItem.isFolder,
			order: placement.order,
			items: [],
		});
	}

	const roots: MenuItemModel[] = [];

	for (const placement of menu.items) {
		const node = nodesByPlacementId.get(placement.id);

		if (!node) {
			continue;
		}

		if (placement.parentId === null) {
			roots.push(node);
			continue;
		}

		const parent = nodesByPlacementId.get(placement.parentId);

		if (parent) {
			parent.items.push(node);
		}
	}

	return {
		mainHeaderText: menu.mainText ?? "",
		subHeaderText: menu.subText ?? "",
		menuItems: roots,
	};
}

// const menuJson = await getMenuJson("admin");

// console.dir(menuJson, { depth: null });
