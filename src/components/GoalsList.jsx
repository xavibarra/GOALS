export default function GoalsList({ goals, onToggle }) {
  return (
    <ul className="space-y-2">
      {goals.map((goal) => (
        <li
          key={goal.id}
          className={[
            "flex items-center gap-3 rounded-lg px-3 py-2 transition",
            "bg-brand-surface border border-brand-border",
            goal.is_done ? "opacity-60" : "hover:bg-brand-surface/80",
          ].join(" ")}
        >
          <input
            type="checkbox"
            checked={goal.is_done}
            onChange={() => onToggle(goal)}
            className="accent-brand-primary h-4 w-4"
          />

          <span className="text-sm text-brand-text">
            <span className="font-semibold text-brand-muted mr-1">
              #{goal.number}
            </span>
            {goal.title}
          </span>
        </li>
      ))}
    </ul>
  );
}
