"use client";

import React, { useState, useCallback, useEffect } from "react";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { XCircleIcon } from "lucide-react";
import { saveItineraryAction } from "./actions";
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

interface Place {
  id: string;
  name: string;
  address: string;
  description: string;
  link: string;
  photos: google.maps.places.PlacePhoto[];
}

interface Itinerary {
  title: string;
  category: string;
  numberOfPeople: string;
  places: Place[];
}

const DraggablePlace = ({
  place,
  index,
  movePlace,

  removePlace,
}: {
  place: Place;
  index: number;
  movePlace: (dragIndex: number, hoverIndex: number) => void;
  updatePlace: (id: string, field: keyof Place, value: string) => void;
  removePlace: (id: string) => void;
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "PLACE",
    item: { id: place.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "PLACE",
    hover(item: { id: string; index: number }) {
      if (item.index !== index) {
        movePlace(item.index, index);
        item.index = index;
      }
    },
  });

  console.log("Place:", place);
  return (
    <div
      ref={(node) => {
        if (node) drag(drop(node));
      }}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? "move" : "grab", // Change cursor on drag
      }}
      className="mb-4 p-4 border rounded"
    >
      {/* Place Information */}
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-semibold">{place.name}</h4>
          <p className="text-sm text-gray-500">{place.address}</p>
        </div>
        <XCircleIcon
          className="cursor-pointer hover:text-red-500"
          onClick={() => removePlace(place.id)}
        >
          X
        </XCircleIcon>
      </div>
      <div>
        {/* <div className="flex gap-2">
          <Image src={""} alt="" width={400} height={400} />
        </div> */}
        {/* <div className="w-full">
          <Textarea
            placeholder="Add a description"
            value={place.description}
            onChange={(e) =>
              updatePlace(place.id, "description", e.target.value)
            }
            className="mt-2"
          />
          <Input
            type="url"
            placeholder="Add a link"
            value={place.link}
            onChange={(e) => updatePlace(place.id, "link", e.target.value)}
            className="mt-2"
          />
        </div> */}
      </div>
    </div>
  );
};

interface EnummsCollection {
  itineraryTypes: string[];
  NumberOfPeople: string[];
  PriceLevel: string[];
}

export default function DailyItinerary() {
  const [enums] = useState<EnummsCollection>();
  const [itinerary, setItinerary] = useState<Itinerary>({
    title: "",
    category: "",
    numberOfPeople: "",
    places: [],
  });
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const handleLoad = useCallback((ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  }, []);

  const handlePlacesChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        setSelectedPlace({
          id: place.place_id || "",
          name: place.name || "",
          address: place.formatted_address || "",
          description: "",
          link: "",
          photos: place.photos || [],
        });
      }
    }
  };

  const addPlace = () => {
    if (selectedPlace) {
      setItinerary((prev) => ({
        ...prev,
        places: [...prev.places, selectedPlace],
      }));
      setSelectedPlace(null);
    }
  };

  const removePlace = (id: string) => {
    setItinerary((prev) => ({
      ...prev,
      places: prev.places.filter((place) => place.id !== id),
    }));
  };

  const updatePlace = (id: string, field: keyof Place, value: string) => {
    setItinerary((prev) => ({
      ...prev,
      places: prev.places.map((place) =>
        place.id === id ? { ...place, [field]: value } : place
      ),
    }));
  };

  const movePlace = useCallback((dragIndex: number, hoverIndex: number) => {
    setItinerary((prev) => {
      const newPlaces = [...prev.places];
      const draggedPlace = newPlaces[dragIndex];
      newPlaces.splice(dragIndex, 1);
      newPlaces.splice(hoverIndex, 0, draggedPlace);
      return { ...prev, places: newPlaces };
    });
  }, []);

  const handleSave = async () => {
    console.log("Saving itinerary:", itinerary);
    const newItinerary = await saveItineraryAction(JSON.stringify(itinerary));
    console.log(newItinerary);
  };

  const fetchEnums = async () => {
    // const client = generateClient<Schema>();
    // const itineraryTypes = client.enums.ItineraryType.values();
    // const NumberOfPeople = client.enums.NumberOfPeople.values();
    // const PriceLevel = client.enums.PriceLevel.values();
    // setEnums({
    //   itineraryTypes,
    //   NumberOfPeople,
    //   PriceLevel,
    // });
  };

  useEffect(() => {
    fetchEnums();
  }, []);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col gap-4 h-full max-h-full w-full overflow-hidden">
        <Card>
          <CardHeader>
            <CardTitle>Create Daily Itinerary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-start gap-4">
              <div className="w-full">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={itinerary.title}
                  onChange={(e) =>
                    setItinerary((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter itinerary title"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={itinerary.category}
                  onValueChange={(value) =>
                    setItinerary((prev) => ({
                      ...prev,
                      category: value,
                    }))
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {enums &&
                      enums.itineraryTypes.map((i) => {
                        return (
                          <SelectItem key={i} value={i}>
                            {i}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full">
                <Label htmlFor="numberOfPeople">Number Of People</Label>
                <Select
                  value={itinerary.numberOfPeople}
                  onValueChange={(value) =>
                    setItinerary((prev) => ({
                      ...prev,
                      numberOfPeople: value,
                    }))
                  }
                >
                  <SelectTrigger id="numberOfPeople">
                    <SelectValue placeholder="Select number of peopl" />
                  </SelectTrigger>
                  <SelectContent>
                    {enums &&
                      enums.NumberOfPeople.map((i) => {
                        return (
                          <SelectItem key={i} value={i}>
                            {i}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        </Card>

        <div className="flex flex-col md:flex-row gap-4 h-full max-h-full overflow-hidden">
          <Card className="w-full md:w-1/2 h-full">
            <CardHeader>
              <CardTitle>Search Places</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Search for a place</Label>
                  <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
                    <StandaloneSearchBox
                      onLoad={handleLoad}
                      onPlacesChanged={handlePlacesChanged}
                    >
                      <Input type="text" placeholder="Search for a place" />
                    </StandaloneSearchBox>
                  </LoadScript>
                </div>
                {selectedPlace && (
                  <div className="mt-2">
                    <p>{selectedPlace.name}</p>
                    <p className="text-sm text-gray-500">
                      {selectedPlace.address}
                    </p>
                    <Button onClick={addPlace} className="mt-2">
                      Add to Itinerary
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="w-full md:w-1/2 h-full max-h-full">
            <CardHeader>
              <CardTitle>Places in Itinerary</CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto max-h-[600px] ">
              <div>
                {itinerary.places.map((place, index) => (
                  <DraggablePlace
                    key={place.id}
                    place={place}
                    index={index}
                    movePlace={movePlace}
                    updatePlace={updatePlace}
                    removePlace={removePlace}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DndProvider>
  );
}
