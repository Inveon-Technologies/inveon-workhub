import React, { useState } from "react";
import {
  Briefcase,
  Users,
  Calendar,
  Plus,
  Filter,
  Search,
  ChevronRight,
  Video,
  X,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const RecruitmentModule: React.FC = () => {
  const { showToast } = useAuth();
  const [activeTab, setActiveTab] = useState<"pipeline" | "openings">("pipeline");
  const [postJobModalOpen, setPostJobModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);

  const [openings, setOpenings] = useState([
    { id: "REQ-01", title: "Senior Full-Stack Engineer", dept: "Engineering", location: "Pune / Hybrid", applicants: 42, openings: 2, priority: "Urgent" },
    { id: "REQ-02", title: "Lead UI/UX Product Designer", dept: "Design", location: "Remote", applicants: 28, openings: 1, priority: "High" },
    { id: "REQ-03", title: "DevOps & Cloud Architect", dept: "Operations", location: "Pune HQ", applicants: 16, openings: 1, priority: "Normal" },
  ]);

  const [candidates, setCandidates] = useState([
    { id: "CND-101", name: "Rohan Verma", role: "Senior Full-Stack Engineer", stage: "Tech Round 1", score: 92, appliedDate: "03 Nov", interviewer: "Vedant Patil" },
    { id: "CND-102", name: "Ananya Iyer", role: "Lead UI/UX Product Designer", stage: "Portfolio Review", score: 96, appliedDate: "04 Nov", interviewer: "Omkar Kumbhar" },
    { id: "CND-103", name: "Kunal Shinde", role: "DevOps Architect", stage: "Culture Fit", score: 88, appliedDate: "01 Nov", interviewer: "Akshay More" },
    { id: "CND-104", name: "Pooja Nair", role: "Frontend Developer", stage: "Offered", score: 95, appliedDate: "28 Oct", interviewer: "Aarav Deshmukh" },
  ]);

  // New Job State
  const [newTitle, setNewTitle] = useState("");
  const [newDept, setNewDept] = useState("Engineering");
  const [newLocation, setNewLocation] = useState("Pune HQ");
  const [newPositions, setNewPositions] = useState("1");

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newOpening = {
      id: `REQ-0${openings.length + 1}`,
      title: newTitle,
      dept: newDept,
      location: newLocation,
      applicants: 0,
      openings: parseInt(newPositions) || 1,
      priority: "Normal",
    };

    setOpenings([newOpening, ...openings]);
    showToast(`Job requisition "${newTitle}" posted successfully!`, "success");
    setPostJobModalOpen(false);
    setNewTitle("");
  };

  const handleStageChange = (candId: string, nextStage: string) => {
    setCandidates(candidates.map((c) => (c.id === candId ? { ...c, stage: nextStage } : c)));
    showToast(`Candidate moved to ${nextStage}`, "success");
    setSelectedCandidate(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#E3E8EE] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-extrabold tracking-widest text-[#858B93] uppercase">
              RECRUITMENT & ATS OS
            </span>
            <div className="h-[1px] w-12 bg-[#858B93]/40" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#191C20] tracking-tight">
            Applicant Tracking & Hiring Funnel
          </h1>
          <p className="text-xs lg:text-sm text-[#858B93] font-medium mt-1">
            Manage job requisitions, candidate interviews, evaluations and hiring pipelines.
          </p>
        </div>

        <button
          onClick={() => setPostJobModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
        >
          <Plus size={15} />
          <span>Post New Job Requisition</span>
        </button>
      </div>

      {/* Funnel Strip */}
      <div className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F2F1ED]">
          <div className="flex items-center bg-[#F2F1ED] p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveTab("pipeline")}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === "pipeline" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
              }`}
            >
              Candidates Pipeline ({candidates.length})
            </button>
            <button
              onClick={() => setActiveTab("openings")}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === "openings" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
              }`}
            >
              Active Job Openings ({openings.length})
            </button>
          </div>
        </div>

        {activeTab === "pipeline" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F2F1ED] text-[#858B93] font-bold">
                  <th className="pb-3 pl-2">Candidate</th>
                  <th className="pb-3">Applied Position</th>
                  <th className="pb-3">Current Stage</th>
                  <th className="pb-3">Score</th>
                  <th className="pb-3">Interviewer</th>
                  <th className="pb-3 pr-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F1ED]">
                {candidates.map((cand) => (
                  <tr key={cand.id} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-[#191C20]">{cand.name}</td>
                    <td className="py-3.5 text-[#475569]">{cand.role}</td>
                    <td className="py-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#EEF3FF] text-[#315BDB]">
                        {cand.stage}
                      </span>
                    </td>
                    <td className="py-3.5 font-black text-[#10B981]">{cand.score}%</td>
                    <td className="py-3.5 text-[#858B93]">{cand.interviewer}</td>
                    <td className="py-3.5 pr-2 text-right">
                      <button
                        onClick={() => setSelectedCandidate(cand)}
                        className="px-3 py-1 rounded-lg bg-[#F2F1ED] hover:bg-[#EEF3FF] hover:text-[#315BDB] font-bold text-xs transition-colors"
                      >
                        Evaluate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "openings" && (
          <div className="space-y-3">
            {openings.map((job) => (
              <div key={job.id} className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-[#191C20]">{job.title}</h4>
                  <p className="text-[11px] text-[#858B93]">{job.dept} • {job.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-extrabold text-[#191C20] block">{job.applicants} Applicants</span>
                  <span className="text-[10px] text-[#858B93]">{job.openings} Open Position(s)</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Candidate Evaluation Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D8D9D6] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2F1ED]">
              <h3 className="text-base font-extrabold text-[#191C20]">Candidate Evaluation</h3>
              <button onClick={() => setSelectedCandidate(null)} className="p-1 rounded-xl text-[#858B93]">
                <X size={18} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] text-xs space-y-1">
              <p>Candidate: <strong className="text-[#191C20]">{selectedCandidate.name}</strong></p>
              <p>Role: <strong className="text-[#315BDB]">{selectedCandidate.role}</strong></p>
              <p>Technical Assessment Score: <strong className="text-[#10B981]">{selectedCandidate.score}%</strong></p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#191C20] mb-2">Advance Candidate Stage</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                {["Tech Round 2", "Culture Fit", "Offer Extended", "Hired"].map((stage) => (
                  <button
                    key={stage}
                    onClick={() => handleStageChange(selectedCandidate.id, stage)}
                    className="p-2.5 rounded-xl border border-[#D8D9D6] hover:border-[#315BDB] hover:bg-[#EEF3FF] hover:text-[#315BDB] transition-colors"
                  >
                    Move to {stage}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Job Modal */}
      {postJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D8D9D6]">
            <div className="flex items-center justify-between pb-4 border-b border-[#F2F1ED] mb-4">
              <h3 className="text-base font-extrabold text-[#191C20]">Post Job Requisition</h3>
              <button onClick={() => setPostJobModalOpen(false)} className="p-1 rounded-xl text-[#858B93]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Senior Backend Engineer (Node + PostgreSQL)"
                  className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#191C20] mb-1">Department</label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Product">Product</option>
                    <option value="Human Resources">Human Resources</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#191C20] mb-1">Target Openings</label>
                  <input
                    type="number"
                    value={newPositions}
                    onChange={(e) => setNewPositions(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPostJobModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F2F1ED] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#315BDB] text-xs font-bold text-white shadow-xs cursor-pointer"
                >
                  Publish Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
