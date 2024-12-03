import ItineraryTable from "../components/Table";

interface Itinerary {
  id: string;
  image: string;
  title: string;
  description: string;
  location: string;
  people: number;
  price: number;
}

export default function Page() {
  return <ItineraryTable />;
}
