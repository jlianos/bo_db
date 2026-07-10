# AGENTS.md

## Project Snapshot

`bo_db` is a small TypeScript/Express menu-builder service backed by Prisma and SQLite. It serves a static browser UI from `src/ui` and exposes JSON APIs for creating reusable menu items, arranging them into menus, and exporting nested menu JSON.

The application is ESM-only (`"type": "module"`) and uses Prisma's generated client from `src/generated/prisma`, not the default `node_modules/.prisma/client` output.

TypeScript is strict and uses `moduleResolution: "bundler"`, `verbatimModuleSyntax`, and ESM output. The server listens on the hard-coded port `3000`; there is currently no app factory, configurable port, authentication, or custom error middleware.

## Main Landmarks

- `src/server/server.ts` starts Express on port `3000`, serves the sibling `ui` directory (`src/ui` in dev, `dist/ui` after build), and mounts API routers.
- `src/server/routes/menus.router.ts` handles menus, menu placements, and `/:code/json` export.
- `src/server/routes/menu-items.router.ts` handles reusable item definitions and validates `params` with Valibot.
- `src/server/routes/placements.router.ts` moves/reorders/deletes placed menu items.
- `src/utils/prisma.ts` creates the Prisma client with `@prisma/adapter-better-sqlite3`.
- `src/utils/menu-json.ts` converts flat menu placements into the nested menu JSON consumed by clients.
- `src/utils/seed.ts` resets demo data and creates admin, sales, and manufacturing menus.
- `src/models/*` contains TypeScript and Valibot models for menu JSON and menu item params.
- `src/ui/*` is a plain HTML/CSS/JS admin UI for dragging items into menu trees and editing params JSON.
- `prisma/schema.prisma` defines the database schema and Prisma generator output.
- The local `.env` currently points at `db/bo.db`, which is gitignored. `db/bo.dummy.db` is a separate checked-in database file, not the default runtime database.

## Commands

Install dependencies:

```sh
npm install
```

Run in development:

```sh
npm run dev
```

Build:

```sh
npm run build
```

Run built output:

```sh
npm start
```

Generate the Prisma client after setup or schema changes:

```sh
npx prisma generate
```

Seed existing database data:

```sh
npm run seed
```

Reset migrations, regenerate Prisma client, seed, and build:

```sh
npm run reset
```

Be careful with `npm run reset`: it removes `prisma/migrations`, resets the SQLite database, creates a fresh `init` migration, runs `prisma generate`, seeds data, and builds.

There is no `test`, `lint`, or `format` npm script. `npm run build` compiles `src/tests/type-test.ts`, so the exact equality between the handwritten params type and Valibot's inferred output is checked by TypeScript. `src/tests/valibot.test.ts` is only an ad hoc executable probe, not an assertion suite; run it explicitly with `npx tsx src/tests/valibot.test.ts` when relevant.

## Database And Prisma Notes

- `prisma.config.ts` reads `DATABASE_URL` from `.env`.
- The Prisma schema uses SQLite and a custom client generator:

```prisma
generator client {
  provider            = "prisma-client"
  output              = "../src/generated/prisma"
  importFileExtension = "js"
}
```

- Runtime imports should use generated files under `src/generated/prisma`, as existing code does:
  - `../generated/prisma/client.js`
  - `../generated/prisma/browser.js`
- Do not hand-edit generated Prisma files. Update `prisma/schema.prisma` and run Prisma generation instead.
- The `MenuItem.params` JSON column is typed through `prisma-json-types-generator` using `src/models/prisma-json.models.ts`.
- `MenuItemPerMenu` is the placement/join table. It stores menu membership, nesting via `parentId`, and display order.
- `@@unique([menuId, menuItemId])` means the same reusable menu item can only be placed once per menu.
- Deleting a `MenuItem` cascades to its placements, and deleting a parent placement cascades through its descendants.
- Sibling `order` is a convention rather than a unique database constraint. The UI renumbers reordered siblings to `1..n` and appends drops at `max(order) + 1`.

### Placement integrity

The UI only offers folder drop zones and prevents self/descendant moves. The API does **not** currently enforce all corresponding invariants: it does not verify that parent and child belong to the same menu, that the parent is a folder, that a move is acyclic, or that route IDs and bodies are valid. Preserve current behavior unless hardening is in scope; when adding mutation paths, consider enforcing these rules server-side.

