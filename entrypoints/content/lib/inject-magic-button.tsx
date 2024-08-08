import React from 'react';
import ReactDOM from 'react-dom/client';
import { MagicButton } from '@/entrypoints/content/components/magic-button';
import ShineBorder from '@/entrypoints/content/components/shine-border';
import AnimatedGradientText from '@/entrypoints/content/components/magicui/animated-gradient-text';
import { cn } from '@/entrypoints/content/lib/utils';

export function injectMagicButton() {
  const profileDiv = document.querySelector('.css-175oi2r.r-18u37iz.r-1w6e6rj.r-6gpygo.r-14gqq1x');
  if (!profileDiv || profileDiv.querySelector('#magic-button')) return;

  // 保存原始内容
  const originalContent = profileDiv.innerHTML;

  // 清空 profileDiv
  profileDiv.innerHTML = '';

  // 设置 profileDiv 的样式
  profileDiv.style.display = 'flex';
  profileDiv.style.justifyContent = 'space-between';
  profileDiv.style.width = '100%';

  // 创建新的容器来保存原始内容
  const originalContentContainer = document.createElement('div');
  originalContentContainer.className = profileDiv.className;
  originalContentContainer.innerHTML = originalContent;

  // 创建按钮容器
  const buttonContainer = document.createElement('div');
  buttonContainer.id = 'magic-button';

  // 将原始内容容器和按钮容器添加到 profileDiv
  profileDiv.appendChild(originalContentContainer);
  profileDiv.appendChild(buttonContainer);

  // 渲染按钮
  const root = ReactDOM.createRoot(buttonContainer);
  root.render(
    <React.StrictMode>
      <MagicButton onClick={handleMagicButtonClick} />
    </React.StrictMode>
  );
}

function handleMagicButtonClick() {
  if (document.querySelector('#magic-content')) return;

  const profileDiv = document.querySelector('.css-175oi2r.r-18u37iz.r-1w6e6rj.r-6gpygo.r-14gqq1x');
  if (!profileDiv) return;

  // 获取 profileDiv 后面的第二个兄弟元素
  let targetSibling = profileDiv.nextElementSibling;
  // if (targetSibling) {
  //   targetSibling = targetSibling.nextElementSibling;
  // }

  const contentContainer = document.createElement('div');
  contentContainer.id = 'magic-content';
  contentContainer.style.width = '100%';

  // 如果找到了目标兄弟元素，就插入到它后面；否则，插入到 profileDiv 后面
  if (targetSibling) {
    targetSibling.parentNode?.insertBefore(contentContainer, targetSibling.nextSibling);
  } else {
    profileDiv.parentNode?.insertBefore(contentContainer, profileDiv.nextSibling);
  }

  const root = ReactDOM.createRoot(contentContainer);
  root.render(
    <React.StrictMode>
      <div className="w-full mb-3">
        <AnimatedGradientText>
          <span
            className={cn(
              `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
            )}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </span>
        </AnimatedGradientText>
      </div>
    </React.StrictMode>
  );
}