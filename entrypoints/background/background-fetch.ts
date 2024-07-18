import { onMessage } from "@/entrypoints/background/messaging.ts";

export function backgroundFetch() {
  onMessage("backgroundFetch", (message): Promise<Response> => {
    const { url, options } = message.data;
    return new Promise<any>((resolve, reject) => {
      fetch(url, options)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
    });
  });
}
