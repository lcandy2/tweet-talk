import ReactDOM from "react-dom/client";
import React from "react";
import {TweetCard} from "@/entrypoints/content/components/tweet-card.tsx";

export function detectChanges() {
  const timelineDiv = document.querySelector('div.css-175oi2r.r-f8sm7e.r-13qz1uu.r-1ye8kvj > section > div.css-175oi2r');
  if (!timelineDiv) {
    return;
  }
  const timelineChildren = timelineDiv.childNodes[0].childNodes;
  if (!timelineChildren) {
    return;
  }
  timelineChildren.forEach((child) => {
    const articleCoreContent = (child as Element).querySelector('div.css-175oi2r.r-16y2uox.r-1wbh5a2.r-1ny4l3l > div.css-175oi2r.r-18u37iz');
    // console.log(articleCoreContent);
    const articleParentElement = articleCoreContent?.parentElement;
    if (!articleParentElement) {
      return;
    }
    // const talkElement = articleCoreContent?.cloneNode(true);
    if (articleParentElement.querySelector('.tweet-talk')) {
      return;
    }
    const talkElement = document.createElement('div');
    talkElement.setAttribute('class', 'css-175oi2r r-18u37iz tweet-talk');
    // const app = createApp(TweetCard);
    // app.mount(talkElement);
    articleParentElement.append(talkElement);
    ReactDOM.createRoot(talkElement).render(
        <React.StrictMode>
          <TweetCard element={articleCoreContent}/>
        </React.StrictMode>,
    );
  })
}
