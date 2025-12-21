import { defineConfig } from "vite";

export default defineConfig({
  root: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "./index.html",
        login: "./auth/login.html",
        signup: "./auth/signup.html",
        home: "./dashboard/home.html",
        history: "./dashboard/history.html",
        analysis: "./dashboard/analysis.html",
        profile: "./dashboard/profile.html",
        navbar: "./dashboard/navbar.html"
      }
    }
  }
});
