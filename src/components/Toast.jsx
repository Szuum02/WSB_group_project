import "./Toast.css";

function Toast({ type = "info", message, onClose }) {
  return (
    <div className={`toast ${type}`} role="status">
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  );
}

export default Toast;
