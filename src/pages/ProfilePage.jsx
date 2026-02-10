import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";
import { supabase } from "../lib/supabase";

export default function ProfilePage() {
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="max-w-xl mx-auto px-4 pt-6 pb-28 space-y-4">
      <button
        onClick={toggleTheme}
        className="border border-brand-border px-3 py-2 rounded-lg bg-brand-surface"
      >
        {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
      </button>

      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="border border-brand-border bg-brand-surface px-3 py-2 rounded-lg"
      >
        <option value="es">ES</option>
        <option value="ca">CA</option>
        <option value="en">EN</option>
      </select>

      <button
        onClick={logout}
        className="px-3 py-2 rounded-lg bg-brand-primary text-white"
      >
        Logout
      </button>
    </div>
  );
}
