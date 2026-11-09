import React, { useState } from "react";
import {
  Briefcase,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Video,
  Plus,
  Filter,
  Search,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { HeroSection } from "../../components/dashboard/HeroSection";

export const RecruiterDashboard: React.FC = () => {
  const [funnel] = useState([
    { stage: "Sourced", count: 48, pct: 100 },
    { stage: "Applied", count: 76, pct: 85 },
    { stage: "Screening", count: 32, pct: 60 },
    { stage: "Tech R1", count: 18, pct: 40 },
    { stage: "Tech R2", count: 11, pct: 25 },
    { stage: "Culture", count: 6, pct: 15 },
    { stage: "Offered", count: 4, pct: 10 },
    { stage: "Hired", count: 3, pct: 8 },
  ]);

  const [openings] = useState([
    {
      title: "Senior Full-Stack Engineer (React + Node)",
      dept: "Engineering",
      location: "Pune / Hybrid",
      openings: 2,
      applicants: 42,
      priority: "Urgent",
      posted: "3 days ago",
    },
    {
      title: "Lead UI/UX Product Designer",
      dept: "Design",
      location: "Remote",
      openings: 1,
      applicants: 28,
      priority: "High",
      posted: "1 week ago",
    },
    {
      title: "DevOps & Cloud Infrastructure Specialist",
      dept: "Operations",
      location: "Pune",
      openings: 1,
      applicants: 16,
      priority: "Normal",
      posted: "5 days ago",
    },
  ]);

  const [interviews] = useState([
    {
      time: "10:30 AM",
      candidate: "Rohan Verma",
      role: "Senior Full-Stack Engineer",
      round: "Technical Interview 1",
      interviewer: "Vedant Patil",
      meetUrl: "https://meet.google.com/xyz",
    },
    {
      time: "02:00 PM",
      candidate: "Ananya Iyer",
      role: "Lead UI/UX Product Designer",
      round: "Portfolio Review",
      interviewer: "Omkar Kumbhar",
      meetUrl: "https://meet.google.com/abc",
    },
    {
      time: "04:00 PM",
      candidate: "Kunal Shinde",
      role: "DevOps Engineer",
      round: "System Design & Culture",
      interviewer: "Akshay More",
      meetUrl: "https://meet.google.com/def",
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Top Architectural Hero */}
      <HeroSection />

      {/* Recruiter Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Requisitions", val: "12 Roles", sub: "4 urgent hiring needs", icon: Briefcase, color: "text-[#315BDB]", bg: "bg-[#EEF3FF]" },
          { label: "In-Flight Candidates", val: "198", sub: "+24 this week", icon: Users, color: "text-[#10B981]", bg: "bg-[#ECFDF5]" },
          { label: "Interviews Today", val: "6 Scheduled", sub: "3 technical, 3 culture", icon: Calendar, color: "text-[#F59E0B]", bg: "bg-[#FFFBEB]" },
          { label: "Offer Acceptance", val: "88.4%", sub: "Above industry avg (78%)", icon: TrendingUp, color: "text-[#8B5CF6]", bg: "bg-[#F5F3FF]" },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white rounded-3xl p-5 border border-[#E3E8EE] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#858B93] block mb-1">{item.label}</span>
                <span className="text-2xl font-black text-[#191C20]">{item.val}</span>
                <span className="text-[11px] text-[#858B93] font-medium block mt-0.5">{item.sub}</span>
              </div>
              <div className={`w-11 h-11 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                <Icon size={20} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ATS 8-Stage Funnel Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-extrabold text-[#191C20]">Talent Acquisition Pipeline (ATS Funnel)</h3>
          <span className="text-xs font-bold text-[#315BDB] bg-[#EEF3FF] px-2.5 py-0.5 rounded-full border border-[#D0E0FF]">
            198 Active Candidates
          </span>
        </div>
        <p className="text-xs text-[#858B93] mb-6 font-medium">Conversion progression through hiring stages.</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {funnel.map((stage, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] hover:border-[#315BDB] hover:bg-white transition-all text-center flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-extrabold text-[#858B93] uppercase tracking-wider block mb-1">
                  {stage.stage}
                </span>
                <span className="text-xl font-black text-[#191C20]">{stage.count}</span>
              </div>
              <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden mt-3">
                <div
                  className="bg-[#315BDB] h-full rounded-full transition-all"
                  style={{ width: `${stage.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bento Grid: Active Openings & Today's Interview Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Openings (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-extrabold text-[#191C20]">Active Job Requisitions</h3>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#315BDB] text-white text-xs font-bold hover:bg-[#244BB5] transition-colors shadow-xs">
              <Plus size={13} />
              <span>Post New Job</span>
            </button>
          </div>
          <p className="text-xs text-[#858B93] mb-5 font-medium">Current department hiring requisitions.</p>

          <div className="space-y-3">
            {openings.map((job, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] hover:border-[#D8D9D6] hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xs font-black text-[#191C20]">{job.title}</h4>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        job.priority === "Urgent"
                          ? "bg-[#FEF2F2] text-[#EF4444]"
                          : "bg-[#FFFBEB] text-[#F59E0B]"
                      }`}
                    >
                      {job.priority}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#858B93] font-medium">
                    {job.dept} • {job.location} • Posted {job.posted}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F2F1ED]">
                  <div className="text-left sm:text-right">
                    <span className="text-xs font-extrabold text-[#191C20] block">{job.applicants} Applicants</span>
                    <span className="text-[10px] text-[#858B93]">{job.openings} Open Position(s)</span>
                  </div>
                  <button className="p-2 rounded-xl bg-[#F2F1ED] hover:bg-[#EEF3FF] hover:text-[#315BDB] text-[#858B93] transition-colors">
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Interviews (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-extrabold text-[#191C20]">Interviews Today</h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#EEF3FF] text-[#315BDB] border border-[#D0E0FF]">
                3 Rounds
              </span>
            </div>
            <p className="text-xs text-[#858B93] mb-4 font-medium">Scheduled candidate evaluation calls.</p>

            <div className="space-y-3">
              {interviews.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] hover:border-[#D8D9D6] transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-[#315BDB]">{item.time}</span>
                    <span className="text-[10px] font-bold text-[#858B93]">{item.round}</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#191C20]">{item.candidate}</h4>
                  <p className="text-[11px] text-[#858B93] mb-2 font-medium">
                    {item.role} • Interv: {item.interviewer}
                  </p>
                  <a
                    href={item.meetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-1.5 px-3 rounded-xl bg-[#EEF3FF] hover:bg-[#315BDB] text-[#315BDB] hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Video size={13} />
                    <span>Join Google Meet</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <a
            href="#calendar"
            className="mt-4 pt-3 border-t border-[#F2F1ED] text-xs font-bold text-[#315BDB] hover:underline flex items-center justify-center gap-1"
          >
            <span>View Full Recruitment Calendar</span>
            <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};
