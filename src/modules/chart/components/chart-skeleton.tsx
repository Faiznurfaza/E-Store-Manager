import { Loader2 } from "lucide-react";

export function ChartSkeleton({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center">
      <div>
        {name}
        <div className="flex items-center justify-center h-[800px] w-[650px]">
          <Loader2 className="animate-spin" />
        </div>
      </div>
    </div>
  );
}
