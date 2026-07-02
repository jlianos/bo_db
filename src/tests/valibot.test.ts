import * as v from "valibot";
import { MenuItemParamsSchema } from "../models/menu-item-params.valibot.models.js";

const test = { a: "a" };

console.dir(v.safeParse(MenuItemParamsSchema, test), { depth: null });
