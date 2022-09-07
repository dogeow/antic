import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default ({ mode }: { mode: string }) => {
  return defineConfig({
    build: {
      sourcemap: false,
    },
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      extensions: [".js", ".ts", ".tsx", ".jsx"],
    },
  });
};
