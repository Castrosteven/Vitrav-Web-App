import Link from "next/link";
import cookieBasedClient from "./utils/cookieBasedClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const { data, errors } = await cookieBasedClient.models.Item.list();

  if (errors) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Itinerary</h1>
        <Card>
          <CardContent>
            <p className="text-red-500">Something went wrong</p>
            <p className="text-sm text-gray-500">{JSON.stringify(errors)}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Itinerary</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <Link
            href={`/details/${item.id}`}
            key={item.id}
            className="block hover:no-underline"
          >
            <Card className="h-full transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">{item.itineraryTitle}</CardTitle>
                <CardDescription> Vibe: {item.itineraryType} </CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-2">Activities</h3>
                <div className="space-y-2">
                  <ActivitySection
                    title="Morning"
                    activities={item.morningActivities}
                  />
                  <ActivitySection
                    title="Afternoon"
                    activities={item.afternoonActivities}
                  />
                  <ActivitySection
                    title="Evening"
                    activities={item.eveningActivities}
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ActivitySection({
  title,
  activities,
}: {
  title: string;
  activities: string[];
}) {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-500 mb-1">{title}:</h4>
      <div className="flex flex-wrap gap-1">
        {activities.map((activity, index) => (
          <Badge key={index} variant="secondary">
            {activity}
          </Badge>
        ))}
      </div>
    </div>
  );
}
