import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { envOnlyMacros } from "vite-env-only";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
    reactRouter(),
		tsconfigPaths(),
		envOnlyMacros(),
	],
	build: {
		sourcemap: true,
		target: "ES2022",
	},
	server: {
		warmup: {
			clientFiles: ["app/**/*.tsx"],
		},
	},
});
