import { v5 as uuidv5 } from "uuid";

export interface TweetData {
  tweetId: string;
  tweetUUID: string;
  content: string;
  author: string;
  authorId: string;
  time: string;
  images: string[];
}

export function extractTweetData(element: Element): TweetData {
  const content =
    element.querySelector(
      "div.css-146c3p1.r-8akbws.r-krxsd3.r-dnmrzs.r-1udh08x.r-bcqeeo.r-1ttztb7.r-qvutc0",
    )?.textContent || "";
  const author =
    element.querySelector(
      "div.css-146c3p1.r-bcqeeo.r-1ttztb7.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe",
    )?.textContent || "";
  const authorId =
    element.querySelector(
      "div.css-146c3p1.r-dnmrzs.r-1udh08x.r-3s2u2q.r-bcqeeo.r-1ttztb7.r-qvutc0",
    )?.textContent || "";
  const time =
    element
      .querySelector("div.css-175oi2r.r-18u37iz.r-1q142lx > a > time")
      ?.getAttribute("datetime") || "time";
  const images: string[] = [];
  const imageElements = document.querySelectorAll(
    'div[aria-label="Image"].css-175oi2r.r-1mlwlqe.r-1udh08x.r-417010.r-1p0dtai.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af > img',
  );
  imageElements.forEach((imageElement) => {
    images.push(imageElement.getAttribute("src") || "");
  });
  const tweetId = `tweet-${authorId}-${time}-${content.slice(0, 10)}`;
  const NAMESPACE_UUID = "1b671a64-40d5-491e-99b0-da01ff1f3341";
  const tweetUUID = uuidv5(tweetId, NAMESPACE_UUID);

  const data: TweetData = {
    tweetId,
    tweetUUID,
    content,
    author,
    authorId,
    time,
    images,
  };

  return data;
}

export function exportTweetDatas(element: Element) {
  const existingDataList = JSON.parse(
    localStorage.getItem("tweetTalk-dataList") || "[]",
  );

  const tweetData = extractTweetData(element);

  if (
    existingDataList.find(
      (data: TweetData) => data.tweetId === tweetData.tweetId,
    )
  ) {
    return;
  }

  existingDataList.push(tweetData);

  localStorage.setItem("tweetTalk-dataList", JSON.stringify(existingDataList));

  console.log("Data exported:", existingDataList);
}
