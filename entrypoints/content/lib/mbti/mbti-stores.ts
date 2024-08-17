import { atom } from "jotai";
import { MBTIData } from "@/entrypoints/content/lib/mbti/get-mbti-data.ts";
import { atomWithExtStorage } from "@/entrypoints/lib/atom.ts";

type MBTIDataStoreType = Record<string, MBTIData>;

export const MBTIDataStore = atomWithExtStorage<MBTIDataStoreType | undefined>(
  "ai-tweet-mbti-data",
  undefined,
);

export enum MBTIStatusCode {
  Idle,
  Started,
  Pending,
  Processing,
  Success,
  Error,
}

export const MBTIStatusStore = atom<MBTIStatusCode>(MBTIStatusCode.Idle);
