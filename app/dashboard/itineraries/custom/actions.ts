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
    return await cookieBasedClient.models.Itenerary.create({
      activities: {
        morningActivities: [JSON.stringify(places.Morning)],
        afternoonActivities: [JSON.stringify(places.Afternoon)],
        eveningActivities: [JSON.stringify(places.Evening)],
      },
      itineraryTitle: title,
      location: {
        lat: 123.123,
        long: 123.123,
      },
      itineraryType: category,
    });
  } catch (error) {
    throw new Error("Error creating new item: " + JSON.stringify(error));
  }
}
