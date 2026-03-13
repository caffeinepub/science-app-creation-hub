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
import EventsPage from "./pages/EventsPage";
import HomePage from "./pages/HomePage";
import PromotionsPage from "./pages/PromotionsPage";
import StoresPage from "./pages/StoresPage";

export { useNavigate, useParams, useSearch };

const rootRoute = createRootRoute({
  component: () => (
    <>
      <SeedInitializer />
      <Outlet />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "oklch(0.14 0.018 255)",
            border: "1px solid oklch(0.78 0.13 75 / 0.3)",
            color: "oklch(0.94 0.01 75)",
          },
        }}
      />
    </>
  ),
});

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: HomePage,
});

const storesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/stores",
  component: StoresPage,
});

const promotionsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/promotions",
  component: PromotionsPage,
});

const eventsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/events",
  component: EventsPage,
});

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    homeRoute,
    storesRoute,
    promotionsRoute,
    eventsRoute,
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
