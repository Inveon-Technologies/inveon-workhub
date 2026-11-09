import React, { useState } from "react";
import {
  Home,
  Users,
  Layers,
  GraduationCap,
  CalendarDays,
  MessageSquare,
  BarChart3,
  Settings,
  LucideIcon,
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
}

export const FloatingNavRail: React.FC = () => {
  const [activeId, setActiveId] = useState("home");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: Home, href: "#home" },
    { id: "people", label: "People & Teams", icon: Users, href: "#people" },
    { id: "work", label: "Work & Tasks", icon: Layers, href: "#work" },
    { id: "growth", label: "Growth & LMS", icon: GraduationCap, href: "#growth" },
    { id: "calendar", label: "Calendar", icon: CalendarDays, href: "#calendar" },
    { id: "chat", label: "Chat & Channels", icon: MessageSquare, href: "#chat" },
    { id: "reports", label: "Analytics & Reports", icon: BarChart3, href: "#reports" },
  ];

  return (
    <aside className="fixed left-3 lg:left-5 top-20 z-30 hidden md:flex flex-col items-center justify-between py-4 px-1.5 bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#E8E6DF] w-14 transition-all">
      {/* Upper Navigation Icons */}
      <div className="flex flex-col items-center gap-3 w-full">
        {navItems.map((item) => {
          const isActive = activeId === item.id;
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="relative flex items-center justify-center w-full"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <button
                onClick={() => setActiveId(item.id)}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? "bg-[#315BDB] text-white shadow-md shadow-[#315BDB]/25 scale-100"
                    : "text-[#858B93] hover:text-[#191C20] hover:bg-[#F2F1ED] scale-95 hover:scale-100"
                }`}
                aria-label={item.label}
              >
                <Icon size={19} className="transition-transform" />
              </button>

              {/* Tooltip */}
              {hoveredId === item.id && (
                <div className="absolute left-14 px-2.5 py-1 bg-[#191C20] text-white text-[11px] font-semibold rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none animate-in fade-in slide-in-from-left-1 duration-150">
                  {item.label}
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#191C20] rotate-45" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Settings Icon */}
      <div
        className="relative flex items-center justify-center w-full mt-6 pt-3 border-t border-[#F2F1ED]"
        onMouseEnter={() => setHoveredId("settings")}
        onMouseLeave={() => setHoveredId(null)}
      >
        <button
          onClick={() => setActiveId("settings")}
          className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
            activeId === "settings"
              ? "bg-[#315BDB] text-white shadow-md"
              : "text-[#858B93] hover:text-[#191C20] hover:bg-[#F2F1ED]"
          }`}
          aria-label="Settings"
        >
          <Settings size={18} />
        </button>

        {hoveredId === "settings" && (
          <div className="absolute left-14 px-2.5 py-1 bg-[#191C20] text-white text-[11px] font-semibold rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none">
            Organisation Settings
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#191C20] rotate-45" />
          </div>
        )}
      </div>
    </aside>
  );
};