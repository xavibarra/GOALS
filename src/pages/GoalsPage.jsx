import { useState } from "react";
import { useTranslation } from "react-i18next";
import AddGoalForm from "../components/AddGoalForm";
import GoalsList from "../components/GoalsList";
import { useGoals } from "../hooks/useGoals";

export default function GoalsPage() {
  const { t, i18n } = useTranslation();
  const { goals, loading, completed, total, addGoal, toggleDone } =
    useGoals(true);
  const [newGoal, setNewGoal] = useState("");

  const submit = async () => {
    const title = newGoal.trim();
    if (!title) return;
    await addGoal(title);
    setNewGoal("");
  };

  return (
    <div className="bg-brand-background">
      <h1 className="text-brand-text text-center text-5xl font-bold mb-12">
        {t("goals.title")}
      </h1>

      <AddGoalForm
        value={newGoal}
        onChange={setNewGoal}
        onSubmit={submit}
        loading={loading}
      />

      <p className="text-brand-accent mb-4">
        {t("goals.counter", { completed, total })}
      </p>
      <GoalsList goals={goals} onToggle={toggleDone} />
    </div>
  );
}
