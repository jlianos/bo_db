# AGENTS.md

## Project Snapshot

`bo_db` is a small TypeScript/Express menu-builder service backed by Prisma and SQLite. It serves a static browser UI from `src/ui` and exposes JSON APIs for creating reusable menu items, arranging them into menus, and exporting nested menu JSON.

The application is ESM-only (`"type": "module"`) and uses Prisma's generated client from `src/generated/prisma`, not the default `node_modules/.prisma/client` output.

## Main Landmarks

- `src/server/server.ts` starts the Express app on port `3000`, serves `dist/ui`, and mounts API routers.
- `src/server/routes/menus.router.ts` handles menus, menu placements, and `/:code/json` export.
- `src/server/routes/menu-items.router.ts` handles reusable item definitions and validates `params` with Valibot.
- `src/server/routes/placements.router.ts` moves/reorders/deletes placed menu items.
- `src/utils/prisma.ts` creates the Prisma client with `@prisma/adapter-better-sqlite3`.
- `src/utils/menu-json.ts` converts flat menu placements into the nested menu JSON consumed by clients.
- `src/utils/seed.ts` resets demo data and creates admin, sales, and manufacturing menus.
- `src/models/*` contains TypeScript and Valibot models for menu JSON and menu item params.
- `src/ui/*` is a plain HTML/CSS/JS admin UI for dragging items into menu trees and editing params JSON.
- `prisma/schema.prisma` defines the database schema and Prisma generator output.
- `db/bo.dummy.db` is the local SQLite database used by the default `.env`.

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

Seed existing database data:

```sh
npm run seed
```

Reset migrations, regenerate Prisma client, seed, and build:

```sh
npm run reset
```

Be careful with `npm run reset`: it removes `prisma/migrations`, resets the SQLite database, creates a fresh `init` migration, runs `prisma generate`, seeds data, and builds.

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

## Verification Checklist

For most changes:

```sh
npm run build
```

For Prisma/schema changes:

```sh
prisma generate
npm run build
```

For seed-data changes:

```sh
npm run seed
npm run dev
```

Then open `http://localhost:3000` and check that menus load, item editing works, and `GET /api/menus/admin/json` returns nested JSON.

