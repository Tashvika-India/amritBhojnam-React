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
import AdminOrderDetail from "../features/admin-dashboard/manage-orders/order-detail";
import AdminOrderInvoice from "../features/admin-dashboard/manage-orders/order-invoice";
import AllOrderDetail from "../features/admin-dashboard/manage-orders/order-detail/orders";
import AdminPrivateRoute from "./AdminPrivateRoute";
function AppRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/admin/dashboard"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <DashboardHome />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/category"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <ManageCategories />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/sub-category"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <ManageSubCategories />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/product"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <ProductList />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/add-product"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <ProductAdd />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/add-roles"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <AddRoles />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/edit-product"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <ProductAdd />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/roles"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <Roles />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/product-option"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <ProductOption />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/product/product-reviews/:id"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <ProductReviews />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/banner"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <ManageBanner />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/coupons"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <AdminCoupon />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/add-coupon"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <AddCoupon />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/edit-coupon/:id"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <AddCoupon />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/contact"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <ManageContact />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/orders"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <AdminOrders />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/order-detail/"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <AdminOrderDetail />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/order-detail/:id"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <AllOrderDetail />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/order-invoice/:id"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <AdminOrderInvoice />
            </DashboardSidebar>
          </AdminPrivateRoute>
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
          <AdminPrivateRoute>
            <DashboardSidebar>
              <ManageNutrition />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="admin/nutrition-value"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <ManageNutritionValue />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/returns-refunds"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <ReturnRefund />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/customers"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <AdminCustomer />
            </DashboardSidebar>
          </AdminPrivateRoute>
        }
      />
      <Route
        exact
        path="/admin/employees"
        element={
          <AdminPrivateRoute>
            <DashboardSidebar>
              <ManageEmployees />
            </DashboardSidebar>
          </AdminPrivateRoute>
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
      <Route exact path="/admin/add-roles" element={<AddRoles />} />

      <Route path="/admin/*" element={<Admin404 />} />
      <Route exact path="/admin/login" element={<LoginPage />} />



      {/* web routes */}

      <Route path="*" element={<Web404 />} />
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/products" element={<ProudctList />} />
      <Route exact path="/product-detail" element={<ProudctDetail />} />
      <Route exact path="/contact-us" element={<ContactUs />} />
      <Route exact path="/about-us" element={<AboutUs />} />
      <Route exact path="/wishlist" element={<Wishlist />} />
      <Route exact path="/term-conditions" element={<TermsAndConditions />} />
      <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route exact path="/refund-policy" element={<RefundPolicy />} />
      <Route exact path="/shiping-policy" element={<ShipingPolicy />} />
      <Route
        exact
        path="/payment-success"
        element={
          <PrivateRoute> 
              <PaymentSuccess /> 
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/payment-failed"
        element={
          <PrivateRoute> 
              <PaymentFailed /> 
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/profile"
        element={
          <PrivateRoute> 
              <UserProfile /> 
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/profile"
        element={
          <PrivateRoute> 
              <UserProfile /> 
          </PrivateRoute>
        }
      />

      <Route
        exact
        path="/checkout"
        element={
          <PrivateRoute>
           
              <CheckoutPage /> 
          </PrivateRoute> 
        }
      />

      {/* <Route exact path="/payment-success" element={<PaymentSuccess />} /> */}

      {/* <Route exact path="/payment-failed" element={<PaymentFailed />} /> */}

      {/* <Route exact path="/profile" element={<UserProfile />} /> */}

      {/* <Route exact path="/checkout" element={<CheckoutPage />} /> */}

    </Routes>
  );
}

export default AppRoutes;
