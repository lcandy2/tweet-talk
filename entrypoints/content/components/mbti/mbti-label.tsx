import MBTIAnimatedGradientLabelButton from "@/entrypoints/content/components/mbti/magicui/mbti-animated-gradient-label-button.tsx";
import { useAtom } from "jotai";
import {
  getMBTIData,
  MBTIDataStore,
  MBTIStatusCode,
  MBTIStatusStore,
} from "@/entrypoints/content/lib/mbti";
import { useEffect } from "react";

export function MBTILabel({ uuid }: { uuid: string }) {
  const [MBTIStatus, setMBTIStatus] = useAtom(MBTIStatusStore);
  const [label, setLabel] = useState("点击测试 MBTI 人格类型");
  const [buttonClickable, setButtonClickable] = useState(false);
  const [MBTIData, setMBTIData] = useAtom(MBTIDataStore);

  useEffect(() => {
    if (MBTIStatus === MBTIStatusCode.Error) {
      setLabel("MBTI 测试失败");
    } else if (
      MBTIStatus === MBTIStatusCode.Processing ||
      MBTIStatus === MBTIStatusCode.Pending ||
      MBTIStatus === MBTIStatusCode.Started
    ) {
      setLabel("MBTI 测试中...");

      const getData = async () => {
        try {
          const data = await getMBTIData();
          if (data) {
            if (MBTIData) {
              setMBTIData({
                ...MBTIData,
                [uuid]: data,
              });
            } else {
              setMBTIData({
                [uuid]: data,
              });
            }
          }
        } catch (e) {
          setMBTIStatus(MBTIStatusCode.Error);
        }
      };
      getData();
    } else if (MBTIStatus !== MBTIStatusCode.Success) {
      setLabel("点击测试 MBTI 人格类型");
    }

    if (MBTIStatus === MBTIStatusCode.Idle) {
      setButtonClickable(true);
    } else {
      setButtonClickable(false);
    }
  }, [MBTIStatus]);

  useEffect(() => {
    if (MBTIData && uuid) {
      if (MBTIData[uuid]) {
        setMBTIStatus(MBTIStatusCode.Success);
        setLabel(MBTIData[uuid].mbti);
      }
    }
  }, [MBTIData]);

  const handleMBTILabelClick = () => {
    setMBTIStatus(MBTIStatusCode.Started);
  };

  const handleMBTILabelHoverStart = () => {
    if (MBTIStatus === MBTIStatusCode.Success && MBTIData && MBTIData[uuid]) {
      setLabel(`${MBTIData[uuid].mbti} (点击重新测试)`);
      setButtonClickable(true);
    }
  };

  const handleMBTILabelHoverEnd = () => {
    if (MBTIStatus === MBTIStatusCode.Success && MBTIData && MBTIData[uuid]) {
      setLabel(MBTIData[uuid].mbti);
      setButtonClickable(false);
    }
  };

  return (
    <div className="!px-2 css-175oi2r">
      <MBTIAnimatedGradientLabelButton
        className="h-[24px]"
        onHoverStart={handleMBTILabelHoverStart}
        onHoverEnd={handleMBTILabelHoverEnd}
        onClick={handleMBTILabelClick}
        disabled={!buttonClickable}
      >
        {label}
      </MBTIAnimatedGradientLabelButton>
    </div>
  );
}
