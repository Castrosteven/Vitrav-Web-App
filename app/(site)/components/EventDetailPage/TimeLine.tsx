import { TimelineItem } from "./TimeLineItem";

export function Timeline({ items }: { items: unknown[] }) {
  return (
    <div className="relative">
      {items.map((item) => item && <TimelineItem key={item.id} item={item} />)}
    </div>
  );
}
