import { Router } from "express";
import { getMenuJson } from "../../utils/menu-json.js";
import { prisma } from "../../utils/prisma.js";

const menusRouter = Router();

menusRouter.get("/", async (_req, res) => {
	const menus = await prisma.menu.findMany({
		orderBy: { id: "desc" },
	});

	res.json(menus);
});

menusRouter.post("/", async (req, res) => {
	const { code, mainText, subText } = req.body;

	const menu = await prisma.menu.create({
		data: {
			code,
			mainText,
			subText,
		},
	});

	res.json(menu);
});

menusRouter.post("/:menuId/items", async (req, res) => {
	const menuId = Number(req.params.menuId);
	const { menuItemId, parentId, order } = req.body;

	const placement = await prisma.menuItemPerMenu.create({
		data: {
			menuId,
			menuItemId: Number(menuItemId),
			parentId: parentId ? Number(parentId) : null,
			order: Number(order ?? 0),
		},
	});

	res.json(placement);
});

menusRouter.get("/:menuId/placements", async (req, res) => {
	const menuId = Number(req.params.menuId);

	const placements = await prisma.menuItemPerMenu.findMany({
		where: { menuId },
		include: { menuItem: true },
		orderBy: { order: "asc" },
	});

	res.json(placements);
});

menusRouter.get("/:code/json", async (req, res) => {
	const json = await getMenuJson(req.params.code);
	res.json(json);
});

export { menusRouter };
