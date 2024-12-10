"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

interface Place {
  id: number;
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
  lat: 40.7128,
  lng: -74.006,
};

export default function GoogleMapsPlaces({ places }: GoogleMapsPlacesProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
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

  const centerMapOnPlace = (lat: number, lng: number) => {
    if (mapRef.current) {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(14);
    }
  };

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
                onClick={() => setSelectedPlace(place)}
              />
            ))}
            {selectedPlace && (
              <InfoWindow
                position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                onCloseClick={() => setSelectedPlace(null)}
              >
                <div>
                  <h3 className="font-bold">{selectedPlace.name}</h3>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
