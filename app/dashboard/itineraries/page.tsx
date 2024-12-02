import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import image from "./output.png";
import cookieBasedClient from "@/app/utils/cookieBasedClient";
import ADVENTUROUS from "../../images/ADVENTUROUS.webp";
import FUN from "../../images/FUN.webp";
import ROMANTIC from "../../images/ROMANTIC.webp";
import DEFAULT_DYNAMIC_IMAGE from "../../images/things-to-do.webp";
import { ItineraryTypeEnum } from "@/app/components/ItineraryForm";
import LocationInput from "@/app/components/location-input";

export default async function ItineraryCardList() {
  const { data: Itineraries } = await cookieBasedClient.models.Itenerary.list();

  const { data: DynamicIteneraries } =
    await cookieBasedClient.models.DynamicItenerary.list();

  const dynamicImage = (type: ItineraryTypeEnum) => {
    switch (type) {
      case "ADVENTUROUS":
        return ADVENTUROUS;
      case "FUN":
        return FUN;
      case "ROMANTIC":
        return ROMANTIC;
      default:
        return DEFAULT_DYNAMIC_IMAGE;
    }
  };

  return (
    <div className="container mx-auto">
      <LocationInput />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Itineraries.map((itinerary) => (
          <Link
            key={itinerary.id}
            href={`/dashboard/details/custom/${itinerary.id}`}
          >
            <Card className="overflow-hidden">
              <Image
                src={image}
                alt={itinerary.itineraryTitle}
                width={300}
                height={200}
                className="w-full h-92 object-cover"
              />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">
                    {itinerary.itineraryTitle}
                  </CardTitle>
                  <Badge variant={"default"}>Custom</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Some Description {itinerary.itineraryType}{" "}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>3 people</span>
                </div>
                <div className="text-lg font-semibold">$5000</div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      {/*  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
        {DynamicIteneraries.map((itinerary) => (
          <Link
            key={itinerary.id}
            href={`/dashboard/details/dynamic/${itinerary.id}`}
          >
            <Card className="overflow-hidden">
              <Image
                // @ts-expect-error No idea why
                src={dynamicImage(itinerary.itineraryType)}
                alt={itinerary.itineraryTitle}
                width={300}
                height={200}
                className="w-full h-92 object-cover"
              />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">
                    {itinerary.itineraryTitle}
                  </CardTitle>
                  <Badge variant={"secondary"}>Dynamic</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Some Description</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>3 people</span>
                </div>
                <div className="text-lg font-semibold">$5000</div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
