import { auth, onAuthStateChanged } from "./firebase.js";

console.log("Auth Guard: Initializing...");

onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;
  const isAuthPage = path.includes("/auth/");
  
  // Skip logic: if in guest mode, allow access
  const isGuest = sessionStorage.getItem("guest_mode") === "true";

  if (user || isGuest) {
    console.log("✅ Auth Guard: User authorized (User or Guest)");
    // If on login/signup page, redirect to dashboard
    if (isAuthPage) {
      window.location.replace("/dashboard/home.html");
    }
  } else {
    console.warn("⛔ Auth Guard: No user found.");
    // If on dashboard, redirect to login
    if (!isAuthPage) {
      window.location.replace("/auth/login.html");
    }
  }
});
