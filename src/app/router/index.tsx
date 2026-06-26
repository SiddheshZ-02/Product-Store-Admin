import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
import { ROUTES } from "@/constants/routes";
import SupplierLedgerPage from "@/pages/reports/SupplierLedgerPage";
import ProfitLossPage from "@/pages/reports/ProfitLossPage";
import DashboardAnalyticsPage from "@/pages/dashboard/DashboardAnalyticsPage";
import PurchaseReportPage from "@/pages/reports/PurchaseReportPage";
import DueReminderPage from "@/pages/customers/DueReminderPage";
import SalesHistoryPage from "@/pages/sales/SalesHistoryPage";
import SaleInvoicePage from "@/pages/sales/SaleInvoicePage";
import SalesReturnPage from "@/pages/sales/SalesReturnPage";
import ExpenseCategoriesPage from "@/pages/expenses/ExpenseCategoriesPage";
import CreateExpensePage from "@/pages/expenses/CreateExpensePage";
import ExpenseListPage from "@/pages/expenses/ExpenseListPage";
import EditExpensePage from "@/pages/expenses/EditExpensePage";
import InventoryValuationPage from "@/pages/reports/InventoryValuationPage";
import CustomerPaymentHistoryPage from "@/pages/payments/CustomerPaymentHistoryPage";
import PurchaseReturnHistoryPage from "@/pages/purchase-returns/PurchaseReturnHistoryPage";
import CreatePurchaseReturnPage from "@/pages/purchase-returns/CreatePurchaseReturnPage";
import CashbookPage from "@/pages/reports/CashbookPage";
import RoleRoute from "@/components/common/RoleRoute";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import { ROLES } from "@/constants/roles";
import TenantListPage from "@/pages/admin/TenantListPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to={ROUTES.DASHBOARD} replace />
            </ProtectedRoute>
          }
        />
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
          <Route path="/purchases/create" element={<PurchaseCreatePage />} />
          <Route path="/sales/create" element={<SalesCreatePage />} />
          <Route path="/sales" element={<SalesListPage />} />
          <Route path="/sales/:id" element={<SaleInvoicePage />} />
          <Route path="/payments/customer" element={<CustomerDueListPage />} />
          <Route path="/expenses/create" element={<CreateExpensePage />} />

          <Route
            path="/payments/customer/:saleId"
            element={<ReceivePaymentPage />}
          />
          <Route path="/payments/supplier" element={<SupplierDueListPage />} />

          <Route
            path="/payments/supplier/:purchaseId"
            element={<PaySupplierPage />}
          />
          <Route path="/reports/inventory" element={<InventoryReportPage />} />
          <Route path="/reports/sales" element={<SalesReportPage />} />
          <Route
            path="/reports/customer-ledger"
            element={<CustomerLedgerPage />}
          />
          <Route
            path="/reports/supplier-ledger"
            element={<SupplierLedgerPage />}
          />

          <Route path="/reports/profit-loss" element={<ProfitLossPage />} />
          <Route path="/analytics" element={<DashboardAnalyticsPage />} />
          <Route path="/reports/purchases" element={<PurchaseReportPage />} />
          <Route path="/due-reminders" element={<DueReminderPage />} />
          <Route path="/sales-history" element={<SalesHistoryPage />} />
          <Route path="/sales-returns" element={<SalesReturnPage />} />
          <Route
            path="/expense-categories"
            element={<ExpenseCategoriesPage />}
          />
          <Route path="/expenses" element={<ExpenseListPage />} />
          <Route path="/expenses/edit/:id" element={<EditExpensePage />} />
          <Route
            path="/reports/inventory-valuation"
            element={<InventoryValuationPage />}
          />
          <Route path="/payments/receive" element={<ReceivePaymentPage />} />
          <Route
            path="/payments/history"
            element={<CustomerPaymentHistoryPage />}
          />
          <Route
            path="/payments/history"
            element={<CustomerPaymentHistoryPage />}
          />
          <Route
            path="/purchase-returns"
            element={<PurchaseReturnHistoryPage />}
          />

          <Route
            path="/purchase-returns/create"
            element={<CreatePurchaseReturnPage />}
          />
          <Route
  path="/reports/cashbook"
  element={<CashbookPage />}
/>

<Route
  path="/admin/dashboard"
  element={
    <RoleRoute
      allow={[
        ROLES.SUPER_ADMIN,
      ]}
    >
      <AdminDashboardPage />
    </RoleRoute>
  }
/>
<Route
  path="/admin/tenants"
  element={
    <RoleRoute
      allow={[
        ROLES.SUPER_ADMIN,
      ]}
    >
      <TenantListPage />
    </RoleRoute>
  }
/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
