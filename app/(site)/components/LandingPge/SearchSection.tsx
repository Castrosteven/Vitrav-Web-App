"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchFilters } from "../../types/search";

export function SearchSection() {
  const [filters, setFilters] = useState<SearchFilters>({
    location: "",
    price: "",
    category: "",
    people: "",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search with filters:", filters);
    // Here you would typically call an API or update the page with search results
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSearch} className="space-y-4">
        <Input
          type="text"
          placeholder="Search destinations..."
          className="w-full"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            onValueChange={(value) => setFilters({ ...filters, price: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="budget">Budget</SelectItem>
              <SelectItem value="mid-range">Mid-range</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) =>
              setFilters({ ...filters, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="adventure">Adventure</SelectItem>
              <SelectItem value="culture">Culture</SelectItem>
              <SelectItem value="relaxation">Relaxation</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => setFilters({ ...filters, people: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Number of people" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 person</SelectItem>
              <SelectItem value="2">2 people</SelectItem>
              <SelectItem value="3-5">3-5 people</SelectItem>
              <SelectItem value="6+">6+ people</SelectItem>
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
