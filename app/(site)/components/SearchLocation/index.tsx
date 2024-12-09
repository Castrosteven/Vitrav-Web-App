import { Input } from "@/app/components/ui/input";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";

interface SearchSectionProps {
  setSearchResults: React.Dispatch<
    React.SetStateAction<google.maps.places.PlaceResult | undefined>
  >;
}
const SearchLocation = ({ setSearchResults }: SearchSectionProps) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };
  const searchParams = useSearchParams();

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.name) {
        setSearchResults(place);
      }
    }
  };
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={["places"]}
      version="weekly"
    >
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        options={{ types: ["(cities)"] }}
      >
        <Input
          type="text"
          placeholder="Where are you going?"
          className="w-full"
          defaultValue={searchParams.get("query")?.toString()}
        />
      </Autocomplete>
    </LoadScript>
  );
};

export default SearchLocation;
