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
export declare function getMenuJson(code: string): Promise<MenuDataModel | null>;
//# sourceMappingURL=test.d.ts.map