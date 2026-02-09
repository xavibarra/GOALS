import { useTranslation } from "react-i18next";

export default function AddGoalForm({ value, onChange, onSubmit, loading }) {
  const { t } = useTranslation();

  const submit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={submit}
      style={{ display: "flex", gap: 8, marginBottom: 20 }}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("goals.new_placeholder")}
        style={{ flex: 1, padding: 8 }}
      />
      <button type="submit" disabled={loading}>
        {t("goals.add")}
      </button>
    </form>
  );
}