## API Surface

The app currently exposes:

- `GET /api/menus` - list menus.
- `POST /api/menus` - create a menu with `code`, `mainText`, and `subText`.
- `POST /api/menus/:menuId/items` - place an item into a menu.
- `GET /api/menus/:menuId/placements` - list flat placements for a menu, including item definitions.
- `GET /api/menus/:code/json` - export nested menu JSON by menu code.
- `GET /api/menu-items` - list reusable menu item definitions.
- `POST /api/menu-items` - create a reusable item definition.
- `PATCH /api/menu-items/:itemId` - update a reusable item definition.
- `PATCH /api/placements/:placementId` - move/reorder a placement.
- `DELETE /api/placements/:placementId` - delete a placement.

Successful creates currently return HTTP 200 rather than 201. Routers generally rely on Prisma/Express error propagation. `GET /api/menus/:code/json` returns JSON `null` for an unknown code.

## Export Semantics

`getMenuJson(code)` fetches flat placements ordered by `order`, creates one output node for each placement, then attaches nodes using placement IDs. The exported item's `id` is the reusable item's string `code`, not a database ID. Missing menu headings become empty strings.

An orphaned placement whose non-null parent is not in the fetched menu disappears from the exported roots. Equal-order siblings have no explicit database tie-breaker. Changes to placement rules should therefore be reviewed together with `src/utils/menu-json.ts`.

## UI And Params Coupling

`src/ui/app.js` manages definition create/edit, drag/drop placement, nesting, reordering, and deletion. The UI does not create or edit menus. `src/ui/params-editor.js` has its own browser-side defaults and normalizer for the params contract.

When changing the params shape, update all three relevant representations:

- `src/models/menu-item-params.models.ts` - handwritten TypeScript contract.
- `src/models/menu-item-params.valibot.models.ts` - runtime schema, defaults, and inferred type.
- `src/ui/params-editor.js` - browser editor and normalization behavior.

The item routes validate non-null params with Valibot and store JSON `null` as `Prisma.DbNull`. Validation errors return HTTP 400 with `message` and `issues`. Despite its HTTP verb, the item `PATCH` route writes every listed editable field; do not assume generic partial-update semantics.

## Destructive Operations

`npm run seed` is destructive, not additive: it deletes all placements, menus, and reusable definitions before recreating the `admin`, `sales`, and `manufacturing` demos. Ask before running it if preservation of local data is uncertain.

`npm run reset` is more destructive: it also replaces migration history and resets the database. Never run it without explicit user approval.

## Development Guidance For Agents

- Preserve the ESM import style, including `.js` extensions in TypeScript source imports.
- Prefer editing source files under `src`, `prisma/schema.prisma`, and `src/ui`; avoid changing `dist` manually because it is build output.
- Check `git status --short` before broad edits. This repo may already have migration changes in progress.
- Treat `prisma/migrations` carefully. Do not delete or regenerate migrations unless explicitly asked.
- Keep API responses JSON-first and consistent with existing route style.
- Validate `MenuItem.params` through `MenuItemParamsSchema` whenever accepting params from requests.
- When changing the params shape, update both:
  - `src/models/menu-item-params.models.ts`
  - `src/models/menu-item-params.valibot.models.ts`
- Keep `src/tests/type-test.ts` passing conceptually by ensuring the TypeScript params type matches the Valibot output type.
- The static UI uses plain browser APIs. Do not introduce a frontend framework unless the user asks for one.
- The project uses Biome with tabs and double quotes. Match the existing formatting.
- Ask before large architectural, dependency, schema, migration-history, or destructive-data changes.
- When changing placement logic, consider cross-menu parents, cycles, folder-only parenting, sibling order, cascading deletes, and nested export together.

## Verification Checklist

For most changes:

```sh
npm run build
```

For Prisma/schema changes:

```sh
npx prisma generate
npm run build
```

For seed-data changes, only after confirming the local database may be overwritten:

```sh
npm run seed
npm run dev
```

Then open `http://localhost:3000` and check that menus load, item editing works, and `GET /api/menus/admin/json` returns nested JSON.

