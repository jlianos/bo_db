# bo_db

A TypeScript/Express menu-builder backed by Prisma and SQLite.

The app lets you manage reusable menu item definitions, place them into different menus, nest items under folders, reorder placements, and export the final nested menu JSON. It also includes a lightweight static browser UI for editing menu structure.

## Stack

- Node.js with TypeScript and native ESM
- Express 5
- Prisma 7
- SQLite via `@prisma/adapter-better-sqlite3`
- Valibot for runtime validation of menu item params
- Plain HTML/CSS/JavaScript UI
- Biome for formatting and linting configuration

## Project Structure

```text
.
├── db/                         # Local SQLite database
├── prisma/
│   ├── schema.prisma           # Prisma schema
│   └── migrations/             # Database migrations
├── src/
│   ├── generated/prisma/       # Generated Prisma client
│   ├── models/                 # TypeScript and Valibot models
│   ├── server/                 # Express app and routers
│   ├── tests/                  # Small type/validation checks
│   ├── ui/                     # Static browser UI
│   └── utils/                  # Prisma client, seed, menu JSON builder
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

## Setup

Install dependencies:

```sh
npm install
```

Create a `.env` file with a SQLite database URL:

```env
DATABASE_URL="file:./db/bo.dummy.db"
```

Generate the Prisma client if needed:

```sh
npx prisma generate
```

Seed demo data:

```sh
npm run seed
```

## Development

Start the development server:

```sh
npm run dev
```

Open:

```text
http://localhost:3000
```

The server serves the static UI and API from the same origin.

## Build And Run

Build TypeScript and copy static UI assets:

```sh
npm run build
```

Run the built app:

```sh
npm start
```

## Reset Local Database

The reset script recreates migrations and demo data:

```sh
npm run reset
```

Use this only when you intentionally want to reset the migration history and local SQLite data.

## Data Model

The core tables are:

- `Menu` - a named menu, such as `admin`, `sales`, or `manufacturing`.
- `MenuItem` - a reusable item definition with code, text, icon, color, kind, and optional params JSON.
- `MenuItemPerMenu` - a placement of a reusable item inside a menu. This stores nesting and order.

`MenuItem.kind` can be:

- `ITEM`
- `FOLDER`

Folders can contain nested placements. The exported menu JSON is built from the flat placement rows.

## API

Menus:

- `GET /api/menus`
- `POST /api/menus`
- `POST /api/menus/:menuId/items`
- `GET /api/menus/:menuId/placements`
- `GET /api/menus/:code/json`

Menu items:

- `GET /api/menu-items`
- `POST /api/menu-items`
- `PATCH /api/menu-items/:itemId`

Placements:

- `PATCH /api/placements/:placementId`
- `DELETE /api/placements/:placementId`

Example JSON export:

```sh
curl http://localhost:3000/api/menus/admin/json
```

## Menu Item Params

`MenuItem.params` is optional JSON for table-driven behavior. It is validated by `MenuItemParamsSchema` in `src/models/menu-item-params.valibot.models.ts` and typed by `src/models/menu-item-params.models.ts`.

Params can describe:

- table name
- columns
- handlers for select, insert, update, and delete
- permissions
- child relations

When changing this shape, update both the TypeScript type and the Valibot schema.

## Notes

- Source imports use `.js` extensions because the project compiles to native ESM.
- The Prisma client is generated into `src/generated/prisma`.
- `dist` is build output.
- The UI in `src/ui` is intentionally framework-free.

