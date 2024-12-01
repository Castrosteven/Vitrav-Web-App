import { useDrop } from "react-dnd";
import { X } from "lucide-react";
import PlaceItem from "../PlaceItem";
import { useRef } from "react";
import { timeOfDay } from "@/app/create-custom/page";

interface ItinerarySectionProps {
  places: Record<timeOfDay, google.maps.places.PlaceResult[]>;
  addPlace: (
    place: google.maps.places.PlaceResult,
    timeOfDay: timeOfDay
  ) => void;
  removePlace: (
    place: google.maps.places.PlaceResult,
    timeOfDay: timeOfDay
  ) => void;
  movePlace: (
    place: google.maps.places.PlaceResult,
    fromTime: timeOfDay,
    toTime: timeOfDay
  ) => void;
  removeFromSearchResults: (place: google.maps.places.PlaceResult) => void;
}

export default function ItinerarySection({
  places,
  addPlace,
  removePlace,
  movePlace,
  removeFromSearchResults,
}: ItinerarySectionProps) {
  const timesOfDay: timeOfDay[] = ["Morning", "Afternoon", "Evening"];

  return (
    <div className="w-1/2 p-4">
      <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
      <div className="grid grid-rows-3 gap-4">
        {timesOfDay.map((timeOfDay) => (
          <ItineraryColumn
            key={timeOfDay}
            timeOfDay={timeOfDay}
            places={places[timeOfDay]}
            addPlace={addPlace}
            removePlace={removePlace}
            movePlace={movePlace}
            removeFromSearchResults={removeFromSearchResults}
          />
        ))}
      </div>
    </div>
  );
}

interface ItineraryColumnProps {
  timeOfDay: timeOfDay;
  places: google.maps.places.PlaceResult[];
  addPlace: (
    place: google.maps.places.PlaceResult,
    timeOfDay: timeOfDay
  ) => void;
  removePlace: (
    place: google.maps.places.PlaceResult,
    timeOfDay: timeOfDay
  ) => void;
  movePlace: (
    place: google.maps.places.PlaceResult,
    fromTime: timeOfDay,
    toTime: timeOfDay
  ) => void;
  removeFromSearchResults: (place: google.maps.places.PlaceResult) => void;
}

function ItineraryColumn({
  timeOfDay,
  places,
  addPlace,
  removePlace,
  movePlace,
  removeFromSearchResults,
}: ItineraryColumnProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: "PLACE",
    drop: (item: {
      place: google.maps.places.PlaceResult;
      fromTime?: timeOfDay;
    }) => {
      if (item.fromTime && item.fromTime !== timeOfDay) {
        movePlace(item.place, item.fromTime, timeOfDay);
      } else if (!item.fromTime) {
        addPlace(item.place, timeOfDay);
        removeFromSearchResults(item.place);
      }
    },
  }));
  drop(ref);

  return (
    <div ref={ref} className="border p-2 rounded min-h-[200px]">
      <h3 className="font-bold mb-2">{timeOfDay}</h3>
      {places.map((place, index) => (
        <div key={index} className="relative">
          <PlaceItem place={place} fromTime={timeOfDay} />
          <button
            onClick={() => removePlace(place, timeOfDay)}
            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            aria-label="Remove place"
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}
