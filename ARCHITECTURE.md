# Nexus - Architecture Overview

Summary of the client app structure and main responsibilities.

- Entry: `src/main.tsx` mounts React app.
- Routing: `src/App.tsx` defines top-level routes and uses `DashboardLayout` for protected pages.
- Context: `src/context/AuthContext.tsx` provides auth state and `useAuth()` hook.
- Layouts: `src/components/layout` contains `DashboardLayout`, `Navbar`, and `Sidebar`.
- Pages: `src/pages/*` contains page-level views (auth, dashboard, profile, messages, documents, deals, chat, etc.).
- UI components: `src/components/ui` contains shared UI pieces.
- Feature components: `src/components/*` (chat, collaboration, investor, entrepreneur) for domain components.
- Styling: Tailwind CSS configured (`tailwind.config.js`) and global styles in `src/index.css`.

State & Data Flow
- Local UI state inside components; auth is in context.
- Network requests via `axios` (use `src/services` if added for API wrappers).

Extending the app
- Add feature pages under `src/pages` and components under `src/components`.
- Register routes in `src/App.tsx` and add navigation entries in `src/components/layout/Sidebar.tsx`.

Development
- Run: `npm install` then `npm run dev`.
- Build: `npm run build`.

Notes
- Tailwind is configured; centralizing theme tokens in `tailwind.config.js` is recommended.
