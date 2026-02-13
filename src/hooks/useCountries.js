import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  addVisitedCountry,
  fetchCountries,
  fetchVisitedCountryCodes,
  removeVisitedCountry,
} from "../services/countries";

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [visited, setVisited] = useState(() => new Set());
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const visitedCount = visited.size;

  const reload = async () => {
    setErrorMsg("");
    setLoading(true);
    try {
      const [allCountries, visitedCodes] = await Promise.all([
        fetchCountries(),
        fetchVisitedCountryCodes(),
      ]);
      setCountries(allCountries ?? []);
      setVisited(new Set(visitedCodes ?? []));
    } catch (e) {
      setErrorMsg(e?.message ?? "Error loading countries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  const toggleVisited = async (code) => {
    setErrorMsg("");

    const { data: authData, error } = await supabase.auth.getUser();
    if (error) {
      setErrorMsg(error.message);
      return;
    }

    const userId = authData?.user?.id;
    if (!userId) {
      setErrorMsg("You must be logged in.");
      return;
    }

    const wasVisited = visited.has(code);

    // Optimista
    setVisited((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });

    try {
      if (wasVisited) await removeVisitedCountry(code, userId);
      else await addVisitedCountry(code, userId);
    } catch (e) {
      // rollback
      setVisited((prev) => {
        const next = new Set(prev);
        if (wasVisited) next.add(code);
        else next.delete(code);
        return next;
      });
      setErrorMsg(e?.message ?? "Error updating country");
    }
  };

  return {
    countries,
    visited,
    visitedCount,
    loading,
    errorMsg,
    reload,
    toggleVisited,
  };
}
