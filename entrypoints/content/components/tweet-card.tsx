import { useEffect } from "react";
import {
  extractData,
  TweetData
} from "@/entrypoints/content/lib/data-analysis.ts";
import ShineBorder, {
  ShineBorderCore
} from "@/entrypoints/content/components/shine-border.tsx";
import { API_AI_TWEET } from "@/entrypoints/content/lib/config.ts";
import { sendMessage } from "@/entrypoints/background/messaging.ts";
import { Card } from "@/entrypoints/content/components/card.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/entrypoints/content/components/avatar.tsx";
import { Separator } from "@/entrypoints/content/components/separator.tsx";

interface TweetCardProps {
  element: Element;
}

export function TweetCard({ element }: TweetCardProps) {
  const [tweetData, setTweetData] = useState<TweetData | null>(null);
  const [repliedMessage, setRepliedMessage] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const data = extractData(element);
      if (data) {
        // setTweetData(data);
      }
    }, 0);
  }, []);

  useEffect(() => {
    if (tweetData) {
      const fetchTweet = async () => {
        try {
          const res = await sendMessage("backgroundFetch", {
            url: API_AI_TWEET,
            options: {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                tweet_uuid: tweetData.tweetId,
                tweet_content: tweetData.content,
                tweet_created_time: tweetData.time,
                author_nick_name: tweetData.author,
                author_id: tweetData.authorId,
                wanted_roles: []
              })
            }
          });
          console.log(res);
          if (res) {
            setRepliedMessage(res.results);
          }
        } catch (e) {
          console.error(e);
        }
      };

      fetchTweet();
    }
  }, [tweetData]);

  // if (repliedMessage.length === 0) {
  //   return null;
  // }

  return (
    <div>
      <Card className="flex flex-col items-start w-full">
        <ShineBorder color={["#A07CFE", "#FE8FB5", "#FFBE7B"]} className="flex flex-col items-start w-full">
          <section className="flex flex-row items-start p-3 gap-2 w-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="font-bold">Elon Mask</p>
              <div>
                <p>内容在这里</p>
                <p>内容在这里</p>
                <p>内容在这里</p>
                <p>内容在这里</p>
              </div>
            </div>
          </section>
          <Separator />
          <section className="flex flex-row items-start p-3 gap-2 w-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="font-bold">Elon Mask</p>
              <div>
                <p>内容在这里</p>
                <p>内容在这里</p>
                <p>内容在这里</p>
                <p>内容在这里</p>
              </div>
            </div>
          </section>
        </ShineBorder>
      </Card>
      {repliedMessage.length && repliedMessage.map((message: any, index) => (
        <TweetCardContent key={index} aiName={message.role} aiContent={message.reply} />
      ))}
    </div>
  );
}

interface TweetCardContentProps {
  aiName?: string;
  aiAvatar?: string;
  aiContent: string;
}

