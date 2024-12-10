"use server";

import cookieBasedClient from "@/app/utils/cookieBasedClient";
import { Schema } from "@/backend/amplify/data/resource";
interface Place {
  id: string;
  name: string;
  address: string;
  description: string;
  link: string;
  photos: google.maps.places.PlacePhoto[];
}
interface Itinerary {
  title: string;
  category: Schema["ItineraryType"]["type"];
  numberOfPeople: Schema["NumberOfPeople"]["type"];
  places: Place[];
}
export async function saveItineraryAction(itinerary: string) {
  const { category, numberOfPeople, places, title } = JSON.parse(
    itinerary
  ) as Itinerary;
  try {
    return await cookieBasedClient.mutations.createNewItinierary({
      activities: places.map((place) => place.id),
      isDynamic: false,
      itineraryTitle: title,
      itineraryType: category,
      numberOfPeople: numberOfPeople,
    });
  } catch (error) {
    throw new Error("Error creating new item: " + JSON.stringify(error));
  }
}
