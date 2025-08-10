import { v5 as uuidv5 } from "uuid";

export interface TweetData {
  tweetId: string;
  tweetUUID: string;
  content: string;
  author: string;
  authorId: string;
  time: string;
}

export function extractTweetData(element: Element): TweetData {
  let content =
    element.querySelector(
      "div.css-146c3p1.r-8akbws.r-krxsd3.r-dnmrzs.r-1udh08x.r-bcqeeo.r-1ttztb7.r-qvutc0",
    )?.textContent || "";
  if (!content) {
    content =
      element.querySelector<HTMLElement>('div[data-testid="tweetText"]')
        ?.textContent ?? "";
  }

  let author =
    element.querySelector(
      "div.css-146c3p1.r-bcqeeo.r-1ttztb7.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe",
    )?.textContent || "";
  if (!author) {
    author =
      element.querySelector<HTMLElement>(
        'div[data-testid="User-Name"] a > div > div',
      )?.textContent ?? "";
  }

  let authorId =
    element.querySelector(
      "div.css-146c3p1.r-dnmrzs.r-1udh08x.r-3s2u2q.r-bcqeeo.r-1ttztb7.r-qvutc0",
    )?.textContent || "";
  if (!authorId) {
    authorId =
      element.querySelector<HTMLElement>(
        'div[data-testid="User-Name"] a:last-child',
      )?.textContent ?? "";
  }

  let time =
    element
      .querySelector("div.css-175oi2r.r-18u37iz.r-1q142lx > a > time")
      ?.getAttribute("datetime") || "time";
  if (!time) {
    time =
      element
        .querySelector<HTMLTimeElement>("time")
        ?.getAttribute("datetime") ?? "";
  }

  const tweetId = `tweet-${authorId}-${time}-${content.slice(0, 10)}`;

  const NAMESPACE_UUID = "1b671a64-40d5-491e-99b0-da01ff1f3341";
  const tweetUUID = uuidv5(tweetId, NAMESPACE_UUID);

  return {
    tweetId,
    tweetUUID,
    content,
    author,
    authorId,
    time,
  };
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
