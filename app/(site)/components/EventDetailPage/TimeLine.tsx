import { ItineraryItem } from "@/app/types/itinerary";
import { TimelineItem } from "./TimeLineItem";

export function Timeline({ items }: { items: ItineraryItem[] }) {
  return (
    <div className="relative">
      {items.map((item) => (
        <TimelineItem key={item.id} item={item} />
      ))}
    </div>
  );
}
