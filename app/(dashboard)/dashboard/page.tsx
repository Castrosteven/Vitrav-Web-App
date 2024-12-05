import ItineraryTable from "../components/Table";
import cookieBasedClient from "../../utils/cookieBasedClient";

export default async function Page() {
  const { data: Itineraries } = await cookieBasedClient.models.Itenerary.list();
  return <ItineraryTable itineraries={Itineraries} />;
}
