import { Globe } from "lucide-react";

export default function CountriesHeader({ done, total, onOpenMap }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-xl font-semibold text-brand-text flex items-center gap-2">
          <Globe size={20} />
          Countries
        </h1>
        <p className="mt-1 text-sm text-brand-muted">
          Marca los países donde has estado.
        </p>

        <button
          type="button"
          onClick={onOpenMap}
          className="mt-3 rounded-xl border border-brand-border bg-brand-surface px-3 py-2 text-sm text-brand-muted hover:text-brand-text transition"
        >
          Open map
        </button>
      </div>

      <div className="rounded-2xl border border-brand-border bg-brand-surface px-4 py-3">
        <div className="text-xs text-brand-muted">Visited</div>
        <div className="mt-1 flex items-baseline gap-2">
          <div className="text-lg font-semibold text-brand-text">
            {done}/{total}
          </div>
          <div className="text-xs text-brand-muted">{pct}%</div>
        </div>

        <div className="mt-2 h-2 w-28 rounded-full bg-brand-border overflow-hidden">
          <div
            className="h-2 rounded-full bg-brand-accent transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
