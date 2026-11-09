import React, { useState } from "react";
import {
  Clock,
  CheckCircle2,
  Calendar,
  Layers,
  BookOpen,
  FileText,
  Bell,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Play,
  Download,
  Plus,
} from "lucide-react";
import heroBg from "../../assets/images/hero-architecture-bg.png";

export const EmployeeDashboard: React.FC = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Greetings & Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#191C20] tracking-tight">
              My Workspace
            </h1>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-[#858B93] border border-[#E3E8EE]">
              Tue, 14 Jan 2026
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EFF4FF] text-[#315BDB] border border-[#D0E0FC]">
              Good morning, Ishita 👋
            </span>
          </div>
          <p className="text-xs text-[#858B93] font-medium mt-1">
            Your workday, tasks and workplace essentials — all in one place.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select className="bg-white border border-[#E3E8EE] text-xs font-bold text-[#191C20] rounded-xl px-3 py-2 shadow-xs outline-none">
            <option>Last 30 Days</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
      </div>

      {/* Top Metric Ribbon (6 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "My Tasks", val: "12", sub: "+ 4 Due Soon", subColor: "text-[#F07838]" },
          { label: "My Projects", val: "3", sub: "+ 2 Active", subColor: "text-[#10B981]" },
          { label: "Leave Balance", val: "12 Days", sub: "Available", subColor: "text-[#315BDB]" },
          { label: "My Learning", val: "2", sub: "● In Progress", subColor: "text-[#315BDB]" },
          { label: "My Documents", val: "8", sub: "Verified", subColor: "text-[#858B93]" },
          { label: "Announcements", val: "5", sub: "+ 2 Unread", subColor: "text-[#F07838]" },
        ].map((m, idx) => (
          <div key={idx} className="bg-white p-3.5 rounded-2xl border border-[#E3E8EE] shadow-xs">
            <p className="text-[11px] font-bold text-[#858B93]">{m.label}</p>
            <p className="text-xl font-extrabold text-[#191C20] mt-0.5">{m.val}</p>
            <span className={`text-[10px] font-bold ${m.subColor}`}>{m.sub}</span>
          </div>
        ))}
      </div>

      {/* Architectural Hero Banner */}
      <div className="relative w-full rounded-3xl overflow-hidden border border-[#E3E8EE] bg-white shadow-xs p-6 lg:p-8">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Architecture" className="w-full h-full object-cover object-right opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent w-full md:w-3/5" />
        </div>

        <div className="relative z-10">
          <span className="text-[11px] font-extrabold tracking-widest text-[#858B93] uppercase">
            MY WORKSPACE
          </span>
          <h2 className="text-2xl lg:text-4xl font-extrabold text-[#191C20] mt-1 mb-2">
            Stay productive.
            <br />
            <span className="font-serif italic font-normal text-[#315BDB]">
              Keep moving forward.
            </span>
          </h2>
          <p className="text-xs lg:text-sm text-[#475569] font-medium max-w-md mb-6">
            Manage your work, learning and workplace needs in one place.
          </p>

          {/* 5 Hub Tiles */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { title: "My Work", sub: "Tasks and deliverables", icon: CheckCircle2 },
              { title: "Projects", sub: "My project contributions", icon: Layers },
              { title: "Leave", sub: "Balances and requests", icon: Calendar },
              { title: "Learning", sub: "Courses and development", icon: BookOpen },
              { title: "Documents", sub: "My workplace documents", icon: FileText },
            ].map((t, idx) => {
              const Icon = t.icon;
              return (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#EEF3FF] text-[#315BDB] flex items-center justify-center">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-[#191C20]">{t.title}</p>
                      <p className="text-[10px] text-[#858B93]">{t.sub}</p>
                    </div>
                  </div>
                  <ArrowRight size={12} className="text-[#858B93]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid: Attendance + Tasks + Leave */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Attendance (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#E3E8EE] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#315BDB]" />
                <h3 className="text-sm font-extrabold text-[#191C20]">My Workday (Attendance)</h3>
              </div>
              <a href="#attendance" className="text-xs font-bold text-[#315BDB] hover:underline">
                View History →
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] mb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-sm font-extrabold text-[#191C20]">
                    {isCheckedIn ? "Working" : "Checked Out"}
                  </span>
                </div>
                <p className="text-[11px] text-[#858B93] mt-0.5">Checked in at 09:00 AM</p>
              </div>

              <button
                onClick={() => setIsCheckedIn(!isCheckedIn)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                  isCheckedIn
                    ? "bg-[#315BDB] hover:bg-[#244BB5] text-white"
                    : "bg-[#10B981] hover:bg-[#059669] text-white"
                }`}
              >
                {isCheckedIn ? "Check Out" : "Check In"}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <p className="text-[10px] text-[#858B93] font-bold">Working Time</p>
                <p className="text-xs font-black text-[#191C20] mt-0.5">05h 30m</p>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <p className="text-[10px] text-[#858B93] font-bold">Break Time</p>
                <p className="text-xs font-black text-[#191C20] mt-0.5">30 mins</p>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <p className="text-[10px] text-[#858B93] font-bold">Expected</p>
                <p className="text-xs font-black text-[#191C20] mt-0.5">09h 00m</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F2F1ED] text-xs text-[#858B93] flex justify-between">
            <span>Shift: General (9:00 AM - 6:00 PM)</span>
            <span className="text-[#10B981] font-bold">● Regular</span>
          </div>
        </div>

        {/* Tasks (8 Cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-[#E3E8EE] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-extrabold text-[#191C20]">My Tasks</h3>
            <div className="flex items-center gap-1 bg-[#F2F1ED] p-1 rounded-xl text-xs">
              {["All (12)", "Today (4)", "Upcoming (3)", "Overdue (2)", "Completed (3)"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    activeTab === tab ? "bg-white text-[#315BDB] shadow-xs" : "text-[#858B93] hover:text-[#191C20]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {[
              { title: "Complete UI design for dashboard", proj: "WorkHub v2.0", prio: "High", due: "14 Jan", status: "In Progress" },
              { title: "Update project documentation", proj: "Platform Integration", prio: "Medium", due: "15 Jan", status: "To Do" },
              { title: "Review API integration changes", proj: "Client Portal", prio: "Medium", due: "16 Jan", status: "In Review" },
              { title: "Prepare release notes", proj: "WorkHub v2.0", prio: "High", due: "16 Jan", status: "To Do" },
            ].map((t, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] hover:border-[#D8D9D6]">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 rounded text-[#315BDB]" />
                  <div>
                    <p className="text-xs font-bold text-[#191C20]">{t.title}</p>
                    <p className="text-[10px] text-[#858B93]">{t.proj}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#FEF2F2] text-[#EF4444]">
                    {t.prio}
                  </span>
                  <span className="text-xs font-semibold text-[#858B93]">{t.due}</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#EFF4FF] text-[#315BDB]">
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};