import { auth } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";

console.log("Auth Guard: Initializing...");

onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;
  const isAuthPage = path.includes("/auth/");

  if (user) {
    console.log("✅ Auth Guard: User is authenticated:", user.email);
    // If on login page, redirect to dashboard
    if (isAuthPage) {
      window.location.replace("/dashboard/home.html");
    }
  } else {
    console.warn("⛔ Auth Guard: No user found.");
    // If on dashboard (not auth page), redirect to login
    if (!isAuthPage) {
      window.location.replace("/auth/login.html");
    }
  }
});
