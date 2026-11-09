import React, { useState } from "react";
import {
  Layers,
  Plus,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Laptop,
  BookOpen,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { ProjectItem } from "../../types";

export const ProjectsModule: React.FC = () => {
  const { showToast } = useAuth();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [projects, setProjects] = useState<ProjectItem[]>([
    {
      id: "PRJ-01",
      name: "WorkHub v2.0 - Product Enhancements",
      description: "Complete next-gen enterprise UI architecture, floating navigation rail and 7 role dashboards.",
      progress: 78,
      status: "Active",
      lead: "Omkar Kumbhar",
      dueDate: "15 Nov 2026",
      tasksCount: 24,
      budget: "₹18,50,000",
      membersCount: 8,
    },
    {
      id: "PRJ-02",
      name: "Employee Self-Service Portal Phase 2",
      description: "Automated leave regularizations, shift schedule roster sync and reimbursement claims.",
      progress: 61,
      status: "Active",
      lead: "Ishita Verma",
      dueDate: "30 Nov 2026",
      tasksCount: 16,
      budget: "₹12,00,000",
      membersCount: 5,
    },
    {
      id: "PRJ-03",
      name: "LMS Academy - Content & Certification Suite",
      description: "Interactive course player, video syllabus progress tracking and verified PDF certificates.",
      progress: 46,
      status: "Active",
      lead: "Akshay More",
      dueDate: "15 Dec 2026",
      tasksCount: 19,
      budget: "₹9,50,000",
      membersCount: 6,
    },
  ]);

  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newLead, setNewLead] = useState("Omkar Kumbhar");

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const newProj: ProjectItem = {
      id: `PRJ-0${projects.length + 1}`,
      name: newName,
      description: newDesc || "High-impact cross-functional initiative",
      progress: 5,
      status: "Active",
      lead: newLead,
      dueDate: "31 Dec 2026",
      tasksCount: 8,
      budget: "₹10,00,000",
      membersCount: 4,
    };

    setProjects([...projects, newProj]);
    showToast(`Project "${newName}" initiated.`, "success");
    setCreateModalOpen(false);
    setNewName("");
    setNewDesc("");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#E3E8EE] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-extrabold tracking-widest text-[#858B93] uppercase">
              PROJECT PORTFOLIO OS
            </span>
            <div className="h-[1px] w-12 bg-[#858B93]/40" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#191C20] tracking-tight">
            Team Projects & Deliverables
          </h1>
          <p className="text-xs lg:text-sm text-[#858B93] font-medium mt-1">
            Track roadmaps, sprint progress bars, milestone deliverables and cross-team budgets.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
        >
          <Plus size={15} />
          <span>New Project Initiative</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-[#858B93]">{p.id}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#ECFDF5] text-[#10B981]">
                  {p.status}
                </span>
              </div>

              <h3 className="text-base font-black text-[#191C20] leading-snug">{p.name}</h3>
              <p className="text-xs text-[#858B93] line-clamp-2 mt-1">{p.description}</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-[#F2F1ED]">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#858B93]">Progress</span>
                <span className="text-[#315BDB]">{p.progress}%</span>
              </div>
              <div className="w-full h-2 bg-[#F2F1ED] rounded-full overflow-hidden">
                <div className="h-full bg-[#315BDB] rounded-full" style={{ width: `${p.progress}%` }} />
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#858B93] pt-1">
                <span>Lead: <strong className="text-[#191C20]">{p.lead}</strong></span>
                <span>Due: {p.dueDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Project Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D8D9D6]">
            <div className="flex items-center justify-between pb-4 border-b border-[#F2F1ED] mb-4">
              <h3 className="text-base font-extrabold text-[#191C20]">Initiate New Project</h3>
              <button onClick={() => setCreateModalOpen(false)} className="p-1 rounded-xl text-[#858B93]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Automated Payroll Statutory Compliance Engine"
                  className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-1">Description / Deliverable</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Detail project goals and deliverables..."
                  className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F2F1ED] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#315BDB] text-xs font-bold text-white shadow-xs cursor-pointer"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
