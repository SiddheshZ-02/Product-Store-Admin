import { Navigate } from "react-router-dom";

import { useRole } from "@/hooks/useRole";

interface Props {
  children: React.ReactNode;

  allow: string[];
}

export default function RoleRoute({
  children,
  allow,
}: Props) {
  const { role } = useRole();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allow.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}