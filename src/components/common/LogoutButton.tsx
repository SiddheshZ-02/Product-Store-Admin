import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/store/authStore";

import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const logout =
    useAuthStore(
      (state) =>
        state.logout
    );

  const navigate =
    useNavigate();

  const handleLogout =
    async () => {
      await logout();

      navigate("/login");
    };

  return (
    <Button
      variant="outline"
      onClick={
        handleLogout
      }
    >
      Logout
    </Button>
  );
}