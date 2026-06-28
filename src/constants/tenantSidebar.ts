import {
  LayoutDashboard,
  Package,
  Users,
  Truck,
  ShoppingCart,
  Receipt,
  Boxes,
  Wallet,
  Settings,
  FileText,
  TrendingUp,
} from "lucide-react";

export const tenantSidebar = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    roles: ["TENANT_OWNER", "SUPER_ADMIN"],
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
    path: "/inventory/adjustment",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Expenses",
    icon: Wallet,
    path: "/expenses",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Reports",
    icon: FileText,
    path: "/reports/inventory",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Analytics",
    icon: TrendingUp,
    path: "/analytics",
    roles: ["TENANT_OWNER"],
  },

  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
    roles: ["TENANT_OWNER"],
  },
];