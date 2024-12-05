"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
// import { toast } from "@/components/ui/use-toast";

export function UserActions() {
  const [liked, setLiked] = useState(false);
  const [review, setReview] = useState("");

  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Removed from favorites" : "Added to favorites",
      description: liked
        ? "This itinerary has been removed from your favorites."
        : "This itinerary has been added to your favorites.",
    });
  };

  const handleShare = () => {
    // In a real application, this would open a share dialog or copy a link to clipboard
    toast({
      title: "Share link copied!",
      description:
        "The link to this itinerary has been copied to your clipboard.",
    });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit the review to a backend
    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback.",
    });
    setReview("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Button
            variant={liked ? "default" : "outline"}
            size="sm"
            onClick={handleLike}
          >
            <Heart className={`mr-2 h-4 w-4 ${liked ? "fill-current" : ""}`} />
            {liked ? "Liked" : "Like"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
        <form onSubmit={handleSubmitReview}>
          <Textarea
            placeholder="Leave your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="mb-2"
          />
          <Button type="submit" disabled={!review.trim()}>
            Submit Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