function TweetCardContent({ aiName, aiAvatar, aiContent }: TweetCardContentProps) {
  return (
    <div className="css-175oi2r r-18u37iz">
      <div className="css-175oi2r r-18kxxzh r-1wron08 r-onrtq4 r-1awozwy">
        <div className="css-175oi2r" data-testid="Tweet-User-Avatar">
          <div className="css-175oi2r r-18kxxzh r-1wbh5a2 r-13qz1uu">
            <div className="css-175oi2r r-1wbh5a2 r-dnmrzs">
              <div
                className="css-175oi2r r-bztko3 r-1adg3ll"
                data-testid="UserAvatar-Container-aheze0"
                style={{ width: "40px", height: "40px" }}
              >
                <div
                  className="r-1adg3ll r-13qz1uu"
                  style={{ paddingBottom: "100%" }}
                ></div>
                <div className="r-1p0dtai r-1pi2tsx r-1d2f490 r-u8s1d r-ipm5af r-13qz1uu">
                  <div
                    className="css-175oi2r r-1adg3ll r-1pi2tsx r-13qz1uu r-45ll9u r-u8s1d r-1v2oles r-176fswd r-bztko3">
                    <div
                      className="r-1adg3ll r-13qz1uu"
                      style={{ paddingBottom: "100%" }}
                    ></div>
                    <div className="r-1p0dtai r-1pi2tsx r-1d2f490 r-u8s1d r-ipm5af r-13qz1uu">
                      <div
                        className="css-175oi2r r-sdzlij r-1udh08x r-5f1w11 r-u8s1d r-8jfcpp"
                        style={{
                          width: "calc(100% + 4px)",
                          height: "calc(100% + 4px)"
                        }}
                      >
                        <a
                          href="/aheze0"
                          aria-hidden="true"
                          role="link"
                          className="css-175oi2r r-1pi2tsx r-13qz1uu r-o7ynqc r-6416eg r-1ny4l3l r-1loqt21"
                          style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                        >
                          <div
                            className="css-175oi2r r-sdzlij r-1udh08x r-633pao r-45ll9u r-u8s1d r-1v2oles r-176fswd"
                            style={{
                              width: "calc(100% - 4px)",
                              height: "calc(100% - 4px)"
                            }}
                          >
                            <div
                              className="css-175oi2r r-1pi2tsx r-13qz1uu"
                              style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                            ></div>
                          </div>
                          <div
                            className="css-175oi2r r-sdzlij r-1udh08x r-633pao r-45ll9u r-u8s1d r-1v2oles r-176fswd"
                            style={{
                              width: "calc(100% - 4px)",
                              height: "calc(100% - 4px)"
                            }}
                          >
                            <div className="css-175oi2r r-1pi2tsx r-13qz1uu r-14lw9ot"></div>
                          </div>
                          <div
                            className="css-175oi2r r-sdzlij r-1udh08x r-633pao r-45ll9u r-u8s1d r-1v2oles r-176fswd"
                            style={{
                              backgroundColor: "rgb(255, 255, 255)",
                              width: "calc(100% - 4px)",
                              height: "calc(100% - 4px)"
                            }}
                          >
                            <div
                              className="css-175oi2r r-1adg3ll r-1udh08x"
                              style={{ backgroundColor: "rgb(185, 202, 211)" }}
                            >
                              <div
                                className="r-1adg3ll r-13qz1uu"
                                style={{ paddingBottom: "100%" }}
                              ></div>
                              <div className="r-1p0dtai r-1pi2tsx r-1d2f490 r-u8s1d r-ipm5af r-13qz1uu">
                                <div
                                  className="css-175oi2r r-1mlwlqe r-1udh08x r-417010 r-1p0dtai r-1d2f490 r-u8s1d r-zchlnj r-ipm5af">
                                  <div
                                    className="css-175oi2r r-1niwhzg r-vvn4in r-u6sd8q r-1p0dtai r-1pi2tsx r-1d2f490 r-u8s1d r-zchlnj r-ipm5af r-13qz1uu r-1wyyakw r-4gszlv"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="css-175oi2r r-sdzlij r-1udh08x r-45ll9u r-u8s1d r-1v2oles r-176fswd"
                            style={{
                              width: "calc(100% - 4px)",
                              height: "calc(100% - 4px)"
                            }}
                          >
                            <div
                              className="css-175oi2r r-12181gd r-1pi2tsx r-13qz1uu r-o7ynqc r-6416eg r-1ny4l3l"></div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="css-175oi2r r-1iusvr4 r-16y2uox r-1777fci r-kzbkwu">
        <div className="css-175oi2r r-zl2h9q">
          <div className="css-175oi2r r-k4xj1c r-18u37iz r-1wtj0ep">
            <div className="css-175oi2r r-1d09ksm r-18u37iz r-1wbh5a2">
              <div className="css-175oi2r r-1wbh5a2 r-dnmrzs r-1ny4l3l">
                <div
                  className="css-175oi2r r-1wbh5a2 r-dnmrzs r-1ny4l3l r-1awozwy r-18u37iz"
                  data-testid="User-Name"
                >
                  <div className="css-175oi2r r-1awozwy r-18u37iz r-1wbh5a2 r-dnmrzs">
                    <div className="css-175oi2r r-1wbh5a2 r-dnmrzs">
                      <a
                        role="link"
                        className="css-175oi2r r-1wbh5a2 r-dnmrzs r-1ny4l3l r-1loqt21"
                      >
                        <div className="css-175oi2r r-1awozwy r-18u37iz r-1wbh5a2 r-dnmrzs">
                          <div
                            dir="ltr"
                            className="css-146c3p1 r-bcqeeo r-1ttztb7 r-qvutc0 r-37j5jr r-a023e6 r-rjixqe r-b88u0q r-1awozwy r-6koalj r-1udh08x r-3s2u2q"
                            style={{
                              textOverflow: "unset",
                              color: "rgb(15, 20, 25)"
                            }}
                          >
                            <span
                              className="css-1jxf684 r-dnmrzs r-1udh08x r-3s2u2q r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3"
                              style={{ textOverflow: "unset" }}
                            >
                              <span
                                className="css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3"
                                style={{ textOverflow: "unset" }}
                              >
                                {aiName}
                              </span>
                            </span>
                          </div>
                          <div
                            dir="ltr"
                            className="css-146c3p1 r-bcqeeo r-1ttztb7 r-qvutc0 r-37j5jr r-a023e6 r-rjixqe r-16dba41 r-xoduu5 r-18u37iz r-1q142lx"
                            style={{
                              textOverflow: "unset",
                              color: "rgb(15, 20, 25)"
                            }}
                          >
                            <span
                              className="css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3 r-1awozwy r-xoduu5"
                              style={{ textOverflow: "unset" }}
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="2"
                                  y="2"
                                  width="16"
                                  height="16"
                                  rx="5"
                                  fill="#68BF80"
                                />
                                <path
                                  d="M6.90825 13.5H5.85995L8.21542 6.95455H9.3564L11.7119 13.5H10.6636L8.81308 8.14347H8.76194L6.90825 13.5ZM7.08403 10.9368H10.4846V11.7678H7.08403V10.9368ZM13.6447 6.95455V13.5H12.6571V6.95455H13.6447Z"
                                  fill="white"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="css-175oi2r">
          <div
            dir="auto"
            lang="en"
            className="css-146c3p1 r-8akbws r-krxsd3 r-dnmrzs r-1udh08x r-bcqeeo r-1ttztb7 r-qvutc0 r-37j5jr r-a023e6 r-rjixqe r-16dba41 r-bnwqim"
            id="id__ve9cyjuwti"
            data-testid="tweetText"
            style={{
              WebkitLineClamp: 10,
              textOverflow: "unset",
              color: "rgb(15, 20, 25)"
            }}
          >
            <span
              className="css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3"
              style={{ textOverflow: "unset" }}
            >
              {JSON.stringify(aiContent)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
