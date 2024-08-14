import { injectMagicButton } from "@/entrypoints/content/lib/inject-magic-button";
import "./app.css";
import { appendReplies } from "@/entrypoints/content/lib/tweet-reply";

export default defineContentScript({
  matches: ["*://*.x.com/*", "*://*.twitter.com/*"],
  async main() {
    console.log("Hello content.");

    const callback = () => {
      // Check for the specific element 'timelineDiv'
      appendReplies();
      injectMagicButton();
    };

    const observer = new MutationObserver(callback);

    const config = { attributes: true, childList: true, subtree: true };

    observer.observe(document.body, config);
  },
});
