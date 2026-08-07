# Next Steps

## Current State

- The backend exports nested menus through `GET /api/menus/:code/json`.
- CORS is enabled for an independently running frontend.
- The seed entry point delegates menu-specific data to `src/utils/seeds`.
- Only the `organization` menu is currently seeded.
- Organization metadata covers departments, job titles, employees, projects, employee-project assignments, and three procedure-backed analysis screens.
- Seeded params are validated with Valibot before persistence.
- SQL placeholders use `@{column}` for client-side substitution.
- Column `type` and code `language` are separate. Every column has a language, defaulting to `plaintext`.
- Filter operators contain only comparison/filter operations.
- Lookups are configured independently for criteria, insert, update, and grid. Interactive contexts support `dependsOn`; grid does not.
- Project Assignments explicitly provides employee and project grid lookups for name display.
- The runtime transformer compiles `function-query` and `function-data` handlers.
- The static params editor is aligned with the TypeScript, Valibot, and runtime contracts.
- The authoring UI and `ng_bo` both display higher menu `order` values first.
- `POST /api/query` is available for internal frontend query testing.
- Mutation seed handlers own text/date quoting and explicitly handle nullable values.
- Employee-project retrieval is a static `SELECT`, allowing automatic client criteria generation.
- Department, employee, and project analysis items exercise static stored-procedure retrieval and parameter generation.

## Recommended Follow-up

1. Keep the separate frontend models, normalizers, and transformer aligned with the finalized backend contract.
2. Exercise all three analysis items from `ng_bo`, including existing-parameter replacement, appended parameters, required employee criteria, booleans, nullable values, and procedure failures.
3. Exercise organization insert/update/delete handlers against the test database, including apostrophes and empty optional fields.
4. Implement and verify `ng_bo` grid lookup formatting using the explicit Project Assignments employee/project lookups.
5. Verify automatic criteria on Project Assignments and the other static `SELECT` handlers for scalar, range, and multi-select operators.
6. Add automated Valibot tests for language defaults, invalid operators, lookup dependencies, each lookup context, and nested child params.
7. Add seed-contract tests for procedure criteria, lookup cardinality, placeholder names, mutation quoting, nullable values, and handler compilation.
8. Add transformer tests for `query`, `function-query`, and `function-data`, including failure cases.
9. Before the query endpoint is used beyond internal testing, move connection settings to environment variables, validate request bodies, restrict allowed SQL operations, and add authentication/authorization.
10. Harden placement mutations by enforcing same-menu parents, folder-only parenting, cycle prevention, valid IDs, and deterministic sibling ordering.
11. Consider extracting an Express app factory and configurable port to simplify integration testing.

## Verification

For ordinary contract or UI changes:

```sh
npm run build
npx tsx src/tests/valibot.test.ts
```

Run `npm run seed` only when replacing local menu data is intentional. Run `npm run reset` only with explicit approval because it also replaces migration history and resets the database.
