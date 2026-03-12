import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
  useParams,
  useSearch,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import SeedInitializer from "./components/SeedInitializer";
import BookmarksPage from "./pages/BookmarksPage";
import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";
import LessonPage from "./pages/LessonPage";
import SearchResultsPage from "./pages/SearchResultsPage";

export { useNavigate, useParams, useSearch };

// ── Root route with layout ───────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <>
      <SeedInitializer />
      <Outlet />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "oklch(0.14 0.022 265)",
            border: "1px solid oklch(0.22 0.028 265)",
            color: "oklch(0.94 0.012 240)",
          },
        }}
      />
    </>
  ),
});

// ── Layout route ─────────────────────────────────────────────────────────────
const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: Layout,
});

// ── Pages ────────────────────────────────────────────────────────────────────
const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: HomePage,
});

const categoryRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/category/$id",
  component: CategoryPage,
});

const lessonRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/lesson/$id",
  component: LessonPage,
});

const bookmarksRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/bookmarks",
  component: BookmarksPage,
});

const searchRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/search",
  validateSearch: (search: Record<string, unknown>) => ({
    q: (search.q as string) ?? "",
  }),
  component: SearchResultsPage,
});

// ── Router ───────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    homeRoute,
    categoryRoute,
    lessonRoute,
    bookmarksRoute,
    searchRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
