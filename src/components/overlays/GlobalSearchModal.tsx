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
    { title: "Siddharth Rao", type: "Employee", sub: "Senior Frontend Engineer • Engineering", icon: Users, module: "people" as ActiveModule },
    { title: "Rutuja Shinde", type: "Employee", sub: "Lead UI/UX Designer • Design", icon: Users, module: "people" as ActiveModule },
    { title: "WorkHub v2.0 - Product Enhancements", type: "Project", sub: "Core UI/UX, Navigation Rail & Dashboards", icon: Layers, module: "projects" as ActiveModule },
    { title: "Review UI design and share feedback", type: "Task", sub: "Due Today • Priority High", icon: FileText, module: "work" as ActiveModule },
    { title: "October 2026 Salary Slip & Tax Sheet", type: "Payroll", sub: "Gross: ₹1,45,000 • Net: ₹1,28,450", icon: DollarSign, module: "payroll" as ActiveModule },
    { title: "Punch In & Shift Regularization", type: "Attendance", sub: "09:30 AM - 06:30 PM Shift", icon: Clock, module: "attendance" as ActiveModule },
    { title: "Casual & Sick Leave Balances", type: "Leaves", sub: "8 CL & 7 SL Available", icon: CalendarCheck, module: "leave" as ActiveModule },
    { title: "Senior Full-Stack Engineer Requisition", type: "Recruitment", sub: "ATS Funnel • 42 Applicants", icon: Briefcase, module: "recruitment" as ActiveModule },
    { title: "Q3 2026 OKR Performance Scorecard", type: "Performance", sub: "Rating: 4.8 / 5.0 (Top Tier)", icon: TrendingUp, module: "performance" as ActiveModule },
    { title: "Onboarding Checklist & IT Assets", type: "Onboarding", sub: "Pre-boarding & Orientation", icon: UserCheck, module: "onboarding" as ActiveModule },
    { title: "Employment Contract & E-Signed NDA", type: "Document Vault", sub: "256-bit Encrypted PDF Archive", icon: FileText, module: "documents" as ActiveModule },
    { title: "Inveon Design System Masterclass", type: "LMS Course", sub: "12 Lessons • Design Systems in Tailwind", icon: GraduationCap, module: "growth" as ActiveModule },
    { title: "Product Sync - Engineering & Leadership", type: "Meeting", sub: "Today at 10:00 AM • Conference Room A", icon: Calendar, module: "calendar" as ActiveModule },
    { title: "Role-Based Access Control (RBAC)", type: "Security", sub: "Permissions & Audit Log Trail", icon: Lock, module: "org-admin" as ActiveModule },
    { title: "New Remote Work & Hybrid Policy", type: "Policy", sub: "Approved by HR • Applicable to all teams", icon: FileText, module: "settings" as ActiveModule },
  ];

  const filtered = query.trim()
    ? searchableItems.filter(
        (i) =>
          i.title.toLowerCase().includes(query.toLowerCase()) ||
          i.sub.toLowerCase().includes(query.toLowerCase()) ||
          i.type.toLowerCase().includes(query.toLowerCase())
      )
    : searchableItems;

  const handleSelect = (mod: ActiveModule) => {
    setActiveModule(mod);
    setSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#D8D9D6] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#F2F1ED] flex items-center gap-3">
          <Search size={20} className="text-[#315BDB]" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search any of the 16 WorkHub modules, employees, tasks, slips or policies..."
            className="w-full text-sm font-semibold text-[#191C20] placeholder-[#858B93] focus:outline-none"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="p-1 rounded-lg text-[#858B93] hover:text-[#191C20] hover:bg-[#F2F1ED] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#858B93] font-medium">
              No matching records found for "{query}".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(item.module)}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#F2F1ED] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#EEF3FF] text-[#315BDB] flex items-center justify-center shrink-0">
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#191C20] group-hover:text-[#315BDB] transition-colors">
                          {item.title}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-[#F2F1ED] text-[#858B93]">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#858B93]">{item.sub}</p>
                    </div>
                  </div>

                  <ArrowRight size={14} className="text-[#858B93] group-hover:text-[#315BDB] group-hover:translate-x-0.5 transition-all" />
                </div>
              );
            })
          )}
        </div>

        <div className="p-3 bg-[#FAFAFA] border-t border-[#F2F1ED] flex items-center justify-between text-[11px] text-[#858B93]">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-white border border-[#D8D9D6] rounded text-[10px]">ESC</kbd> to exit search</span>
          <span className="font-bold text-[#315BDB]">Inveon Global Search</span>
        </div>
      </div>
    </div>
  );
};
