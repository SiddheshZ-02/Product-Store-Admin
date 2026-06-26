import { supabase } from "@/lib/supabase";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";
import { Button } from "../ui/button";

export default function Header() {
  const handleLogout = async () => {
    await supabase.auth.signOut();

    window.location.href = "/login";
  };

  return (
    <header className="h-16 border-b px-6 flex items-center justify-between bg-background">
      <div>
        <h2 className="font-semibold">WineERP Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <UserMenu />
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
