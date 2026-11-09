import React, { useState } from "react";
import {
  CheckSquare,
  Calendar,
  Layers,
  ArrowRight,
  Video,
  Users,
  Bell,
  Megaphone,
  FileText,
  Clock,
  CheckCircle2,
  ChevronRight,
  Laptop,
  BookOpen,
} from "lucide-react";
import orgBuilding from "../../assets/images/org-building-thumbnail.png";

export const BentoDashboard: React.FC = () => {
  // State for interactive checkboxes
  const [tasks, setTasks] = useState([
    { id: 1, title: "Review UI design and share feedback", priority: "High", due: "Today", completed: false },
    { id: 2, title: "Approve project plan – Phase 2", priority: "High", due: "Today", completed: false },
    { id: 3, title: "Complete Q3 team performance review", priority: "Medium", due: "Tomorrow", completed: false },
    { id: 4, title: "Finalize interview shortlist (UX Designer)", priority: "Medium", due: "8 Nov", completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <div className="space-y-6">
      {/* Middle Row: 3 Bento Cards (My Tasks, Today's Schedule, Team Projects) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: My Tasks */}
        <div className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#EEF3FF] flex items-center justify-center text-[#315BDB]">
                  <CheckSquare size={16} />
                </div>
                <h3 className="text-base font-extrabold text-[#191C20]">My Tasks</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F2F1ED] text-[#191C20] border border-[#E2E0D8]">
                {tasks.filter((t) => !t.completed).length} Open
              </span>
            </div>
            <p className="text-xs text-[#858B93] mb-4 font-medium">Your key work items for today.</p>

            {/* Task Items */}
            <div className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                    task.completed
                      ? "bg-[#F2F1ED]/50 border-transparent opacity-60 line-through"
                      : "bg-[#FAFAFA] hover:bg-white border-[#EBEBEB] hover:border-[#D8D9D6] hover:shadow-xs"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-[#315BDB] focus:ring-[#315BDB] border-[#D8D9D6] cursor-pointer"
                    />
                    <span className="text-xs font-bold text-[#191C20] leading-snug">
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pl-2 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                        task.priority === "High"
                          ? "bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]"
                          : "bg-[#FFFBEB] text-[#F59E0B] border border-[#FDE68A]"
                      }`}
                    >
                      {task.priority}
                    </span>
                    <span className="text-[11px] font-semibold text-[#858B93] whitespace-nowrap">
                      {task.due}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="mt-5 w-full py-2.5 px-4 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm shadow-[#315BDB]/25">
            <span>Open My Workspace</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Card 2: Today's Schedule */}
        <div className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-[#EEF3FF] flex items-center justify-center text-[#315BDB]">
                <Calendar size={16} />
              </div>
              <h3 className="text-base font-extrabold text-[#191C20]">Today's Schedule</h3>
            </div>
            <p className="text-xs text-[#858B93] mb-4 font-medium">Meetings, interviews and key activities.</p>

            {/* Vertical Timeline */}
            <div className="relative pl-4 space-y-4 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#E3E8EE]">
              {[
                { time: "10:00 AM", title: "Product Sync", location: "Conference Room A", icon: Users },
                { time: "11:30 AM", title: "Project Review – WorkHub v2.0", location: "Online (Google Meet)", icon: Video },
                { time: "02:00 PM", title: "Interview – UI Designer", location: "Online Interview", icon: Users },
                { time: "04:30 PM", title: "Team Check-in", location: "Product Team", icon: Users },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="relative flex items-start justify-between group">
                    {/* Node Dot */}
                    <div className="absolute -left-[13px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#315BDB] ring-4 ring-white" />

                    <div className="flex items-start gap-3 pl-2">
                      <span className="text-xs font-black text-[#191C20] whitespace-nowrap min-w-[62px]">
                        {item.time}
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-[#191C20] group-hover:text-[#315BDB] transition-colors leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-[#858B93] font-medium">{item.location}</p>
                      </div>
                    </div>

                    <div className="w-6 h-6 rounded-lg bg-[#F2F1ED] flex items-center justify-center text-[#858B93] shrink-0">
                      <Icon size={12} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <a
            href="#calendar"
            className="mt-5 w-full py-2 text-center text-xs font-bold text-[#315BDB] hover:text-[#244BB5] hover:bg-[#EEF3FF] rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <span>View Full Calendar</span>
            <ArrowRight size={13} />
          </a>
        </div>

        {/* Card 3: Team Work & Projects */}
        <div className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#EEF3FF] flex items-center justify-center text-[#315BDB]">
                  <Layers size={16} />
                </div>
                <h3 className="text-base font-extrabold text-[#191C20]">Team Work & Projects</h3>
              </div>
              <a href="#projects" className="text-xs font-bold text-[#315BDB] hover:underline flex items-center gap-1">
                <span>View All Projects</span>
                <ArrowRight size={12} />
              </a>
            </div>
            <p className="text-xs text-[#858B93] mb-4 font-medium">Active projects and progress across your team.</p>

            {/* Project Progress Bars */}
            <div className="space-y-4">
              {[
                {
                  title: "WorkHub v2.0 – Product Enhancements",
                  sub: "UI improvements, new modules & performance",
                  progress: 78,
                  icon: Laptop,
                },
                {
                  title: "Employee Portal – Phase 2",
                  sub: "Self-service, policies & approvals",
                  progress: 61,
                  icon: Users,
                },
                {
                  title: "LMS – Content & Certification",
                  sub: "Course creation, assessments & certificates",
                  progress: 46,
                  icon: BookOpen,
                },
              ].map((proj, idx) => {
                const Icon = proj.icon;
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#EEF3FF] flex items-center justify-center text-[#315BDB] shrink-0">
                          <Icon size={14} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#191C20] leading-tight">{proj.title}</h4>
                          <p className="text-[11px] text-[#858B93] font-medium leading-tight">{proj.sub}</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-[#191C20]">{proj.progress}%</span>
                    </div>

                    <div className="w-full h-1.5 bg-[#F2F1ED] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#315BDB] rounded-full transition-all duration-500"
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 text-center border-t border-[#F2F1ED]">
            <span className="text-[11px] text-[#858B93] font-medium">3 projects tracking on schedule</span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Needs Your Attention & Organisation Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Needs Your Attention (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#FEF3EC] flex items-center justify-center text-[#F07838]">
                  <Bell size={16} />
                </div>
                <h3 className="text-base font-extrabold text-[#191C20]">Needs Your Attention</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FEF3EC] text-[#F07838] border border-[#FCD9BD]">
                4 Items
              </span>
            </div>
            <p className="text-xs text-[#858B93] mb-4 font-medium">Actions and approvals requiring your review.</p>

            {/* Horizontal Metric Strip */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] hover:border-[#D8D9D6] transition-colors mt-2">
              <div className="grid grid-cols-4 gap-2 w-full divide-x divide-[#EBEBEB]">
                {/* 2 Leave Requests */}
                <div className="flex flex-col items-center justify-center text-center px-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <FileText size={14} className="text-[#858B93]" />
                    <span className="text-base font-black text-[#191C20]">2</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#858B93] leading-tight">Leave Requests</span>
                </div>

                {/* 1 Task Review */}
                <div className="flex flex-col items-center justify-center text-center px-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <CheckCircle2 size={14} className="text-[#858B93]" />
                    <span className="text-base font-black text-[#191C20]">1</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#858B93] leading-tight">Task Review</span>
                </div>

                {/* 1 Attendance Exception */}
                <div className="flex flex-col items-center justify-center text-center px-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Calendar size={14} className="text-[#858B93]" />
                    <span className="text-base font-black text-[#191C20]">1</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#858B93] leading-tight">Attendance Exception</span>
                </div>

                {/* 0 Overdue Tasks */}
                <div className="flex flex-col items-center justify-center text-center px-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Clock size={14} className="text-[#858B93]" />
                    <span className="text-base font-black text-[#191C20]">0</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#858B93] leading-tight">Overdue Tasks</span>
                </div>
              </div>

              <ChevronRight size={18} className="text-[#858B93] ml-2 shrink-0" />
            </div>
          </div>
        </div>

        {/* Organisation Updates (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#EEF3FF] flex items-center justify-center text-[#315BDB]">
                <Megaphone size={16} />
              </div>
              <h3 className="text-base font-extrabold text-[#191C20]">Organisation Updates</h3>
            </div>
            <a href="#updates" className="text-xs font-bold text-[#315BDB] hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight size={12} />
            </a>
          </div>
          <p className="text-xs text-[#858B93] mb-4 font-medium">Important announcements and recent updates.</p>

          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            {/* Left: Building Photo */}
            <div className="w-full sm:w-44 h-28 sm:h-24 rounded-2xl overflow-hidden shrink-0 border border-[#EBEBEB]">
              <img
                src={orgBuilding}
                alt="Inveon Campus"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: Announcements */}
            <div className="flex-1 space-y-2.5 justify-center flex flex-col">
              {/* Item 1 */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-[#191C20] hover:text-[#315BDB] cursor-pointer transition-colors leading-snug">
                    New Remote Work Policy is Live
                  </h4>
                  <p className="text-[11px] text-[#858B93] font-medium leading-snug">
                    The updated policy is now applicable for all teams.
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-[#858B93] whitespace-nowrap">2h ago</span>
              </div>

              {/* Item 2 */}
              <div className="flex items-start justify-between gap-3 pt-2 border-t border-[#F2F1ED]">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#EEF3FF] flex items-center justify-center text-[#315BDB] shrink-0 mt-0.5">
                    <Users size={13} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#191C20] hover:text-[#315BDB] cursor-pointer transition-colors leading-snug">
                      Welcome to Our New Joiners!
                    </h4>
                    <p className="text-[11px] text-[#858B93] font-medium leading-snug">
                      3 new team members have joined the Product and Design teams.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-[#858B93] whitespace-nowrap">5h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
