import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { DashboardLayout } from "./components/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { History } from "./pages/History";
import { Analytics } from "./pages/Analytics";
import { URLChecker } from "./pages/URLChecker";
import { Community } from "./pages/Community";
import { Profile } from "./pages/Profile";
import { AdminPanel } from "./pages/AdminPanel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/app",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "history",
        Component: History,
      },
      {
        path: "analytics",
        Component: Analytics,
      },
      {
        path: "url-checker",
        Component: URLChecker,
      },
      {
        path: "community",
        Component: Community,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "admin",
        Component: AdminPanel,
      },
    ],
  },
]);
