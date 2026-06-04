import { describe, it, expect } from "vitest";
import { getAuthErrorMessage } from "./auth";

describe("getAuthErrorMessage", () => {
  it("return wrong email error", () => {
    const result = getAuthErrorMessage({
      code: "auth/invalid-email",
    });

    expect(result).toBe("Nieprawidłowy adres email.");
  });

  it("return wrong password error", () => {
    const result = getAuthErrorMessage({
      code: "auth/weak-password",
    });

    expect(result).toBe("Hasło musi mieć co najmniej 6 znaków.");
  });

  it("return default error", () => {
    const result = getAuthErrorMessage({
      message: "Custom error",
    });

    expect(result).toBe("Custom error");
  });
});
