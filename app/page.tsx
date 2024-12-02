import { Button } from "@/components/ui/button";
import { MapPin, Search, Share2, Star, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function VitravLandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center container mx-auto">
        <Link className="flex items-center justify-center" href="#">
          <MapPin className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">Vitrav</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            How It Works
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Testimonials
          </Link>
        </nav>
        <Button className="ml-4" variant="outline" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </header>
      <main className="flex-1 ">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-blue-50 ">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover, Plan, and Share Your Perfect City Adventure
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Vitrav helps you find, create, and share amazing itineraries
                    for your city explorations. Your next unforgettable
                    experience is just a tap away.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Download App
                  </Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
              <div className="mx-auto flex w-full items-center justify-center">
                <Image
                  alt="Vitrav App Interface"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                  height="600"
                  src="/placeholder.svg"
                  width="600"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Search className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Find Exciting Activities
                </h3>
                <p className="text-gray-500">
                  Discover hidden gems and popular attractions in any city.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Star className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Create Custom Itineraries
                </h3>
                <p className="text-gray-500">
                  Plan your perfect day with easy-to-use itinerary builder.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Share2 className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Share Your Experiences
                </h3>
                <p className="text-gray-500">
                  Inspire others by sharing your favorite itineraries and
                  discoveries.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How It Works
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Download Vitrav</h3>
                <p className="text-gray-500">
                  Get the app from your devices app store.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Explore or Create</h3>
                <p className="text-gray-500">
                  Find existing itineraries or create your own.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Enjoy and Share</h3>
                <p className="text-gray-500">
                  Experience the city and share your adventures.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-4 p-6 bg-gray-100 rounded-lg">
                <p className="text-gray-500">
                  Vitrav made planning our city break so easy and fun! We
                  discovered amazing places we would have never found otherwise.
                </p>
                <p className="font-semibold">- Sarah T.</p>
              </div>
              <div className="flex flex-col gap-4 p-6 bg-gray-100 rounded-lg">
                <p className="text-gray-500">
                  As a solo traveler, Vitrav has been a game-changer. I feel
                  like I have a local guide in my pocket wherever I go.
                </p>
                <p className="font-semibold">- Mike R.</p>
              </div>
              <div className="flex flex-col gap-4 p-6 bg-gray-100 rounded-lg">
                <p className="text-gray-500">
                  I love how easy it is to share my favorite spots with friends.
                  Vitrav has made me the go-to person for city recommendations!
                </p>
                <p className="font-semibold">- Emily L.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Ready to Explore?
                </h2>
                <p className="max-w-[600px] text-gray-200 md:text-xl">
                  Download Vitrav now and start discovering amazing experiences
                  in your city or your next travel destination.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  Download for iOS
                </Button>
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  Download for Android
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t container mx-auto">
        <p className="text-xs text-gray-500">
          © 2024 Vitrav. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
