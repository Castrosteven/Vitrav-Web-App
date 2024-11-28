import { useDrag } from "react-dnd";

interface PlaceItemProps {
  place: google.maps.places.PlaceResult;
  fromTime?: string;
}

export default function PlaceItem({ place, fromTime }: PlaceItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PLACE",
    item: { place, fromTime },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 mb-2 border rounded cursor-move ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <h3 className="font-bold">{place.name}</h3>
      <p className="text-sm">{place.formatted_address}</p>
    </div>
  );
}
