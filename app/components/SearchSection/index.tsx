import { useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import PlaceItem from "../PlaceItem";

interface SearchSectionProps {
  addPlace: (place: any, timeOfDay: string) => void;
}

export default function SearchSection({ addPlace }: SearchSectionProps) {
  const [searchResults, setSearchResults] = useState<
    google.maps.places.PlaceResult[]
  >([]);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.name) {
        setSearchResults((prevResults) => [...prevResults, place]);
      }
    }
  };

  return (
    <div className="w-1/2 p-4 border-r">
      <h2 className="text-2xl font-bold mb-4">Search Places</h2>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Search for places"
          className="w-full p-2 border rounded"
        />
      </Autocomplete>
      <div className="mt-4">
        {searchResults.map((place, index) => (
          <PlaceItem key={index} place={place} />
        ))}
      </div>
    </div>
  );
}
