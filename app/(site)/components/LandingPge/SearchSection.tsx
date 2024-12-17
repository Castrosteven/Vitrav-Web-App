"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  // SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchLocation from "../SearchLocation";
import { useSearchParams, useRouter } from "next/navigation";
import { DollarSign, Grid, Users } from "lucide-react"; // Example icons

export function SearchSection() {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const [filters, setFilters] = useState<{
    price: string;
    category: string;
    people: string;
    place: string;
  }>({
    price: "",
    category: "",
    people: "",
    place: "",
  });
  // const client = generateClient<Schema>();
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (filters.price) {
      params.set("price", filters.price);
    }
    if (filters.category) {
      params.set("category", filters.category);
    }
    if (filters.people) {
      params.set("people", filters.people);
    }
    push("/results?" + params.toString());
  };

  // const categoryTypes = client.enums.ItineraryType.values();
  // const priceLevels = client.enums.PriceLevel.values();
  // const numberOfPeople = client.enums.NumberOfPeople.values();

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-secondary text-secondary-foreground rounded-lg shadow-lg">
      <form onSubmit={handleSearch} className="space-y-4">
        <SearchLocation />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <DollarSign size={16} />
              Price Range
            </label>
            <Select
              onValueChange={(value) =>
                setFilters({ ...filters, price: value })
              }
              defaultValue={searchParams.get("price")?.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a price range" />
              </SelectTrigger>
              <SelectContent>
                {/* {priceLevels.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))} */}
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <Grid size={16} />
              Category
            </label>
            <Select
              onValueChange={(value) =>
                setFilters({ ...filters, category: value })
              }
              defaultValue={searchParams.get("category")?.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {/* {categoryTypes.map((categoryType) => (
                  <SelectItem key={categoryType} value={categoryType}>
                    {categoryType}
                  </SelectItem>
                ))} */}
              </SelectContent>
            </Select>
          </div>

          {/* Number of People */}
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <Users size={16} />
              Number of People
            </label>
            <Select
              onValueChange={(value) =>
                setFilters({ ...filters, people: value })
              }
              defaultValue={searchParams.get("people")?.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select number of people" />
              </SelectTrigger>
              <SelectContent>
                {/* {numberOfPeople.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))} */}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          disabled={
            !searchParams.get("latitude") || !searchParams.get("longitude")
          }
          type="submit"
          className="w-full"
          variant={"default"}
        >
          Search Itineraries
        </Button>
      </form>
    </div>
  );
}
