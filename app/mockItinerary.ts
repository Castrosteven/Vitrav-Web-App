import { DayItinerary } from "./types/itinerary";

export const mockItinerary: DayItinerary = {
  id: "paris-day-1",
  title: "A Perfect Day in Paris",
  date: "2023-08-15",
  items: [
    {
      id: "1",
      title: "Visit the Eiffel Tower",
      shortDescription: "Iconic iron lattice tower on the Champ de Mars",
      longDescription:
        "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower. Constructed from 1887 to 1889 as the entrance arch to the 1889 World's Fair, it has become a global cultural icon of France and one of the most recognizable structures in the world.",
      image: "/placeholder.svg?height=400&width=600",
      place: "Eiffel Tower",
      time: "09:00 AM",
      duration: "2 hours",
      date: "2023-08-15",
      location: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
      reviews: 140253,
      rating: 4.6,
    },
    {
      id: "2",
      title: "Lunch at Le Bistrot Parisien",
      shortDescription: "Traditional French cuisine with a modern twist",
      longDescription:
        "Le Bistrot Parisien offers a delightful blend of traditional French cuisine with a contemporary flair. Situated in the heart of Paris, this charming restaurant provides a cozy atmosphere and a menu that changes with the seasons. From classic dishes like Coq au Vin to innovative creations by the chef, every meal here is a celebration of French culinary arts.",
      image: "/placeholder.svg?height=400&width=600",
      place: "Le Bistrot Parisien",
      time: "12:30 PM",
      duration: "1.5 hours",
      date: "2023-08-15",
      location: "34 Rue de la Cuisine, 75006 Paris, France",
      reviews: 2567,
      rating: 4.4,
    },
    {
      id: "3",
      title: "Explore the Louvre Museum",
      shortDescription: "World's largest art museum and historic monument",
      longDescription:
        "The Louvre, or the Louvre Museum, is the world's largest art museum and a historic monument in Paris, France. A central landmark of the city, it is located on the Right Bank of the Seine. Nearly 35,000 objects from prehistory to the 21st century are exhibited over an area of 72,735 square meters (782,910 square feet). The museum is housed in the Louvre Palace, originally built as the Louvre castle in the late 12th to 13th century under Philip II.",
      image: "/placeholder.svg?height=400&width=600",
      place: "Louvre Museum",
      time: "2:00 PM",
      duration: "3 hours",
      date: "2023-08-15",
      location: "Rue de Rivoli, 75001 Paris, France",
      reviews: 201478,
      rating: 4.7,
    },
    {
      id: "4",
      title: "Seine River Cruise",
      shortDescription: "Scenic boat tour along the Seine River",
      longDescription:
        "Experience the beauty of Paris from a unique perspective with a Seine River cruise. Glide past iconic landmarks such as Notre-Dame Cathedral, the Louvre, and the Eiffel Tower while enjoying informative commentary about the city's history and architecture. This relaxing journey offers stunning views of Paris, especially beautiful as the sun sets and the city lights begin to twinkle.",
      image: "/placeholder.svg?height=400&width=600",
      place: "Seine River",
      time: "6:00 PM",
      duration: "1 hour",
      date: "2023-08-15",
      location: "Port de la Bourdonnais, 75007 Paris, France",
      reviews: 50234,
      rating: 4.5,
    },
    {
      id: "5",
      title: "Dinner at Le Jules Verne",
      shortDescription: "Gourmet dining with panoramic views of Paris",
      longDescription:
        "Conclude your perfect day in Paris with an unforgettable dining experience at Le Jules Verne. Located on the second floor of the Eiffel Tower, this Michelin-starred restaurant offers exquisite French cuisine paired with breathtaking views of the City of Light. Chef Frédéric Anton's innovative menu showcases the finest seasonal ingredients, creating a culinary journey that matches the spectacular setting.",
      image: "/placeholder.svg?height=400&width=600",
      place: "Le Jules Verne",
      time: "8:00 PM",
      duration: "2 hours",
      date: "2023-08-15",
      location:
        "Eiffel Tower, 2nd Floor, Avenue Gustave Eiffel, 75007 Paris, France",
      reviews: 3456,
      rating: 4.8,
    },
  ],
  planner: {
    name: "Sophie Dubois",
    bio: "Local Parisian and certified tour guide with 10 years of experience showcasing the best of the City of Light.",
    avatar: "/placeholder.svg?height=100&width=100",
    eventsCreated: 47,
    profileLink: "/planner/sophie-dubois",
  },
  reviews: [
    {
      id: "r1",
      user: "John D.",
      comment:
        "This itinerary was perfect! We saw so much in one day without feeling rushed.",
      rating: 5,
    },
    {
      id: "r2",
      user: "Emma S.",
      comment:
        "Great balance of iconic sights and local experiences. Highly recommend!",
      rating: 4,
    },
    {
      id: "r3",
      user: "Michael L.",
      comment: "The timing was spot on. We never had to wait in long queues.",
      rating: 5,
    },
  ],
  completions: 1287,
};
