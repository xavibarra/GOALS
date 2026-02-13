import { CheckCircle2, Circle } from "lucide-react";

function clsx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export default function CountryItem({ country, isVisited, onToggle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(country.code)}
      className={clsx(
        "group w-full text-left rounded-2xl border px-4 py-3 transition",
        "bg-brand-surface border-brand-border hover:bg-brand-surface/80",
        isVisited && "opacity-90",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-medium text-brand-text truncate">
            {country.name}
          </div>
          <div className="text-xs text-brand-muted">{country.code}</div>
        </div>

        <div className="shrink-0">
          {isVisited ? (
            <CheckCircle2
              size={22}
              className="text-brand-accent transition-transform duration-200 group-active:scale-90"
            />
          ) : (
            <Circle
              size={22}
              className="text-brand-muted transition-transform duration-200 group-active:scale-90"
            />
          )}
        </div>
      </div>
    </button>
  );
}
