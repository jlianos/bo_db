# Next Steps

## Current State

- The backend exports nested menus through `GET /api/menus/:code/json`.
- CORS is enabled for an independently running frontend.
- The seed entry point delegates menu-specific data to `src/utils/seeds`.
- Only the `organization` menu is currently seeded.
- Organization metadata covers departments, job titles, employees, projects, and employee-project assignments.
- Seeded params are validated with Valibot before persistence.
- SQL placeholders use `@{column}` for client-side substitution.
- Column `type` and code `language` are separate. Every column has a language, defaulting to `plaintext`.
- Filter operators contain only comparison/filter operations.
- Lookups are configured independently for criteria, insert, update, and grid.
- The runtime transformer compiles `function-query` and `function-data` handlers.
- The static params editor is aligned with the TypeScript, Valibot, and runtime contracts.
- `POST /api/query` is available for internal frontend query testing.

## Recommended Follow-up

1. Keep the separate frontend models, normalizers, and transformer aligned with the finalized backend contract.
2. Test the complete organization flow from the frontend: menu retrieval, criteria, lookups, CRUD query generation, child relations, and `@{column}` substitution.
3. Add automated Valibot tests for language defaults, invalid operators, each lookup context, and nested child params.
4. Add transformer tests for `query`, `function-query`, and `function-data`, including failure cases.
5. Before the query endpoint is used beyond internal testing, move connection settings to environment variables, validate request bodies, restrict allowed SQL operations, and add authentication/authorization.
6. Harden placement mutations by enforcing same-menu parents, folder-only parenting, cycle prevention, valid IDs, and deterministic sibling ordering.
7. Consider extracting an Express app factory and configurable port to simplify integration testing.

## Verification

For ordinary contract or UI changes:

```sh
npm run build
npx tsx src/tests/valibot.test.ts
```

Run `npm run seed` only when replacing local menu data is intentional. Run `npm run reset` only with explicit approval because it also replaces migration history and resets the database.
