import { Button } from "@/components/ui/button";
// import { Search, Share2, Star } from "lucide-react";
// import Image from "next/image";
import { SearchSection } from "./components/LandingPge/SearchSection";
import { PopularItineraries } from "./components/LandingPge/PopularItineraries";
import { AppPromo } from "./components/LandingPge/AppPromo";

export default function VitravLandingPage() {
  return (
    <div className="bg-background">
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            Find Your Perfect Itinerary
          </h1>
          <p className="text-xl mb-8">
            Discover and plan amazing trips with our curated itineraries
          </p>
          <SearchSection />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Popular Itineraries</h2>
        <PopularItineraries />
      </section>

      <section className="container mx-auto px-4 py-12">
        <AppPromo />
      </section>

      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Create Your Own Itinerary</h2>
        <p className="mb-6">
          Have a unique trip idea? Create and share your own itinerary!
        </p>
        <Button size="lg">Start Planning</Button>
      </section>
    </div>
  );
}