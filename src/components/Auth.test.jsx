import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Auth from "./Auth";

vi.mock("../services/auth", () => ({
  loginUser: vi.fn(() =>
    Promise.resolve({
      uid: "123",
      email: "test@example.com",
    }),
  ),
  registerUser: vi.fn(),
  getAuthErrorMessage: vi.fn(),
}));

describe("Auth", () => {
  it("Change form after clicking register button", async () => {
    const onRegister = vi.fn();

    render(<Auth onLogin={onRegister} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /rejestracja/i,
      }),
    );

    expect(screen.getByPlaceholderText("Imię")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nazwisko")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Hasło")).toBeInTheDocument();
  });

  it("Call onLogin after user login", async () => {
    const onLogin = vi.fn();

    render(<Auth onLogin={onLogin} />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: {
        value: "test@example.com",
      },
    });

    fireEvent.change(screen.getByPlaceholderText("Hasło"), {
      target: {
        value: "123456",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /zaloguj się/i,
      }),
    );

    await screen.findByRole("button", {
      name: /zaloguj się/i,
    });

    expect(onLogin).toHaveBeenCalled();
  });

  it("Call onRegister after user register", async () => {
    const onRegister = vi.fn();

    render(<Auth onLogin={onRegister} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /rejestracja/i,
      }),
    );

    fireEvent.change(screen.getByPlaceholderText("Imię"), {
      target: {
        value: "Test",
      },
    });

    fireEvent.change(screen.getByPlaceholderText("Nazwisko"), {
      target: {
        value: "User",
      },
    });

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: {
        value: "test@example.com",
      },
    });

    fireEvent.change(screen.getByPlaceholderText("Hasło"), {
      target: {
        value: "123456",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /zarejestruj się/i,
      }),
    );

    await screen.findByRole("button", {
      name: /zarejestruj się/i,
    });

    expect(onRegister).toHaveBeenCalled();
  });
});
