import { Router } from "express";
import { prisma } from "../../utils/prisma.js";

const menuItemsRouter = Router();

menuItemsRouter.get("/", async (_req, res) => {
	const items = await prisma.menuItem.findMany({
		orderBy: { id: "desc" },
	});

	res.json(items);
});

menuItemsRouter.post("/", async (req, res) => {
	const { code, text, icon, iconColor, kind, params } = req.body;

	const item = await prisma.menuItem.create({
		data: {
			code,
			text,
			icon,
			iconColor,
			kind,
			params: params ?? null,
		},
	});

	res.json(item);
});

menuItemsRouter.patch("/:itemId", async (req, res) => {
	const id = Number(req.params.itemId);
	const { code, text, icon, iconColor, kind, params } = req.body;

	const item = await prisma.menuItem.update({
		where: { id },
		data: {
			code,
			text,
			icon,
			iconColor,
			kind,
			params: params ?? null,
		},
	});

	res.json(item);
});

export { menuItemsRouter };
