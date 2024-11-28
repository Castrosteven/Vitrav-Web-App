"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LoadScript } from "@react-google-maps/api";
import SearchSection from "../components/SearchSection";
import ItinerarySection from "../components/ItinerarySection";

export default function Home() {
  const [places, setPlaces] = useState<{ [key: string]: any[] }>({
    Morning: [],
    Afternoon: [],
    Evening: [],
  });

  const addPlace = (place: any, timeOfDay: string) => {
    setPlaces((prev) => ({
      ...prev,
      [timeOfDay]: [...prev[timeOfDay], place],
    }));
  };

  const removePlace = (place: any, timeOfDay: string) => {
    setPlaces((prev) => ({
      ...prev,
      [timeOfDay]: prev[timeOfDay].filter((p) => p !== place),
    }));
  };

  const movePlace = (place: any, fromTime: string, toTime: string) => {
    setPlaces((prev) => ({
      ...prev,
      [fromTime]: prev[fromTime].filter((p) => p !== place),
      [toTime]: [...prev[toTime], place],
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        libraries={["places"]}
      >
        <main className="flex min-h-screen">
          <SearchSection addPlace={addPlace} />
          <ItinerarySection
            places={places}
            addPlace={addPlace}
            removePlace={removePlace}
            movePlace={movePlace}
          />
        </main>
      </LoadScript>
    </DndProvider>
  );
}
