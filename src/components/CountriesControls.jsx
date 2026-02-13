import { ArrowUpDown, Filter, Search } from "lucide-react";

function clsx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export default function CountriesControls({
  query,
  onQueryChange,
  region,
  onRegionChange,
  regions,
  status, // "all" | "visited" | "unvisited"
  onStatusChange,
  sort, // "name" | "region"
  onToggleSort,
}) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-3">
      {/* Search */}
      <div className="flex items-center gap-2 rounded-2xl border border-brand-border bg-brand-surface px-3 py-2">
        <Search size={18} className="text-brand-muted" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar país…"
          className="w-full bg-transparent text-sm text-brand-text outline-none"
        />
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Region select */}
        <div className="flex items-center gap-2 rounded-xl border border-brand-border bg-brand-surface px-3 py-2">
          <Filter size={16} className="text-brand-muted" />
          <select
            value={region}
            onChange={(e) => onRegionChange(e.target.value)}
            className="bg-transparent text-sm text-brand-text outline-none"
          >
            <option value="All">All regions</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Status pills */}
        <div className="flex items-center gap-1 rounded-xl border border-brand-border bg-brand-surface p-1">
          <button
            type="button"
            onClick={() => onStatusChange("all")}
            className={clsx(
              "px-3 py-1.5 text-xs rounded-lg transition",
              status === "all"
                ? "bg-brand-accent/15 text-brand-accent"
                : "text-brand-muted hover:text-brand-text",
            )}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => onStatusChange("visited")}
            className={clsx(
              "px-3 py-1.5 text-xs rounded-lg transition",
              status === "visited"
                ? "bg-brand-accent/15 text-brand-accent"
                : "text-brand-muted hover:text-brand-text",
            )}
          >
            Visited
          </button>

          <button
            type="button"
            onClick={() => onStatusChange("unvisited")}
            className={clsx(
              "px-3 py-1.5 text-xs rounded-lg transition",
              status === "unvisited"
                ? "bg-brand-accent/15 text-brand-accent"
                : "text-brand-muted hover:text-brand-text",
            )}
          >
            Pending
          </button>
        </div>

        {/* Sort */}
        <button
          type="button"
          onClick={onToggleSort}
          className="flex items-center gap-2 rounded-xl border border-brand-border bg-brand-surface px-3 py-2 text-sm text-brand-muted hover:text-brand-text transition"
          title="Cambiar orden"
        >
          <ArrowUpDown size={16} />
          <span className="text-xs">
            Sort: {sort === "name" ? "Name" : "Region"}
          </span>
        </button>
      </div>
    </div>
  );
}
