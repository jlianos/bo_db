import type { MenuItemKind } from "../generated/prisma/browser.js";
import type { MenuItemParams } from "./menu-item-params.models.js";

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
	kind: MenuItemKind;
	order: number;
	params: MenuItemParams | null;
	items: MenuItemModel[];
};
