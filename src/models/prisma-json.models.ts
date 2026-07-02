import type { MenuItemParams  } from "./menu-item-params.models";

declare global {
	namespace PrismaJson {
		type MenuItemParamsModel = MenuItemParams;
	}
}
