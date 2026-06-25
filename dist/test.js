import { prisma } from "./prisma.js";
export async function getMenuJson(code) {
    const menu = await prisma.menu.findUnique({
        where: { code },
        include: {
            items: {
                include: {
                    menuItem: true,
                },
            },
        },
    });
    if (!menu) {
        return null;
    }
    const nodesByPlacementId = new Map();
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
    const roots = [];
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
const menuJson = await getMenuJson("admin");
console.dir(menuJson, { depth: null });
//# sourceMappingURL=test.js.map