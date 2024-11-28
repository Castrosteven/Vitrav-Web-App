import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ItineraryFormProps {
  title: string;
  setTitle: (title: string) => void;
  category: string;
  setCategory: (category: string) => void;
  onSave: () => void;
}

export default function ItineraryForm({
  title,
  setTitle,
  category,
  setCategory,
  onSave,
}: ItineraryFormProps) {
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
            <SelectItem value="vacation">Vacation</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="weekend">Weekend</SelectItem>
            <SelectItem value="day-trip">Day Trip</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={onSave}>Save Itinerary</Button>
    </div>
  );
}
