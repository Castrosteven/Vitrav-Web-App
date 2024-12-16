import { HeroSection } from "@/app/(site)/components/EventDetailPage/HeroSection";
// import { ItineraryReviews } from "@/app/(site)/components/EventDetailPage/ItineraryReviews";
import { PlannerInfo } from "@/app/(site)/components/EventDetailPage/plannerInfo";
import { Timeline } from "@/app/(site)/components/EventDetailPage/TimeLine";
// import { UserActions } from "@/app/(site)/components/EventDetailPage/UserActions";
import GoogleMapsPlaces from "@/app/(site)/components/Map";
import { mockItinerary } from "@/app/mockItinerary";
import axios from "axios";
// import cookieBasedClient from "@/app/utils/cookieBasedClient";
import { Suspense } from "react";

interface SearchParams {
  latitude: string;
  longitude: string;
  category: string;
  price: string;
  people: string;
  place: string;
}
export default async function DayItinerary({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const { latitude, longitude } = await searchParams;

  const { data } = await axios.get(
    `http://localhost:3000/itineraries/generate/${id}`,
    {
      params: {
        lat: parseFloat(latitude),
        long: parseFloat(longitude),
      },
    }
  );

  const places = data.activities
    .map((act) => {
      if (
        act &&
        act.location &&
        act.name &&
        act.id &&
        act.location.latitude &&
        act.location.longitude
      ) {
        return {
          id: act.id,
          name: act.name,
          lat: act.location.latitude!,
          lng: act.location.longitude!,
        };
      }
      return undefined;
    })
    .filter((place) => place !== undefined);
  return (
    <div>
      <Suspense>
        <div>
          <HeroSection
            title={`${data.itineraryTitle}`}
            // date={"DATE"}
            completions={Math.floor(Math.random() * 100)}
            place={(await searchParams).place}
          />
          <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold mb-4">Itinerary Timeline</h2>
                <Timeline items={data.activities} />
              </div>
              <div className="space-y-6">
                <PlannerInfo planner={mockItinerary.planner} />
                {/* <ItineraryReviews reviews={mockItinerary.reviews} /> */}
                <div className="">
                  <p className="text-2xl font-bold mb-4">
                    Find in the on the map
                  </p>
                  <GoogleMapsPlaces places={places} />
                </div>
                {/* <UserActions /> */}
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
