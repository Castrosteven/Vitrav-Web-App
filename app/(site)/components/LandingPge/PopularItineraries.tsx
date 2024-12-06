"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { PopularItinerary } from "../../types/search";
import { Schema } from "@/backend/amplify/data/resource";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import Link from "next/link";

interface PopularItinerariesProps {
  itineraries: Schema["Itenerary"]["type"][];
}

export function PopularItineraries({ itineraries }: PopularItinerariesProps) {
  const formattedItineraries: PopularItinerary[] = itineraries.map(
    (itinerary) => {
      return {
        id: itinerary.id,
        title: itinerary.itineraryTitle,
        location: "Paris, France",
        price: 1000,
        rating: 4.7,
        reviews: 280,
        image: itinerary.isDynamic
          ? `dynamic_pictures/${itinerary.itineraryType}.webp`
          : `dynamic_pictures/${itinerary.itineraryType}.webp`,
        isDynamic: itinerary.isDynamic,
      };
    }
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {formattedItineraries.map((itinerary) => (
        <Link
          key={itinerary.id}
          href={`/details/${itinerary.isDynamic ? "dynamic" : "custom"}/${
            itinerary.id
          }`}
        >
          <Card>
            <CardHeader className="p-0">
              <div className="relative h-62">
                <StorageImage
                  path={itinerary.image}
                  alt={itinerary.title}
                  width={"100%"}
                  height={"100%"}
                  className="object-fill rounded-t-lg "
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg mb-2">{itinerary.title}</CardTitle>
              <p className="text-sm text-muted-foreground mb-2">
                {itinerary.location}
              </p>
              <div className="flex justify-between items-center">
                <span className="font-bold">${itinerary.price}</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-primary text-primary mr-1" />
                  <span className="text-sm">
                    {itinerary.rating} ({itinerary.reviews})
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
