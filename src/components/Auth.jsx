import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Auth({ onAuthSuccess }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      let res;
      if (mode === "register") {
        res = await supabase.auth.signUp({ email, password });
      } else {
        res = await supabase.auth.signInWithPassword({ email, password });
      }

      const { data, error } = res;
      if (error) throw error;

      // OJO: si tienes "Email confirmations" activado en Supabase,
      // signUp puede no crear sesión hasta que confirmes el email.
      const session = data?.session ?? null;
      if (session) {
        onAuthSuccess?.(session);
        setMsg("✅ Sesión iniciada!");
      } else {
        setMsg(
          "✅ Usuario creado. Revisa tu email si tienes confirmación activada."
        );
      }
    } catch (err) {
      setMsg(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ maxWidth: 360, margin: "40px auto", fontFamily: "system-ui" }}
    >
      <h2>{mode === "login" ? "Login" : "Register"}</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: 10, fontSize: 14 }}
        />
        <input
          type="password"
          placeholder="password (min 6)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          style={{ padding: 10, fontSize: 14 }}
        />

        <button disabled={loading} style={{ padding: 10, fontSize: 14 }}>
          {loading
            ? "Cargando..."
            : mode === "login"
            ? "Entrar"
            : "Crear cuenta"}
        </button>
      </form>

      <p style={{ marginTop: 12, minHeight: 22 }}>{msg}</p>

      <button
        onClick={() => {
          setMsg("");
          setMode(mode === "login" ? "register" : "login");
        }}
        style={{
          marginTop: 6,
          background: "transparent",
          border: "none",
          color: "blue",
          cursor: "pointer",
        }}
      >
        {mode === "login"
          ? "No tengo cuenta → Register"
          : "Ya tengo cuenta → Login"}
      </button>
    </div>
  );
}
