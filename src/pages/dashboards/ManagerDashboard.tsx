import React, { useState } from "react";
import {
  Users,
  CheckSquare,
  AlertTriangle,
  Clock,
  ArrowRight,
  GitPullRequest,
  CheckCircle2,
  Calendar,
  MessageSquare,
  BarChart2,
  SlidersHorizontal,
} from "lucide-react";
import { HeroSection } from "../../components/dashboard/HeroSection";
import { TeamPresenceStrip } from "../../components/shell/TeamPresenceStrip";

export const ManagerDashboard: React.FC = () => {
  const [teamMembers] = useState([
    {
      name: "Vedant Patil",
      role: "Lead Frontend Engineer",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100",
      activeTask: "WorkHub Design System Integration",
      load: 90,
      status: "Working",
      statusColor: "bg-[#10B981]",
    },
    {
      name: "Rutuja Shinde",
      role: "Senior UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      activeTask: "Design Review for LMS Module",
      load: 75,
      status: "Working",
      statusColor: "bg-[#10B981]",
    },
    {
      name: "Akshay More",
      role: "Backend Architect",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      activeTask: "PostgreSQL & Auth0 Tenant Security",
      load: 85,
      status: "On Break",
      statusColor: "bg-[#F59E0B]",
    },
    {
      name: "Priya Kadam",
      role: "Product QA Specialist",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      activeTask: "Automated Cypress Regression Suite",
      load: 60,
      status: "Working",
      statusColor: "bg-[#10B981]",
    },
  ]);

  const [reviews] = useState([
    { id: "REV-204", title: "Refactor Global Navigation Rail for Responsive Breakpoints", author: "Vedant P.", priority: "High", due: "Today" },
    { id: "REV-205", title: "Update Drizzle ORM Schema for Role Permissions", author: "Akshay M.", priority: "Medium", due: "Tomorrow" },
    { id: "REV-206", title: "Audit Accessibility (WCAG 2.1 AA) for Color Contrast", author: "Rutuja S.", priority: "Normal", due: "10 Nov" },
  ]);

  return (
    <div className="space-y-6">
      {/* Presence Strip */}
      <TeamPresenceStrip />

      {/* Hero Header */}
      <HeroSection />

      {/* Metric Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Sprint 24", val: "78%", sub: "42 of 54 Story Points", icon: BarChart2, color: "text-[#315BDB]", bg: "bg-[#EEF3FF]" },
          { label: "Pending Reviews", val: "3 Items", sub: "2 require urgent signoff", icon: GitPullRequest, color: "text-[#F07838]", bg: "bg-[#FEF3EC]" },
          { label: "Team Workload", val: "77.5%", sub: "Balanced capacity", icon: SlidersHorizontal, color: "text-[#10B981]", bg: "bg-[#ECFDF5]" },
          { label: "Next 1-on-1 Sync", val: "04:30 PM", sub: "With Priya Kadam", icon: Calendar, color: "text-[#8B5CF6]", bg: "bg-[#F5F3FF]" },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-3xl p-5 border border-[#E3E8EE] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#858B93] block mb-1">{stat.label}</span>
                <span className="text-2xl font-black text-[#191C20]">{stat.val}</span>
                <span className="text-[11px] text-[#858B93] font-medium block mt-0.5">{stat.sub}</span>
              </div>
              <div className={`w-11 h-11 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                <Icon size={20} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bento Layout: Team Capacity Balancer & Code/Work Signoff Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Team Capacity Balancer (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#EEF3FF] flex items-center justify-center text-[#315BDB]">
                <Users size={16} />
              </div>
              <h3 className="text-base font-extrabold text-[#191C20]">Team Capacity & Workload</h3>
            </div>
            <span className="text-xs font-bold text-[#10B981] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
              Optimal Load
            </span>
          </div>
          <p className="text-xs text-[#858B93] mb-5 font-medium">Real-time task distribution and availability.</p>

          <div className="space-y-4">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] hover:border-[#D8D9D6] transition-colors space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={member.avatar} alt={member.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-white" />
                      <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white ${member.statusColor}`} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-[#191C20]">{member.name}</h4>
                      <p className="text-[11px] text-[#858B93] font-medium">{member.role}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-extrabold text-[#191C20]">{member.load}%</span>
                    <span className="text-[10px] text-[#858B93] block font-medium">Capacity</span>
                  </div>
                </div>

                {/* Task & Progress bar */}
                <div className="pt-1">
                  <div className="flex items-center justify-between text-[11px] text-[#858B93] mb-1 font-medium">
                    <span>Task: {member.activeTask}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${member.load > 85 ? "bg-[#F07838]" : "bg-[#315BDB]"}`}
                      style={{ width: `${member.load}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables & Review Queue (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#FEF3EC] flex items-center justify-center text-[#F07838]">
                  <CheckSquare size={16} />
                </div>
                <h3 className="text-base font-extrabold text-[#191C20]">Review & Signoff Queue</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#FEF3EC] text-[#F07838] border border-[#FCD9BD]">
                3 Open
              </span>
            </div>
            <p className="text-xs text-[#858B93] mb-4 font-medium">Items awaiting manager code or design signoff.</p>

            <div className="space-y-3">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] hover:border-[#D8D9D6] transition-all">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-[#191C20] leading-snug">{rev.title}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase shrink-0 ${
                      rev.priority === "High" ? "bg-[#FEF2F2] text-[#EF4444]" : "bg-[#FFFBEB] text-[#F59E0B]"
                    }`}>
                      {rev.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#858B93] pt-1">
                    <span>By {rev.author}</span>
                    <button className="text-xs font-bold text-[#315BDB] hover:underline flex items-center gap-1">
                      <span>Review</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="mt-5 w-full py-2.5 px-4 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs">
            <span>Sprint Board & Backlog</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
