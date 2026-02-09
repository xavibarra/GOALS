export default function GoalsList({ goals, onToggle }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {goals.map((goal) => (
        <li
          key={goal.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 0",
            opacity: goal.is_done ? 0.6 : 1,
          }}
        >
          <input
            type="checkbox"
            checked={goal.is_done}
            onChange={() => onToggle(goal)}
          />
          <span>
            <b>#{goal.number}</b> {goal.title}
          </span>
        </li>
      ))}
    </ul>
  );
}
