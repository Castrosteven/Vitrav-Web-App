// import { ItineraryItem } from "@/app/types/itinerary";
import { Schema } from "@/backend/amplify/data/resource";
import { TimelineItem } from "./TimeLineItem";

export function Timeline({
  items,
}: {
  items: Schema["GeneratorResponse"]["type"]["activities"];
}) {
  return (
    <div className="relative">
      {items.map((item) => item && <TimelineItem key={item.id} item={item} />)}
    </div>
  );
}
