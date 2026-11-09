import React from "react";
import { GlobalHeader } from "./GlobalHeader";
import { FloatingNavRail } from "./FloatingNavRail";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F8FB] via-[#F2F4F7] to-[#EAEFF4] text-[#191C20] flex flex-col font-sans selection:bg-[#2563EB] selection:text-white relative overflow-x-hidden">
      {/* Ambient Architectural Light Accents */}
      <div className="fixed top-0 right-1/4 w-[500px] h-[300px] bg-blue-100/35 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="fixed top-32 left-1/3 w-[400px] h-[400px] bg-slate-200/40 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Top Global Header */}
      <GlobalHeader />

      <div className="flex-1 flex relative z-10">
        {/* Floating Navigation Rail */}
        <FloatingNavRail />

        {/* Main Content Viewport */}
        <main className="flex-1 w-full pl-4 md:pl-22 lg:pl-24 pr-4 lg:pr-8 py-6 max-w-[1600px] mx-auto animate-fade-in-up">
          {children}
        </main>
      </div>
    </div>
  );
};
