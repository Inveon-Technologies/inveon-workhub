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
import { useAuth } from "../../context/AuthContext";
import { ActiveModule } from "../../types";

export interface NavItem {
  id: ActiveModule;
  label: string;
  icon: LucideIcon;
}

export const FloatingNavRail: React.FC = () => {
  const { activeModule, setActiveModule } = useAuth();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { id: "home", label: "Dashboard", icon: Home },
    { id: "people", label: "People & HRMS", icon: Users },
    { id: "work", label: "Work & Tasks", icon: Layers },
    { id: "growth", label: "Growth & LMS", icon: GraduationCap },
    { id: "calendar", label: "Calendar & Schedule", icon: CalendarDays },
    { id: "chat", label: "Chat & Channels", icon: MessageSquare },
    { id: "reports", label: "Analytics & Reports", icon: BarChart3 },
  ];

  return (
    <>
      {/* Desktop Floating Vertical Rail */}
      <aside className="fixed left-3 lg:left-5 top-20 z-30 hidden md:flex flex-col items-center justify-between py-4 px-1.5 bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#E8E6DF] w-14 transition-all">
        {/* Upper Navigation Icons */}
        <div className="flex flex-col items-center gap-3 w-full">
          {navItems.map((item) => {
            const isActive = activeModule === item.id;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="relative flex items-center justify-center w-full"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <button
                  onClick={() => setActiveModule(item.id)}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#315BDB] text-white shadow-md shadow-[#315BDB]/30 scale-100"
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
            onClick={() => setActiveModule("settings")}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
              activeModule === "settings"
                ? "bg-[#315BDB] text-white shadow-md shadow-[#315BDB]/30"
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

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E3E8EE] px-2 py-1.5 flex items-center justify-around shadow-lg">
        {navItems.slice(0, 5).map((item) => {
          const isActive = activeModule === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`flex flex-col items-center justify-center p-1.5 rounded-xl text-[10px] font-bold ${
                isActive ? "text-[#315BDB]" : "text-[#858B93]"
              }`}
            >
              <Icon size={18} />
              <span className="scale-90">{item.label.split(" ")[0]}</span>
            </button>
          );
        })}
        <button
          onClick={() => setActiveModule("settings")}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl text-[10px] font-bold ${
            activeModule === "settings" ? "text-[#315BDB]" : "text-[#858B93]"
          }`}
        >
          <Settings size={18} />
          <span className="scale-90">Settings</span>
        </button>
      </nav>
    </>
  );
};
