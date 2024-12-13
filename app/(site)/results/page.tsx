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
import Link from "next/link";
import Breadcrumbs from "../components/BreadCrumbs";
import axios from "axios";

export interface Itinerary {
  id: string;
  itinerary_description: string;
  itinerary_title: string;
  itinerary_thumbnail: string;
  createdAt: string;
  updatedAt: string;
  itinerary_type: string;
  itinerary_category: string;
  google_places_primary_place_types: any[];
  google_places_place_ids: any[];
  userId: string;
  latitude: number;
  longitude: number;
  distance: number;
}

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
  const { category, place, people, price } = searchParams;
  const resultMessage = `Showing results for ${category} in ${place} for ${people} people with a price range of ${price}`;
  // const pathName = usePathname();
  const appliedFilters: FilterParams = {};
  if (price) appliedFilters.priceRange = { eq: price };
  if (people) appliedFilters.numberOfPeople = { eq: people };

  const { data } = await axios.get<{
    itineraries: Itinerary[];
  }>("http://localhost:3000/itineraries", {
    params: {
      lat: searchParams.latitude,
      long: searchParams.longitude,
    },
  });
  console.log(data);
  return (
    <div className=" h-full flex flex-1 flex-col ">
      <h1 className="text-2xl font-extrabold text-gray-800 mb-6 h-36 bg-primary justify-center items-center flex">
        <div className="container mx-auto pr-6 pl-6 md:pr-0 ml:p-0 md:w-4/6 ">
          <p className="text-primary-foreground">{resultMessage}</p>
        </div>
      </h1>
      <div className="container mx-auto">
        <Breadcrumbs />
      </div>

      <div className="flex flex-col gap-8 container mx-auto sm:p-6 md:p-0 mt-8 mb-8">
        {data.itineraries.map((result) => (
          <ItineraryCard
            key={result.id}
            result={result}
            searchParams={searchParams}
          />
        ))}
      </div>
    </div>
  );
};

const ItineraryCard = ({
  result,
  searchParams,
}: {
  result: Itinerary;
  searchParams: SearchParams;
}) => {
  const itineraryUrl = `/details/${
    result.itinerary_type === "DYNAMIC" ? "dynamic" : "custom"
  }/${result.id}`;
  const params = new URLSearchParams();
  params.append("latitude", searchParams.latitude);
  params.append("longitude", searchParams.longitude);
  params.append("place", searchParams.place);
  params.append("price", searchParams.price);
  params.append("category:", searchParams.category);
  params.append("people:", searchParams.people);
  console.log(searchParams);
  return (
    <Link
      href={`${itineraryUrl}?${params.toString()}`}
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
                    {result.itinerary_title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 mt-1">
                    Explore the rich history with a guided tour through its most
                    iconic landmarks and hidden gems.
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  {result.itinerary_type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">
                    {/* ${result.priceRange} */}
                    Free
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">For 10 people</span>
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
