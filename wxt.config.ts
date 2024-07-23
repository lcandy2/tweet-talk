import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "AI Tweet",
    web_accessible_resources: [
      {
        resources: ["*.png"],
        matches: ["<all_urls>"],
      },
    ],
    permissions: ["storage"],
    host_permissions: ["<all_urls>"],
  },
});
