"use server";

import cookieBasedClient from "@/app/utils/cookieBasedClient";

enum ItineraryTypeEnum {
  ROMANTIC = "ROMANTIC",
  ADVENTUROUS = "ADVENTUROUS",
  FUN = "FUN",
  CHILL = "CHILL",
  CULTURAL = "CULTURAL",
  NATURE = "NATURE",
  ACTIVE = "ACTIVE",
  INDULGENT = "INDULGENT",
  FAMILY_FRIENDLY = "FAMILY_FRIENDLY",
  SOLO = "SOLO",
}
type FormState = {
  itineraryType: ItineraryTypeEnum;
  itineraryTitle: string;
  morningActivities: string[];
  afternoonActivities: string[];
  eveningActivities: string[];
};

export const createNewItem = async (data: string) => {
  const {
    afternoonActivities,
    eveningActivities,
    itineraryTitle,
    itineraryType,
    morningActivities,
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
    });
  } catch (error) {
    return error;
  }
};
