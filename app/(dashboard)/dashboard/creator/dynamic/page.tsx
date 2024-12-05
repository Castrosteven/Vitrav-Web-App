"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import data from "../../../../../../scrapper/data.json";
import { createNewItem } from "./actions";

enum ItineraryTypeEnum {
  ROMANTIC = "ROMANTIC",
  ADVENTUROUS = "ADVENTUROUS",
  FUN = "FUN",
  CHILL = "CHILL",
  CULTURAL = "CULTURAL",
  NATURE = "NATURE",
  ACTIVE = "ACTIVE",
  INDULGENT = "INDULGENT",
  FAMILY_FRIENDLY = "FAMILY_FRIENDLY",
  SOLO = "SOLO",
}

type FormState = {
  itineraryType: ItineraryTypeEnum;
  itineraryTitle: string;
  morningActivities: string[];
  afternoonActivities: string[];
  eveningActivities: string[];
};

export default function ItineraryForm() {
  const [formState, setFormState] = useState<FormState>({
    itineraryType: ItineraryTypeEnum.FUN,
    itineraryTitle: "",
    morningActivities: [],
    afternoonActivities: [],
    eveningActivities: [],
  });

  type Section = "RA" | "RB" | "RC";

  interface Item {
    id: string;
    name: string;
    category: string;
  }

  interface Category {
    category: string;
    types: string[];
  }

  const [categories, setCategories] = useState<Category[]>(data);

  const [rightSections, setRightSections] = useState<Record<Section, Item[]>>({
    RA: [],
    RB: [],
    RC: [],
  });

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: Item,
    source: "left" | Section
  ) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ item, source }));
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (
    e: React.DragEvent<HTMLDivElement>,
    target: "left" | Section
  ) => {
    e.preventDefault();
    const { item, source } = JSON.parse(
      e.dataTransfer.getData("text/plain")
    ) as { item: Item; source: "left" | Section };

    if (source === target) return;

    if (target === "left") {
      setRightSections((prev) => ({
        ...prev,
        [source as Section]: prev[source as Section].filter(
          (i) => i.id !== item.id
        ),
      }));
      setCategories((prev) =>
        prev.map((cat) =>
          cat.category === item.category
            ? { ...cat, types: [...cat.types, item.name] }
            : cat
        )
      );
    } else {
      if (source === "left") {
        setCategories((prev) =>
          prev.map((cat) =>
            cat.category === item.category
              ? {
                  ...cat,
                  types: cat.types.filter((type) => type !== item.name),
                }
              : cat
          )
        );
      } else {
        setRightSections((prev) => ({
          ...prev,
          [source as Section]: prev[source as Section].filter(
            (i) => i.id !== item.id
          ),
        }));
      }
      setRightSections((prev) => ({
        ...prev,
        [target as Section]: [...prev[target as Section], item],
      }));
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createNewItem(
        JSON.stringify({
          ...formState,
          morningActivities: rightSections.RA.map((item) => item.name),
          afternoonActivities: rightSections.RB.map((item) => item.name),
          eveningActivities: rightSections.RC.map((item) => item.name),
        })
      );
    } catch (error) {
      console.error("Error creating new item:", error);
    }
  };

  const renderLeftSection = () => (
    <Card className="w-full h-full  ">
      <CardContent
        className="p-4 h-full overflow-y-auto"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, "left")}
      >
        {categories.map((category, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-md font-medium mb-2">{category.category}</h3>
            {category.types.map((type) => (
              <div
                key={type}
                draggable
                onDragStart={(e) =>
                  onDragStart(
                    e,
                    { id: type, name: type, category: category.category },
                    "left"
                  )
                }
                className="bg-gray-100 p-2 mb-2 rounded cursor-move"
              >
                {type.replace(/_/g, " ")}
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderRightSection = (section: Section, title: string) => (
    <Card className="w-full mb-4 h-1/3 ">
      <CardContent
        className="p-4 h-full overflow-y-auto"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, section)}
      >
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        {rightSections[section].map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => onDragStart(e, item, section)}
            className="bg-gray-100 p-2 mb-2 rounded cursor-move"
          >
            {item.name.replace(/_/g, " ")}
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <Card className="w-full overflow-hidden container mx-auto bg-muted/50">
      <CardHeader>
        <CardTitle>Create Itinerary</CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="flex gap-8 w-full">
            <div className="space-y-2">
              <Label htmlFor="itineraryType">Itinerary Type</Label>
              <Select
                value={formState.itineraryType}
                onValueChange={(value) =>
                  handleInputChange("itineraryType", value)
                }
              >
                <SelectTrigger id="itineraryType">
                  <SelectValue placeholder="Select Itinerary Type" />
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

            <div className="space-y-2">
              <Label htmlFor="itineraryTitle">Itinerary Title</Label>
              <Input
                id="itineraryTitle"
                value={formState.itineraryTitle}
                onChange={(e) =>
                  handleInputChange("itineraryTitle", e.target.value)
                }
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2 h-[calc(100vh-22rem)] mb-8">
              <h2 className="text-lg font-semibold mb-2">
                Google Maps Place Types
              </h2>
              {renderLeftSection()}
            </div>
            <div className="w-full md:w-1/2 h-[calc(100vh-22rem)] flex flex-col">
              <h2 className="text-xl font-bold mb-2">Time Of Day Activities</h2>
              {renderRightSection("RA", "Morning Activities")}
              {renderRightSection("RB", "Afternoon Activities")}
              {renderRightSection("RC", "Evening Activities")}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Create Itinerary
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
