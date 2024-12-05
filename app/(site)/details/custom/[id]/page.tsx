import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import cookieBasedClient from "@/app/utils/cookieBasedClient";
import { ExternalLink, Sun, Cloud, Moon } from "lucide-react";

import axios from "axios";
import Image from "next/image";

interface ActivitySectionProps {
  title: string;
  icon: React.ReactNode;
  activities: (string | null)[];
}

const fetchPlacesDetailsById = async (placeId: string | null) => {
  if (!placeId) return;

  const { data } = await axios.get(
    `https://places.googleapis.com/v1/places/${placeId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        "X-Goog-FieldMask":
          "displayName,formattedAddress,photos,nationalPhoneNumber,priceLevel,priceRange,rating",
      },
    }
  );
  return data;
};

const RenderActivity = async (place_id: string | null) => {
  const place = await fetchPlacesDetailsById(place_id);
  return (
    <Card key={place.place_id} className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {place.displayName.text}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd>{place.formattedAddress}</dd>
            </div>
            {place.nationalPhoneNumber && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd>
                  <a
                    href={`tel:${place.nationalPhoneNumber}`}
                    className="text-blue-600 hover:underline"
                  >
                    {place.nationalPhoneNumber}
                  </a>
                </dd>
              </div>
            )}
            {place.website && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Website</dt>
                <dd>
                  <a
                    href={place.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 flex items-center hover:underline"
                  >
                    {new URL(place.website).hostname}
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </dd>
              </div>
            )}
            {place.priceLevel && (
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Price Level
                </dt>
                <dd>
                  <Badge variant="secondary">
                    {"$".repeat(place.priceLevel)}
                  </Badge>
                </dd>
              </div>
            )}
          </div>
          {place?.photos && (
            <div className="flex justify-center items-center">
              <Image
                src={`https://places.googleapis.com/v1/${place.photos[0].name}/media?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&maxHeightPx=200&maxWidthPx=200`}
                alt={`Image of ${place.name}`}
                width={200}
                height={200}
                className="rounded-lg object-cover"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ActivitiesListSection = async ({
  title,
  icon,
  activities,
}: ActivitySectionProps) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        {icon}
        <span className="ml-2">
          {title} {}{" "}
        </span>
      </h2>
      <div className="space-y-4">
        {activities.map((place_id) => RenderActivity(place_id))}
      </div>
    </section>
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
      await cookieBasedClient.models.Itenerary.get({ id });

    if (errors) {
      return (
        <div className="container mx-auto p-4">Error Generating Itinerary</div>
      );
    }

    if (itinerary) {
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">
            {itinerary.itineraryTitle}
          </h1>
          <p className="text-xl mb-8">
            Activity Type: {itinerary.itineraryType}
          </p>

          {itinerary.activities.morningActivities && (
            <ActivitiesListSection
              activities={itinerary.activities.morningActivities}
              title="Morning Activities"
              icon={<Sun className="w-6 h-6 text-yellow-500" />}
            />
          )}
          {itinerary.activities.afternoonActivities && (
            <ActivitiesListSection
              activities={itinerary.activities.afternoonActivities}
              title="Afternoon Activities"
              icon={<Cloud className="w-6 h-6 text-blue-500" />}
            />
          )}
          {itinerary.activities.eveningActivities && (
            <ActivitiesListSection
              activities={itinerary.activities.eveningActivities}
              title="Evening Activities"
              icon={<Moon className="w-6 h-6 text-indigo-500" />}
            />
          )}
        </div>
      );
    }
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
}
