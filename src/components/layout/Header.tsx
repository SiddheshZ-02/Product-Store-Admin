import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <header className="h-16 border-b px-6 flex items-center justify-between bg-background">
      <div>
        <h2 className="font-semibold">
          WineERP Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <UserMenu />
      </div>
    </header>
  );
}