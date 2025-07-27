import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { envOnlyMacros } from "vite-env-only";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [
    tailwindcss(),
    reactRouter(),
		tsconfigPaths(),
		envOnlyMacros(),
	],
  build: {
    target: "es2022",
  }
});
