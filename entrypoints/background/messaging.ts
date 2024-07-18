import { defineExtensionMessaging } from "@webext-core/messaging";

interface BackgroundFetchMessageProps {
  url: string | URL | globalThis.Request;
  options: RequestInit;
}

interface ProtocolMap {
  backgroundFetch(msg: BackgroundFetchMessageProps): Promise<any>;
}

export const { sendMessage, onMessage } =
  defineExtensionMessaging<ProtocolMap>();
