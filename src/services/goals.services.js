import { supabase } from "../lib/supabase";

export async function fetchGoals() {
  return supabase
    .from("bucket_items")
    .select("*")
    .order("number", { ascending: true });
}

export async function createGoal(title) {
  return supabase.from("bucket_items").insert({ title });
}

export async function toggleGoalDone(id, isDone) {
  return supabase
    .from("bucket_items")
    .update({ is_done: !isDone })
    .eq("id", id);
}
