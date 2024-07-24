import { defineConfig } from "wxt";
import removeConsole from "vite-plugin-remove-console";
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "AI Tweet",
    web_accessible_resources: [
      {
        resources: ["*.png"],
        matches: ["*://*.x.com/*", "*://*.twitter.com/*"],
      },
    ],
    permissions: ["storage"],
    host_permissions: ["<all_urls>"],
  },
  vite: () => ({
    plugins: [
      removeConsole(),
      obfuscatorPlugin({
        options: {
          stringArray: true,
          stringArrayEncoding: ["base64"],
          splitStrings: true,
          identifierNamesGenerator: "hexadecimal",
        },
      }),
    ],
  }),
});
