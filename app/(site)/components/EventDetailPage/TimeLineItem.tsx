import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { ItineraryItem } from "@/app/types/itinerary";
// import { ItineraryItem } from '../types/itinerary'

export function TimelineItem({ item }: { item: ItineraryItem }) {
  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-4">
        <div className="w-3 h-3 bg-primary rounded-full" />
        <div className="w-0.5 h-full bg-border" />
      </div>
      <Card className="flex-grow mb-8">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-bold">{item.title}</CardTitle>
          <Badge variant="secondary">{item.time}</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative aspect-video">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {item.shortDescription}
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{item.place}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4" />
                <span>Duration: {item.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="text-sm font-medium">{item.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({item.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
