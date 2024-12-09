import React from "react";
import { Loader2 } from "lucide-react"; // For a rotating loader icon

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Animated Icon */}
      <div className="relative flex items-center justify-center w-24 h-24">
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
        {/* Simulating the "itinerary" visual */}
        <div
          className="absolute w-6 h-6 bg-blue-300 rounded-full top-2 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="absolute w-5 h-5 bg-blue-400 rounded-full left-2 animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
        <div
          className="absolute w-4 h-4 bg-blue-500 rounded-full right-2 animate-bounce"
          style={{ animationDelay: "0.6s" }}
        ></div>
      </div>

      {/* Loading Text */}
      <div className="mt-8 text-center">
        <p className="text-lg font-medium text-gray-700">Fetching places...</p>
        <p className="text-sm text-gray-500">
          Putting together the perfect itinerary
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
