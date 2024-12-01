"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import cookieBasedClient from "@/app/utils/cookieBasedClient";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/backend/amplify/data/resource";
import Link from "next/link";
import image from "./output.png";

type Itinerary = {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: "Dynamic" | "Custom";
  people: number;
  price: number;
};

// const itineraries: Itinerary[] = [
//   {
//     id: "1",
//     title: "Paris Getaway",
//     description: "Explore the City of Light in this romantic 5-day adventure.",
//     image: "/placeholder.svg?height=200&width=300",
//     tag: "Dynamic",
//     people: 2,
//     price: 1299,
//   },
//   {
//     id: "2",
//     title: "Tokyo Tech Tour",
//     description: "Immerse yourself in Japan's cutting-edge technology scene.",
//     image: "/placeholder.svg?height=200&width=300",
//     tag: "Custom",
//     people: 4,
//     price: 2499,
//   },
//   {
//     id: "3",
//     title: "Amazon Rainforest Expedition",
//     description: "Discover the wonders of the world's largest rainforest.",
//     image: "/placeholder.svg?height=200&width=300",
//     tag: "Dynamic",
//     people: 6,
//     price: 3799,
//   },
//   {
//     id: "4",
//     title: "New York City Break",
//     description: "Experience the Big Apple's iconic sights and sounds.",
//     image: "/placeholder.svg?height=200&width=300",
//     tag: "Custom",
//     people: 3,
//     price: 1899,
//   },
// ];

const fetchItineraries = async () => {
  const client = generateClient<Schema>();

  try {
    const { data, errors } = await client.models.Itenerary.list();
    if (errors) {
      throw new Error("Error fetching itineraries: " + JSON.stringify(errors));
    }
    const transform = data.map((item) => {
      return {
        id: item.id,
        title: item.itineraryTitle,
        description: "description",
        // image: item.image,
        tag: item.itineraryType,
        people: "2",
        price: 3000,
      };
    });
    return transform;
  } catch (error) {
    console.error("Error fetching itineraries:", error);
  }
};

export default function ItineraryCardList() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [filter, setFilter] = useState<"all" | "Dynamic" | "Custom">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItineraries = itineraries.filter((itinerary) => {
    const matchesFilter = filter === "all" || itinerary.tag === filter;
    const matchesSearch = itinerary.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    fetchItineraries().then(setItineraries);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Featured Itineraries</h1>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Search itineraries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "Dynamic" ? "default" : "outline"}
            onClick={() => setFilter("Dynamic")}
          >
            Dynamic
          </Button>
          <Button
            variant={filter === "Custom" ? "default" : "outline"}
            onClick={() => setFilter("Custom")}
          >
            Custom
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItineraries.map((itinerary) => (
          <Link key={itinerary.id} href={`/dashboard/details/${itinerary.id}`}>
            <Card className="overflow-hidden">
              <Image
                src={image}
                alt={itinerary.title}
                width={300}
                height={200}
                className="w-full h-92 object-cover"
              />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{itinerary.title}</CardTitle>
                  <Badge
                    variant={
                      itinerary.tag === "Dynamic" ? "default" : "secondary"
                    }
                  >
                    {itinerary.tag}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{itinerary.description}</p>
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
                  <span>{itinerary.people} people</span>
                </div>
                <div className="text-lg font-semibold">${itinerary.price}</div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
