import {
  extractMBTITweetsWithScroll,
  MBTITweetData,
} from "@/entrypoints/content/lib/mbti";
import { API_DIFY, API_DIFY_SECRET } from "@/entrypoints/content/lib/config.ts";

interface UserInfo {
  nickname: string;
  username: string;
  joinDate: string;
  userLocation: string;
  profilePhotoUrl: string;
  bio: string;
  followingCount: string;
  followersCount: string;
}

export interface MBTIData {
  mbti: string;
  report: string;
  celebrity: string;
}

const getTextContent = (selector: string): string => {
  const element = document.querySelector(selector);
  return element ? element.textContent?.trim() || "Not found" : "Not found";
};

const getAttribute = (selector: string, attribute: string): string => {
  const element = document.querySelector(selector);
  return element ? element.getAttribute(attribute) || "Not found" : "Not found";
};

const extractUserInfo = (): UserInfo => ({
  nickname: getTextContent(
    'div[data-testid="UserName"] div[dir="ltr"] > span > span',
  ),
  username: getTextContent(
    'div[data-testid="UserName"] div[dir="ltr"].css-146c3p1.r-dnmrzs',
  ),
  joinDate: getTextContent('span[data-testid="UserJoinDate"]'),
  userLocation: getTextContent('span[data-testid="UserLocation"]'),
  profilePhotoUrl: getAttribute('img[alt="Opens profile photo"]', "src"),
  bio: getTextContent('div[data-testid="UserDescription"]'),
  followingCount: getTextContent('a[href$="/following"] span span'),
  followersCount: getTextContent(
    'a[href$="/verified_followers"] span:first-child',
  ),
});

const combineTweetsInfo = (
  userInfo: UserInfo,
  tweets: MBTITweetData[],
): string => {
  let combinedInfo = `用户信息：
昵称：${userInfo.nickname}
用户名：${userInfo.username}
加入日期：${userInfo.joinDate}
位置：${userInfo.userLocation}
简介：${userInfo.bio}
关注数：${userInfo.followingCount}
粉丝数：${userInfo.followersCount}

最近的推文：\n`;

  tweets.forEach((tweet, index) => {
    combinedInfo += `
${index + 1}. 发布时间：${tweet.time}
内容：${tweet.content}
${tweet.images.length > 0 ? `图片数量：${tweet.images.length}` : ""}
-------------------
`;
  });

  return combinedInfo;
};

export const getMBTIData = async (): Promise<MBTIData> => {
  console.log("开始提取用户信息和推文...");
  const tweets = await extractMBTITweetsWithScroll();
  const userInfo = extractUserInfo();
  const combinedInfo = combineTweetsInfo(userInfo, tweets);

  const username = userInfo.username.replace("@", "");
  const response = await fetch(API_DIFY, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_DIFY_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: {
        refresh: "no",
        profile: combinedInfo,
        username: username,
      },
      query: username,
      response_mode: "blocking",
      conversation_id: "",
      user: "ai-tweet",
      files: [],
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const [mbti, report, celebrity] = data.answer
    .split("***")
    .map((item: string) => item.trim());

  return { mbti, report, celebrity };
};
