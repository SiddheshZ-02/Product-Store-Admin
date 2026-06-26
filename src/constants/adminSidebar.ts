import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

export const adminSidebar = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    label: "Tenants",
    icon: Building2,
    path: "/admin/tenants",
  },
  {
    label: "Plans",
    icon: CreditCard,
    path: "/admin/plans",
  },
  {
    label: "Subscriptions",
    icon: Users,
    path: "/admin/subscriptions",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    path: "/admin/analytics",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];