import Auth from "./components/Auth";
import GoalsPage from "./components/GoalsPage";
import { useSession } from "./hooks/useSession";
import { supabase } from "./lib/supabase";

export default function App() {
  const session = useSession();

  const logout = async () => {
    await supabase.auth.signOut();
  };

  if (!session) return <Auth />;

  return (
    <div
      style={{ maxWidth: 600, margin: "40px auto", fontFamily: "system-ui" }}
    >
      <button onClick={logout}>Logout</button>
      <GoalsPage />
    </div>
  );
}
