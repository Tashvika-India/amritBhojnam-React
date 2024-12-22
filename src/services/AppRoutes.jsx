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
import ManageReport from "../features/admin-dashboard/manage-report";
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
import AdminCoupon from "../features/admin-dashboard/manage-coupon";
import AddCoupon from "../features/admin-dashboard/manage-coupon/components/AddCoupon";
import PaymentSuccess from "../features/website/web-payment-success";
import Roles from "../features/admin-dashboard/manage-roles";
import AddRoles from "../features/admin-dashboard/manage-roles/components/AddRoles";
import ManageContact from "../features/admin-dashboard/dashboard-contact";
import ManageNutrition from "../features/admin-dashboard/manage-nutrition";
import ManageNutritionValue from "../features/admin-dashboard/manage-nutrition-value";
import PaymentFailed from "../features/website/web-payment-failed";
import Web404 from "../notfound/Web404";
import Admin404 from "../notfound/Admin404";
function AppRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/admin/dashboard"
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
        path="/admin/category"
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
        path="/admin/sub-category"
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
        path="/admin/product"
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
        path="/admin/add-product"
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
        path="/admin/add-roles"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <AddRoles />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/edit-product"
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
        path="/admin/roles"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <Roles />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/product-option"
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
        path="/admin/product/product-reviews/:id"
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
        path="/admin/banner"
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
        path="/admin/coupons"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <AdminCoupon />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/add-coupon"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <AddCoupon />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/edit-coupon/:id"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <AddCoupon />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/contact"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <ManageContact />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/orders"
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
        path="/admin/report"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <ManageReport />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="admin/nutrition"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <ManageNutrition />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="admin/nutrition-value"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <ManageNutritionValue />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/returns-refunds"
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
        path="/admin/customers"
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
        path="/admin/employees"
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
        path="/admin/add-employee"
        element={
          <PrivateRoute>
            <DashboardSidebar>
              <EmployeeAdd />
            </DashboardSidebar>
          </PrivateRoute>
        }
      />
      <Route path="/admin/*" element={<Admin404 />} />
      <Route exact path="/admin/login" element={<LoginPage />} />
      <Route path="*" element={<Web404 />} />
      <Route exact path="/" element={<HomePage />} />
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
      <Route exact path="/payment-success" element={<PaymentSuccess />} />
      <Route exact path="/payment-failed" element={<PaymentFailed />} />
      <Route exact path="/admin/add-roles" element={<AddRoles />} /> 

    </Routes>
  );
}

export default AppRoutes;
