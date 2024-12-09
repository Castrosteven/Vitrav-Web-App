"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LoadScript } from "@react-google-maps/api";
import SearchSection from "@/app/(dashboard)/components/PlaceSearchSection";
import ItinerarySection from "@/app/(dashboard)/components/creator/ItinerarySection";
import ItineraryForm from "@/app/(dashboard)/components/creator/ItineraryForm";
import { saveItineraryAction } from "./actions";
import { Card } from "@/app/components/ui/card";
import { Schema } from "@/backend/amplify/data/resource";

export type timeOfDay = "Morning" | "Afternoon" | "Evening";

export default function Home() {
  const [location, setLocation] = useState<Schema["ILatLng"]["type"]>();
  const [numberOfpeople, setNumberOfPeople] = useState(0);
  const [places, setPlaces] = useState<
    Record<timeOfDay, google.maps.places.PlaceResult[]>
  >({
    Morning: [],
    Afternoon: [],
    Evening: [],
  });
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [searchResults, setSearchResults] = useState<
    google.maps.places.PlaceResult[]
  >([]); // Added state for search results

  const addPlace = (
    place: google.maps.places.PlaceResult,
    timeOfDay: timeOfDay
  ) => {
    setPlaces((prev) => ({
      ...prev,
      [timeOfDay]: [...prev[timeOfDay], place],
    }));
  };

  const removePlace = (
    place: google.maps.places.PlaceResult,
    timeOfDay: timeOfDay
  ) => {
    setPlaces((prev) => ({
      ...prev,
      [timeOfDay]: prev[timeOfDay].filter((p) => p !== place),
    }));
  };

  const movePlace = (
    place: google.maps.places.PlaceResult,
    fromTime: timeOfDay,
    toTime: timeOfDay
  ) => {
    setPlaces((prev) => ({
      ...prev,
      [fromTime]: prev[fromTime].filter((p) => p !== place),
      [toTime]: [...prev[toTime], place],
    }));
  };

  const saveItinerary = async () => {
    // Here you would typically save the itinerary to a backend or local storage
    // Reset the form after saving
    setTitle("");
    setCategory("");
    setPlaces({ Morning: [], Afternoon: [], Evening: [] });
    setSearchResults([]);
    try {
      const newItenerary = await saveItineraryAction(
        JSON.stringify({
          category,
          places,
          title,
          location,
          numberOfpeople,
        })
      );
      console.log("Itinerary saved:", newItenerary);
    } catch (error) {
      console.error("Failed to save itinerary:", error);
    }
  };

  const removeFromSearchResults = (place: google.maps.places.PlaceResult) => {
    setSearchResults((prev) =>
      prev.filter((p) => p.place_id !== place.place_id)
    );
  };

  return (
    <Card className="container mx-auto bg-muted/50">
      <DndProvider backend={HTML5Backend}>
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
          libraries={["places"]}
          version="weekly"
          // channel="beta"
        >
          <main className="flex flex-col  p-4">
            <ItineraryForm
              title={title}
              setTitle={setTitle}
              category={category}
              setCategory={setCategory}
              onSave={saveItinerary}
              setLocation={setLocation}
              setNumberOfPeople={setNumberOfPeople}
            />
            <div className="flex flex-1 mt-4">
              <SearchSection
                addPlace={addPlace}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                removeFromSearchResults={removeFromSearchResults}
              />
              <ItinerarySection
                places={places}
                addPlace={addPlace}
                removePlace={removePlace}
                movePlace={movePlace}
                removeFromSearchResults={removeFromSearchResults}
              />
            </div>
          </main>
        </LoadScript>
      </DndProvider>
    </Card>
  );
}
