import React from "react";
import { Grid, Users, Layers, GraduationCap, Calendar, MessageSquare, BarChart3, Settings, ShieldCheck, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { ActiveModule } from "../../types";

export const AppSwitcherModal: React.FC = () => {
  const { appSwitcherOpen, setAppSwitcherOpen, setActiveModule } = useAuth();

  if (!appSwitcherOpen) return null;

  const apps: { id: ActiveModule; name: string; desc: string; icon: any; color: string; bg: string }[] = [
    { id: "home", name: "Executive OS", desc: "Command center & presence", icon: Layers, color: "text-[#315BDB]", bg: "bg-[#EEF3FF]" },
    { id: "people", name: "People & HRMS", desc: "Workforce directory & org tree", icon: Users, color: "text-[#10B981]", bg: "bg-[#ECFDF5]" },
    { id: "work", name: "Work & Tasks", desc: "Kanban sprint boards & tracking", icon: Layers, color: "text-[#F59E0B]", bg: "bg-[#FFFBEB]" },
    { id: "growth", name: "Growth & LMS", desc: "Skill academy & certifications", icon: GraduationCap, color: "text-[#8B5CF6]", bg: "bg-[#F5F3FF]" },
    { id: "calendar", name: "Calendar & Meet", desc: "Events, rooms & 1-on-1 calls", icon: Calendar, color: "text-[#EC4899]", bg: "bg-[#FDF2F8]" },
    { id: "chat", name: "Chat & Channels", desc: "Team discussion & direct messaging", icon: MessageSquare, color: "text-[#06B6D4]", bg: "bg-[#ECFEFF]" },
    { id: "reports", name: "Reports & Insights", desc: "Analytics, attrition & velocity", icon: BarChart3, color: "text-[#F97316]", bg: "bg-[#FFF7ED]" },
    { id: "settings", name: "Organisation Admin", desc: "Policies, roles & security", icon: Settings, color: "text-[#475569]", bg: "bg-[#F1F5F9]" },
  ];

  const handleSelect = (mod: ActiveModule) => {
    setActiveModule(mod);
    setAppSwitcherOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D8D9D6]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#F2F1ED] mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#EEF3FF] text-[#315BDB] flex items-center justify-center font-bold">
              <Grid size={16} />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#191C20]">WorkHub App Switcher</h3>
              <p className="text-[11px] text-[#858B93] font-medium">Quick switch between integrated business suites</p>
            </div>
          </div>

          <button
            onClick={() => setAppSwitcherOpen(false)}
            className="p-1 rounded-xl text-[#858B93] hover:text-[#191C20] hover:bg-[#F2F1ED] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => handleSelect(app.id)}
                className="p-3.5 rounded-2xl border border-[#EBEBEB] hover:border-[#315BDB] bg-[#FAFAFA] hover:bg-white text-left transition-all hover:-translate-y-0.5 group cursor-pointer flex flex-col justify-between min-h-[110px]"
              >
                <div className={`w-9 h-9 rounded-xl ${app.bg} ${app.color} flex items-center justify-center mb-2`}>
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#191C20] group-hover:text-[#315BDB] transition-colors leading-tight">
                    {app.name}
                  </h4>
                  <p className="text-[10px] text-[#858B93] leading-snug line-clamp-2 mt-0.5">{app.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
