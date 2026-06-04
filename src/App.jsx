import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";
import Toast from "./components/Toast";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { logoutUser } from "./services/auth";

function App() {
  const [user, setUser] = useState(null);
  const [flash, setFlash] = useState(null);

  useEffect(() => {
    let unsubscribe = () => {};
    (async () => {
      const { auth } = await import("./firebase");
      unsubscribe = onAuthStateChanged(auth, (u) => {
        setUser(u);
      });
    })();

    return () => unsubscribe();
  }, []);

  const handleLogin = (user, flashMessage) => {
    setUser(user);
    if (flashMessage) {
      setFlash(flashMessage);
      setTimeout(() => setFlash(null), 3000);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      {flash && <Toast type={flash.type} message={flash.message} onClose={() => setFlash(null)} />}

      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
