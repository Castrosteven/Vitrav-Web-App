import Itinerary from "@/app/components/DIsplay";
import cookieBasedClient from "@/app/utils/cookieBasedClient";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const { data, errors } = await cookieBasedClient.models.Item.get({
    id,
  });

  if (errors) {
    return (
      <div>
        <h1 style={{ color: "red" }}>Itinerary</h1>
        <p>Something went wrong</p>
        <pre>{JSON.stringify(errors, null, 2)}</pre>
      </div>
    );
  }
  if (data) {
    const { data: itinerary, errors } =
      await cookieBasedClient.queries.sayHello({
        id,
        itineraryType: data.itineraryType,
        itineraryTitle: data.itineraryTitle,
        morningActivities: data.morningActivities,
        afternoonActivities: data.afternoonActivities,
        eveningActivities: data.eveningActivities,
      });
    if (errors) {
      return <div>Error Generating</div>;
    }
    if (itinerary) {
      const i = JSON.parse(itinerary as string);
      console.log(i);
      return (
        <div>
          {/* {JSON.stringify(i[0])} */}
          <Itinerary data={i[0]} />
        </div>
      );
    }
  }
}
