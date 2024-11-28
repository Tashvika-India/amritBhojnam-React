// src/routes/AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardSidebar from "@/layout/admin-layout/DashboardSidebar";
import DashboardHome from "../features/admin-dashboard/dashboard-home";
import ManageCategories from "../features/admin-dashboard/manage-categories";
import ProductList from "../features/admin-dashboard/manage-products/product-list";
import ProductReviews from "../features/admin-dashboard/manage-products/product-reviews";
import ActiveOrdersTable from "../features/admin-dashboard/manage-orders/admin-orders/components/ActiveOrdersTable";
import AdminOrders from "../features/admin-dashboard/manage-orders/admin-orders";
import ProductAdd from "../features/admin-dashboard/manage-products/product-add";
import HomePage from "../features/website/web-home";
import LoginPage from "../components/pages/auth-pages/LoginPage";
import ManageBanner from "../features/admin-dashboard/manage-banner";
import ProudctDetail from "../features/website/web-product-detail";
import ProudctList from "../features/website/web-product-list";
import UserProfile from "../features/website/web-account";
import CheckoutPage from "../features/website/web-checkout";
import PrivateRoute from "./PrivateRoute";
import ManageSubCategories from "../features/admin-dashboard/manage-sub-categories";
import AdminCustomer from "../features/admin-dashboard/manage-customers";
import ReturnRefund from "../features/admin-dashboard/manage-orders/refund-return";
import ManageEmployees from "../features/admin-dashboard/manage-employees";
import EmployeeAdd from "../features/admin-dashboard/manage-employees/add-employees";
import ContactUs from "../features/website/web-contact-us"; 
import ProductOption from "../features/admin-dashboard/manage-products/product-option"; 
import AboutUs from "../features/website/web-about-us"; 
import Wishlist from "../features/website/web-wishlist";
import TermsAndConditions from "../features/website/web-terms-conditions";
import PrivacyPolicy from "../features/website/web-privacy";
import RefundPolicy from "../features/website/web-refund";
import ShipingPolicy from "../features/website/web-shiping";
function AppRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <DashboardHome />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <DashboardHome />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/category"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <ManageCategories />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/sub-category"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <ManageSubCategories />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/product"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <ProductList />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/add-product"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <ProductAdd />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/edit-product"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <ProductAdd />
            </DashboardSidebar>
          </PrivateRoute>
        }
      /><Route
      exact
      path="/product-option"
      element={
        <PrivateRoute>
          <DashboardSidebar>
            <ProductOption />
          </DashboardSidebar>
        </PrivateRoute>
      }
    />
      <Route
        exact
        path="/product/product-reviews"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <ProductReviews />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/banner"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <ManageBanner />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
       <Route
        exact
        path="/contact"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <ManageBanner />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/orders"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <AdminOrders />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/returns-refunds"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <ReturnRefund />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/customers"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <AdminCustomer />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/employees"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <ManageEmployees />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/add-employee"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <EmployeeAdd />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route exact path="/login" element={<LoginPage />} />

      {/* web routes */}
      <Route exact path="/home" element={<HomePage />} />
      <Route exact path="/products" element={<ProudctList />} />
      <Route exact path="/product-detail" element={<ProudctDetail />} />
      <Route exact path="/profile" element={<UserProfile />} />
      <Route exact path="/checkout" element={<CheckoutPage />} />
      <Route exact path="/contact-us" element={<ContactUs />} />
      <Route exact path="/about-us" element={<AboutUs />} />
      <Route exact path="/wishlist" element={<Wishlist />} />
      <Route exact path="/term-conditions" element={<TermsAndConditions />} />
      <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route exact path="/refund-policy" element={<RefundPolicy />} />
      <Route exact path="/shiping-policy" element={<ShipingPolicy />} />


    </Routes>
  );
}

export default AppRoutes;
