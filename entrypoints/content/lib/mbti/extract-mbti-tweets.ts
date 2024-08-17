export interface MBTITweetData {
  tweetId: string;
  content: string;
  author: string;
  authorId: string;
  time: string;
  images: string[];
}

export async function extractMBTITweetsWithScroll(): Promise<MBTITweetData[]> {
  const tweets: MBTITweetData[] = [];
  const seenTweetIds = new Set<string>();
  const minTweets = 3;
  let noNewTweetsCount = 0;
  const maxNoNewTweets = 5;

  console.log("开始提取推文...");

  const pageUsernameElement = document.querySelector<HTMLElement>(
    'div[data-testid="UserName"] div[dir="ltr"] span',
  );
  const pageUsername = pageUsernameElement?.textContent ?? "";
  if (!pageUsername) {
    console.log(
      "Couldn't find the page username. Make sure you're on a user's profile page.",
    );
    return [];
  }
  console.log("当前页面用户名:", pageUsername);

  function extractSingleTweet(element: Element): MBTITweetData {
    const content =
      element.querySelector<HTMLElement>('div[data-testid="tweetText"]')
        ?.textContent ?? "";
    const author =
      element.querySelector<HTMLElement>(
        'div[data-testid="User-Name"] a > div > div',
      )?.textContent ?? "";
    const authorId =
      element.querySelector<HTMLElement>(
        'div[data-testid="User-Name"] a:last-child',
      )?.textContent ?? "";
    const time =
      element
        .querySelector<HTMLTimeElement>("time")
        ?.getAttribute("datetime") ?? "";

    const images = Array.from(
      element.querySelectorAll<HTMLImageElement>('img[alt="Image"]'),
    ).map((img) => img.src);

    const tweetId = `tweet-${authorId}-${time}-${content.slice(0, 14)}`;

    console.log("提取到推文:", {
      tweetId,
      content: content.slice(0, 50) + "...",
      author,
      authorId,
      time,
    });
    return { tweetId, content, author, authorId, time, images };
  }

  async function smoothScroll(): Promise<void> {
    console.log("滚动页面...");
    const currentPosition = window.pageYOffset;
    const newPosition = currentPosition + window.innerHeight * 1.5;
    window.scrollTo({
      top: newPosition,
      behavior: "smooth",
    });
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  async function scrollToTop(): Promise<void> {
    console.log("滚动回顶部...");
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  let scrollCount = 0;
  const maxScrolls = 50;

  while (
    tweets.length < 14 &&
    scrollCount < maxScrolls &&
    noNewTweetsCount < maxNoNewTweets
  ) {
    const initialTweetCount = tweets.length;
    const tweetElements = document.querySelectorAll<HTMLElement>(
      'article[data-testid="tweet"]',
    );

    console.log(`找到 ${tweetElements.length} 个推文元素`);

    for (const element of tweetElements) {
      const tweet = extractSingleTweet(element);
      if (tweet.author === pageUsername && !seenTweetIds.has(tweet.tweetId)) {
        seenTweetIds.add(tweet.tweetId);
        tweets.push(tweet);
        console.log(`添加新推文，当前总数: ${tweets.length}`);
        if (tweets.length >= 14) break;
      }
    }

    if (tweets.length === initialTweetCount) {
      noNewTweetsCount++;
      console.log(`没有新推文，计数: ${noNewTweetsCount}`);
    } else {
      noNewTweetsCount = 0;
    }

    if (tweets.length < 14) {
      await smoothScroll();
      scrollCount++;
      console.log(`滚动次数: ${scrollCount}`);
    }

    if (tweets.length >= minTweets && noNewTweetsCount >= maxNoNewTweets) {
      console.log(
        `已收集 ${tweets.length} 条推文。多次滚动后没有新推文，停止提取。`,
      );
      break;
    }
  }

  await scrollToTop();

  console.log(`提取完成，共收集 ${tweets.length} 条推文`);
  console.log("提取的推文:", tweets);

  return tweets;
}
