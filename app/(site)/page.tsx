import { Button } from "@/components/ui/button";
import { SearchSection } from "./components/LandingPge/SearchSection";
import { PopularItineraries } from "./components/LandingPge/PopularItineraries";
import { AppPromo } from "./components/LandingPge/AppPromo";
import Link from "next/link";
import cookieBasedClient from "../utils/cookieBasedClient";

export default async function VitravLandingPage() {
  const { data, errors } = await cookieBasedClient.models.Itinerary.list({
    limit: 10,
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
