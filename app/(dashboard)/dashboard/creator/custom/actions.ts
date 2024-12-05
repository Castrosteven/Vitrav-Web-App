"use server";

import cookieBasedClient from "@/app/utils/cookieBasedClient";
import { timeOfDay } from "./page";

interface saveItineraryActionProps {
  title: string;
  category: string;
  places: Record<timeOfDay, google.maps.places.PlaceResult[]>;
}
export async function saveItineraryAction(string: string) {
  const { category, places, title } = JSON.parse(
    string
  ) as saveItineraryActionProps;
  // Here you would typically save the itinerary to a backend or local storage
  console.log("Saving itinerary:", { title, category, places });

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
    });
  } catch (error) {
    throw new Error("Error creating new item: " + JSON.stringify(error));
  }
}
