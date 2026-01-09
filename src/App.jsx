import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { supabase } from "./lib/supabase";

export default function App() {
  const [session, setSession] = useState(null);
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================
  // AUTH
  // =====================
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => sub.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  // =====================
  // GOALS
  // =====================
  const fetchGoals = async () => {
    const { data, error } = await supabase
      .from("bucket_items")
      .select("*")
      .order("number", { ascending: true });

    if (!error) setGoals(data);
  };

  useEffect(() => {
    if (session) fetchGoals();
  }, [session]);

  const addGoal = async () => {
    if (!newGoal.trim()) return;

    setLoading(true);
    await supabase.from("bucket_items").insert({
      title: newGoal,
    });

    setNewGoal("");
    setLoading(false);
    fetchGoals();
  };

  const toggleDone = async (goal) => {
    await supabase
      .from("bucket_items")
      .update({ is_done: !goal.is_done })
      .eq("id", goal.id);

    fetchGoals();
  };

  // =====================
  // RENDER
  // =====================
  if (!session) {
    return <Auth />;
  }

  const total = goals.length;
  const completed = goals.filter((g) => g.is_done).length;

  return (
    <div
      style={{ maxWidth: 600, margin: "40px auto", fontFamily: "system-ui" }}
    >
      <h2>🎯 Bucket List</h2>

      <p>
        <b>{completed}</b> / {total} completadas
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Nueva cosa antes de morir..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={addGoal} disabled={loading}>
          Añadir
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {goals.map((goal) => (
          <li
            key={goal.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 0",
              opacity: goal.is_done ? 0.6 : 1,
            }}
          >
            <input
              type="checkbox"
              checked={goal.is_done}
              onChange={() => toggleDone(goal)}
            />
            <span>
              <b>#{goal.number}</b> {goal.title}
            </span>
          </li>
        ))}
      </ul>

      <hr style={{ margin: "30px 0" }} />

      <button onClick={logout}>Logout</button>
    </div>
  );
}
