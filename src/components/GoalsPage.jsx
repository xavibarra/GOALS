import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGoals } from "../hooks/useGoals";
import AddGoalForm from "./AddGoalForm";
import GoalsList from "./GoalsList";

export default function GoalsPage() {
  const { t } = useTranslation();
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
    <div>
      <h1>{t("goals.title")}</h1>
      <p>{t("goals.counter", { completed, total })}</p>

      <AddGoalForm
        value={newGoal}
        onChange={setNewGoal}
        onSubmit={submit}
        loading={loading}
      />

      <GoalsList goals={goals} onToggle={toggleDone} />
    </div>
  );
}
