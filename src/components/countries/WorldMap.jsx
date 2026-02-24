import { useCallback, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

import { MAP_THEME, getCountryStyle } from "../../lib/mapTheme";
import { getCountryName, getIso2 } from "../../lib/mapUtils";

const DEFAULT_MAP_URL =
  "https://raw.githubusercontent.com/BolajiBI/topojson-maps/master/world-countries.json";

export default function WorldMap({
  visited, // Set<string>  — ISO-2 codes
  onToggleVisited, // (code: string) => void
  mapUrl = DEFAULT_MAP_URL,
  scale = 160,
}) {
  const [tooltip, setTooltip] = useState(null);
  // tooltip: { name: string, x: number, y: number } | null

  const handleMouseMove = useCallback((geo, evt) => {
    const name = getCountryName(geo);
    if (!name) return;
    const rect = evt.currentTarget.closest("svg")?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({ name, x: evt.clientX - rect.left, y: evt.clientY - rect.top });
  }, []);

  const handleMouseLeave = useCallback(() => setTooltip(null), []);

  return (
    <div
      className="relative rounded-2xl border border-brand-border overflow-hidden shadow-sm"
      style={{ background: MAP_THEME.oceanBg }}
    >
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale }}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <rect width="100%" height="100%" fill={MAP_THEME.oceanBg} />

        <ZoomableGroup>
          <Geographies geography={mapUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const iso2 = getIso2(geo);
                const isDone = iso2 != null && visited.has(iso2);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => iso2 && onToggleVisited(iso2)}
                    onMouseMove={(evt) => handleMouseMove(geo, evt)}
                    onMouseLeave={handleMouseLeave}
                    style={getCountryStyle(isDone)}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 px-2.5 py-1.5 rounded-lg
                     text-xs font-medium shadow-md border border-brand-border"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y - 36,
            background: "var(--color-brand-surface)",
            color: "var(--color-brand-text)",
            whiteSpace: "nowrap",
          }}
        >
          {tooltip.name}
        </div>
      )}
    </div>
  );
}
