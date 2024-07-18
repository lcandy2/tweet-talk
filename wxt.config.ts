import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  vite: () => ({
    plugins: [
      react({
        babel: {
          presets: ["@babel/preset-typescript"],
          plugins: [
            "@babel/plugin-transform-typescript",
            [
              "babel-plugin-styled-components",
              {
                ssr: false,
                pure: true,
                displayName: true,
                fileName: false,
              },
            ],
          ],
        },
      }),
    ],
  }),
});
