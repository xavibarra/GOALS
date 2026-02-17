/**
 * Extracts a valid ISO-2 code from a geography's properties.
 * Returns null if the code is missing or the placeholder "-99".
 */
export function getIso2(geo) {
  const raw =
    geo?.properties?.["Alpha-2"] ??
    geo?.properties?.iso_a2 ??
    geo?.properties?.ISO_A2 ??
    geo?.properties?.iso2 ??
    geo?.properties?.ISO2 ??
    null;

  if (!raw || raw === "-99" || raw.trim() === "") return null;
  return raw.toUpperCase();
}

/**
 * Extracts the display name of a country from a geography's properties.
 */
export function getCountryName(geo) {
  return (
    geo?.properties?.name ??
    geo?.properties?.NAME ??
    geo?.properties?.ADMIN ??
    geo?.properties?.admin ??
    null
  );
}
