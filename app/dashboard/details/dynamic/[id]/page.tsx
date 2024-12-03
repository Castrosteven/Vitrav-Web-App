import cookieBasedClient from "@/app/utils/cookieBasedClient";
import { cookies } from "next/headers";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MapPin, Sun, Sunset, Moon } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const hasCookie = cookieStore.has("position");
  if (hasCookie) {
    try {
      const cords = cookieStore.get("position");
      const { coords } = JSON.parse(cords!.value) as GeolocationPosition;
      const { data: itineraryData, errors } =
        await cookieBasedClient.queries.generateDynamicActivitiesFromItinerary({
          dynamicItineraryId: id,
          lat: coords.latitude,
          long: coords.longitude,
        });
      if (errors) {
        return <div>{JSON.stringify(errors)}</div>;
      }
      if (!itineraryData) {
        throw new Error("No data returned");
      }
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {itineraryData.itineraryTitle}
          </h1>
          <Badge className="mb-6 mx-auto block w-fit">
            {itineraryData.itineraryType}
          </Badge>

          <div className="grid gap-6 md:grid-cols-3">
            {itineraryData.activities &&
              Object.entries(itineraryData.activities).map(
                ([timeOfDay, activities]) => (
                  <Card key={timeOfDay} className="w-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {timeOfDay === "morning" && <Sun className="h-5 w-5" />}
                        {timeOfDay === "afternoon" && (
                          <Sunset className="h-5 w-5" />
                        )}
                        {timeOfDay === "evening" && (
                          <Moon className="h-5 w-5" />
                        )}
                        {timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {activities &&
                        activities.map((activity, index) => (
                          <div key={index} className="mb-4 last:mb-0">
                            <h3 className="font-semibold text-lg mb-2">
                              {activity &&
                                activity.displayName &&
                                activity.displayName.text}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {activity && activity.formattedAddress}
                            </p>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">
                                {activity &&
                                  activity.primaryType &&
                                  activity.primaryType.replace("_", " ")}
                              </Badge>
                              <span className="text-sm">
                                Rating: {activity && activity.rating}
                              </span>
                            </div>
                            {activity && activity.generativeSummary && (
                              <p className="text-sm mb-2">
                                {activity &&
                                  activity.generativeSummary &&
                                  activity.generativeSummary.overview &&
                                  activity.generativeSummary.overview.text}
                              </p>
                            )}
                            {activity &&
                              activity.photos &&
                              activity.photos.length > 0 && (
                                <Image
                                  src={activity.photos[0]}
                                  alt={`Photo of ${
                                    activity &&
                                    activity.displayName &&
                                    activity.displayName.text
                                  }`}
                                  width={400}
                                  height={300}
                                  className="rounded-md w-full h-48 object-cover"
                                />
                              )}
                          </div>
                        ))}
                    </CardContent>
                  </Card>
                )
              )}
          </div>
        </div>
      );
    } catch (error) {
      return <div>Error: {JSON.stringify(error)}</div>;
    }
  }

  return <div>No Cookies</div>;
}
