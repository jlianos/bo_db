import { expectTypeOf } from "expect-type";
import type { MenuItemParams as TsParams } from "../models/menu-item-params.models.js";
import type { MenuItemParams as VbParams } from "../models/menu-item-params.valibot.models.js";

expectTypeOf<TsParams>().toEqualTypeOf<VbParams>();
