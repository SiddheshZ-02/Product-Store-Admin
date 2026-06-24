import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";

export default function ThemeToggle() {
  const { theme, toggleTheme } =
    useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="border rounded-md p-2"
    >
      {theme === "light" ? (
        <Moon size={18} />
      ) : (
        <Sun size={18} />
      )}
    </button>
  );
}