import React, { useState } from "react";
import {
  TrendingUp,
  Target,
  Award,
  Plus,
  CheckCircle2,
  Sliders,
  Star,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const PerformanceModule: React.FC = () => {
  const { showToast } = useAuth();
  const [goalModalOpen, setGoalModalOpen] = useState(false);

  const [goals, setGoals] = useState([
    {
      id: "OKR-01",
      title: "Deliver WorkHub v2.0 Architecture & Frontend",
      metric: "100% completion of Shell, Dashboards and Modules",
      progress: 95,
      quarter: "Q3 2026",
      status: "On Track",
    },
    {
      id: "OKR-02",
      title: "Ensure WCAG 2.1 AA Accessibility & Responsive Web",
      metric: "Zero critical contrast violations on desktop and mobile",
      progress: 88,
      quarter: "Q3 2026",
      status: "On Track",
    },
    {
      id: "OKR-03",
      title: "Optimize Build Speeds & Bundle Gzip Compression",
      metric: "Maintain sub-2 second Vite build times",
      progress: 92,
      quarter: "Q3 2026",
      status: "Exceeded",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newMetric, setNewMetric] = useState("");

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newGoal = {
      id: `OKR-0${goals.length + 1}`,
      title: newTitle,
      metric: newMetric || "Measurable sprint delivery",
      progress: 10,
      quarter: "Q4 2026",
      status: "In Progress",
    };

    setGoals([...goals, newGoal]);
    showToast(`New KPI Goal "${newTitle}" created.`, "success");
    setGoalModalOpen(false);
    setNewTitle("");
    setNewMetric("");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#E3E8EE] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-extrabold tracking-widest text-[#858B93] uppercase">
              PERFORMANCE & APPRAISALS OS
            </span>
            <div className="h-[1px] w-12 bg-[#858B93]/40" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#191C20] tracking-tight">
            Goals, OKRs & 360 Appraisals
          </h1>
          <p className="text-xs lg:text-sm text-[#858B93] font-medium mt-1">
            Track individual KRAs, quarterly sprint deliverables, manager feedback and promotion readiness.
          </p>
        </div>

        <button
          onClick={() => setGoalModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
        >
          <Plus size={15} />
          <span>Add New Goal</span>
        </button>
      </div>

      {/* Summary Scorecard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs">
          <span className="text-xs font-bold text-[#858B93] block mb-1">Overall Appraisal Rating</span>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-[#191C20]">4.8 / 5.0</span>
            <div className="flex text-[#F59E0B]">
              <Star size={16} className="fill-current" />
              <Star size={16} className="fill-current" />
              <Star size={16} className="fill-current" />
              <Star size={16} className="fill-current" />
              <Star size={16} className="fill-current" />
            </div>
          </div>
          <span className="text-[11px] text-[#10B981] font-bold block mt-1">Top Tier Performance (Exceeds Expectations)</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs">
          <span className="text-xs font-bold text-[#858B93] block mb-1">Active OKR Progress</span>
          <span className="text-3xl font-black text-[#315BDB]">91.6%</span>
          <span className="text-[11px] text-[#858B93] block mt-1">3 Key Objectives on track</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs">
          <span className="text-xs font-bold text-[#858B93] block mb-1">Next Review Cycle</span>
          <span className="text-3xl font-black text-[#8B5CF6]">Q4 Cycle</span>
          <span className="text-[11px] text-[#858B93] block mt-1">Annual Appraisal in December 2026</span>
        </div>
      </div>

      {/* OKR List */}
      <div className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs space-y-4">
        <h3 className="text-base font-extrabold text-[#191C20] pb-3 border-b border-[#F2F1ED]">
          Active Quarterly OKRs (Q3 2026)
        </h3>

        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-black text-[#191C20]">{goal.title}</h4>
                  <p className="text-[11px] text-[#858B93]">{goal.metric}</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#ECFDF5] text-[#10B981]">
                  {goal.status}
                </span>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#858B93]">Completion</span>
                  <span className="text-[#315BDB]">{goal.progress}%</span>
                </div>
                <div className="w-full h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div className="bg-[#315BDB] h-full rounded-full" style={{ width: `${goal.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goal Modal */}
      {goalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D8D9D6]">
            <div className="flex items-center justify-between pb-4 border-b border-[#F2F1ED] mb-4">
              <h3 className="text-base font-extrabold text-[#191C20]">Add Objective & Key Result</h3>
              <button onClick={() => setGoalModalOpen(false)} className="p-1 rounded-xl text-[#858B93]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-1">Objective Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Expand test suite coverage to 85%"
                  className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-1">Success Metric</label>
                <input
                  type="text"
                  value={newMetric}
                  onChange={(e) => setNewMetric(e.target.value)}
                  placeholder="e.g. Unit tests in Jest and Cypress E2E suite"
                  className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setGoalModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F2F1ED] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#315BDB] text-xs font-bold text-white shadow-xs cursor-pointer"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
