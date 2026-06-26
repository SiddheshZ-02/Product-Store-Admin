import { NavLink } from "react-router-dom";

import LogoutButton from "../common/LogoutButton";

import { useRole } from "@/hooks/useRole";

import { adminSidebar } from "@/constants/adminSidebar";
import { tenantSidebar } from '@/constants/tenantSidebar';

export default function Sidebar() {
  const { isSuperAdmin } = useRole();

  const items = isSuperAdmin
    ? adminSidebar
    : tenantSidebar;

  return (
    <aside className="w-64 border-r bg-background flex flex-col">
      <div className="h-16 border-b flex items-center px-6">
        <h1 className="font-bold text-xl">
          WineERP
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center
                gap-3
                rounded-md
                px-3
                py-2
                transition

                ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }
              `
              }
            >
              <Icon size={18} />

              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <LogoutButton />
      </div>
    </aside>
  );
}