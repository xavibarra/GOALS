import CountryItem from "./CountryItem";

export default function CountriesGroupedList({
  grouped, // [{ region: "Europe", countries: [...] }, ...]
  visited, // Set de códigos (ej: Set(["ES","FR"]))
  onToggleVisited, // (code) => void
  emptyMessage = "No hay resultados con esos filtros.",
}) {
  if (!grouped || grouped.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-brand-border bg-brand-surface p-6">
        <p className="text-sm text-brand-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      {grouped.map(({ region, countries }) => {
        const visitedInRegion = countries.filter((c) =>
          visited.has(c.code),
        ).length;

        return (
          <section key={region}>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-brand-text">
                {region}
              </h2>
              <span className="text-xs text-brand-muted">
                {visitedInRegion}/{countries.length}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {countries.map((c) => (
                <CountryItem
                  key={c.code}
                  country={c}
                  isVisited={visited.has(c.code)}
                  onToggle={onToggleVisited}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
