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
];
