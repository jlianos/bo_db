import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { getMenuJson } from "./menu-json.js";
import { prisma } from "./prisma.js";

const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "ui")));

app.get("/api/menus", async (_req, res) => {
	const menus = await prisma.menu.findMany({
		orderBy: { id: "desc" },
	});

	res.json(menus);
});

app.post("/api/menus", async (req, res) => {
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

app.get("/api/menu-items", async (_req, res) => {
	const items = await prisma.menuItem.findMany({
		orderBy: { id: "desc" },
	});

	res.json(items);
});

app.post("/api/menu-items", async (req, res) => {
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

app.patch("/api/menu-items/:itemId", async (req, res) => {
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

app.post("/api/menus/:menuId/items", async (req, res) => {
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

app.get("/api/menus/:menuId/placements", async (req, res) => {
	const menuId = Number(req.params.menuId);

	const placements = await prisma.menuItemPerMenu.findMany({
		where: { menuId },
		include: { menuItem: true },
		orderBy: { order: "asc" },
	});

	res.json(placements);
});

app.patch("/api/placements/:placementId", async (req, res) => {
	const id = Number(req.params.placementId);
	const { parentId, order } = req.body;

	const placement = await prisma.menuItemPerMenu.update({
		where: { id },
		data: {
			parentId: parentId ? Number(parentId) : null,
			order: Number(order ?? 0),
		},
	});

	res.json(placement);
});

app.delete("/api/placements/:placementId", async (req, res) => {
	const id = Number(req.params.placementId);

	await prisma.menuItemPerMenu.delete({
		where: { id },
	});

	res.json({ ok: true });
});

app.get("/api/menus/:code/json", async (req, res) => {
	const json = await getMenuJson(req.params.code);
	res.json(json);
});

app.listen(3000, () => {
	console.log("Server running on http://localhost:3000");
});
