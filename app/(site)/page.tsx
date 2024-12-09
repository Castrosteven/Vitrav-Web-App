import { Button } from "@/components/ui/button";
import { SearchSection } from "./components/LandingPge/SearchSection";
import { PopularItineraries } from "./components/LandingPge/PopularItineraries";
import { AppPromo } from "./components/LandingPge/AppPromo";
import Link from "next/link";
import cookieBasedClient from "../utils/cookieBasedClient";

interface SearchParams {
  latitude: string;
  longitude: string;
  category: string;
  price: string;
  people: string;
}

interface FilterParams {
  priceRange: {
    eq: string;
  };
  numberOfPeople: {
    eq: string;
  };
}
export default async function VitravLandingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const filters = await searchParams;
  console.log(filters);
  const appliedFilters: Record<
    keyof FilterParams,
    {
      eq: string;
    }
  > = {} as FilterParams;

  if (filters.price) {
    Object.assign(appliedFilters, {
      priceRange: { eq: filters.price },
    });
  }
  if (filters.people) {
    Object.assign(appliedFilters, {
      numberOfPeople: { eq: filters.people },
    });
  }

  const { data, errors } = await cookieBasedClient.models.Itinerary.list({
    filter: appliedFilters,
  });
  if (errors) {
    throw new Error(errors[0].message);
  }

  return (
    <div className="bg-background">
      <section className="bg-primary  py-12">
        <div className="container mx-auto px-4 ">
          <h1 className="text-4xl font-bold mb-4  text-primary-foreground ">
            Find Your Perfect Itinerary
          </h1>
          <p className="text-xl mb-8  text-primary-foreground">
            Discover and plan amazing trips with our curated itineraries
          </p>
          <SearchSection />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Popular Itineraries</h2>
        <PopularItineraries itineraries={data} />
      </section>

      <section className="container mx-auto px-4 py-12">
        <AppPromo />
      </section>

      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Create Your Own Itinerary</h2>
        <p className="mb-6">
          Have a unique trip idea? Create and share your own itinerary!
        </p>
        <Link href={"/dashboard"} passHref>
          <Button>Start Planning</Button>
        </Link>
      </section>
    </div>
  );
}
