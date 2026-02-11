import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
export default function GoalItem({ goal, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(goal.title);

  useEffect(() => {
    setDraftTitle(goal.title);
  }, [goal.title]);

  const startEdit = () => {
    setDraftTitle(goal.title);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraftTitle(goal.title);
    setIsEditing(false);
  };

  const saveEdit = async () => {
    const next = draftTitle.trim();
    if (!next) return;
    if (next === goal.title) return setIsEditing(false);

    await onEdit(goal, next);
    setIsEditing(false);
  };

  return (
    <li
      className={[
        "flex items-center justify-between rounded-lg px-3 py-2 transition",
        "bg-brand-surface border border-brand-border",
        goal.is_done ? "opacity-60" : "hover:bg-brand-surface/80",
      ].join(" ")}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={goal.is_done}
          onChange={() => onToggle(goal)}
          className="accent-brand-primary h-4 w-4 cursor-pointer"
          disabled={isEditing}
        />

        {!isEditing ? (
          <span className="text-sm text-brand-text truncate">
            <span className="font-semibold text-brand-muted mr-1">
              #{goal.number}
            </span>
            {goal.title}
          </span>
        ) : (
          <input
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit();
              if (e.key === "Escape") cancelEdit();
            }}
            className="w-full bg-transparent border border-brand-border rounded px-2 py-1 text-sm text-brand-text outline-none"
            autoFocus
          />
        )}
      </div>
      <div className="flex items-center gap-2 ml-3">
        {!isEditing ? (
          <>
            <button
              onClick={startEdit}
              className="text-brand-primary hover:text-brand-primary/80 transition cursor-pointer"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => onDelete(goal)}
              className="text-red-500 hover:text-red-500/80 transition cursor-pointer"
            >
              <Trash2 size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={saveEdit}
              className="text-brand-primary hover:text-brand-primary/80 transition cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="text-brand-muted hover:text-brand-text transition cursor-pointer"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </li>
  );
}
