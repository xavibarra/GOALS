import { Target, User, UtensilsCrossed } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function BottomNav() {
  const items = [
    { to: "/goals", label: "Goals", icon: Target },
    { to: "/restaurants", label: "Restaurants", icon: UtensilsCrossed },
  ];

  return (
    <nav
      className="
      fixed 
      bottom-0 
      left-0 
      right-0 
      z-50 
      p-4
      pb-safe
      pointer-events-none
    "
    >
      <div
        className="
        pointer-events-auto
        max-w-md 
        mx-auto 
        bg-brand-surface
        backdrop-blur-lg
        rounded-2xl
        shadow-lg
        border border-brand-border
        px-4 py-2
      "
      >
        <div className="flex items-center justify-around gap-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "flex flex-col items-center gap-1 py-2 px-6 rounded-lg transition-all duration-200",
                    isActive
                      ? "text-brand-accent"
                      : "text-brand-muted hover:text-brand-text",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={24}
                      strokeWidth={isActive ? 2.5 : 2}
                      className="transition-all"
                    />
                    <span
                      className={`text-[11px] font-medium transition-all ${
                        isActive ? "opacity-100" : "opacity-70"
                      }`}
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}

          <NavLink
            to="/profile"
            className="
              w-8 h-8 
              rounded-full 
              bg-brand-border 
              flex items-center justify-center
              text-brand-muted 
              hover:bg-brand-accent/10
              hover:text-brand-accent
              transition-all
              ml-4
            "
          >
            <User size={18} strokeWidth={2} />
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
