import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import type { ItineraryItem } from "@/app/types/itinerary";

export function ItineraryItem({ item }: { item: ItineraryItem }) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.shortDescription}</CardDescription>
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
              {item.longDescription}
            </p>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{item.time}</Badge>
              <Badge variant="outline">{item.place}</Badge>
            </div>
            <p className="text-sm">{item.location}</p>
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
  );
}
