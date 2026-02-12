import {
  ArrowUpDown,
  CheckCircle2,
  Circle,
  Filter,
  Globe,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const REGIONS = ["Europe", "Americas", "Africa", "Asia", "Oceania"];

const MAP_URL =
  "https://raw.githubusercontent.com/BolajiBI/topojson-maps/master/world-countries.json";

const STARTER_COUNTRIES = [
  // Europe
  { code: "ES", name: "Spain", region: "Europe" },
  { code: "FR", name: "France", region: "Europe" },
  { code: "IT", name: "Italy", region: "Europe" },
  { code: "PT", name: "Portugal", region: "Europe" },
  { code: "GB", name: "United Kingdom", region: "Europe" },
  { code: "DE", name: "Germany", region: "Europe" },
  { code: "NL", name: "Netherlands", region: "Europe" },
  { code: "BE", name: "Belgium", region: "Europe" },
  { code: "CH", name: "Switzerland", region: "Europe" },
  { code: "AT", name: "Austria", region: "Europe" },

  { code: "CZ", name: "Czech Republic", region: "Europe" },
  { code: "SI", name: "Slovenia", region: "Europe" },
  { code: "FI", name: "Finland", region: "Europe" },
  { code: "SE", name: "Sweden", region: "Europe" },
  { code: "DK", name: "Denmark", region: "Europe" },
  { code: "AD", name: "Andorra", region: "Europe" },
  { code: "NO", name: "Norway", region: "Europe" },
  { code: "IE", name: "Ireland", region: "Europe" },
  { code: "PL", name: "Poland", region: "Europe" },
  { code: "HU", name: "Hungary", region: "Europe" },
  { code: "GR", name: "Greece", region: "Europe" },
  { code: "HR", name: "Croatia", region: "Europe" },
  { code: "IS", name: "Iceland", region: "Europe" },
  { code: "RO", name: "Romania", region: "Europe" },
  { code: "BG", name: "Bulgaria", region: "Europe" },
  { code: "SK", name: "Slovakia", region: "Europe" },
  { code: "EE", name: "Estonia", region: "Europe" },
  { code: "LV", name: "Latvia", region: "Europe" },
  { code: "LT", name: "Lithuania", region: "Europe" },
  { code: "MC", name: "Monaco", region: "Europe" },
  { code: "SM", name: "San Marino", region: "Europe" },
  { code: "MT", name: "Malta", region: "Europe" },

  // Americas
  { code: "US", name: "United States", region: "Americas" },
  { code: "CA", name: "Canada", region: "Americas" },
  { code: "MX", name: "Mexico", region: "Americas" },
  { code: "BR", name: "Brazil", region: "Americas" },
  { code: "AR", name: "Argentina", region: "Americas" },
  { code: "PA", name: "Panama", region: "Americas" },
  { code: "CR", name: "Costa Rica", region: "Americas" },
  { code: "CO", name: "Colombia", region: "Americas" },

  // Africa
  { code: "MA", name: "Morocco", region: "Africa" },
  { code: "EG", name: "Egypt", region: "Africa" },
  { code: "ZA", name: "South Africa", region: "Africa" },

  // Asia
  { code: "JP", name: "Japan", region: "Asia" },
  { code: "TH", name: "Thailand", region: "Asia" },
  { code: "ID", name: "Indonesia", region: "Asia" },
  { code: "VN", name: "Vietnam", region: "Asia" },

  { code: "IN", name: "India", region: "Asia" },
  { code: "TR", name: "Turkey", region: "Asia" },
  { code: "LA", name: "Laos", region: "Asia" },
  { code: "AE", name: "United Arab Emirates", region: "Asia" },

  { code: "SG", name: "Singapore", region: "Asia" },
  { code: "MY", name: "Malaysia", region: "Asia" },
  { code: "PH", name: "Philippines", region: "Asia" },
  { code: "KR", name: "South Korea", region: "Asia" },
  { code: "NP", name: "Nepal", region: "Asia" },
  { code: "LK", name: "Sri Lanka", region: "Asia" },
  { code: "KH", name: "Cambodia", region: "Asia" },
  { code: "CN", name: "China", region: "Asia" },

  // Oceania
  { code: "AU", name: "Australia", region: "Oceania" },
  { code: "NZ", name: "New Zealand", region: "Oceania" },
];

function clsx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export default function CountriesPage() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [status, setStatus] = useState("all"); // all | visited | unvisited
  const [sort, setSort] = useState("name"); // name | region
  const [showMap, setShowMap] = useState(false);

  // Starter: guardamos visitados en memoria (luego lo persistimos en Supabase)
  const [visited, setVisited] = useState(() => new Set(["ES", "FR"]));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = STARTER_COUNTRIES.slice();

    if (region !== "All") {
      list = list.filter((c) => c.region === region);
    }

    if (q) {
      list = list.filter((c) => c.name.toLowerCase().includes(q));
    }

    if (status === "visited") {
      list = list.filter((c) => visited.has(c.code));
    } else if (status === "unvisited") {
      list = list.filter((c) => !visited.has(c.code));
    }

    if (sort === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "region") {
      list.sort((a, b) => (a.region + a.name).localeCompare(b.region + b.name));
    }

    return list;
  }, [query, region, status, sort, visited]);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const c of filtered) {
      if (!map.has(c.region)) map.set(c.region, []);
      map.get(c.region).push(c);
    }
    // Mantén orden “bonito”
    const regionsOrder = REGIONS.filter((r) => map.has(r));
    return regionsOrder.map((r) => ({ region: r, countries: map.get(r) }));
  }, [filtered]);

  const total = STARTER_COUNTRIES.length;
  const done = visited.size;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  const toggleVisited = (code) => {
    setVisited((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  return (
    <div className="px-4 py-6 pb-24">
      {/* Header */}
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
            onClick={() => setShowMap(true)}
            className="rounded-xl border border-brand-border bg-brand-surface px-3 py-2 text-sm text-brand-muted hover:text-brand-text transition"
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

      {/* Controls */}
      <div className="mt-5 grid grid-cols-1 gap-3">
        <div className="flex items-center gap-2 rounded-2xl border border-brand-border bg-brand-surface px-3 py-2">
          <Search size={18} className="text-brand-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar país…"
            className="w-full bg-transparent text-sm text-brand-text outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-brand-border bg-brand-surface px-3 py-2">
            <Filter size={16} className="text-brand-muted" />
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="bg-transparent text-sm text-brand-text outline-none"
            >
              <option value="All">All regions</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 rounded-xl border border-brand-border bg-brand-surface p-1">
            <button
              onClick={() => setStatus("all")}
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
              onClick={() => setStatus("visited")}
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
              onClick={() => setStatus("unvisited")}
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

          <button
            onClick={() => setSort((s) => (s === "name" ? "region" : "name"))}
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

      {/* List */}
      <div className="mt-6 space-y-6">
        {grouped.length === 0 ? (
          <div className="rounded-2xl border border-brand-border bg-brand-surface p-6">
            <p className="text-sm text-brand-muted">
              No hay resultados con esos filtros.
            </p>
          </div>
        ) : (
          grouped.map(({ region, countries }) => (
            <section key={region}>
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-brand-text">
                  {region}
                </h2>
                <span className="text-xs text-brand-muted">
                  {countries.filter((c) => visited.has(c.code)).length}/
                  {countries.length}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {countries.map((c) => {
                  const isDone = visited.has(c.code);
                  return (
                    <button
                      key={c.code}
                      onClick={() => toggleVisited(c.code)}
                      className={clsx(
                        "group w-full text-left rounded-2xl border px-4 py-3 transition",
                        "bg-brand-surface border-brand-border hover:bg-brand-surface/80",
                        isDone && "opacity-90",
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-brand-text truncate">
                            {c.name}
                          </div>
                          <div className="text-xs text-brand-muted">
                            {c.code}
                          </div>
                        </div>

                        <div className="shrink-0">
                          {isDone ? (
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
                })}
              </div>
            </section>
          ))
        )}
      </div>
      {showMap && (
        <div className="fixed inset-0 z-[60]">
          {/* Backdrop */}
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowMap(false)}
            aria-label="Close map"
          />

          {/* Panel */}
          <div className="absolute inset-x-0 top-6 mx-auto w-[min(1000px,calc(100%-2rem))] rounded-2xl border border-brand-border bg-brand-surface shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-brand-border">
              <div className="text-sm font-semibold text-brand-text">
                World map (click to toggle visited)
              </div>
              <button
                onClick={() => setShowMap(false)}
                className="text-sm text-brand-muted hover:text-brand-text transition"
              >
                Close
              </button>
            </div>

            <div className="p-3">
              <div className="rounded-2xl border border-brand-border bg-[#0b1220]/[0.02] overflow-hidden">
                <ComposableMap
                  projectionConfig={{ scale: 160 }}
                  style={{ width: "100%", height: "auto" }}
                >
                  <Geographies geography={MAP_URL}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const iso2 = geo?.properties?.iso_a2; // <-- clave
                        const isDone = iso2 && visited.has(iso2);

                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            onClick={() => {
                              if (!iso2) return; // algunos shapes no tienen iso
                              toggleVisited(iso2);
                            }}
                            style={{
                              default: {
                                fill: isDone ? "currentColor" : "transparent",
                                color: isDone
                                  ? "rgba(99, 102, 241, 0.9)"
                                  : undefined, // usa tu color (brand-accent)
                                stroke: "rgba(148, 163, 184, 0.35)",
                                strokeWidth: 0.6,
                                outline: "none",
                              },
                              hover: {
                                fill: isDone
                                  ? "currentColor"
                                  : "rgba(99, 102, 241, 0.12)",
                                color: "rgba(99, 102, 241, 0.95)",
                                stroke: "rgba(148, 163, 184, 0.6)",
                                strokeWidth: 0.8,
                                outline: "none",
                                cursor: iso2 ? "pointer" : "default",
                              },
                              pressed: {
                                fill: "rgba(99, 102, 241, 0.22)",
                                outline: "none",
                              },
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>
                </ComposableMap>
              </div>

              <p className="mt-3 text-xs text-brand-muted">
                Tip: puedes marcar países desde el mapa o desde la lista. (Luego
                lo persistimos en Supabase).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
