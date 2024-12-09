import { HeroSection } from "@/app/(site)/components/EventDetailPage/HeroSection";
import { ItineraryReviews } from "@/app/(site)/components/EventDetailPage/ItineraryReviews";
import { PlannerInfo } from "@/app/(site)/components/EventDetailPage/plannerInfo";
import { Timeline } from "@/app/(site)/components/EventDetailPage/TimeLine";
import { UserActions } from "@/app/(site)/components/EventDetailPage/UserActions";
import { mockItinerary } from "@/app/mockItinerary";
import cookieBasedClient from "@/app/utils/cookieBasedClient";
import { cookies } from "next/headers";
import { Suspense } from "react";
export default async function DayItinerary({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const cookieStore = await cookies();
  const position = cookieStore.get("position");
  console.log("Position:", position?.value);
  if (!position) {
    console.error("No location found in cookies");
    throw new Error("No location found in cookies");
  }

  const { coords } = JSON.parse(position.value) as GeolocationPosition;
  const { data, errors } =
    await cookieBasedClient.queries.generateDynamicActivitiesFromItinerary({
      dynamicItineraryId: id,
      lat: coords.latitude,
      long: coords.longitude,
    });
  console.log(`data`, JSON.stringify(data));
  if (errors || !data) {
    console.log(errors);
    throw new Error("Failed to fetch data");
  }

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
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
