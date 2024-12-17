"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Library } from "@googlemaps/js-api-loader";

interface Place {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

interface GoogleMapsPlacesProps {
  places: Place[];
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 40.7610509,
  lng: -73.968041,
};

export default function GoogleMapsPlaces({ places }: GoogleMapsPlacesProps) {
  const [libraries] = useState<Library[]>(["places"]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  // const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
    setMap(null);
  }, []);

  useEffect(() => {
    if (map && places.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        bounds.extend({ lat: place.lat, lng: place.lng });
      });
      map.fitBounds(bounds);
    }
  }, [map, places]);

  return (
    <div className="p-4">
      <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg mb-4">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {places.map((place) => (
              <Marker
                key={place.id}
                position={{ lat: place.lat, lng: place.lng }}
              />
            ))}
            <Marker
              position={defaultCenter}
              icon={{
                url: "https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png", // Example icon URL
                scaledSize: new google.maps.Size(32, 32), // Adjust the size as needed
              }}
            />
          </GoogleMap>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
