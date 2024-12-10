import { Button } from "@/components/ui/button";
import { AppPromo } from "./components/LandingPge/AppPromo";
import Link from "next/link";
import { CardContent, Card } from "../components/ui/card";
import { List, MapPin, Sparkles } from "lucide-react";
import { SearchSection } from "./components/LandingPge/SearchSection";

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}

function StepCard({ icon, title, description }: StepCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-center">{icon}</div>
        <h2 className="text-2xl font-semibold text-center">{title}</h2>
        <p className="text-center text-muted-foreground">{description}</p>
        {/* <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className="rounded-lg object-cover w-full"
        /> */}
      </CardContent>
    </Card>
  );
}

export default async function VitravLandingPage() {
  // const filters = await searchParams;
  // console.log(filters);
  // const appliedFilters: Record<
  //   keyof FilterParams,
  //   {
  //     eq: string;
  //   }
  // > = {} as FilterParams;

  // if (filters.price) {
  //   Object.assign(appliedFilters, {
  //     priceRange: { eq: filters.price },
  //   });
  // }
  // if (filters.people) {
  //   Object.assign(appliedFilters, {
  //     numberOfPeople: { eq: filters.people },
  //   });
  // }

  // const { data, errors } = await cookieBasedClient.models.Itinerary.list({
  //   filter: appliedFilters,
  // });
  // if (errors) {
  //   throw new Error(errors[0].message);
  // }

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
        <h2 className="text-2xl font-bold mb-6 text-center">
          Generate personalized itineraries in seconds. It&apos;s as easy as
          1-2-3!
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <StepCard
            icon={<MapPin className="h-12 w-12 text-blue-500" />}
            title="Enter Your Location"
            description="Tell us where you want to go. It can be a city, country, or region."
            image="/placeholder.svg?height=200&width=300"
          />
          <StepCard
            icon={<List className="h-12 w-12 text-green-500" />}
            title="Choose Your Interests"
            description="Select the types of activities and attractions you're interested in."
            image="/placeholder.svg?height=200&width=300"
          />
          <StepCard
            icon={<Sparkles className="h-12 w-12 text-purple-500" />}
            title="Let AI Work Its Magic"
            description="Our AI generates a custom itinerary based on your preferences."
            image="/placeholder.svg?height=200&width=300"
          />
        </div>
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
