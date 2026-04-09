import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "./auth";

const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

// Signup
export const signup = async (email, password) => {
  const userCreditial = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await sendEmailVerification(userCreditial.user);
  return userCreditial;
};

// Login
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logout = () => {
  return signOut(auth);
};

// Forgot Password

export const forgotPass = (email) => {
  return sendPasswordResetEmail(auth, email);
};
