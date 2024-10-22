import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://social-media-task-7xh2.onrender.com", // Proxy API calls to the backend server
    },
  },
});
