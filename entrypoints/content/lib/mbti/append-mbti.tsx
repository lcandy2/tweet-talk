import ReactDOM from "react-dom/client";
import React from "react";
import { MBTICard, MBTILabel } from "@/entrypoints/content/components/mbti";
import { getMBTIUserUUID } from "@/entrypoints/content/lib/mbti";

export function appendMBTI() {
  let currentUrl = window.location.href;

  const removeExistingMBTI = () => {
    const labelElement = document.getElementById("ai-tweet-mbti-label");
    const contentElement = document.getElementById("ai-tweet-mbti-content");

    if (labelElement) {
      labelElement.remove();
    }

    if (contentElement) {
      contentElement.remove();
    }
  };

  const handleUrlChange = () => {
    if (window.location.href !== currentUrl) {
      currentUrl = window.location.href;
      removeExistingMBTI();
    }
  };

  // Set up a MutationObserver to watch for URL changes
  const observer = new MutationObserver(handleUrlChange);
  observer.observe(document.querySelector("body")!, {
    childList: true,
    subtree: true,
  });

  // Clean up the observer when the component unmounts
  window.addEventListener("beforeunload", () => {
    observer.disconnect();
  });

  const userUUID = getMBTIUserUUID();

  appendMBTILabel(userUUID);
  appendMBTIContent(userUUID);
}

function appendMBTILabel(uuid: string) {
  const nameDiv = document.querySelector(
    "div.css-175oi2r.r-18u37iz.r-1w6e6rj.r-6gpygo",
  );
  const id = "ai-tweet-mbti-label";
  const existDiv = nameDiv?.querySelector(`#${id}`);
  if (!nameDiv || existDiv) {
    return;
  }

  // Create a new div element
  const mbtiDiv = document.createElement("div");
  mbtiDiv.id = id;
  mbtiDiv.style.display = "content";
  mbtiDiv.className = "css-175oi2r";

  // Find the target position and insert the new element
  const targetElement =
    nameDiv.children[0].children[0].children[0].children[0].children[0]
      .children[0];
  if (targetElement && targetElement.parentNode) {
    if (targetElement.nextSibling) {
      targetElement.parentNode.insertBefore(mbtiDiv, targetElement.nextSibling);
    } else {
      targetElement.parentNode.appendChild(mbtiDiv);
    }
  }

  ReactDOM.createRoot(mbtiDiv).render(
    <React.StrictMode>
      <MBTILabel uuid={uuid} />
    </React.StrictMode>,
  );
}

function appendMBTIContent(uuid: string) {
  const targetDiv = document.querySelector(
    "div.css-175oi2r.r-3pj75a.r-ttdzmv.r-1ifxtd0",
  ) as HTMLDivElement | null;
  const id = "ai-tweet-mbti-content";
  const existDiv = targetDiv?.querySelector(`#${id}`);
  if (!targetDiv || existDiv) {
    return;
  }

  targetDiv.style.marginBottom = "0px";

  // Create a new div element
  const mbtiDiv = document.createElement("div");
  mbtiDiv.id = id;
  mbtiDiv.style.display = "content";
  mbtiDiv.className = "css-175oi2r";

  targetDiv.appendChild(mbtiDiv);

  ReactDOM.createRoot(mbtiDiv).render(
    <React.StrictMode>
      <MBTICard uuid={uuid} />
    </React.StrictMode>,
  );
}

function removeMBTIElements() {
  const mbtiLabel = document.querySelector("#ai-tweet-mbti-label");
  const mbtiContent = document.querySelector("#ai-tweet-mbti-content");
  const mbtiIFrame = document.querySelector("#ai-tweet-mbti-data-iframe");

  mbtiLabel?.remove();
  mbtiContent?.remove();
  mbtiIFrame?.remove();
}

function appendMBTIDataIFrame() {
  const targetDiv = document.querySelector(
    "div.css-175oi2r.r-3pj75a.r-ttdzmv.r-1ifxtd0",
  ) as HTMLDivElement | null;
  const id = "ai-tweet-mbti-data-iframe";
  const existDiv = targetDiv?.querySelector(`#${id}`);
  if (!targetDiv || existDiv) {
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.id = "ai-tweet-mbti-data-iframe";
  iframe.src = window.location.href;
  targetDiv.appendChild(iframe);
}
