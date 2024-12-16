"use client";
import { Input } from "@/app/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Library } from "@googlemaps/js-api-loader";

const SearchLocation = () => {
  const [libraries] = useState<Library[]>(["places"]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
  });

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current
      );

      autocompleteRef.current.addListener("place_changed", () => {
        if (autocompleteRef.current) {
          const place = autocompleteRef.current.getPlace();
          if (place) {
            const params = new URLSearchParams(searchParams);
            if (place.geometry?.location) {
              params.set(
                "latitude",
                place.geometry?.location?.lat().toString()
              );
              params.set(
                "longitude",
                place.geometry?.location?.lng().toString()
              );
              if (place.formatted_address) {
                params.set("place", place.formatted_address);
              }
              replace(`${pathname}?${params.toString()}`);
            }
          }
        }
      });
    }
  }, [isLoaded]);

  // if (loadError) {
  //   return <div>Error loading Google Maps</div>;
  // }
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  return (
    <Input
      ref={inputRef}
      type="text"
      placeholder="Where are you going?"
      className="w-full border "
      defaultValue={searchParams.get("place")?.toString()}
    />
  );
};

export default SearchLocation;
