import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const src = (dir: string) => fileURLToPath(new URL(`./src/${dir}`, import.meta.url));

// Ladle bundles its own @vitejs/plugin-react — don't add it again or CSS pipeline breaks
export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@components": src("components"),
      "@motion": src("motion"),
      "@stories": src("stories"),
      "@styles": src("styles"),
      "@tokens": src("tokens"),
      "@hooks": src("hooks"),
      "@lib": src("lib"),
    },
  },
});
