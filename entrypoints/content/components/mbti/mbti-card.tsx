import ShineBorder from "@/entrypoints/components/magicui/shine-border";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/entrypoints/components/ui/card";
import { useAtom } from "jotai/index";
import {
  MBTIDataStore,
  MBTIStatusCode,
  MBTIStatusStore,
} from "@/entrypoints/content/lib/mbti";
import { Skeleton } from "@/entrypoints/components/ui";
import { useEffect } from "react";
import Markdown from "react-markdown";

export function MBTICard({ uuid }: { uuid: string }) {
  const [MBTIStatus, setMBTIStatus] = useAtom(MBTIStatusStore);
  const [isLoading, setIsLoading] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [MBTIData] = useAtom(MBTIDataStore);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (
      MBTIStatus === MBTIStatusCode.Processing ||
      MBTIStatus === MBTIStatusCode.Pending ||
      MBTIStatus === MBTIStatusCode.Started
    ) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    if (MBTIStatus !== MBTIStatusCode.Idle) {
      setIsShown(true);
    }
  }, [MBTIStatus]);

  useEffect(() => {
    if (MBTIData && uuid) {
      if (MBTIData[uuid]) {
        setMBTIStatus(MBTIStatusCode.Success);
        setTitle(MBTIData[uuid].mbti);
        setDescription(MBTIData[uuid].celebrity);
        setContent(MBTIData[uuid].report);
      } else {
        setIsShown(false);
      }
    }
  }, [MBTIData]);

  if (!isShown) {
    return null;
  }

  return (
    <Card className="mt-2">
      <ShineBorder
        color={["#4298B4", "#E4AE3A", "#33A474", "#886199"]}
        className="flex flex-col items-start w-full"
      >
        <CardHeader className="p-3">
          <CardTitle>
            {isLoading ? <Skeleton className="h-4 w-[80px]" /> : title}
          </CardTitle>
          <CardDescription>
            {isLoading ? (
              <Skeleton className="h-4 w-[120px]" />
            ) : (
              `相似名人：${description}`
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          {isLoading ? (
            <Skeleton className="h-8 w-[280px]" />
          ) : (
            <article className="prose prose-sm prose-neutral">
              <Markdown>{content}</Markdown>
            </article>
          )}
        </CardContent>
        <p className="text-sm w-full font-light text-gray-400 text-end">
          presented by{" "}
          <a href="https://github.com/lcandy2/tweet-talk" target="_blank">
            AI Tweet
          </a>
        </p>
      </ShineBorder>
    </Card>
  );
}
