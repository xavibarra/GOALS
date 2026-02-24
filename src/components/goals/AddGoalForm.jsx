import { useTranslation } from "react-i18next";

export default function AddGoalForm({ value, onChange, onSubmit, loading }) {
  const { t } = useTranslation();

  const submit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-2 mb-4">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("goals.new_placeholder")}
        className="flex-1 rounded-lg border border-brand-border bg-brand-surface px-3 py-2 text-sm text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary"
      />

      <button
        type="submit"
        disabled={loading}
        className={[
          "rounded-lg px-4 py-2 text-sm font-medium transition",
          "bg-brand-primary text-white",
          loading
            ? "opacity-60 cursor-not-allowed"
            : "hover:bg-brand-primary/90",
        ].join(" ")}
      >
        {t("goals.add")}
      </button>
    </form>
  );
}
