import Image from "next/image";
import { Button } from "@/components/ui/button";

export function AppPromo() {
  return (
    <div className="bg-primary text-primary-foreground rounded-lg overflow-hidden">
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold mb-4">Download Our Mobile App</h2>
          <p className="mb-6">
            Get access to exclusive itineraries and plan your trips on the go!
          </p>
          <div className="flex space-x-4">
            <Button variant="secondary">App Store</Button>
            <Button variant="secondary">Google Play</Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/placeholder.svg?height=300&width=300"
            alt="Mobile app screenshot"
            width={300}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
