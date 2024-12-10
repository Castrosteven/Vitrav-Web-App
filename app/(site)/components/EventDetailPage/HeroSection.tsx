import { CalendarDays, MapPin, Users } from "lucide-react";
interface HeroSectionProps {
  title: string;
  // date: string;
  completions: number;
  place: string;
}

export async function HeroSection({
  title,
  // date,
  completions,
  place,
}: HeroSectionProps) {
  return (
    <div className="relative py-16 bg-primary text-primary-foreground">
      <div className="absolute inset-0 overflow-hidden">
        {/* <Image
          src="/placeholder.svg?height=400&width=1200"
          alt="Paris skyline"
          fill
          className="object-cover object-center"
        /> */}
        <div className="absolute inset-0 bg-primary/60" />
      </div>
      <div className="relative container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <div className="flex flex-wrap items-center gap-4">
          {/* <div className="flex items-center">
            <CalendarDays className="w-5 h-5 mr-2" />
            <span>{date}</span>
          </div> */}
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{place}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            <span>{completions} people have done this</span>
          </div>
        </div>
      </div>
    </div>
  );
}
