"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateClient } from "aws-amplify/data";
import { Schema } from "@/backend/amplify/data/resource";
import SearchLocation from "../SearchLocation";
import { useSearchParams, useRouter } from "next/navigation";

export function SearchSection() {
  const searchParams = useSearchParams();
  // const pathname = usePathname();

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
  const client = generateClient<Schema>();
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

  const categoryTypes = client.enums.ItineraryType.values();
  const priceLevels = client.enums.PriceLevel.values();
  const numberOfPeople = client.enums.NumberOfPeople.values();
  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSearch} className="space-y-4">
        <SearchLocation />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            onValueChange={(value) => setFilters({ ...filters, price: value })}
            defaultValue={searchParams.get("price")?.toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Price range" />
            </SelectTrigger>
            <SelectContent>
              {priceLevels.map((p) => {
                return (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) =>
              setFilters({ ...filters, category: value })
            }
            defaultValue={searchParams.get("category")?.toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categoryTypes.map((categoryType) => {
                return (
                  <SelectItem key={categoryType} value={categoryType}>
                    {categoryType}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => setFilters({ ...filters, people: value })}
            defaultValue={searchParams.get("people")?.toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Number of people" />
            </SelectTrigger>
            <SelectContent>
              {numberOfPeople.map((p) => {
                return (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full">
          Search Itineraries
        </Button>
      </form>
    </div>
  );
}
