import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  reload,
} from "firebase/auth";

export const getAuthErrorMessage = (error) => {
  const code = error?.code;
  switch (code) {
    case "auth/invalid-email":
      return "Nieprawidłowy adres email.";
    case "auth/user-disabled":
      return "Konto zostało zablokowane.";
    case "auth/user-not-found":
      return "Nie znaleziono konta o tym adresie email.";
    case "auth/wrong-password":
      return "Nieprawidłowe hasło.";
    case "auth/invalid-login-credentials":
      return "Nieprawidłowe dane logowania.";
    case "auth/weak-password":
      return "Hasło musi mieć co najmniej 6 znaków.";
    case "auth/email-already-in-use":
      return "Email jest już używany przez inne konto.";
    case "auth/operation-not-allowed":
      return "Ta operacja nie jest dozwolona.";
    case "auth/too-many-requests":
      return "Za dużo prób logowania. Spróbuj ponownie później.";
    case "auth/missing-password":
      return "Brakuje hasła.";
    default:
      return error?.message || "Wystąpił błąd autoryzacji.";
  }
};

export const registerUser = async ({ email, password, firstName, lastName }) => {
  try {
    const { auth } = await import("../firebase");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const displayName = firstName
      ? firstName.trim()
      : lastName
      ? lastName.trim()
      : email.split("@")[0];

    await updateProfile(user, { displayName });
    await reload(user);
    user.displayName = displayName;

    return auth.currentUser || user;
  } catch (error) {
    console.error("Błąd rejestracji:", error.message);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const { auth } = await import("../firebase");
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Bląd logowania:", error.message);
    throw error;
  }
};


export const logoutUser = async () => {
  const { auth } = await import("../firebase");
  await signOut(auth);
};