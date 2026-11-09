import React, { useState } from "react";
import {
  UserCheck,
  CheckCircle2,
  Clock,
  FileCheck,
  Laptop,
  Users,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import heroBg from "../../assets/images/hero-architecture-bg.png";

export const OnboardingModule: React.FC = () => {
  const { showToast } = useAuth();

  const [tasks, setTasks] = useState([
    { id: 1, title: "Submit Signed Employment Contract & NDA", done: true, phase: "Pre-boarding" },
    { id: 2, title: "Upload National ID, PAN Card & Educational Documents", done: true, phase: "Pre-boarding" },
    { id: 3, title: "Company Email & SSO Workspace Account Provisioning", done: true, phase: "Day 1" },
    { id: 4, title: "MacBook Pro / Development Laptop Handover & Setup", done: true, phase: "Day 1" },
    { id: 5, title: "Orientation with Engineering Manager (Rohan Mehta)", done: true, phase: "Week 1" },
    { id: 6, title: "Assign Dedicated Peer Mentor & Buddy", done: true, phase: "Week 1" },
    { id: 7, title: "Complete WorkHub Security & SOC2 Compliance Training", done: false, phase: "Month 1" },
    { id: 8, title: "90-Day Performance & Probation Review Signoff", done: false, phase: "Day 90" },
  ]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === id) {
          const next = !t.done;
          showToast(next ? `Completed: "${t.title}"` : `Reopened: "${t.title}"`, "info");
          return { ...t, done: next };
        }
        return t;
      })
    );
  };

  const completedCount = tasks.filter((t) => t.done).length;
  const progressPct = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden bg-white rounded-3xl p-6 lg:p-8 border border-[#E3E8EE] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in-up">
        {/* Background Architectural Layer */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src={heroBg}
            alt="Inveon Campus Architecture"
            className="w-full h-full object-cover object-right opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent w-full md:w-3/4" />
        </div>

        <div className="relative z-10">
          <div className="relative z-10 flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-extrabold tracking-widest text-[#858B93] uppercase">
              EMPLOYEE LIFECYCLE OS
            </span>
            <div className="h-[1px] w-12 bg-[#858B93]/40" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#191C20] tracking-tight">
            Onboarding & Offboarding Lifecycle
          </h1>
          <p className="text-xs lg:text-sm text-[#858B93] font-medium mt-1">
            Track new joiner orientation pipelines, IT asset provisioning and HR document verification.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0]">
          Active Cohort: November 2026
        </span>
      </div>

      {/* Progress Bar Header */}
      <div className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-[#191C20]">Onboarding Journey Progress</h3>
            <p className="text-xs text-[#858B93]">Complete all steps to finalize standard probation clearance</p>
          </div>
          <span className="text-lg font-black text-[#315BDB]">{progressPct}% Complete</span>
        </div>

        <div className="w-full h-2.5 bg-[#F2F1ED] rounded-full overflow-hidden">
          <div className="h-full bg-[#315BDB] rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
        </div>

        <div className="text-xs text-[#858B93] pt-1">
          {completedCount} of {tasks.length} milestones verified
        </div>
      </div>

      {/* Checklists */}
      <div className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs space-y-3">
        <h4 className="text-xs font-black text-[#191C20] uppercase tracking-wider pb-2 border-b border-[#F2F1ED]">
          Onboarding Checklist Tasks
        </h4>

        <div className="space-y-2.5">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                task.done ? "bg-[#ECFDF5]/40 border-[#A7F3D0]" : "bg-[#FAFAFA] border-[#EBEBEB] hover:border-[#D8D9D6]"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => {}}
                  className="w-4 h-4 rounded text-[#315BDB]"
                />
                <span className={`text-xs font-bold ${task.done ? "text-[#10B981] line-through opacity-80" : "text-[#191C20]"}`}>
                  {task.title}
                </span>
              </div>

              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-white border border-[#E2E0D8] text-[#858B93]">
                {task.phase}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
