import { Router } from "express";
import { prisma } from "../../utils/prisma.js";

const placementsRouter = Router();

placementsRouter.patch("/:placementId", async (req, res) => {
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

placementsRouter.delete("/:placementId", async (req, res) => {
	const id = Number(req.params.placementId);

	await prisma.menuItemPerMenu.delete({
		where: { id },
	});

	res.json({ ok: true });
});

export { placementsRouter };
