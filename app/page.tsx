import Link from "next/link";
import cookieBasedClient from "./utils/cookieBasedClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const { data, errors } = await cookieBasedClient.models.Itenerary.list();

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
      <h1 className="text-3xl font-bold mb-6">Itineraries</h1>

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
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
