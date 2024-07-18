import { defineExtensionMessaging } from "@webext-core/messaging";

interface BackgroundFetchMessageProps {
  url: string | URL | globalThis.Request;
  options: RequestInit;
}

interface ProtocolMap {
  getStringLength(data: string): number;
  backgroundFetch(msg: BackgroundFetchMessageProps): void;
}

export const { sendMessage, onMessage } =
  defineExtensionMessaging<ProtocolMap>();
