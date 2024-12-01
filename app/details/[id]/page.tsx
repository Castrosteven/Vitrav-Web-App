import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import cookieBasedClient from "@/app/utils/cookieBasedClient";
import { ExternalLink } from "lucide-react";
import axios from "axios";
import Image from "next/image";

interface ActivitySectionProps {
  activity: (string | number | boolean | object | unknown[] | null)[] | null;
}

const fetchPlacesDetailsById = async (placeId: string | undefined) => {
  if (!placeId) return;
  const { data } = await axios.get(
    `https://places.googleapis.com/v1/places/${placeId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        "X-Goog-FieldMask": "*",
      },
    }
  );
  return data;
};

const RenderActivity = async (place: google.maps.places.PlaceResult) => {
  const detailData = await fetchPlacesDetailsById(place.place_id);
  return (
    <Card key={place.place_id}>
      <CardHeader>
        <CardTitle>{place.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-2">
          <div>
            <dt className="font-semibold">Address</dt>
            <dd>
              {place.formatted_address || place.vicinity || "Not available"}
            </dd>
          </div>
          {place.formatted_phone_number && (
            <div>
              <dt className="font-semibold">Phone</dt>
              <dd>
                <a
                  href={`tel:${place.formatted_phone_number}`}
                  className="hover:underline"
                >
                  {place.formatted_phone_number}
                </a>
              </dd>
            </div>
          )}
          {place.website && (
            <div>
              <dt className="font-semibold">Website</dt>
              <dd>
                <a
                  href={place.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:underline"
                >
                  {new URL(place.website).hostname}
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </dd>
            </div>
          )}
          {place.price_level && (
            <div>
              <dt className="font-semibold">Price Level</dt>
              <dd>
                <Badge variant="secondary">
                  {"$".repeat(place.price_level)}
                </Badge>
              </dd>
            </div>
          )}
        </dl>
        {detailData.photos && (
          <Image
            src={`https://places.googleapis.com/v1/${detailData.photos[0].name}/media?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&maxHeightPx=300&maxWidthPx=300`}
            alt="Picture of the author"
            width={300}
            height={300}
          />
        )}
      </CardContent>
    </Card>
  );
};

const ActivitiesListSection = async ({ activity }: ActivitySectionProps) => {
  const a = activity as unknown;
  const listOfActvities = JSON.parse(
    a as string
  ) as google.maps.places.PlaceResult[];

  return (
    <div>
      Activities
      {listOfActvities.map((actvity) => {
        return RenderActivity(actvity);
      })}
    </div>
  );
};
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  try {
    const { data: itinerary, errors } =
      await cookieBasedClient.models.Itenerary.get({
        id,
      });
    if (errors) {
      return <div>Error Generating</div>;
    }
    if (itinerary) {
      return (
        <div className="container mx-auto">
          <p>Title: {itinerary.itineraryTitle}</p>
          <p>Activity Type: {itinerary.itineraryType}</p>
          {itinerary.activities.morningActivities && (
            <ActivitiesListSection
              activity={itinerary.activities.morningActivities}
            />
          )}
          {itinerary.activities.afternoonActivities && (
            <ActivitiesListSection
              activity={itinerary.activities.afternoonActivities}
            />
          )}
          {itinerary.activities.eveningActivities && (
            <ActivitiesListSection
              activity={itinerary.activities.eveningActivities}
            />
          )}
        </div>
      );
    }
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
}
