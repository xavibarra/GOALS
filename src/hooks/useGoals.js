import { useEffect, useMemo, useState } from "react";
import {
  createGoal,
  fetchGoals,
  toggleGoalDone,
} from "../services/goals.service";

export function useGoals(enabled) {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  const reload = async () => {
    const { data, error } = await fetchGoals();
    if (!error) setGoals(data ?? []);
  };

  useEffect(() => {
    if (enabled) reload();
  }, [enabled]);

  const addGoal = async (title) => {
    setLoading(true);
    await createGoal(title);
    setLoading(false);
    await reload();
  };

  const toggleDone = async (goal) => {
    await toggleGoalDone(goal.id, goal.is_done);
    await reload();
  };

  const completed = useMemo(
    () => goals.filter((g) => g.is_done).length,
    [goals]
  );

  return {
    goals,
    loading,
    completed,
    total: goals.length,
    addGoal,
    toggleDone,
    reload,
  };
}
