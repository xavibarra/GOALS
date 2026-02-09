import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useSession() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      },
    );

    return () => sub.subscription.unsubscribe();
  }, []);

  return session;
}
