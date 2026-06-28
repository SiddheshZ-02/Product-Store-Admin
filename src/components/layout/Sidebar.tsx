import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { useRole } from "@/hooks/useRole";
import { adminSidebar } from "@/constants/adminSidebar";
import { tenantSidebar } from "@/constants/tenantSidebar";

export default function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { logout } = useAuth();
  const { isSuperAdmin } = useRole();
  const navItems = isSuperAdmin ? adminSidebar : tenantSidebar;

  return (
    <Sidebar className={cn(
      "border-r border-sidebar-border transition-all duration-300 ease-in-out bg-card",
      collapsed ? "w-[70px]" : "w-[260px]"
    )}>
      <TooltipProvider delayDuration={0}>
        <SidebarHeader className="h-[70px] px-4 flex items-center justify-center">
          <div className="flex items-center gap-3 w-full">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0 transition-transform duration-300 hover:scale-110">
              <span className="text-primary font-bold text-lg">W</span>
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0 overflow-hidden animate-in fade-in slide-in-from-left-4 duration-300">
                <span className="text-sm font-bold text-foreground leading-none mb-1">
                  WineERP
                </span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                  {isSuperAdmin ? "Admin Workspace" : "Business Workspace"}
                </span>
              </div>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent className="px-3 py-6 scrollbar-hide overflow-y-auto">
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <SidebarMenu className="gap-1.5">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;

                  const menuItem = (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild tooltip={item.label}>
                        <NavLink
                          to={item.path}
                          className={cn(
                            "group relative flex items-center h-11 px-3 rounded-lg transition-all duration-200 ease-in-out",
                            isActive
                              ? "bg-accent text-accent-foreground shadow-md shadow-primary/25"
                              : "text-muted-foreground hover:bg-primary/10 hover:text-primary hover:shadow-sm"
                          )}
                        >
                          <item.icon className={cn(
                            "h-[18px] w-[18px] flex-shrink-0 transition-transform duration-200 group-hover:scale-110",
                            isActive ? "text-accent-foreground" : "text-muted-foreground group-hover:text-primary"
                          )} />

                          {!collapsed && (
                            <div className="flex items-center justify-between flex-1 ml-3 min-w-0 animate-in fade-in slide-in-from-left-2 duration-300">
                              <span className="text-sm font-semibold truncate">
                                {item.label}
                              </span>
                            </div>
                          )}

                          {isActive && collapsed && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-foreground rounded-l-full shadow-glow" />
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );

                  if (collapsed) {
                    return (
                      <Tooltip key={item.label}>
                        <TooltipTrigger asChild>
                          {menuItem}
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={10} className="font-semibold text-xs">
                          {item.label}
                        </TooltipContent>
                      </Tooltip>
                    );
                  }

                  return menuItem;
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <div className="mt-auto border-t border-sidebar-border/50 p-4 space-y-4">
          <div className="flex flex-col gap-2">
            <Button
              variant="destructive"
              size={collapsed ? "icon" : "sm"}
              onClick={logout}
              className={cn(
                "w-full font-bold shadow-md shadow-destructive/10 transition-all duration-200 active:scale-95 hover:bg-destructive/90 hover:shadow-destructive/20",
                collapsed ? "h-10 w-10 p-0" : "h-9 text-xs justify-start gap-3"
              )}
            >
              <LogOut className={cn("h-4 w-4", !collapsed && "ml-0")} />
              {!collapsed && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </TooltipProvider>
    </Sidebar>
  );
}
