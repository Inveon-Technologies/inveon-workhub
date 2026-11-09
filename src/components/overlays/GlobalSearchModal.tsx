import React, { useState, useEffect } from "react";
import {
  Search,
  X,
  Users,
  Layers,
  GraduationCap,
  Calendar,
  FileText,
  ArrowRight,
  Clock,
  CalendarCheck,
  DollarSign,
  Briefcase,
  TrendingUp,
  UserCheck,
  Lock,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { ActiveModule } from "../../types";

export const GlobalSearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen, setActiveModule } = useAuth();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, setSearchOpen]);

  if (!searchOpen) return null;

  const searchableItems = [
    { title: "Siddharth Rao", type: "People", sub: "Senior Frontend Engineer - Engineering", icon: Users, module: "people" as ActiveModule },
    { title: "Rutuja Shinde", type: "People", sub: "Lead UI/UX Designer - Design", icon: Users, module: "people" as ActiveModule },
    { title: "WorkHub v2.0 - Product Enhancements", type: "Projects", sub: "Core UI/UX, Navigation Rail & Dashboards", icon: Layers, module: "projects" as ActiveModule },
    { title: "Review UI design and share feedback", type: "Work", sub: "Due Today - Priority High", icon: FileText, module: "work" as ActiveModule },
    { title: "October 2026 Salary Slip & Tax Sheet", type: "Documents", sub: "Gross: INR 1,45,000 - Net: INR 1,28,450", icon: DollarSign, module: "payroll" as ActiveModule },
    { title: "Punch In & Shift Regularization", type: "Work", sub: "09:30 AM - 06:30 PM Shift", icon: Clock, module: "attendance" as ActiveModule },
    { title: "Casual & Sick Leave Balances", type: "Work", sub: "8 CL & 7 SL Available", icon: CalendarCheck, module: "leave" as ActiveModule },
    { title: "Senior Full-Stack Engineer Requisition", type: "Recruitment", sub: "ATS Funnel - 42 Applicants", icon: Briefcase, module: "recruitment" as ActiveModule },
    { title: "Q3 2026 OKR Performance Scorecard", type: "Work", sub: "Rating: 4.8 / 5.0 (Top Tier)", icon: TrendingUp, module: "performance" as ActiveModule },
    { title: "Onboarding Checklist & IT Assets", type: "People", sub: "Pre-boarding & Orientation", icon: UserCheck, module: "onboarding" as ActiveModule },
    { title: "Employment Contract & E-Signed NDA", type: "Documents", sub: "256-bit Encrypted PDF Archive", icon: FileText, module: "documents" as ActiveModule },
    { title: "Inveon Design System Masterclass", type: "Work", sub: "12 Lessons - Design Systems in Tailwind", icon: GraduationCap, module: "growth" as ActiveModule },
    { title: "Product Sync - Engineering & Leadership", type: "Work", sub: "Today at 10:00 AM - Conference Room A", icon: Calendar, module: "calendar" as ActiveModule },
    { title: "Role-Based Access Control (RBAC)", type: "Documents", sub: "Permissions & Audit Log Trail", icon: Lock, module: "org-admin" as ActiveModule },
    { title: "New Remote Work & Hybrid Policy", type: "Documents", sub: "Approved by HR - Applicable to all teams", icon: FileText, module: "settings" as ActiveModule },
  ];

  const categories = ["All", "People", "Work", "Projects", "Recruitment", "Documents"];

  const filtered = searchableItems.filter((i) => {
    const matchesCategory = activeCategory === "All" || i.type === activeCategory;
    const matchesQuery = !query.trim() ||
      i.title.toLowerCase().includes(query.toLowerCase()) ||
      i.sub.toLowerCase().includes(query.toLowerCase()) ||
      i.type.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleSelect = (mod: ActiveModule) => {
    setActiveModule(mod);
    setSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#D8D9D6] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar (Matching Global Search Overlay UI) */}
        <div className="p-4 border-b border-[#F2F1ED] flex items-center gap-3">
          <Search size={20} className="text-[#2563EB]" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anything in WorkHub..."
            className="w-full text-sm font-semibold text-[#191C20] placeholder-[#858B93] focus:outline-none"
          />
          <span className="text-[10px] font-bold text-[#858B93] bg-[#F2F1ED] px-2 py-0.5 rounded border border-[#E2E8F0]">
            Ctrl + K
          </span>
          <button
            onClick={() => setSearchOpen(false)}
            className="p-1 rounded-lg text-[#858B93] hover:text-[#191C20] hover:bg-[#F2F1ED] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Category Pills (All, People, Work, Projects, Recruitment, Documents) */}
        <div className="px-4 py-2.5 bg-[#FAFAFA] border-b border-[#F2F1ED] flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-white hover:bg-[#EEF2FF] hover:text-[#2563EB] text-[#64748B] border border-[#E2E8F0]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-xs text-[#858B93] font-medium">
              No matching records found for "{query}".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(item.module)}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0] cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-[#2563EB] flex items-center justify-center shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-[#191C20] group-hover:text-[#2563EB] transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-[10px] font-semibold text-[#858B93] bg-[#F1F5F9] px-2 py-0.5 rounded-full">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#858B93] font-medium mt-0.5">{item.sub}</p>
                    </div>
                  </div>

                  <ArrowRight size={14} className="text-[#858B93] group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all" />
                </div>
              );
            })
          )}
        </div>

        {/* Keyboard hints footer */}
        <div className="p-3 bg-[#F8FAFC] border-t border-[#F2F1ED] flex items-center justify-between text-[11px] text-[#858B93]">
          <div className="flex items-center gap-4">
            <span><kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#CBD5E1]">Ctrl + K</kbd> Open</span>
            <span><kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#CBD5E1]">Esc</kbd> Close</span>
          </div>
          <span>Search across people, work, projects, recruitment and documents</span>
        </div>
      </div>
    </div>
  );
};
