import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      // We use 'eslint' because your package.json has eslint 9.x
      eslint: {
        // Tells the plugin to use the modern "flat" config system
        useFlatConfig: true,
        // The exact command to run the check
        lintCommand: 'eslint "./src/**/*.{js,jsx}"',
      },
      // This prevents the "red screen" from blocking your view in dev
      overlay: {
        initialIsOpen: false,
      },
    }),
  ],
});
