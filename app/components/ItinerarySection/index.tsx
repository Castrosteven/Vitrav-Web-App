import { useDrop } from "react-dnd";
import { X } from "lucide-react";
import PlaceItem from "../PlaceItem";

interface ItinerarySectionProps {
  places: {
    [key: string]: any[];
  };
  addPlace: (place: any, timeOfDay: string) => void;
  removePlace: (place: any, timeOfDay: string) => void;
  movePlace: (place: any, fromTime: string, toTime: string) => void;
}

export default function ItinerarySection({
  places,
  addPlace,
  removePlace,
  movePlace,
}: ItinerarySectionProps) {
  const timesOfDay = ["Morning", "Afternoon", "Evening"];

  return (
    <div className="w-1/2 p-4">
      <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
      <div className="grid grid-cols-3 gap-4">
        {timesOfDay.map((timeOfDay) => (
          <ItineraryColumn
            key={timeOfDay}
            timeOfDay={timeOfDay}
            places={places[timeOfDay]}
            addPlace={addPlace}
            removePlace={removePlace}
            movePlace={movePlace}
          />
        ))}
      </div>
    </div>
  );
}

interface ItineraryColumnProps {
  timeOfDay: string;
  places: any[];
  addPlace: (place: any, timeOfDay: string) => void;
  removePlace: (place: any, timeOfDay: string) => void;
  movePlace: (place: any, fromTime: string, toTime: string) => void;
}

function ItineraryColumn({
  timeOfDay,
  places,
  addPlace,
  removePlace,
  movePlace,
}: ItineraryColumnProps) {
  const [, drop] = useDrop(() => ({
    accept: "PLACE",
    drop: (item: { place: any; fromTime?: string }) => {
      if (item.fromTime && item.fromTime !== timeOfDay) {
        movePlace(item.place, item.fromTime, timeOfDay);
      } else if (!item.fromTime) {
        addPlace(item.place, timeOfDay);
      }
    },
  }));

  return (
    <div ref={drop} className="border p-2 rounded min-h-[200px]">
      <h3 className="font-bold mb-2">{timeOfDay}</h3>
      {places.map((place, index) => (
        <div key={index} className="relative">
          <PlaceItem place={place} fromTime={timeOfDay} />
          <button
            onClick={() => removePlace(place, timeOfDay)}
            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}
