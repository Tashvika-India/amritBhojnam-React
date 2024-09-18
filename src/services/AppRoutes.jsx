import { Routes, Route } from "react-router-dom";
import DashboardSidebar from "@/layout/admin-layout/DashboardSidebar";
import DashboardHome from "../features/admin-dashboard/dashboard-home";
import Login from "../features/auth/login";
import ManageCategories from "../features/admin-dashboard/manage-categories";
import ProductList from "../features/admin-dashboard/manage-products/product-list";
import ProductReviews from "../features/admin-dashboard/manage-products/product-reviews";
import ActiveOrdersTable from "../features/admin-dashboard/manage-orders/admin-orders/components/ActiveOrdersTable";
import AdminOrders from "../features/admin-dashboard/manage-orders/admin-orders";

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
            <ManageCategories />
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
         <Route
        exact
        path="/product"
        element={
          <DashboardSidebar>
            <ProductList />
          </DashboardSidebar>
        }
      />
      <Route
        exact
        path="/product/product-reviews"
        element={
          <DashboardSidebar>
            <ProductReviews />
          </DashboardSidebar>
        }
      />
         <Route
        exact
        path="/orders"
        element={
          <DashboardSidebar>
            <AdminOrders />
          </DashboardSidebar>
        }
      />
      <Route exact path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
