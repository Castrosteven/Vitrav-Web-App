import ItineraryTable from "../components/Table";
import cookieBasedClient from "../../utils/cookieBasedClient";

export default async function Page() {
  const { data: Itineraries } = await cookieBasedClient.models.Itinerary.list();
  console.log(Itineraries);
  return <ItineraryTable itineraries={Itineraries} />;
}
