import "./TaskCard.css";

function TaskCard({ task, onComplete, onEdit, onDelete }) {
  const isLate = !task.completed && new Date(task.date) < new Date();

  return (
    <div className={`task-card ${task.completed ? "completed" : ""} ${isLate ? "late" : ""}`}>
      <div className="task-content">
        <h3>{task.title}</h3>

        <p className="task-date">
          <strong>Data wykonania:</strong> {task.date}
        </p>

        <p className="task-description">{task.description}</p>
      </div>

      <div className="task-actions">
        {!task.completed && (
          <button
            className="icon-btn complete"
            onClick={() => onComplete(task.id)}
            title="Oznacz jako wykonane"
            aria-label="Mark as done"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </button>
        )}

        <button
          className="icon-btn edit"
          onClick={() => onEdit(task.id)}
          title="Edytuj"
          aria-label="Edit task"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
          </svg>
        </button>

        <button
          className="icon-btn delete"
          onClick={() => onDelete(task.id)}
          title="Usuń"
          aria-label="Delete task"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
