import React from "react";
import { GlobalHeader } from "./GlobalHeader";
import { FloatingNavRail } from "./FloatingNavRail";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F2F1ED] text-[#191C20] flex flex-col font-sans selection:bg-[#315BDB] selection:text-white">
      {/* Top Global Header */}
      <GlobalHeader />

      <div className="flex-1 flex relative">
        {/* Floating Navigation Rail */}
        <FloatingNavRail />

        {/* Main Content Viewport */}
        <main className="flex-1 w-full pl-4 md:pl-22 lg:pl-24 pr-4 lg:pr-8 py-6 max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};