# Development Guidelines

- Keep registration validation and WhatsApp formatting in one shared schema module so browser and server accept identical data.
- Store public registrations through an insert-only server function with private service-role storage; never expose registrations to visitors.
- Avoid rewriting published git history — force pushing, or rebasing/amending/squashing commits that are already pushed.
- Keep the main branch in a working state at all times.
