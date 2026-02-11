import GoalItem from "./GoalItem";
export default function GoalsList({ goals, onToggle, onDelete, onEdit }) {
  return (
    <ul className="space-y-2">
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          goal={goal}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
