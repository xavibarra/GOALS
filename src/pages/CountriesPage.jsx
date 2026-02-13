import { useMemo, useState } from "react";
import { useCountries } from "../hooks/useCountries";

import CountriesControls from "../components/CountriesControls";
import CountriesGroupedList from "../components/CountriesGroupedList";
import CountriesHeader from "../components/CountriesHeader";
import Modal from "../components/Modal";
import WorldMap from "../components/WorldMap";

const REGIONS = ["Europe", "Americas", "Africa", "Asia", "Oceania"];

export default function CountriesPage() {
  // UI filters
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [status, setStatus] = useState("all"); // all | visited | unvisited
  const [sort, setSort] = useState("name"); // name | region
  const [showMap, setShowMap] = useState(false);

  // Data (Supabase)
  const {
    countries = [],
    visited = new Set(),
    toggleVisited = () => {},
    loading = false,
    errorMsg = "",
  } = useCountries() || {};

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = Array.isArray(countries) ? countries.slice() : [];
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
  }, [countries, query, region, status, sort, visited]);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const c of filtered) {
      if (!map.has(c.region)) map.set(c.region, []);
      map.get(c.region).push(c);
    }
    const regionsOrder = REGIONS.filter((r) => map.has(r));
    return regionsOrder.map((r) => ({ region: r, countries: map.get(r) }));
  }, [filtered]);

  const total = countries.length;
  const done = visited.size;

  return (
    <div className="px-4 py-6 pb-24">
      <CountriesHeader
        done={done}
        total={total}
        onOpenMap={() => setShowMap(true)}
      />

      <CountriesControls
        query={query}
        onQueryChange={setQuery}
        region={region}
        onRegionChange={setRegion}
        regions={REGIONS}
        status={status}
        onStatusChange={setStatus}
        sort={sort}
        onToggleSort={() => setSort((s) => (s === "name" ? "region" : "name"))}
      />

      {/* Status (loading / error) */}
      {loading && (
        <div className="mt-6 rounded-2xl border border-brand-border bg-brand-surface p-6">
          <p className="text-sm text-brand-muted">Loading countries...</p>
        </div>
      )}

      {errorMsg && (
        <div className="mt-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
          <p className="text-sm text-red-500">{errorMsg}</p>
        </div>
      )}

      {/* List */}
      {!loading && (
        <CountriesGroupedList
          grouped={grouped}
          visited={visited}
          onToggleVisited={toggleVisited}
        />
      )}

      {/* Map modal */}
      <Modal
        open={showMap}
        title="World map (click to toggle visited)"
        onClose={() => setShowMap(false)}
      >
        <WorldMap visited={visited} onToggleVisited={toggleVisited} />
        <p className="mt-3 text-xs text-brand-muted">
          Tip: puedes marcar países desde el mapa o desde la lista.
        </p>
      </Modal>
    </div>
  );
}
