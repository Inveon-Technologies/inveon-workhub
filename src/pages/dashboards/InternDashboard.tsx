import React from "react";
import {
  GraduationCap,
  CheckCircle2,
  Clock,
  Send,
  MessageSquare,
  FileCheck2,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Award,
} from "lucide-react";
import heroBg from "../../assets/images/hero-architecture-bg.png";

export const InternDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#191C20] tracking-tight">
              My Internship
            </h1>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-[#858B93] border border-[#E3E8EE]">
              Tue, 14 Jan 2026
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EFF4FF] text-[#315BDB] border border-[#D0E0FC]">
              Good morning, Meera 👋
            </span>
          </div>
          <p className="text-xs text-[#858B93] font-medium mt-1">
            Your work, learning and internship journey — all in one place.
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs font-bold transition-all shadow-sm">
          <span>+ Submit Work</span>
        </button>
      </div>

      {/* Top Metric Ribbon (6 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "My Tasks", val: "8", sub: "+ 2 Due Soon", color: "text-[#F07838]" },
          { label: "My Projects", val: "2", sub: "+ Active", color: "text-[#10B981]" },
          { label: "Learning Courses", val: "3", sub: "+ 1 In Progress", color: "text-[#315BDB]" },
          { label: "Submissions", val: "4", sub: "● 1 Under Review", color: "text-[#315BDB]" },
          { label: "Attendance", val: "Working", sub: "● Checked in", color: "text-[#10B981]" },
          { label: "Leave Balance", val: "5 Days", sub: "Available", color: "text-[#858B93]" },
        ].map((m, idx) => (
          <div key={idx} className="bg-white p-3.5 rounded-2xl border border-[#E3E8EE] shadow-xs">
            <p className="text-[11px] font-bold text-[#858B93]">{m.label}</p>
            <p className="text-xl font-extrabold text-[#191C20] mt-0.5">{m.val}</p>
            <span className={`text-[10px] font-bold ${m.color}`}>{m.sub}</span>
          </div>
        ))}
      </div>

      {/* Hero: My Internship Journey */}
      <div className="relative w-full rounded-3xl overflow-hidden border border-[#E3E8EE] bg-white shadow-xs p-6 lg:p-8">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Architecture" className="w-full h-full object-cover object-right opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent w-full md:w-3/5" />
        </div>

        <div className="relative z-10">
          <span className="text-[11px] font-extrabold tracking-widest text-[#858B93] uppercase">
            MY INTERNSHIP JOURNEY
          </span>
          <h2 className="text-2xl lg:text-4xl font-extrabold text-[#191C20] mt-1 mb-2">
            Build. Learn.
            <br />
            <span className="font-serif italic font-normal text-[#315BDB]">
              Gain experience.
            </span>
          </h2>
          <p className="text-xs lg:text-sm text-[#475569] font-medium max-w-md mb-6">
            Work on real projects, build new skills and grow your professional experience at Inveon Technologies.
          </p>

          {/* 5 Hub Tiles */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { title: "Internship Progress", sub: "My journey and milestones", icon: TrendingUp },
              { title: "My Work", sub: "Tasks and submissions", icon: CheckCircle2 },
              { title: "Learning", sub: "Courses and training", icon: BookOpen },
              { title: "Mentor", sub: "Guidance and feedback", icon: Award },
              { title: "Reports", sub: "My internship progress", icon: FileCheck2 },
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

      {/* Main Grid: Milestone Stepper + Submissions + Mentor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Milestone Stepper (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E3E8EE] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-extrabold text-[#191C20]">My Internship Progress</h3>
              <p className="text-[11px] text-[#858B93]">Product Intern · Mentor: Rohan Mehta</p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-[#315BDB] flex items-center justify-center font-black text-xs text-[#315BDB]">
              60%
            </div>
          </div>

          <div className="space-y-3 relative before:absolute before:inset-0 before:left-3 before:w-[2px] before:bg-[#E3E8EE]">
            {[
              { label: "Internship Orientation", status: "Completed", done: true },
              { label: "Initial Training", status: "Completed", done: true },
              { label: "Assigned Work", status: "In Progress", current: true },
              { label: "Practical Projects", status: "Upcoming", pending: true },
              { label: "Review & Evaluation", status: "Upcoming", pending: true },
              { label: "Internship Completion", status: "Upcoming", pending: true },
            ].map((step, idx) => (
              <div key={idx} className="relative flex items-center justify-between pl-8 py-1">
                <span
                  className={`absolute left-2 w-2.5 h-2.5 rounded-full ${
                    step.done
                      ? "bg-[#10B981] ring-4 ring-[#ECFDF5]"
                      : step.current
                      ? "bg-[#315BDB] ring-4 ring-[#EFF4FF] animate-pulse"
                      : "bg-[#D8D9D6] ring-4 ring-white"
                  }`}
                />
                <span className={`text-xs font-bold ${step.done || step.current ? "text-[#191C20]" : "text-[#858B93]"}`}>
                  {step.label}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    step.done
                      ? "bg-[#ECFDF5] text-[#10B981]"
                      : step.current
                      ? "bg-[#EFF4FF] text-[#315BDB]"
                      : "bg-[#F2F1ED] text-[#858B93]"
                  }`}
                >
                  {step.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Submissions & Mentor (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Submissions Table */}
          <div className="bg-white p-6 rounded-3xl border border-[#E3E8EE] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-[#191C20]">My Submissions</h3>
              <a href="#submissions" className="text-xs font-bold text-[#315BDB] hover:underline">
                View All →
              </a>
            </div>

            <div className="space-y-2.5">
              {[
                { title: "UI Design Mockups", date: "12 Jan 2026", reviewer: "Rohan Mehta", status: "Under Review", statusColor: "bg-[#EFF4FF] text-[#315BDB]" },
                { title: "API Documentation", date: "10 Jan 2026", reviewer: "Rohan Mehta", status: "Changes Requested", statusColor: "bg-[#FEF2F2] text-[#EF4444]" },
                { title: "Project Plan (Draft)", date: "08 Jan 2026", reviewer: "Rohan Mehta", status: "Approved", statusColor: "bg-[#ECFDF5] text-[#10B981]" },
              ].map((s, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                  <div>
                    <p className="text-xs font-bold text-[#191C20]">{s.title}</p>
                    <p className="text-[10px] text-[#858B93]">Reviewer: {s.reviewer} · {s.date}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${s.statusColor}`}>
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mentor Card */}
          <div className="bg-white p-5 rounded-3xl border border-[#E3E8EE] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
                alt="Mentor"
                className="w-11 h-11 rounded-full object-cover ring-2 ring-[#315BDB]"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-[#191C20]">Rohan Mehta</h4>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#ECFDF5] text-[#10B981]">
                    ● Active Mentor
                  </span>
                </div>
                <p className="text-[11px] text-[#858B93]">Product Manager · Core Engineering</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#315BDB] text-white text-xs font-bold hover:bg-[#244BB5] transition-colors">
                <MessageSquare size={13} />
                <span>Message</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};