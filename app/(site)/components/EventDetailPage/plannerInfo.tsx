import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import type { PlannerInfo } from "@/app/types/itinerary";

export function PlannerInfo({ planner }: { planner: PlannerInfo }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About the Planner</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src={planner.avatar} alt={planner.name} />
            <AvatarFallback>
              {planner.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{planner.name}</h3>
            <p className="text-sm text-muted-foreground">{planner.bio}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
          <Calendar className="w-4 h-4" />
          <span>{planner.eventsCreated} events created</span>
        </div>
        <Link
          href={planner.profileLink}
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          View full profile
          <ChevronRight className="ml-1 w-4 h-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
