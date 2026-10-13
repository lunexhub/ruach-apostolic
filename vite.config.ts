// This config uses @lovable.dev/vite-tanstack-config which includes:
//   - TanStack devtools (dev-only), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//   - nitro (build-only), VITE_* env injection, @ path alias, React/TanStack dedupe
// Additional config can be passed via defineConfig({ vite: { ... }, etc... })
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (SSR error wrapper).
    server: { entry: "server" },
  },
});
