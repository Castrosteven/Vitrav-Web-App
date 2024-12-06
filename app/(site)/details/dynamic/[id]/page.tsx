import { HeroSection } from "@/app/(site)/components/EventDetailPage/HeroSection";
import { ItineraryReviews } from "@/app/(site)/components/EventDetailPage/ItineraryReviews";
import { PlannerInfo } from "@/app/(site)/components/EventDetailPage/plannerInfo";
import { Timeline } from "@/app/(site)/components/EventDetailPage/TimeLine";
import { UserActions } from "@/app/(site)/components/EventDetailPage/UserActions";
import { mockItinerary } from "@/app/mockItinerary";
import cookieBasedClient from "@/app/utils/cookieBasedClient";

export default async function DayItinerary({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const { data, errors } =
    await cookieBasedClient.queries.generateDynamicActivitiesFromItinerary({
      dynamicItineraryId: id,
      lat: 37.7749,
      long: -122.4194,
    });
  if (errors || !data) {
    console.error(errors);
    throw new Error("Failed to fetch data");
  }

  return (
    <div>
      <HeroSection
        title={mockItinerary.title}
        date={mockItinerary.date}
        completions={mockItinerary.completions}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold mb-4">Itinerary Timeline</h2>
            <Timeline items={mockItinerary.items} />
          </div>
          <div className="space-y-6">
            <PlannerInfo planner={mockItinerary.planner} />
            <ItineraryReviews reviews={mockItinerary.reviews} />
            <UserActions />
          </div>
        </div>
      </div>
    </div>
  );
}
