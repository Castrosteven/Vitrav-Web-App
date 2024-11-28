import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MapPin, DollarSign } from "lucide-react";

interface Activity {
  primaryType: string;
  formattedAddress: string;
  googleMapsUri: string;
  priceLevel: string;
  displayName: {
    text: string;
    languageCode: string;
  };
  editorialSummary: {
    text: string;
    languageCode: string;
  };
  generativeSummary: {
    text: string;
    languageCode: string;
  };
  priceRange: string | null;
  rating: number;
  photos: string[];
}

interface DayPart {
  [key: string]: Activity[];
}

interface ItineraryData {
  itinerary_title: string;
  itinerary_type: string;
  activities: DayPart[];
}

const PriceLevel = ({ level }: { level: string }) => {
  const dollarSigns =
    level === "PRICE_LEVEL_UNSPECIFIED"
      ? "N/A"
      : "$".repeat(parseInt(level.slice(-1)));
  return (
    <div className="flex items-center text-gray-500 text-xs">
      <DollarSign className="w-3 h-3 mr-1" />
      <span>{dollarSigns}</span>
    </div>
  );
};

const ActivityCard = ({ activity }: { activity: Activity }) => (
  <Card className="w-full max-w-sm mx-auto mb-4">
    <CardHeader className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="text-lg">{activity.displayName.text}</CardTitle>
          <CardDescription className="text-xs flex items-center mt-1">
            <MapPin className="w-3 h-3 mr-1" />
            <a
              href={activity.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {activity.formattedAddress.split(",")[0]}
            </a>
          </CardDescription>
        </div>
        <Badge className="text-xs">{activity.primaryType}</Badge>
      </div>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <div className="flex justify-between items-center mb-2">
        <PriceLevel level={activity.priceLevel} />
        {activity.rating > 0 && (
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-sm">{activity.rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      {activity.photos && activity.photos.length > 0 && (
        <div className="relative h-32 mb-2">
          <Image
            src={activity.photos[0]}
            alt={activity.displayName.text}
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}
      {activity.editorialSummary && (
        <p className="text-xs text-gray-600 line-clamp-2">
          {activity.editorialSummary.text}
        </p>
      )}
    </CardContent>
  </Card>
);

const DayPartSection = ({
  title,
  activities,
}: {
  title: string;
  activities: Activity[];
}) => (
  <section className="mb-6">
    <h2 className="text-xl font-bold mb-3 capitalize">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {activities.length > 0 ? (
        activities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))
      ) : (
        <p className="text-sm text-gray-500">
          No activities planned for {title}.
        </p>
      )}
    </div>
  </section>
);

export default function Itinerary({ data }: { data: ItineraryData }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{data.itinerary_title}</h1>
        <Badge variant="secondary">{data.itinerary_type}</Badge>
      </div>
      {data.activities.map((dayPart, index) => {
        const [title, activities] = Object.entries(dayPart)[0];
        return (
          <DayPartSection key={index} title={title} activities={activities} />
        );
      })}
    </div>
  );
}
