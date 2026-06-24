import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "@/app/layouts/AuthLayout";
import DashboardLayout from "@/app/layouts/DashboardLayout";

import LoginPage from "@/pages/auth/LoginPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";

import ProtectedRoute from "@/components/common/ProtectedRoute";
import ProductListPage from "@/pages/products/ProductListPage";
import ProductCreatePage from "@/pages/products/ProductCreatePage";
import ProductEditPage from "@/pages/products/ProductEditPage";
import CustomerListPage from "@/pages/customers/CustomerListPage";
import CustomerCreatePage from "@/pages/customers/CustomerCreatePage";
import CustomerEditPage from "@/pages/customers/CustomerEditPage";
import SupplierListPage from "@/pages/suppliers/SupplierListPage";
import SupplierCreatePage from "@/pages/suppliers/SupplierCreatePage";
import SupplierEditPage from "@/pages/suppliers/SupplierEditPage";
import PurchaseCreatePage from "@/pages/purchases/PurchaseCreatePage";
import SalesCreatePage from "@/pages/sales/SalesCreatePage";
import SalesListPage from "@/pages/sales/SalesListPage";
import CustomerDueListPage from "@/pages/payments/CustomerDueListPage";
import ReceivePaymentPage from "@/pages/payments/ReceivePaymentPage";
import SupplierDueListPage from "@/pages/payments/SupplierDueListPage";
import PaySupplierPage from "@/pages/payments/PaySupplierPage";
import InventoryReportPage from "@/pages/reports/InventoryReportPage";
import SalesReportPage from "@/pages/reports/SalesReportPage";
import CustomerLedgerPage from "@/pages/reports/CustomerLedgerPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/create" element={<ProductCreatePage />} />
          <Route path="/products/:id/edit" element={<ProductEditPage />} />
          <Route path="/customers" element={<CustomerListPage />} />

          <Route path="/customers/create" element={<CustomerCreatePage />} />

          <Route path="/customers/:id/edit" element={<CustomerEditPage />} />
          <Route path="/suppliers" element={<SupplierListPage />} />

          <Route path="/suppliers/create" element={<SupplierCreatePage />} />

          <Route path="/suppliers/:id/edit" element={<SupplierEditPage />} />
          <Route
  path="/purchases/create"
  element={<PurchaseCreatePage />}
/>
<Route
  path="/sales/create"
  element={<SalesCreatePage />}
/>
<Route
  path="/sales"
  element={<SalesListPage />}
/>
<Route
  path="/payments/customer"
  element={
    <CustomerDueListPage />
  }
/>

<Route
  path="/payments/customer/:saleId"
  element={
    <ReceivePaymentPage />
  }
/>
<Route
  path="/payments/supplier"
  element={
    <SupplierDueListPage />
  }
/>

<Route
  path="/payments/supplier/:purchaseId"
  element={
    <PaySupplierPage />
  }
/>
<Route
  path="/reports/inventory"
  element={
    <InventoryReportPage />
  }
/>
<Route
  path="/reports/sales"
  element={
    <SalesReportPage />
  }
/>
<Route
  path="/reports/customer-ledger"
  element={
    <CustomerLedgerPage />
  }
/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
