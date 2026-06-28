import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import AuthLayout from "@/app/layouts/AuthLayout";
import DashboardLayout from "@/app/layouts/DashboardLayout";

import ProtectedRoute from "@/components/common/ProtectedRoute";
import { ROUTES } from "@/constants/routes";
import RoleRoute from "@/components/common/RoleRoute";
import { ROLES } from "@/constants/roles";
import PageSkeleton from "@/components/common/PageSkeleton";

const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const ProductListPage = lazy(() => import("@/pages/products/ProductListPage"));
const ProductCreatePage = lazy(() => import("@/pages/products/ProductCreatePage"));
const ProductEditPage = lazy(() => import("@/pages/products/ProductEditPage"));
const CustomerListPage = lazy(() => import("@/pages/customers/CustomerListPage"));
const CustomerCreatePage = lazy(() => import("@/pages/customers/CustomerCreatePage"));
const CustomerEditPage = lazy(() => import("@/pages/customers/CustomerEditPage"));
const SupplierListPage = lazy(() => import("@/pages/suppliers/SupplierListPage"));
const SupplierCreatePage = lazy(() => import("@/pages/suppliers/SupplierCreatePage"));
const SupplierEditPage = lazy(() => import("@/pages/suppliers/SupplierEditPage"));
const PurchaseCreatePage = lazy(() => import("@/pages/purchases/PurchaseCreatePage"));
const SalesCreatePage = lazy(() => import("@/pages/sales/SalesCreatePage"));
const SalesListPage = lazy(() => import("@/pages/sales/SalesListPage"));
const CustomerDueListPage = lazy(() => import("@/pages/payments/CustomerDueListPage"));
const ReceivePaymentPage = lazy(() => import("@/pages/payments/ReceivePaymentPage"));
const SupplierDueListPage = lazy(() => import("@/pages/payments/SupplierDueListPage"));
const PaySupplierPage = lazy(() => import("@/pages/payments/PaySupplierPage"));
const InventoryReportPage = lazy(() => import("@/pages/reports/InventoryReportPage"));
const SalesReportPage = lazy(() => import("@/pages/reports/SalesReportPage"));
const CustomerLedgerPage = lazy(() => import("@/pages/reports/CustomerLedgerPage"));
const SupplierLedgerPage = lazy(() => import("@/pages/reports/SupplierLedgerPage"));
const ProfitLossPage = lazy(() => import("@/pages/reports/ProfitLossPage"));
const DashboardAnalyticsPage = lazy(() => import("@/pages/dashboard/DashboardAnalyticsPage"));
const PurchaseReportPage = lazy(() => import("@/pages/reports/PurchaseReportPage"));
const DueReminderPage = lazy(() => import("@/pages/customers/DueReminderPage"));
const SalesHistoryPage = lazy(() => import("@/pages/sales/SalesHistoryPage"));
const SaleInvoicePage = lazy(() => import("@/pages/sales/SaleInvoicePage"));
const SalesReturnPage = lazy(() => import("@/pages/sales/SalesReturnPage"));
const ExpenseCategoriesPage = lazy(() => import("@/pages/expenses/ExpenseCategoriesPage"));
const CreateExpensePage = lazy(() => import("@/pages/expenses/CreateExpensePage"));
const ExpenseListPage = lazy(() => import("@/pages/expenses/ExpenseListPage"));
const EditExpensePage = lazy(() => import("@/pages/expenses/EditExpensePage"));
const InventoryValuationPage = lazy(() => import("@/pages/reports/InventoryValuationPage"));
const CustomerPaymentHistoryPage = lazy(() => import("@/pages/payments/CustomerPaymentHistoryPage"));
const PurchaseReturnHistoryPage = lazy(() => import("@/pages/purchase-returns/PurchaseReturnHistoryPage"));
const CreatePurchaseReturnPage = lazy(() => import("@/pages/purchase-returns/CreatePurchaseReturnPage"));
const CashbookPage = lazy(() => import("@/pages/reports/CashbookPage"));
const AdminDashboardPage = lazy(() => import("@/pages/admin/AdminDashboardPage"));
const TenantListPage = lazy(() => import("@/pages/admin/TenantListPage"));
const TenantFormPage = lazy(() => import("@/pages/admin/TenantFormPage"));
const PlanListPage = lazy(() => import("@/pages/admin/PlanListPage"));
const PlanFormPage = lazy(() => import("@/pages/admin/PlanFormPage"));
const SubscriptionListPage = lazy(() => import("@/pages/admin/SubscriptionListPage"));
const AuditLogsPage = lazy(() => import("@/pages/admin/AuditLogsPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const StockAdjustmentPage = lazy(() => import("@/pages/inventory/StockAdjustmentPage"));
const AdjustmentHistoryPage = lazy(() => import("@/pages/inventory/AdjustmentHistoryPage"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageSkeleton />}>
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
            path="/purchase-returns"
            element={<PurchaseReturnHistoryPage />}
          />

          <Route
            path="/purchase-returns/create"
            element={<CreatePurchaseReturnPage />}
          />
          <Route path="/reports/cashbook" element={<CashbookPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/inventory/adjustment"
            element={<StockAdjustmentPage />}
          />
          <Route
            path="/inventory/adjustment/history"
            element={<AdjustmentHistoryPage />}
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <RoleRoute allow={[ROLES.SUPER_ADMIN]}>
                <AdminDashboardPage />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/tenants"
            element={
              <RoleRoute allow={[ROLES.SUPER_ADMIN]}>
                <TenantListPage />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/tenants/create"
            element={
              <RoleRoute allow={[ROLES.SUPER_ADMIN]}>
                <TenantFormPage />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/tenants/:id/edit"
            element={
              <RoleRoute allow={[ROLES.SUPER_ADMIN]}>
                <TenantFormPage />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/plans"
            element={
              <RoleRoute allow={[ROLES.SUPER_ADMIN]}>
                <PlanListPage />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/plans/create"
            element={
              <RoleRoute allow={[ROLES.SUPER_ADMIN]}>
                <PlanFormPage />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/plans/:id/edit"
            element={
              <RoleRoute allow={[ROLES.SUPER_ADMIN]}>
                <PlanFormPage />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/subscriptions"
            element={
              <RoleRoute allow={[ROLES.SUPER_ADMIN]}>
                <SubscriptionListPage />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/audit-logs"
            element={
              <RoleRoute allow={[ROLES.SUPER_ADMIN]}>
                <AuditLogsPage />
              </RoleRoute>
            }
          />
        </Route>
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
