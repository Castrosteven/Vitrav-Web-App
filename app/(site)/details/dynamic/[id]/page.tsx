import { HeroSection } from "@/app/(site)/components/EventDetailPage/HeroSection";
import { ItineraryReviews } from "@/app/(site)/components/EventDetailPage/ItineraryReviews";
import { PlannerInfo } from "@/app/(site)/components/EventDetailPage/plannerInfo";
import { Timeline } from "@/app/(site)/components/EventDetailPage/TimeLine";
import { UserActions } from "@/app/(site)/components/EventDetailPage/UserActions";
import GoogleMapsPlaces from "@/app/(site)/components/Map";
import { mockItinerary } from "@/app/mockItinerary";
import cookieBasedClient from "@/app/utils/cookieBasedClient";
import { Suspense } from "react";
export default async function DayItinerary({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ latitude: string; longitude: string; place: string }>;
}) {
  const { id } = await params;
  const { latitude, longitude } = await searchParams;

  if (!latitude || !longitude) {
    console.error("No geometry found in location");
    throw new Error("No geometry found in location");
  }
  const { data, errors } =
    await cookieBasedClient.queries.generateDynamicActivitiesFromItinerary({
      dynamicItineraryId: id,
      lat: parseFloat(latitude),
      long: parseFloat(longitude),
    });
  if (errors || !data) {
    console.log(errors);
    throw new Error("Failed to fetch data");
  }

  const places = data.activities.map((act) => {
    if (act) {
      return {
        id: act.id || "",
        name: act.name,
        lat: act.location?.latitude,
        lng: act.location?.longitude,
      };
    }
  });
  return (
    <div>
      <Suspense>
        <div>
          <HeroSection
            title={`${data.itineraryTitle}`}
            date={"DATE"}
            completions={10}
          />
          <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold mb-4">Itinerary Timeline</h2>
                <Timeline items={data.activities} />
              </div>
              <div className="space-y-6">
                <PlannerInfo planner={mockItinerary.planner} />
                <ItineraryReviews reviews={mockItinerary.reviews} />
                <UserActions />
                <div className="">
                  <p className="text-2xl font-bold mb-4">
                    Find in the on the map
                  </p>
                  <GoogleMapsPlaces places={places} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
