"use server";

// interface Place {
//   id: string;
//   name: string;
//   address: string;
//   description: string;
//   link: string;
//   photos: google.maps.places.PlacePhoto[];
// }
// interface Itinerary {
//   title: string;
//   category: Schema["ItineraryType"]["type"];
//   numberOfPeople: Schema["NumberOfPeople"]["type"];
//   places: Place[];
// }
export async function saveItineraryAction(itinerary: string) {
  console.log("Save Itinerary Action", itinerary);
  // const itinerary = await this.itineraryService.saveItinerary(itinerary);
  // return itinerary;
}
