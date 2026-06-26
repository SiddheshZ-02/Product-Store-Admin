import { Navigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: React.ReactNode;

  roles: string[];
}

export default function RoleProtectedRoute({
  children,
  roles,
}: Props) {
  const {
    profile,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <Navigate
        to="/login"
      />
    );
  }

  if (
    !roles.includes(
      profile.role
    )
  ) {
    return (
      <Navigate
        to="/dashboard"
      />
    );
  }

  return (
    <>
      {children}
    </>
  );
}