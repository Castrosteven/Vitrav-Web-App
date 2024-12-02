"use server";
import { cookies } from "next/headers";

export const setLocationInCookies = async (position: GeolocationPosition) => {
  "use server";
  const cookieStore = await cookies();

  cookieStore.set("position", JSON.stringify(position));
  console.log(`Location set in cookies: ${JSON.stringify(position)}`);
};
