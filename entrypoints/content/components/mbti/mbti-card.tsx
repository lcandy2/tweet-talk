import ShineBorder from "@/entrypoints/components/magicui/shine-border";
import { Card, CardHeader } from "@/entrypoints/components/ui/card";

export function MBTICard() {
  return (
    <Card className="mt-2">
      <ShineBorder
        color={["#4298B4", "#E4AE3A", "#33A474", "#886199"]}
        className="flex flex-col items-start w-full"
      >
        <CardHeader>ENFP</CardHeader>
      </ShineBorder>
    </Card>
  );
}
