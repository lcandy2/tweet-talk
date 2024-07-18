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

interface TweetCardProps {
  element: Element;
}

export function TweetCard({ element }: TweetCardProps) {
  const [tweetData, setTweetData] = useState<TweetData | null>(null);
  const [repliedMessage, setRepliedMessage] = useState<string | null>(null);

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
            setRepliedMessage(res.results[0].reply);
          }
        } catch (e) {
          console.error(e);
        }
      };

      fetchTweet();
    }
  }, [tweetData]);

  return (
    <div className="contents group">
      <ShineBorderCore color={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
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
                  id="id__mw190std7hh"
                  data-testid="User-Name"
                >
                  <div className="css-175oi2r r-1awozwy r-18u37iz r-1wbh5a2 r-dnmrzs">
                    <div className="css-175oi2r r-1wbh5a2 r-dnmrzs">
                      <a
                        href="/aheze0"
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
                                Tweet Talk
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
                                viewBox="0 0 22 22"
                                aria-label="Verified account"
                                role="img"
                                className="r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-lrvibr r-m6rgpd r-1cvl2hr r-f9ja8p r-og9te1 r-3t4u6i"
                                data-testid="icon-verified"
                              >
                                <g>
                                  <path
                                    d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
                                </g>
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
              {JSON.stringify(repliedMessage)}
            </span>
          </div>
        </div>
      </div>
      {/*</ShineBorder>*/}
    </div>
  );
}
