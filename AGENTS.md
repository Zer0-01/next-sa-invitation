# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js 15 App Router project. Application routes live under `src/app`, with public pages in `src/app/(public)` and admin views in `src/app/admin`. Shared UI primitives live in `src/components/ui`, higher-level reusable components in `src/components`, hooks in `src/hooks`, and shared helpers or service setup in `src/lib`. Static assets such as images, audio, and icons live in `public/`.

Use the `@/*` import alias for code under `src`, for example `@/lib/firebase`.

## Build and Development Commands
- `npm run dev`: start the local dev server with Turbopack on `http://localhost:3000`.
- `npm run build`: create a production build.
- `npm run start`: serve the production build locally.
- `npm run lint`: run ESLint with the Next.js core-web-vitals and TypeScript rules.

Only run commands after user approval, except read-only inspection commands such as `rg`, `find`, `ls`, `cat`, or `git log`.

## Coding Style & Naming Conventions
Write TypeScript with strict typing enabled. Follow the existing style: 2-space indentation in JSON/config files, double quotes in TS/TSX, and named exports for shared modules where practical. Keep route files in Next.js defaults such as `page.tsx` and `layout.tsx`.

Component filenames use kebab-case, for example `message-form-component.tsx`. React component identifiers inside files use PascalCase. Hooks should be named `use-*.ts` and start with `use`. Favor readable, maintainable, scalable code with low bug risk and minimal code smell.

## Testing Guidelines
Do not create, modify, or run tests unless the user explicitly asks for it. This repository currently has no dedicated test script in `package.json`.

## Commit & Pull Request Guidelines
Recent history follows Conventional Commit prefixes such as `feat:` and `refactor:`. Keep commit messages imperative and scoped to one change, for example `feat: add createdAt sort for messages`.

Pull requests should include a short summary, note any environment or Firebase changes, and attach screenshots for UI changes affecting public or admin pages.

## Security & Configuration Tips
Firebase config is read from `NEXT_PUBLIC_FIREBASE_*` variables in `src/lib/firebase.ts`. Store local values in `.env.development.local` or `.env.local`; do not commit secrets or environment-specific files.

## Agent Working Rules
Do not make assumptions when requirements, architecture, or expected behavior are unclear. Ask for clarification first. Follow best practices and preserve the existing project structure, architecture, design patterns, and folder organization unless a better approach is justified and approved by the user first.

For UI work, follow the existing design tokens and current visual system. Avoid introducing changes that conflict with the established component patterns. Prefer changes that are readable, maintainable, scalable, and unlikely to introduce regressions.

Do not manually edit generated files. If a generated artifact must change, update its source or generator and get user approval before regenerating.
