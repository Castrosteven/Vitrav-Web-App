import LocationInput from "@/app/components/location-input";
import { Schema } from "@/backend/amplify/data/resource";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateClient } from "aws-amplify/api";
import { Dispatch, SetStateAction } from "react";

interface ItineraryFormProps {
  title: string;
  setTitle: (title: string) => void;
  category: string;
  setCategory: (category: string) => void;
  onSave: () => void;
  setLocation: Dispatch<Schema["ILatLng"]["type"]>;
  setNumberOfPeople: Dispatch<SetStateAction<number>>;
}

export default function ItineraryForm({
  title,
  setTitle,
  category,
  setCategory,
  onSave,
  setLocation,
  setNumberOfPeople,
}: ItineraryFormProps) {
  const client = generateClient<Schema>();
  const ItineraryTypeEnum = client.enums.ItineraryType.values();
  return (
    <div className="flex items-end space-x-4">
      <div className="flex-1">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter itinerary title"
        />
      </div>

      <div className="w-48">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category
        </label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(ItineraryTypeEnum).map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0) + type.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="">
        <LocationInput setGeoLocation={setLocation} />
      </div>
      <div>
        <label
          htmlFor="numberOfPeople"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Number of People
        </label>
        <Input
          type="number"
          id="numberOfPeople"
          onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
          placeholder="Enter number of people"
        />
      </div>
      <Button onClick={onSave}>Save Itinerary</Button>
    </div>
  );
}
