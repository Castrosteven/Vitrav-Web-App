"use server";

import cookieBasedClient from "@/app/utils/cookieBasedClient";
import { timeOfDay } from "./page";
import { Schema } from "@/backend/amplify/data/resource";

interface saveItineraryActionProps {
  title: string;
  category: string;
  places: Record<timeOfDay, google.maps.places.PlaceResult[]>;
  location: Schema["ILatLng"]["type"];
  numberOfpeople: number;
}
export async function saveItineraryAction(string: string) {
  const { category, places, title, location, numberOfpeople } = JSON.parse(
    string
  ) as saveItineraryActionProps;
  // Here you would typically save the itinerary to a backend or local storage
  console.log("Saving itinerary:", { title, category, places, numberOfpeople });

  try {
    return await cookieBasedClient.mutations.createNewItinierary({
      morningActivities:
        places.Morning && places.Morning.map((place) => place.place_id!),

      afternoonActivities:
        places.Morning && places.Afternoon.map((place) => place.place_id!),
      eveningActivities:
        places.Morning && places.Evening.map((place) => place.place_id!),
      itineraryTitle: title,
      itineraryType: category,
      isDynamic: false,
      lat: location.latitude,
      long: location.longitude,
      numberOfPeople: numberOfpeople,
    });
  } catch (error) {
    throw new Error("Error creating new item: " + JSON.stringify(error));
  }
}
