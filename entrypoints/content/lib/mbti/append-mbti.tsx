import ReactDOM from "react-dom/client";
import React from "react";
import { MBTILabel } from "@/entrypoints/content/components/mbti/mbti-label.tsx";
import { MBTICard } from "../../components/mbti/mbti-card";

export function appendMBTI() {
  appendMBTILabel();
  appendMBTIContent();
}

function appendMBTILabel() {
  const nameDiv = document.querySelector(
    "div.css-175oi2r.r-18u37iz.r-1w6e6rj.r-6gpygo",
  );
  const existDiv = nameDiv?.querySelector("#ai-tweet-mbti-label");
  if (!nameDiv || existDiv) {
    return;
  }

  // Create a new div element
  const mbtiDiv = document.createElement('div');
  mbtiDiv.id = 'ai-tweet-mbti-label';
  mbtiDiv.style.display = 'content';
  mbtiDiv.className = 'css-175oi2r';

  // Find the target position and insert the new element
  const targetElement = nameDiv.children[0];
  if (targetElement && targetElement.parentNode) {
    if (targetElement.nextSibling) {
      targetElement.parentNode.insertBefore(mbtiDiv, targetElement.nextSibling);
    } else {
      targetElement.parentNode.appendChild(mbtiDiv);
    }
  }

  ReactDOM.createRoot(mbtiDiv).render(
    <React.StrictMode>
      <MBTILabel />
    </React.StrictMode>,
  );
}

function appendMBTIContent() {
  const targetDiv = document.querySelector(
    "div.css-175oi2r.r-3pj75a.r-ttdzmv.r-1ifxtd0",
  ) as HTMLDivElement | null;
  const existDiv = targetDiv?.querySelector("#ai-tweet-mbti-content");
  if (!targetDiv || existDiv) {
    return;
  }

  targetDiv.style.marginBottom = '0px';

  // Create a new div element
  const mbtiDiv = document.createElement('div');
  mbtiDiv.id = 'ai-tweet-mbti-content';
  mbtiDiv.style.display = 'content';
  mbtiDiv.className = 'css-175oi2r';

  targetDiv.appendChild(mbtiDiv);

  ReactDOM.createRoot(mbtiDiv).render(
    <React.StrictMode>
      <MBTICard />
    </React.StrictMode>,
  );
}
