import { NavLink } from "react-router-dom";

import { sidebarItems } from "@/constants/sidebarItems";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-background">
      <div className="h-16 border-b flex items-center px-6">
        <h1 className="font-bold text-xl">
          WineERP
        </h1>
      </div>

      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path || "/"}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                rounded-md
                px-3 py-2
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
    </aside>
  );
}