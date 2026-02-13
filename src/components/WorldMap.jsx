import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const DEFAULT_MAP_URL =
  "https://raw.githubusercontent.com/BolajiBI/topojson-maps/master/world-countries.json";

const MAP_THEME = {
  baseFill: "rgba(148, 163, 184, 0.10)",
  visitedFill: "rgba(99, 102, 241, 0.85)",
  hoverFill: "rgba(99, 102, 241, 0.18)",
  visitedHoverFill: "rgba(99, 102, 241, 0.95)",
  stroke: "rgba(148, 163, 184, 0.35)",
  strokeHover: "rgba(148, 163, 184, 0.6)",
};

/**
 * Extracts a valid ISO-2 code from a geography's properties.
 * Returns null if the code is missing or the placeholder "-99".
 */
function getIso2(geo) {
  const raw =
    geo?.properties?.["Alpha-2"] ?? // ← this TopoJSON uses "Alpha-2"
    geo?.properties?.iso_a2 ??
    geo?.properties?.ISO_A2 ??
    geo?.properties?.iso2 ??
    geo?.properties?.ISO2 ??
    null;

  if (!raw || raw === "-99" || raw.trim() === "") return null;
  return raw.toUpperCase();
}

export default function WorldMap({
  visited, // Set<string>  — ISO-2 codes from your DB
  onToggleVisited, // (code: string) => void
  mapUrl = DEFAULT_MAP_URL,
  scale = 160,
}) {
  return (
    <div className="rounded-2xl border border-brand-border bg-[#0b1220]/[0.02] overflow-hidden">
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale }}
        style={{ width: "100%", height: "auto" }}
      >
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
                    onClick={() => {
                      if (!iso2) return;
                      onToggleVisited(iso2);
                    }}
                    style={{
                      default: {
                        fill: isDone
                          ? MAP_THEME.visitedFill
                          : MAP_THEME.baseFill,
                      },
                      hover: {
                        fill: isDone
                          ? "rgba(99, 102, 241, 0.95)"
                          : "rgba(99, 102, 241, 0.18)",
                        stroke: "rgba(148, 163, 184, 0.6)",
                        strokeWidth: 0.8,
                        outline: "none",
                        cursor: iso2 ? "pointer" : "default",
                      },
                      pressed: {
                        fill: "rgba(99, 102, 241, 0.25)",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
