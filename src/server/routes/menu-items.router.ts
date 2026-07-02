import { Router } from "express";
import * as v from "valibot";
import { Prisma } from "../../generated/prisma/client.js";
import { MenuItemParamsSchema } from "../../models/menu-item-params.valibot.models.js";
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
	const parsedParams = parseMenuItemParams(params);

	if (!parsedParams.success) {
		res.status(400).json(parsedParams.error);
		return;
	}

	const item = await prisma.menuItem.create({
		data: {
			code,
			text,
			icon,
			iconColor,
			kind,
			params: parsedParams.value,
		},
	});

	res.json(item);
});

menuItemsRouter.patch("/:itemId", async (req, res) => {
	const id = Number(req.params.itemId);
	const { code, text, icon, iconColor, kind, params } = req.body;
	const parsedParams = parseMenuItemParams(params);

	if (!parsedParams.success) {
		res.status(400).json(parsedParams.error);
		return;
	}

	const item = await prisma.menuItem.update({
		where: { id },
		data: {
			code,
			text,
			icon,
			iconColor,
			kind,
			params: parsedParams.value,
		},
	});

	res.json(item);
});

function parseMenuItemParams(params: unknown) {
	if (params === null) {
		return { success: true as const, value: Prisma.DbNull };
	}

	const result = v.safeParse(MenuItemParamsSchema, params);

	if (result.success) {
		return { success: true as const, value: result.output };
	}

	return {
		success: false as const,
		error: {
			message: "Invalid menu item params.",
			issues: result.issues.map((issue) => issue.message),
		},
	};
}

export { menuItemsRouter };
