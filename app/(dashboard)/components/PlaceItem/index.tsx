import { useDrag } from "react-dnd";
import { useRef } from "react";

interface PlaceItemProps {
  place: google.maps.places.PlaceResult;
  fromTime?: string;
}

export default function PlaceItem({ place, fromTime }: PlaceItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PLACE",
    item: { place, fromTime },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  drag(ref);
  return (
    <div
      ref={ref}
      className={`p-2 mb-2 border rounded cursor-move ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <h3 className="font-bold">{place.name}</h3>
      <p className="text-sm">{place.formatted_address}</p>
    </div>
  );
}
