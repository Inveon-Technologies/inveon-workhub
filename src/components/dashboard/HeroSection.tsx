import React from "react";
import { Users, ClipboardCheck, BookOpen, Layers, ArrowRight, LucideIcon } from "lucide-react";
import heroBg from "../../assets/images/hero-architecture-bg.png";
import { useAuth } from "../../context/AuthContext";
import { ActiveModule } from "../../types";

export interface PavilionTile {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  module: ActiveModule;
}

export const HeroSection: React.FC = () => {
  const { setActiveModule } = useAuth();

  const pavilionTiles: PavilionTile[] = [
    {
      id: "people",
      tag: "01",
      title: "PEOPLE",
      subtitle: "Teams and talent",
      icon: Users,
      module: "people",
    },
    {
      id: "work",
      tag: "02",
      title: "WORK",
      subtitle: "Tasks and projects",
      icon: ClipboardCheck,
      module: "work",
    },
    {
      id: "growth",
      tag: "03",
      title: "GROWTH",
      subtitle: "Learning and development",
      icon: BookOpen,
      module: "growth",
    },
    {
      id: "operations",
      tag: "04",
      title: "OPERATIONS",
      subtitle: "Attendance and administration",
      icon: Layers,
      module: "settings",
    },
  ];

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-xs border border-[#E3E8EE] mb-6 bg-[#FFFFFF]">
      {/* Background Architectural Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Inveon WorkHub Architecture"
          className="w-full h-full object-cover object-right opacity-95"
        />
        {/* Soft gradient wash on left for maximum text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent w-full md:w-3/5" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 px-6 lg:px-10 py-8 lg:py-12 flex flex-col justify-between min-h-[300px] lg:min-h-[340px]">
        {/* Top Text Area */}
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-extrabold tracking-widest text-[#858B93] uppercase">
              THE ORGANISATION OS
            </span>
            <div className="h-[1px] w-12 bg-[#858B93]/40" />
          </div>

          <h1 className="text-3xl lg:text-5xl font-extrabold text-[#191C20] tracking-tight leading-[1.1] mb-3">
            Your organisation.
            <br />
            <span className="font-serif italic font-normal text-[#315BDB]">
              In motion.
            </span>
          </h1>

          <p className="text-sm lg:text-base text-[#475569] font-medium max-w-md">
            One connected environment for people, work and growth.
          </p>
        </div>

        {/* 4 Interactive Floating Glass Pavilion Tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mt-8 pt-4">
          {pavilionTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <button
                key={tile.id}
                onClick={() => setActiveModule(tile.module)}
                className="group relative flex items-center justify-between p-3.5 lg:p-4 rounded-2xl bg-white/85 hover:bg-white/95 backdrop-blur-md border border-white/90 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_-6px_rgba(49,91,219,0.15)] transition-all duration-300 hover:-translate-y-1 text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF3FF] group-hover:bg-[#315BDB] text-[#315BDB] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h2 className="text-xs lg:text-sm font-extrabold text-[#191C20] tracking-wide">
                      {tile.title}
                    </h2>
                    <p className="text-[11px] text-[#858B93] font-medium leading-tight">
                      {tile.subtitle}
                    </p>
                  </div>
                </div>

                <div className="w-6 h-6 rounded-full bg-[#F2F1ED] group-hover:bg-[#EEF3FF] flex items-center justify-center text-[#858B93] group-hover:text-[#315BDB] transition-all shrink-0">
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
