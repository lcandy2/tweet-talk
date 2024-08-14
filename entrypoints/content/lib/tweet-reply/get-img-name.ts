import { browser } from "wxt/browser";

export function getImgName(name: string) {
  if (name.includes("马斯克")) {
    return browser.runtime.getURL("/avatars/ElonMusk.png");
  } else if (name.includes("美国队长")) {
    return browser.runtime.getURL("/avatars/美国队长.png");
  } else if (name.includes("拉康")) {
    return browser.runtime.getURL("/avatars/拉康.png");
  } else if (name.includes("张爱玲")) {
    return browser.runtime.getURL("/avatars/张爱玲2024.png");
  } else if (name.includes("某创坛合伙人")) {
    return browser.runtime.getURL("/avatars/某创坛合伙人.png");
  } else if (name.includes("莎士比亚")) {
    return browser.runtime.getURL("/avatars/Shakespeare.png");
  }
}
