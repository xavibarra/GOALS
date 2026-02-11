import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Auth({ onAuthSuccess }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("info"); // "info" | "success" | "error"

  useEffect(() => {
    // UX: al cambiar login/register, limpia password y mensajes
    setPassword("");
    setMsg("");
    setMsgType("info");
  }, [mode]);

  const setError = (text) => {
    setMsg(text);
    setMsgType("error");
  };

  const setSuccess = (text) => {
    setMsg(text);
    setMsgType("success");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setMsgType("info");
    setLoading(true);

    try {
      if (!email.trim()) return setError("Email requerido.");
      if (password.length < 6)
        return setError("La contraseña debe tener mínimo 6 caracteres.");

      let res;
      if (mode === "register") {
        res = await supabase.auth.signUp({ email, password });
      } else {
        res = await supabase.auth.signInWithPassword({ email, password });
      }

      const { data, error } = res;
      if (error) throw error;

      const session = data?.session ?? null;

      if (session) {
        onAuthSuccess?.(session);
        setSuccess("✅ Sesión iniciada!");
      } else {
        setSuccess(
          "✅ Usuario creado. Revisa tu email si tienes confirmación activada.",
        );
      }
    } catch (err) {
      setError(`❌ ${err?.message ?? "Error inesperado"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setMsg("");
    setMsgType("info");

    if (!email.trim())
      return setError("Escribe tu email para recuperar la contraseña.");

    setLoading(true);
    try {
      // OJO: esto usa la Redirect URL que tengas configurada en Supabase
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;

      setSuccess("📩 Te he enviado un email para resetear la contraseña.");
    } catch (err) {
      setError(`❌ ${err?.message ?? "No se pudo enviar el email"}`);
    } finally {
      setLoading(false);
    }
  };

  const msgClass =
    msgType === "success"
      ? "text-green-600"
      : msgType === "error"
        ? "text-red-600"
        : "text-brand-muted";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-brand-border bg-brand-surface p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-brand-text">
          {mode === "login" ? "Login" : "Crear cuenta"}
        </h2>
        <p className="mt-1 text-sm text-brand-muted">
          {mode === "login"
            ? "Entra para ver tus metas."
            : "Crea una cuenta para guardar tus metas."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <div className="space-y-1">
            <label className="text-xs text-brand-muted">Email</label>
            <input
              type="email"
              autoComplete="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              className="w-full rounded-lg border border-brand-border bg-transparent px-3 py-2 text-sm text-brand-text outline-none focus:ring-2 focus:ring-brand-primary/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-brand-muted">Contraseña</label>

            <div className="flex items-center gap-2">
              <input
                type={showPass ? "text" : "password"}
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                placeholder="mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                minLength={6}
                required
                className="w-full rounded-lg border border-brand-border bg-transparent px-3 py-2 text-sm text-brand-text outline-none focus:ring-2 focus:ring-brand-primary/30"
              />

              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="shrink-0 rounded-lg border border-brand-border px-3 py-2 text-xs text-brand-muted hover:text-brand-text transition"
                disabled={loading}
              >
                {showPass ? "Ocultar" : "Ver"}
              </button>
            </div>

            {mode === "login" && (
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={loading}
                className="mt-2 text-xs text-brand-primary hover:text-brand-primary/80 transition"
              >
                ¿Has olvidado tu contraseña?
              </button>
            )}
          </div>

          <button
            disabled={loading}
            className="w-full rounded-lg bg-brand-primary px-3 py-2 text-sm font-medium text-white hover:opacity-90 transition disabled:opacity-60"
          >
            {loading
              ? "Cargando..."
              : mode === "login"
                ? "Entrar"
                : "Crear cuenta"}
          </button>
        </form>

        <p className={`mt-4 min-h-5 text-sm ${msgClass}`}>{msg}</p>

        <button
          type="button"
          onClick={() => setMode((m) => (m === "login" ? "register" : "login"))}
          disabled={loading}
          className="mt-2 text-sm text-brand-primary hover:text-brand-primary/80 transition"
        >
          {mode === "login"
            ? "No tengo cuenta → Register"
            : "Ya tengo cuenta → Login"}
        </button>
      </div>
    </div>
  );
}
