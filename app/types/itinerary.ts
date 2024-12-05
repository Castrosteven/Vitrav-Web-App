export interface ItineraryItem {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  place: string;
  time: string;
  date: string;
  location: string;
  reviews: number;
  rating: number;
}

export interface PlannerInfo {
  name: string;
  bio: string;
  avatar: string;
  eventsCreated: number;
  profileLink: string;
}

export interface ItineraryReview {
  id: string;
  user: string;
  comment: string;
  rating: number;
}

export interface DayItinerary {
  id: string;
  title: string;
  date: string;
  items: ItineraryItem[];
  planner: PlannerInfo;
  reviews: ItineraryReview[];
  completions: number;
}
