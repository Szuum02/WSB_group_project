import "./Auth.css";
import { useState } from "react";
import { loginUser, registerUser, getAuthErrorMessage } from "../services/auth";

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const user = await loginUser(formData.email, formData.password);

        onLogin(user);
      } else {
        const user = await registerUser(formData);

        onLogin(user, { type: "success", message: "Konto zostało utworzone!" });
      }
    } catch (error) {
      console.error(error);
      const msg = getAuthErrorMessage(error);
      alert(msg);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>📝 ToDo App</h1>

        <div className="auth-tabs">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Logowanie
          </button>

          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Rejestracja
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="Imię"
                value={formData.firstName}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="lastName"
                placeholder="Nazwisko"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Hasło"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-btn">
            {isLogin ? "Zaloguj się" : "Zarejestruj się"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
