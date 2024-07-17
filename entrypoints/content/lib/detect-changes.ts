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
    const talkElement = articleCoreContent?.cloneNode(true);
    (talkElement as Element)?.classList.add('tweet-talk');
    if (articleParentElement.querySelector('.tweet-talk')) {
      return;
    }
    articleParentElement.append(talkElement);
  })
}
