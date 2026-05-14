import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      {user ? (
        <Dashboard user={user} onLogout={() => setUser(null)} />
      ) : (
        <Auth onLogin={setUser} />
      )}
    </>
  );
}

export default App;
