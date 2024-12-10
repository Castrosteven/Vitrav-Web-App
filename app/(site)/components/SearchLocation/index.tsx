"use client";
import { Input } from "@/app/components/ui/input";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

const SearchLocation = () => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const onPlaceChanged = async () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place) {
        const params = new URLSearchParams(searchParams);
        if (place.geometry?.location) {
          params.set("latitude", place.geometry?.location?.lat().toString());
          params.set("longitude", place.geometry?.location?.lng().toString());
          if (place.formatted_address) {
            params.set("place", place.formatted_address);
          }
          replace(`${pathname}?${params.toString()}`);
        }
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
        // options={{ types: ["(cities)"] }}
      >
        <Input
          type="text"
          placeholder="Where are you going?"
          className="w-full border "
          defaultValue={searchParams.get("query")?.toString()}
        />
      </Autocomplete>
    </LoadScript>
  );
};

export default SearchLocation;
