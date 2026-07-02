import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { menuItemsRouter } from "./routes/menu-items.router.js";
import { menusRouter } from "./routes/menus.router.js";
import { placementsRouter } from "./routes/placements.router.js";

const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "..", "ui")));

app.use("/api/menus", menusRouter);
app.use("/api/menu-items", menuItemsRouter);
app.use("/api/placements", placementsRouter);

app.listen(3000, () => {
	console.log("Server running on http://localhost:3000");
});
