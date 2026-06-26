import {
  LayoutDashboard,
  Package,
  Users,
  Truck,
  ShoppingCart,
  Receipt,
  Boxes,
  Wallet,
  BarChart3,
  Shield,
} from "lucide-react";

export const tenantSidebar = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    roles: ["TENANT_OWNER", "SUPER_ADMIN"],
  },

  {
    label: "Admin Dashboard",
    icon: Shield,
    path: "/admin",
    roles: ["SUPER_ADMIN"],
  },

  {
    label: "Products",
    icon: Package,
    path: "/products",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Customers",
    icon: Users,
    path: "/customers",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Suppliers",
    icon: Truck,
    path: "/suppliers",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Purchases",
    icon: ShoppingCart,
    path: "/purchases/create",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Sales",
    icon: Receipt,
    path: "/sales",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Inventory",
    icon: Boxes,
    path: "/inventory",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Expenses",
    icon: Wallet,
    path: "/expenses",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Create Expense",
    icon: Wallet,
    path: "/expenses/create",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Expense Categories",
    icon: Wallet,
    path: "/expense-categories",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Sales History",
    icon: Receipt,
    path: "/sales-history",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Sales Returns",
    icon: Receipt,
    path: "/sales-returns",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Receive Payment",
    icon: Wallet,
    path: "/payments/receive",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Payment History",
    icon: Wallet,
    path: "/payments/history",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Purchase Return",
    icon: ShoppingCart,
    path: "/purchase-returns",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Analytics",
    icon: BarChart3,
    path: "/analytics",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Inventory Report",
    icon: Boxes,
    path: "/reports/inventory",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Sales Report",
    icon: Receipt,
    path: "/reports/sales",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Purchase Report",
    icon: ShoppingCart,
    path: "/reports/purchases",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Customer Ledger",
    icon: Users,
    path: "/reports/customer-ledger",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Supplier Ledger",
    icon: Truck,
    path: "/reports/supplier-ledger",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Profit & Loss",
    icon: BarChart3,
    path: "/reports/profit-loss",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Inventory Valuation",
    icon: BarChart3,
    path: "/reports/inventory-valuation",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Cashbook",
    icon: BarChart3,
    path: "/reports/cashbook",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Due Reminders",
    icon: Users,
    path: "/due-reminders",
    roles: ["TENANT_OWNER"],
  },
];