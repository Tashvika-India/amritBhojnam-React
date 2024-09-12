import { Routes, Route } from "react-router-dom";
import DashboardSidebar from "@/layout/admin-layout/DashboardSidebar";
import DashboardHome from "../features/admin-dashboard/dashboard-home";

function AppRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/dashboard"
        element={
          <DashboardSidebar>
            <DashboardHome />
          </DashboardSidebar>
        }
      />
      <Route
        exact
        path="/category-one"
        element={
          <DashboardSidebar>
            <DashboardHome />
          </DashboardSidebar>
        }
      />
      <Route
        exact
        path="/"
        element={
          <DashboardSidebar>
            <DashboardHome />
          </DashboardSidebar>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
