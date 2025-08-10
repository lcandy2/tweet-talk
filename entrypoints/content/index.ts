import "./app.css";
import { appendReplies } from "@/entrypoints/content/lib/tweet-reply";
import { appendMBTI } from "./lib/mbti/append-mbti";

export default defineContentScript({
  matches: ["*://*.x.com/*", "*://*.twitter.com/*"],
  async main() {
    console.log("Hello content.");

    const callback = () => {
      // Check for the specific element 'timelineDiv'
      appendReplies();
      // TODO Fix it and then enable
      // appendMBTI();
      // injectMagicButton();
    };

    const observer = new MutationObserver(callback);

    const config = { attributes: true, childList: true, subtree: true };

    observer.observe(document.body, config);
  },
});
