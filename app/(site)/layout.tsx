import "@aws-amplify/ui-react/styles.css";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../components/toggle";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <header className="px-4 lg:px-6 h-14 flex items-center container mx-auto">
          <Link className="flex items-center justify-center" href="/">
            <MapPin className="h-6 w-6 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">
              Vitrav
            </span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
            {/* <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link> */}
            {/* <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            How It Works
          </Link> */}
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/dashboard"
            >
              Create a plan
            </Link>
            <ModeToggle />
          </nav>
          {/* <Button className="ml-4" variant="outline" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button> */}
        </header>
        {children}
        <footer className="bg-muted">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <Link className="flex items-center justify-start" href="/">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <span className="ml-2 text-2xl font-bold text-gray-900">
                    Vitrav
                  </span>
                </Link>
                <p className="mt-2 text-sm text-muted-foreground">
                  Plan your perfect trip with curated itineraries.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-sm hover:text-primary">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/itinerary"
                      className="text-sm hover:text-primary"
                    >
                      Itineraries
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-primary">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-primary">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm hover:text-primary">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-primary">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-primary">
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Follow Us</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm hover:text-primary">
                      Facebook
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-primary">
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-primary">
                      Instagram
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} TripPlanner. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
