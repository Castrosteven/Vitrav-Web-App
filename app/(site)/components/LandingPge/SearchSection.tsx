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
import { SearchFilters } from "../../types/search";
import { generateClient } from "aws-amplify/data";
import { Schema } from "@/backend/amplify/data/resource";
import SearchLocation from "../SearchLocation";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { setLocationInCookies } from "@/app/components/location-input/actions";

export function SearchSection() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { replace } = useRouter();

  const [searchResults, setSearchResults] =
    useState<google.maps.places.PlaceResult>();
  const [filters, setFilters] = useState<SearchFilters>({
    location: searchResults && searchResults.geometry,
    price: "",
    category: "",
    people: "",
  });
  const client = generateClient<Schema>();
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    if (searchResults?.geometry?.location) {
      await setLocationInCookies({
        coords: {
          latitude: searchResults.geometry.location.lat(),
          longitude: searchResults.geometry.location.lng(),
        },
      } as GeolocationPosition);
      console.log("Location set in cookies:", location);
      params.set(
        "latitude",
        searchResults?.geometry?.location?.lat().toString()
      );
      params.set(
        "longitude",
        searchResults?.geometry?.location?.lng().toString()
      );
    }
    if (filters.price) {
      params.set("price", filters.price);
    }
    if (filters.category) {
      params.set("category", filters.category);
    }
    if (filters.people) {
      params.set("people", filters.people);
    }
    replace(`${pathname}?${params.toString()}`);

    console.log("Search with filters:", filters);
    const { data, errors } = await client.queries.searchForItineraries({
      category: filters.category,
      latitude: searchResults?.geometry?.location?.lat(),
      longitude: searchResults?.geometry?.location?.lng(),
      people: filters.people,
      price: filters.price,
    });
    if (errors) {
      console.error(errors);
      return;
    }
    console.log(data);
    // Here you would typically call an API or update the page with search results
  };

  const categoryTypes = client.enums.ItineraryType.values();
  const priceLevels = client.enums.PriceLevel.values();
  const numberOfPeople = client.enums.NumberOfPeople.values();
  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSearch} className="space-y-4">
        <SearchLocation setSearchResults={setSearchResults} />
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
