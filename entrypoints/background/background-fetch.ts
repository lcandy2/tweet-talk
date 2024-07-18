import { onMessage } from "@/entrypoints/background/messaging.ts";

export function backgroundFetch() {
  console.log("backgroundFetch");
  onMessage("backgroundFetch", (message) => {
    const msg = message.data;
    return new Promise<void>((resolve, reject) => {
      fetch(msg.url, msg.options)
        .then((data) => resolve())
        .catch((error) => reject(error));
    });
  });
}
