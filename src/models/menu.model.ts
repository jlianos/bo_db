import type { MenuItemKind } from "../generated/prisma/browser.js";

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
	items: MenuItemModel[];
};
