import React from "react";
import ReactDOM from "react-dom/client";
import { MagicButton } from "@/entrypoints/content/components/magic-button";
import ShineBorder from "@/entrypoints/components/magicui/shine-border.tsx";
import AnimatedGradientText from "@/entrypoints/components/magicui/animated-gradient-text";
import { cn } from "@/entrypoints/lib/utils.ts";
import { extractTweetsWithScroll } from "@/entrypoints/content/lib/extract-tweets";
import { sendMessage } from "@/entrypoints/background/messaging.ts";
import { API_DIFY, API_DIFY_SECRET } from "@/entrypoints/content/lib/config.ts";

export function injectMagicButton() {
  const profileDiv = document.querySelector(
    ".css-175oi2r.r-18u37iz.r-1w6e6rj.r-6gpygo.r-14gqq1x",
  );
  if (!profileDiv || profileDiv.querySelector("#magic-button")) return;

  // 保存原始内容
  const originalContent = profileDiv.innerHTML;

  // 清空 profileDiv
  profileDiv.innerHTML = "";

  // 设置 profileDiv 的样式
  profileDiv.style.display = "flex";
  profileDiv.style.justifyContent = "space-between";
  profileDiv.style.width = "100%";

  // 创建新的容器来保存原始内容
  const originalContentContainer = document.createElement("div");
  originalContentContainer.className = profileDiv.className;
  originalContentContainer.innerHTML = originalContent;

  // 创建按钮容器
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "magic-button";

  // 将原始内容容器和按钮容器添加到 profileDiv
  profileDiv.appendChild(originalContentContainer);
  profileDiv.appendChild(buttonContainer);

  // 渲染按钮
  const root = ReactDOM.createRoot(buttonContainer);
  root.render(
    <React.StrictMode>
      <MagicButton onClick={handleMagicButtonClick} />
    </React.StrictMode>,
  );
}

async function handleMagicButtonClick() {
  if (document.querySelector("#magic-content")) return;

  const profileDiv = document.querySelector(
    ".css-175oi2r.r-18u37iz.r-1w6e6rj.r-6gpygo.r-14gqq1x",
  );
  if (!profileDiv) return;

  let targetSibling = profileDiv.nextElementSibling;

  const contentContainer = document.createElement("div");
  contentContainer.id = "magic-content";
  contentContainer.style.width = "100%";

  if (targetSibling) {
    targetSibling.parentNode?.insertBefore(
      contentContainer,
      targetSibling.nextSibling,
    );
  } else {
    profileDiv.parentNode?.insertBefore(
      contentContainer,
      profileDiv.nextSibling,
    );
  }

  const root = ReactDOM.createRoot(contentContainer);

  // 显示加载状态
  root.render(
    <React.StrictMode>
      <div className="w-full mb-3">
        <AnimatedGradientText>
          <span
            className={cn(
              `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
            )}
          >
            正在提取用户信息和推文，请稍候...
          </span>
        </AnimatedGradientText>
      </div>
    </React.StrictMode>,
  );

  try {
    console.log("开始提取用户信息和推文...");
    const tweets = await extractTweetsWithScroll();

    // 提取用户信息
    const getTextContent = (selector) => {
      const element = document.querySelector(selector);
      return element ? element.textContent.trim() : "Not found";
    };

    const getAttribute = (selector, attribute) => {
      const element = document.querySelector(selector);
      return element ? element.getAttribute(attribute) : "Not found";
    };

    const userInfo = {
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
    };

    // 组合用户信息和推文
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

    // 发送请求到API
    const username = userInfo.username.replace("@", "");
    const response = await fetch(API_DIFY, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_DIFY_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {
          // 目前只写了生成一次（读缓存），如果要刷新生成新的结果，就需要再有一个button传请求把refresh传yes
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

    // 解析 answer，这三个提取出来的字段可以用来展示
    const [mbti, report, celebrity] = data.answer
      .split("***")
      .map((item) => item.trim());

    // 显示API返回的结果
    root.render(
      <React.StrictMode>
        <div className="w-full mb-3">
          <AnimatedGradientText>
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
              )}
            >
              分析完成
            </span>
          </AnimatedGradientText>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold mb-2 text-lg">MBTI分析结果：</h3>
            <div className="mb-4">
              <h4 className="font-semibold text-md">MBTI类型：</h4>
              <p className="text-sm">{mbti}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold text-md">详细报告：</h4>
              <pre className="whitespace-pre-wrap text-sm">{report}</pre>
            </div>
            <div>
              <h4 className="font-semibold text-md">相似名人：</h4>
              <p className="text-sm">{celebrity}</p>
            </div>
          </div>
        </div>
      </React.StrictMode>,
    );
  } catch (error) {
    console.error("Error:", error);
    root.render(
      <React.StrictMode>
        <div className="w-full mb-3">
          <AnimatedGradientText>
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
              )}
            >
              分析失败，请稍后重试。错误: {error.message}
            </span>
          </AnimatedGradientText>
        </div>
      </React.StrictMode>,
    );
  }
}
