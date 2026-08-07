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
│   └── utils/                  # Prisma client, transformers, menu JSON, and seeds
│       └── seeds/              # Menu-specific seed definitions and shared helpers
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

The server serves the static UI and API from the same origin. CORS is also enabled so a separately running frontend can call the API during development.

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

- `Menu` - a named menu, currently seeded with the `organization` menu.
- `MenuItem` - a reusable item definition with code, text, icon, color, kind, and optional params JSON.
- `MenuItemPerMenu` - a placement of a reusable item inside a menu. This stores nesting and order.

`MenuItem.kind` can be:

- `ITEM`
- `FOLDER`

Folders can contain nested placements. The exported menu JSON is built from the flat placement rows. Menu consumers and the authoring UI display higher `order` values first; Move Up/Down renumbers siblings using the same descending convention.

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

Query testing:

- `POST /api/query` with `{ "queryString": "..." }`

The query endpoint currently executes SQL against the configured test SQL Server. It is intended for internal frontend integration testing and is not hardened for public use.

Example JSON export:

```sh
curl http://localhost:3000/api/menus/organization/json
```

## Menu Item Params

`MenuItem.params` is optional JSON for table-driven behavior. It is validated by `MenuItemParamsSchema` in `src/models/menu-item-params.valibot.models.ts` and typed by `src/models/menu-item-params.models.ts`.

Params can describe:

- table name
- columns, their data type, and an explicit code `language`
- retrieve criteria and supported filter operators
- handlers for select, insert, update, and delete
- lookup behavior for criteria, insert, update, and grid contexts
- permissions
- child relations

Column types are `boolean`, `date`, `datetime`, `number`, `text`, `time`, or `code`. Code language is a separate property with the supported values `javascript`, `typescript`, `sql`, `plaintext`, `json`, and `css`; it defaults to `plaintext` for every column. Languages are not filter operators.

Lookup configuration is context-specific. Criteria, insert, and update lookups include `multiple` and `dependsOn`; grid lookup includes neither. Each context owns an independent handler. `dependsOn` lists column names whose changes should cause the client to rerun that context's lookup handler.

Handlers use one of three kinds:

- `query` - stores a query string
- `function-query` - stores a function that produces a query string
- `function-data` - stores a function that produces data directly

Function handlers are compiled by `src/utils/menu-item-params.transformer.ts`. Query placeholders in seeded metadata use the `@{column}` format expected by the client transformer.

Placeholder substitution supplies values only. Seeded mutation handlers own SQL quoting for text and date values, escape handling remains with the client substitution utility, and optional fields explicitly produce SQL `NULL` when empty.

When changing the params shape, keep these representations synchronized:

- `src/models/menu-item-params.models.ts`
- `src/models/menu-item-params.valibot.models.ts`
- `src/models/menu-item-params.runtime.models.ts`
- `src/ui/params-editor.js`
- seed helpers and menu-specific seed definitions

## Seed Data

`src/utils/seed.ts` remains the seed entry point. Menu definitions live under `src/utils/seeds`; shared construction and Valibot parsing are provided by `seed-helpers.ts`.

The current seed contains the `organization` menu with three sections:

- Workforce: departments, job titles, and employees.
- Project Management: projects and employee-project assignments.
- Analysis: read-only department, employee, and project analysis screens backed by `spc_department_analysis`, `spc_employee_analysis`, and `spc_project_analysis`.

The analysis items exercise static `EXEC` retrieval, existing and appended procedure parameters, case-insensitive parameter replacement, placeholder-backed parameters, scalar lookups, required criteria, booleans, and nullable inputs. Procedure criteria use `equals`, matching their scalar parameters.

Project Assignments explicitly enables grid lookups for `employee_id` and `project_id`, allowing clients to display employee and project names while preserving raw IDs. Its retrieval handler is a static `SELECT`, so the client can apply automatic criteria.

Every params object is parsed through `MenuItemParamsSchema` and its function handlers are compiled during seed construction. `npm run seed` deletes existing placements, menus, and reusable menu items before recreating this data.

## Notes

- Source imports use `.js` extensions because the project compiles to native ESM.
- The Prisma client is generated into `src/generated/prisma`.
- `dist` is build output.
- The UI in `src/ui` is intentionally framework-free.
- The built-in params editor uses the same column types, languages, operators, lookup contexts, and defaults as the server contract.
- The built-in menu editor follows the same descending `order` convention as `ng_bo`.

