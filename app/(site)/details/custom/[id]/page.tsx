import { HeroSection } from "@/app/(site)/components/EventDetailPage/HeroSection";
import { ItineraryReviews } from "@/app/(site)/components/EventDetailPage/ItineraryReviews";
import { PlannerInfo } from "@/app/(site)/components/EventDetailPage/plannerInfo";
import { Timeline } from "@/app/(site)/components/EventDetailPage/TimeLine";
import { UserActions } from "@/app/(site)/components/EventDetailPage/UserActions";
// import { mockItinerary } from "@/app/mockItinerary";
import { DayItinerary as DayItineraryType } from "@/app/types/itinerary";
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
    });
  if (errors || !data) {
    console.log(errors);
    throw new Error("Failed to fetch data");
  }
  const formattedMorning = (): DayItineraryType["items"] => {
    const morningActivities =
      data.activities && data.activities.morningActivities;

    const cleaned =
      morningActivities &&
      morningActivities.map((i) => {
        const imageUrl =
          i &&
          i.photos &&
          `https://places.googleapis.com/v1/${i.photos[0]?.name}/media?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&maxHeightPx=400&maxWidthPx=400`;
        return {
          date: "UIT", //remove
          duration: "1h",
          id: i?.id || "1",
          image:
            imageUrl || "https://source.unsplash.com/1600x900/?nature,water",
          location: "New York",
          longDescription: "This is a long description",
          place: i?.formattedAddress || "New York",
          rating: 4.5,
          reviews: 100,
          shortDescription:
            i?.editorialSummary?.text ||
            i?.generativeSummary?.description?.text ||
            "Short description Here",
          time: "10:00",
          title: i?.displayName?.text || "Central Park",
        };
      });

    return (
      cleaned || [
        {
          date: "2022-01-01",
          duration: "1h",
          id: "1",
          image: "https://source.unsplash.com/1600x900/?nature,water",
          location: "New York",
          longDescription: "This is a long description",
          place: "New York",
          rating: 4.5,
          reviews: 100,
          shortDescription: "",
          time: "10:00",
          title: "Central Park",
        },
      ]
    );
  };

  const mockItinerary: DayItineraryType = {
    completions: 100,
    date: "2022-01-01",
    items: formattedMorning(),
    planner: {
      avatar: "https://source.unsplash.com/1600x900/?nature,water",
      name: "John Doe",
      bio: "This is a bio",
      eventsCreated: 100,
      profileLink: "/profile",
    },
    id: "1",
    reviews: [
      {
        comment: "This is a great itinerary",
        rating: 4.5,
        id: "1",
        user: "John Doe",
      },
    ],
    title: data.itineraryTitle,
  };
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
