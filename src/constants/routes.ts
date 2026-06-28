export const ROUTES = {
  LOGIN: "/login",
  UNAUTHORIZED: "/unauthorized",

  DASHBOARD: "/dashboard",

  // Products
  PRODUCTS: "/products",
  PRODUCTS_CREATE: "/products/create",

  // Customers
  CUSTOMERS: "/customers",
  CUSTOMERS_CREATE: "/customers/create",

  // Suppliers
  SUPPLIERS: "/suppliers",
  SUPPLIERS_CREATE: "/suppliers/create",

  // Purchases
  PURCHASES_CREATE: "/purchases/create",
  PURCHASE_RETURNS: "/purchase-returns",
  PURCHASE_RETURNS_CREATE: "/purchase-returns/create",

  // Sales
  SALES: "/sales",
  SALES_CREATE: "/sales/create",
  SALES_HISTORY: "/sales-history",
  SALES_RETURNS: "/sales-returns",
  SALE_INVOICE: "/sales/:id",

  // Payments
  PAYMENTS_CUSTOMER: "/payments/customer",
  PAYMENTS_CUSTOMER_HISTORY: "/payments/history",
  PAYMENTS_RECEIVE: "/payments/receive",
  PAYMENTS_SUPPLIER: "/payments/supplier",

  // Inventory
  INVENTORY: "/inventory",
  INVENTORY_ADJUSTMENT: "/inventory/adjustment",
  INVENTORY_ADJUSTMENT_HISTORY: "/inventory/adjustment/history",

  // Expenses
  EXPENSES: "/expenses",
  EXPENSES_CREATE: "/expenses/create",
  EXPENSE_CATEGORIES: "/expense-categories",

  // Reports
  REPORTS_INVENTORY: "/reports/inventory",
  REPORTS_SALES: "/reports/sales",
  REPORTS_PURCHASES: "/reports/purchases",
  REPORTS_CUSTOMER_LEDGER: "/reports/customer-ledger",
  REPORTS_SUPPLIER_LEDGER: "/reports/supplier-ledger",
  REPORTS_PROFIT_LOSS: "/reports/profit-loss",
  REPORTS_INVENTORY_VALUATION: "/reports/inventory-valuation",
  REPORTS_CASHBOOK: "/reports/cashbook",

  // Analytics
  ANALYTICS: "/analytics",

  // Due Reminders
  DUE_REMINDERS: "/due-reminders",

  // Admin Routes
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_TENANTS: "/admin/tenants",
  ADMIN_TENANTS_CREATE: "/admin/tenants/create",
  ADMIN_TENANTS_EDIT: "/admin/tenants/:id/edit",
  ADMIN_PLANS: "/admin/plans",
  ADMIN_PLANS_CREATE: "/admin/plans/create",
  ADMIN_PLANS_EDIT: "/admin/plans/:id/edit",
  ADMIN_SUBSCRIPTIONS: "/admin/subscriptions",
  ADMIN_AUDIT_LOGS: "/admin/audit-logs",
  ADMIN_SETTINGS: "/admin/settings",

  // Tenant Settings
  SETTINGS: "/settings",
} as const;