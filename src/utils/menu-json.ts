import type { MenuDataModel, MenuItemModel } from "../models/menu.model.js";
import { prisma } from "./prisma.js";

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
			kind: placement.menuItem.kind,
			order: placement.order,
			params: placement.menuItem.params,
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
