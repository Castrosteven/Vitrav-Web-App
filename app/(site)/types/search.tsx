export interface SearchFilters {
  location: string;
  price: string;
  category: string;
  people: string;
}

export interface PopularItinerary {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}
