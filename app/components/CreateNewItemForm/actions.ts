"use server";

import cookieBasedClient from "@/app/utils/cookieBasedClient";
import { FormState } from ".";

const createNewItem = async ({
  afternoonActivities,
  eveningActivities,
  itineraryTitle,
  itineraryType,
  morningActivities,
}: FormState) => {
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
    const { errors, data: newItem } =
      await cookieBasedClient.models.Itenerary.create({
        itineraryTitle,
        itineraryType,
        location: {
          lat: 123.123,
          long: 123.123,
        },
        activities: {
          morningActivities,
          afternoonActivities,
          eveningActivities,
        },
      });
    if (errors) {
      throw new Error("Error creating new item: " + JSON.stringify(errors));
    } else {
      console.log("New item created:", newItem);
    }
  } catch (error) {
    return error;
  }
};

export { createNewItem };
