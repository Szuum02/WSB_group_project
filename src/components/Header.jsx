import "./Header.css";

function Header({ user, onAddTask, onLogout }) {
  const username =
    user?.displayName?.split(" ")[0] ||
    (user?.email ? user.email.split("@")[0] : "użytkowniku");

  const today = new Date().toLocaleDateString("pl-PL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="logo-section">
        <h2>ToDo App</h2>
        <p className="header-date">{today}</p>
      </div>

      <div className="welcome-section">
        <h3>Witaj, {username}!</h3>
      </div>

      <div className="header-actions">
        <button className="add-task-btn" onClick={onAddTask}>
          + Dodaj zadanie
        </button>
        <button className="logout-btn" onClick={onLogout}>
          Wyloguj
        </button>
      </div>
    </header>
  );
}

export default Header;
