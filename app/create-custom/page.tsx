"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LoadScript } from "@react-google-maps/api";

import ItineraryForm from "../components/ItineraryForm";
import SearchSection from "../components/SearchSection";
import ItinerarySection from "../components/ItinerarySection";

export default function Home() {
  const [places, setPlaces] = useState<{
    [key: string]: google.maps.places.PlaceResult[];
  }>({
    Morning: [],
    Afternoon: [],
    Evening: [],
  });
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const addPlace = (
    place: google.maps.places.PlaceResult,
    timeOfDay: string
  ) => {
    setPlaces((prev) => ({
      ...prev,
      [timeOfDay]: [...prev[timeOfDay], place],
    }));
  };

  const removePlace = (
    place: google.maps.places.PlaceResult,
    timeOfDay: string
  ) => {
    setPlaces((prev) => ({
      ...prev,
      [timeOfDay]: prev[timeOfDay].filter((p) => p !== place),
    }));
  };

  const movePlace = (
    place: google.maps.places.PlaceResult,
    fromTime: string,
    toTime: string
  ) => {
    setPlaces((prev) => ({
      ...prev,
      [fromTime]: prev[fromTime].filter((p) => p !== place),
      [toTime]: [...prev[toTime], place],
    }));
  };

  const saveItinerary = () => {
    // Here you would typically save the itinerary to a backend or local storage
    console.log("Saving itinerary:", { title, category, places });
    // Reset the form after saving
    setTitle("");
    setCategory("");
    setPlaces({ Morning: [], Afternoon: [], Evening: [] });
  };

  return (
    <div className="container mx-auto">
      <DndProvider backend={HTML5Backend}>
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
          libraries={["places"]}
        >
          <main className="flex flex-col min-h-screen p-4">
            <ItineraryForm
              title={title}
              setTitle={setTitle}
              category={category}
              setCategory={setCategory}
              onSave={saveItinerary}
            />
            <div className="flex flex-1 mt-4">
              <SearchSection />
              <ItinerarySection
                places={places}
                addPlace={addPlace}
                removePlace={removePlace}
                movePlace={movePlace}
              />
            </div>
          </main>
        </LoadScript>
      </DndProvider>
    </div>
  );
}
