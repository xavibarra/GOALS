import { supabase } from "../lib/supabase";

export async function fetchCountries() {
  const { data, error } = await supabase.from("countries").select("*");
  if (error) throw error;
  return data ?? [];
}

export async function fetchVisitedCountryCodes() {
  const { data, error } = await supabase
    .from("user_country_visits")
    .select("country_code");
  if (error) throw error;
  return data?.map((c) => c.country_code) ?? [];
}

export async function addVisitedCountry(code, userId) {
  const { error } = await supabase
    .from("user_country_visits")
    .insert({ user_id: userId, country_code: code });

  if (error) throw error;
}

export async function removeVisitedCountry(code, userId) {
  const { error } = await supabase
    .from("user_country_visits")
    .delete()
    .eq("user_id", userId)
    .eq("country_code", code);

  if (error) throw error;
}
