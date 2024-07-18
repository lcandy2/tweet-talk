import { detectChanges } from "@/entrypoints/content/lib/detect-changes";
import "./app.css";

export default defineContentScript({
  matches: ["*://*.x.com/*", "*://*.twitter.com/*"],
  async main() {
    console.log("Hello content.");

    const callback = () => {
      // Check for the specific element 'timelineDiv'
      detectChanges();
    };

    const observer = new MutationObserver(callback);

    const config = { attributes: true, childList: true, subtree: true };

    observer.observe(document.body, config);
  },
});
