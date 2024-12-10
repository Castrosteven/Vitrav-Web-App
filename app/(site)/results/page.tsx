import Image from "next/image";
import { CalendarDays, Clock, Users, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import cookieBasedClient from "@/app/utils/cookieBasedClient";
import { Schema } from "@/backend/amplify/data/resource";
import Link from "next/link";

interface SearchParams {
  latitude: string;
  longitude: string;
  category: string;
  price: string;
  people: string;
  place: string;
}

interface FilterParams {
  priceRange?: {
    eq: string;
  };
  numberOfPeople?: {
    eq: string;
  };
}

const ResultsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { category, place, people, price, latitude, longitude } = searchParams;
  const resultMessage = `Showing results for ${category} in ${place} for ${people} people with a price range of ${price}`;

  const appliedFilters: FilterParams = {};
  if (price) appliedFilters.priceRange = { eq: price };
  if (people) appliedFilters.numberOfPeople = { eq: people };

  const { data, errors } = await cookieBasedClient.models.Itinerary.list({
    filter: appliedFilters,
  });

  if (errors) {
    throw new Error(errors[0].message);
  }

  return (
    <div className=" h-full flex flex-1 flex-col ">
      <h1 className="text-2xl font-extrabold text-gray-800 mb-6 h-36 bg-primary justify-center items-center flex">
        <div className="container mx-auto pr-6 pl-6 md:pr-0 ml:p-0 md:w-4/6 ">
          <p className="text-primary-foreground">{resultMessage}</p>
        </div>
      </h1>
      <div className="flex flex-col gap-8 container mx-auto sm:p-6 md:p-0 mt-8 mb-8">
        {data.map((result: Schema["Itinerary"]["type"]) => (
          <ItineraryCard
            latitude={latitude}
            longitude={longitude}
            key={result.id}
            result={result}
          />
        ))}
      </div>
    </div>
  );
};

const ItineraryCard = ({
  result,
  latitude,
  longitude,
}: {
  result: Schema["Itinerary"]["type"];
  latitude: string;
  longitude: string;
}) => {
  const itineraryUrl = `/details/${result.isDynamic ? "dynamic" : "custom"}/${
    result.id
  }`;
  return (
    <Link
      href={`${itineraryUrl}?latitude=${latitude}&longitude=${longitude}`}
      className="pr-6 pl-6 md:pr-0 ml:p-0 md:w-4/6"
    >
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
        <div className="md:flex">
          {/* <div className="md:w-1/3 h-48 md:h-full relative">
            {result.image && (
              <Image
                src={result.image}
                alt={result.itineraryTitle}
                layout="fill"
                objectFit="cover"
                className="rounded-t-md md:rounded-none md:rounded-l-md"
              />
            )}
          </div> */}
          <div className="md:w-2/3 p-4">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-bold text-gray-800">
                    {result.itineraryTitle}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 mt-1">
                    Explore the rich history with a guided tour through its most
                    iconic landmarks and hidden gems.
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  {result.itineraryType}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">
                    ${result.priceRange}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">
                    For {result.numberOfPeople} people
                  </span>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ResultsPage;
