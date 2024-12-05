import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { PopularItinerary } from "../../types/search";

const popularItineraries: PopularItinerary[] = [
  {
    id: "1",
    title: "Parisian Adventure",
    location: "Paris, France",
    price: 1200,
    rating: 4.8,
    reviews: 320,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Tokyo Explorer",
    location: "Tokyo, Japan",
    price: 1500,
    rating: 4.9,
    reviews: 450,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "New York City Break",
    location: "New York, USA",
    price: 1000,
    rating: 4.7,
    reviews: 280,
    image: "/placeholder.svg?height=200&width=300",
  },
];

export function PopularItineraries() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {popularItineraries.map((itinerary) => (
        <Card key={itinerary.id}>
          <CardHeader className="p-0">
            <div className="relative h-48">
              <Image
                src={itinerary.image}
                alt={itinerary.title}
                fill
                className="object-cover rounded-t-lg"
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
      ))}
    </div>
  );
}
