import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Users,
  Settings,
  History,
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
    label: "Audit Logs",
    icon: History,
    path: "/admin/audit-logs",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];