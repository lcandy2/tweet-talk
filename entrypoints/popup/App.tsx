import { useState } from "react";
import "./App.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/entrypoints/content/components/ui/card.tsx";
import { Textarea } from "@/entrypoints/content/components/ui/textarea.tsx";
import { Button } from "@/entrypoints/content/components/ui/button.tsx";
import ShineBorder from "@/entrypoints/content/components/shine-border.tsx";
import { Separator } from "@/entrypoints/content/components/ui/separator.tsx";
import { localExtStorage } from "@webext-core/storage";
import { sendMessage } from "@/entrypoints/background/messaging.ts";
import { API_AI_TWEET } from "@/entrypoints/content/lib/config.ts";
import {
  TweetCardContent,
  TweetCardSkeleton,
} from "@/entrypoints/content/components/tweet-card.tsx";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [repliedMessage, setRepliedMessage] = useState([]);
  const [noReplies, setNoReplies] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleActionButtonClick = async () => {
    setIsFetching(true);
    setNoReplies(false);
    setIsFinished(false);
    setRepliedMessage([]);
    if (inputValue) {
      const fetchTweet = async () => {
        try {
          const res = await sendMessage("backgroundFetch", {
            url: API_AI_TWEET,
            options: {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                tweet_uuid: "custom",
                tweet_content: inputValue,
                tweet_created_time: "now",
                author_nick_name: "user",
                author_id: "user",
                wanted_roles: [],
              }),
            },
          });
          console.log(res);
          if (res && JSON.stringify(res).includes("reply")) {
            setRepliedMessage(res.results);
            setIsFinished(true);
            setIsFetching(false);
          } else {
            setIsFinished(true);
            setIsFetching(false);
            setNoReplies(true);
          }
        } catch (e) {
          console.error(e);
          setIsFinished(true);
          setIsFetching(false);
          setNoReplies(true);
        }
      };

      fetchTweet();
    }
  };

  return (
    <>
      <Card className="min-w-[400px]">
        <CardHeader>
          <CardTitle className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-2 grow items-center">
              <img src="./icon/128.png" className="w-12 h-12" />
              AI Tweet
            </div>
            <div className="flex flex-row gap-2 items-center">
              <a
                href="https://x.com/AITweet_app"
                target="_blank"
                className="text-xs flex flex-row gap-0.5 items-center font-normal"
              >
                <img src="./icon/twitter.svg" className="w-4 h-4" />
                @AITweet_app
              </a>
              <a href="https://github.com/lcandy2/tweet-talk" target="_blank">
                <img src="./icon/github-light.svg" className="w-4 h-4" />
              </a>
            </div>
          </CardTitle>
          <CardDescription>输入内容，获得知名人士的锐评。</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="在这里输入内容..."
          />
        </CardContent>
        <CardFooter>
          <Button
            disabled={!inputValue || isFetching}
            onClick={handleActionButtonClick}
          >
            {isFetching ? "锐评中..." : "获得锐评！"}
          </Button>
        </CardFooter>
      </Card>

      {(isFetching || isFinished) && (
        <Card className="flex flex-col items-start w-full text-base">
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
      )}
    </>
  );
}

export default App;
