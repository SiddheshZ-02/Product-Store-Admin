import { Outlet, Route } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import RoleProtectedRoute from "@/components/common/RoleProtectedRoute";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";

export default function DashboardLayout() {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <Route
  path="/admin"
  element={
    <RoleProtectedRoute
      roles={[
        "SUPER_ADMIN",
      ]}
    >
      <AdminDashboardPage />
    </RoleProtectedRoute>
  }
/>

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 overflow-auto p-6">
          
          <Outlet />
        </main>
      </div>
    </div>
  );
}