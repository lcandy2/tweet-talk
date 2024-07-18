import { backgroundFetch } from "@/entrypoints/background/background-fetch.ts";

export default defineBackground(() => {
  // Executed when background is loaded
  backgroundFetch();
});
