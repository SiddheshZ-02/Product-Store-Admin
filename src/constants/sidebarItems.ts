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
} from "lucide-react";

export const sidebarItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    label: "Products",
    icon: Package,
    path: "/products",
  },
  {
    label: "Customers",
    icon: Users,
    path: "/customers",
  },
  {
  label: "Create Expense",
    icon: Users,
  href: "/expenses/create",
},
  {
    label: "Suppliers",
    icon: Truck,
    path: "/suppliers",
  },
  {
    label: "Purchases",
    icon: ShoppingCart,
    path: "/purchases",
  },
  {
    label: "Sales",
    icon: Receipt,
    path: "/sales",
  },
  {
    label: "Inventory",
    icon: Boxes,
    path: "/inventory",
  },
  {
    label: "Expenses",
    icon: Wallet,
    path: "/expenses",
  },
  {
    label: "Reports",
    icon: BarChart3,
    path: "/reports",
  },
  {
    label: "Inventory Report",
    icon: Boxes,
    path: "/reports/inventory",
  },
  {
    label: "Sales Report",
    icon: Receipt,
    path: "/reports/sales",
  },
  {
    label: "Customer Ledger",
    icon: Users,
    path: "/reports/customer-ledger",
  },
  {
    label: "Supplier Ledger",
    icon: Truck,
    path: "/reports/supplier-ledger",
  },
  {
    label: "Profit & Loss",
    icon: Truck,
    path: "/reports/profit-loss",
  },
  {
    label: "Analytics",
    icon: Truck,
    path: "/analytics",
  },
  {
    title: "Purchase Report",
    icon: Truck,
    path: "/reports/purchases",
  },
  {
    title: "Due Reminders",
    icon: Truck,
    href: "/due-reminders",
  },
  {
    label: "Sales History",
    icon: Truck,
    href: "/sales-history",
  },
  {
    label: "Sales Returns",
    icon: Truck,
    href: "/sales-returns",
  },
  {
    label: "Expense Categories",
    icon: BarChart3,
    href: "/expense-categories",
  },
  {
  label: "Expenses",
    icon: BarChart3,
  href: "/expenses",
}
];
