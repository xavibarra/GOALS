import { useEffect, useState } from "react";

const STORAGE_KEY = "goals_theme";

function getPreferredTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;

  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)",
  )?.matches;
  return prefersDark ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const t = getPreferredTheme();
    setTheme(t);
    document.documentElement.dataset.theme = t;
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.dataset.theme = next;
      return next;
    });
  };

  const setThemeExplicit = (t) => {
    if (t !== "light" && t !== "dark") return;
    localStorage.setItem(STORAGE_KEY, t);
    document.documentElement.dataset.theme = t;
    setTheme(t);
  };

  return { theme, toggleTheme, setTheme: setThemeExplicit };
}
