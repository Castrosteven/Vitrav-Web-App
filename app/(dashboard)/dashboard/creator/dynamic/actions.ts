"use server";

import cookieBasedClient from "@/app/utils/cookieBasedClient";
import { Schema } from "@/backend/amplify/data/resource";

type FormState = {
  itineraryType: string;
  itineraryTitle: string;
  morningActivities: string[];
  afternoonActivities: string[];
  eveningActivities: string[];
  location: Schema["ILatLng"]["type"];
};

export const createNewItem = async (data: string) => {
  const {
    afternoonActivities,
    eveningActivities,
    itineraryTitle,
    itineraryType,
    morningActivities,
    location,
  } = JSON.parse(data) as FormState;
  try {
    console.log(
      "Form DATA:",
      afternoonActivities,
      eveningActivities,
      itineraryTitle,
      itineraryType,
      morningActivities
    );
    // Here you would typically send the data to an API or perform some action
    return await cookieBasedClient.mutations.createNewItinierary({
      morningActivities,
      afternoonActivities,
      eveningActivities,
      itineraryTitle: itineraryTitle,
      itineraryType: itineraryType,
      isDynamic: true,
      lat: location.latitude,
      long: location.longitude,
    });
  } catch (error) {
    return error;
  }
};
