import { HeroSection } from "@/app/(site)/components/EventDetailPage/HeroSection";
import { ItineraryItem } from "@/app/(site)/components/EventDetailPage/ItineraryItem";
import { ItineraryReviews } from "@/app/(site)/components/EventDetailPage/ItineraryReviews";
import { PlannerInfo } from "@/app/(site)/components/EventDetailPage/plannerInfo";
import { UserActions } from "@/app/(site)/components/EventDetailPage/UserActions";
import { mockItinerary } from "@/app/mockItinerary";

export default function DayItinerary() {
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
            <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
            {mockItinerary.items.map((item) => (
              <ItineraryItem key={item.id} item={item} />
            ))}
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
