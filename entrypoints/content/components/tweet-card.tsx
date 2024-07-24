import { useEffect, useState } from "react";
import {
  extractData,
  TweetData,
} from "@/entrypoints/content/lib/data-analysis.ts";
import ShineBorder from "@/entrypoints/content/components/shine-border.tsx";
import { API_AI_TWEET } from "@/entrypoints/content/lib/config.ts";
import { sendMessage } from "@/entrypoints/background/messaging.ts";
import { Card } from "@/entrypoints/content/components/ui/card.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/entrypoints/content/components/ui/avatar.tsx";
import { Separator } from "@/entrypoints/content/components/ui/separator.tsx";
import { Skeleton } from "@/entrypoints/content/components/ui/skeleton.tsx";
import { localExtStorage } from "@webext-core/storage";
import { getImgName } from "@/entrypoints/content/lib/get-img-name.ts";

interface TweetCardProps {
  element: Element;
}

export function TweetCard({ element }: TweetCardProps) {
  const [tweetData, setTweetData] = useState<TweetData | null>(null);
  const [repliedMessage, setRepliedMessage] = useState([]);
  const [noReplies, setNoReplies] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const data = extractData(element);
      if (data) {
        setTweetData(data);
      }
    }, 0);
  }, []);

  useEffect(() => {
    if (tweetData) {
      const fetchTweet = async () => {
        const value = await localExtStorage.getItem("cache");
        if (value) {
          const cache = JSON.parse(value);
          if (cache[tweetData.tweetUUID]) {
            setRepliedMessage(cache[tweetData.tweetUUID]);
            setIsFinished(true);
            return;
          }
        }
        try {
          const res = await sendMessage("backgroundFetch", {
            url: API_AI_TWEET,
            options: {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                tweet_uuid: tweetData.tweetId,
                tweet_content: tweetData.content,
                tweet_created_time: tweetData.time,
                author_nick_name: tweetData.author,
                author_id: tweetData.authorId,
                wanted_roles: [],
              }),
            },
          });
          console.log(res);
          if (res && JSON.stringify(res).includes("reply")) {
            const value = await localExtStorage.getItem("cache");
            if (value) {
              const cache = JSON.parse(value);
              cache[tweetData.tweetUUID] = res.results;
              await localExtStorage.setItem("cache", JSON.stringify(cache));
            } else {
              const cache: any = {};
              cache[tweetData.tweetUUID] = res.results;
              await localExtStorage.setItem("cache", JSON.stringify(cache));
            }
            setRepliedMessage(res.results);
            setIsFinished(true);
          } else {
            setIsFinished(true);
            setNoReplies(true);
          }
        } catch (e) {
          console.error(e);
          setIsFinished(true);
          setNoReplies(true);
        }
      };

      fetchTweet();
    }
  }, [tweetData]);

  return (
    <div>
      <Card className="flex flex-col items-start w-full mb-2">
        {!noReplies ? (
          <ShineBorder
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            className="flex flex-col items-start w-full"
          >
            {!isFinished && <TweetCardSkeleton />}
            {repliedMessage.length !== 0 &&
              repliedMessage.map((message: any, index) => (
                <>
                  {index >= 1 && repliedMessage.length > 1 && (
                    <Separator
                      key={`seprator-${message.role}-${message.reply.slice(0, 5)}-${index}`}
                    />
                  )}
                  <TweetCardContent
                    key={`content-${message.role}-${message.reply.slice(0, 5)}-${index}`}
                    aiName={message.role}
                    aiContent={message.reply}
                  />
                </>
              ))}
            <p className="text-sm w-full font-light text-gray-400 text-end">
              presented by{" "}
              <a href="https://github.com/lcandy2/tweet-talk" target="_blank">
                AI Tweet
              </a>
            </p>
          </ShineBorder>
        ) : (
          <section className="flex flex-row items-start p-3 gap-2 w-full">
            <p>暂无评论。</p>
          </section>
        )}
      </Card>
    </div>
  );
}

interface TweetCardContentProps {
  aiName?: string;
  aiAvatar?: string;
  aiContent: string;
}

export function TweetCardSkeleton() {
  return (
    <section className="flex flex-row items-start p-3 gap-2 w-full">
      <Skeleton
        className="h-10 w-10 rounded-full"
        style={{ borderRadius: "9999px" }}
      />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </section>
  );
}

export function TweetCardContent({
  aiName,
  aiAvatar,
  aiContent,
}: TweetCardContentProps) {
  return (
    <section className="flex flex-row items-start p-3 gap-2 w-full">
      <Avatar>
        <AvatarImage src={getImgName(aiName || "")} />
        <AvatarFallback>{aiName}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="font-bold">{aiName}</p>
        <div>
          <p>{aiContent}</p>
        </div>
      </div>
    </section>
  );
}
