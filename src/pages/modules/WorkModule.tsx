import React, { useState } from "react";
import {
  Layers,
  Plus,
  CheckSquare,
  Clock,
  Filter,
  CheckCircle2,
  Calendar,
  AlertCircle,
  MoreVertical,
  ArrowRight,
  X,
  User,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import heroBg from "../../assets/images/hero-architecture-bg.png";
import { TaskItem } from "../../types";

export const WorkModule: React.FC = () => {
  const { showToast } = useAuth();
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: "TSK-001",
      title: "Review UI design and share feedback with Sir",
      priority: "High",
      dueDate: "Today",
      status: "In Progress",
      project: "WorkHub v2.0",
      assignee: "Ishita Verma",
      assigneeAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    },
    {
      id: "TSK-002",
      title: "Approve project architecture plan - Phase 2",
      priority: "High",
      dueDate: "Today",
      status: "To Do",
      project: "WorkHub v2.0",
      assignee: "Omkar Kumbhar",
      assigneeAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    },
    {
      id: "TSK-003",
      title: "Complete Q3 team performance and appraisal review",
      priority: "Medium",
      dueDate: "Tomorrow",
      status: "In Review",
      project: "HRMS People Ops",
      assignee: "Aarav Deshmukh",
      assigneeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
    {
      id: "TSK-004",
      title: "Finalize candidate interview shortlist for UX Lead",
      priority: "Medium",
      dueDate: "8 Nov",
      status: "In Progress",
      project: "ATS Recruitment",
      assignee: "Neha Sharma",
      assigneeAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100",
    },
    {
      id: "TSK-005",
      title: "Refactor Global Navigation Rail for Responsive Tablet",
      priority: "High",
      dueDate: "10 Nov",
      status: "To Do",
      project: "WorkHub v2.0",
      assignee: "Vedant Patil",
      assigneeAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100",
    },
    {
      id: "TSK-006",
      title: "Verify Drizzle ORM Schema Migration and Foreign Keys",
      priority: "Low",
      dueDate: "12 Nov",
      status: "Completed",
      project: "Core Infrastructure",
      assignee: "Akshay More",
      assigneeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
  ]);

  // New task form state
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [newDueDate, setNewDueDate] = useState("Today");
  const [newProject, setNewProject] = useState("WorkHub v2.0");
  const [newAssignee, setNewAssignee] = useState("Ishita Verma");

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newTask: TaskItem = {
      id: `TSK-00${tasks.length + 1}`,
      title: newTitle,
      priority: newPriority,
      dueDate: newDueDate,
      status: "To Do",
      project: newProject,
      assignee: newAssignee,
      assigneeAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    };

    setTasks([newTask, ...tasks]);
    showToast(`Task "${newTitle}" created successfully.`, "success");
    setCreateModalOpen(false);
    setNewTitle("");
  };

  const moveTaskStatus = (id: string, nextStatus: "To Do" | "In Progress" | "In Review" | "Completed") => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: nextStatus } : t)));
    showToast(`Task moved to ${nextStatus}`, "info");
  };

  const columns: { id: "To Do" | "In Progress" | "In Review" | "Completed"; label: string; bg: string }[] = [
    { id: "To Do", label: "To Do", bg: "bg-[#F2F1ED]" },
    { id: "In Progress", label: "In Progress", bg: "bg-[#EEF3FF]" },
    { id: "In Review", label: "Under Review", bg: "bg-[#FEF3EC]" },
    { id: "Completed", label: "Completed", bg: "bg-[#ECFDF5]" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
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
              WORK & TASKS OS
            </span>
            <div className="h-[1px] w-12 bg-[#858B93]/40" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#191C20] tracking-tight">
            Workforce Tasks & Sprints
          </h1>
          <p className="text-xs lg:text-sm text-[#858B93] font-medium mt-1">
            Organize deliverables, sprint milestones, Kanban workflows and project deadlines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center bg-[#F2F1ED] p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setViewMode("kanban")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "kanban" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
              }`}
            >
              Kanban Board
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "list" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
              }`}
            >
              List View
            </button>
          </div>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <Plus size={15} />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.id);
            return (
              <div key={col.id} className="bg-white rounded-3xl p-5 border border-[#E3E8EE] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#F2F1ED] mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${
                        col.id === "Completed" ? "bg-[#10B981]" : col.id === "In Progress" ? "bg-[#315BDB]" : col.id === "In Review" ? "bg-[#F07838]" : "bg-[#858B93]"
                      }`} />
                      <h3 className="text-sm font-black text-[#191C20]">{col.label}</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#F2F1ED] text-[#191C20]">
                      {colTasks.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {colTasks.length === 0 ? (
                      <div className="text-center py-8 text-xs text-[#858B93] border-2 border-dashed border-[#EBEBEB] rounded-2xl">
                        No tasks in this lane
                      </div>
                    ) : (
                      colTasks.map((t) => (
                        <div
                          key={t.id}
                          className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] hover:border-[#315BDB] hover:bg-white transition-all shadow-2xs group space-y-3"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-[10px] font-mono font-bold text-[#858B93]">{t.id}</span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                                t.priority === "High"
                                  ? "bg-[#FEF2F2] text-[#EF4444]"
                                  : t.priority === "Medium"
                                  ? "bg-[#FFFBEB] text-[#F59E0B]"
                                  : "bg-[#F2F1ED] text-[#858B93]"
                              }`}
                            >
                              {t.priority}
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-[#191C20] leading-snug group-hover:text-[#315BDB] transition-colors">
                            {t.title}
                          </h4>

                          <div className="flex items-center justify-between pt-2 border-t border-[#F2F1ED] text-[11px] text-[#858B93]">
                            <span>Due: <strong className="text-[#191C20]">{t.dueDate}</strong></span>
                            <div className="flex items-center gap-1.5">
                              {t.assigneeAvatar && (
                                <img src={t.assigneeAvatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                              )}
                              <span className="text-[10px] font-semibold">{t.assignee?.split(" ")[0]}</span>
                            </div>
                          </div>

                          {/* Move action pills */}
                          <div className="pt-2 border-t border-[#F2F1ED] flex items-center justify-between text-[10px] font-bold">
                            <span className="text-[#858B93]">Move:</span>
                            <div className="flex items-center gap-1">
                              {col.id !== "To Do" && (
                                <button
                                  onClick={() => moveTaskStatus(t.id, "To Do")}
                                  className="px-1.5 py-0.5 rounded bg-[#F2F1ED] hover:bg-[#E2E0D8] text-[#191C20]"
                                >
                                  To Do
                                </button>
                              )}
                              {col.id !== "In Progress" && (
                                <button
                                  onClick={() => moveTaskStatus(t.id, "In Progress")}
                                  className="px-1.5 py-0.5 rounded bg-[#EEF3FF] hover:bg-[#D0E0FF] text-[#315BDB]"
                                >
                                  In Prog
                                </button>
                              )}
                              {col.id !== "In Review" && (
                                <button
                                  onClick={() => moveTaskStatus(t.id, "In Review")}
                                  className="px-1.5 py-0.5 rounded bg-[#FEF3EC] hover:bg-[#FCD9BD] text-[#F07838]"
                                >
                                  Review
                                </button>
                              )}
                              {col.id !== "Completed" && (
                                <button
                                  onClick={() => moveTaskStatus(t.id, "Completed")}
                                  className="px-1.5 py-0.5 rounded bg-[#ECFDF5] hover:bg-[#A7F3D0] text-[#10B981]"
                                >
                                  Done
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setCreateModalOpen(true)}
                  className="mt-4 w-full py-2 rounded-xl border border-dashed border-[#D8D9D6] hover:border-[#315BDB] hover:text-[#315BDB] text-xs font-bold text-[#858B93] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus size={13} />
                  <span>Add Task</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F2F1ED] text-[#858B93] font-bold">
                  <th className="pb-3 pl-2">Task Title</th>
                  <th className="pb-3">Project</th>
                  <th className="pb-3">Priority</th>
                  <th className="pb-3">Due Date</th>
                  <th className="pb-3">Assignee</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 pr-2 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F1ED]">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-3.5 pl-2">
                      <span className="font-bold text-[#191C20] block">{task.title}</span>
                      <span className="text-[10px] font-mono text-[#858B93]">{task.id}</span>
                    </td>
                    <td className="py-3.5 font-semibold text-[#858B93]">{task.project}</td>
                    <td className="py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          task.priority === "High"
                            ? "bg-[#FEF2F2] text-[#EF4444]"
                            : task.priority === "Medium"
                            ? "bg-[#FFFBEB] text-[#F59E0B]"
                            : "bg-[#F2F1ED] text-[#858B93]"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3.5 font-bold text-[#191C20]">{task.dueDate}</td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <img src={task.assigneeAvatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                        <span className="font-semibold text-[#191C20]">{task.assignee}</span>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          task.status === "Completed"
                            ? "bg-[#ECFDF5] text-[#10B981]"
                            : task.status === "In Progress"
                            ? "bg-[#EEF3FF] text-[#315BDB]"
                            : task.status === "In Review"
                            ? "bg-[#FEF3EC] text-[#F07838]"
                            : "bg-[#F2F1ED] text-[#858B93]"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="py-3.5 pr-2 text-right">
                      {task.status !== "Completed" ? (
                        <button
                          onClick={() => moveTaskStatus(task.id, "Completed")}
                          className="px-2.5 py-1 rounded-lg bg-[#ECFDF5] hover:bg-[#10B981] hover:text-white text-[#10B981] font-bold text-xs transition-colors"
                        >
                          Mark Done
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-[#10B981]">Complete</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D8D9D6]">
            <div className="flex items-center justify-between pb-4 border-b border-[#F2F1ED] mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#EEF3FF] text-[#315BDB] flex items-center justify-center font-bold">
                  <CheckSquare size={16} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#191C20]">Create New Task</h3>
                  <p className="text-[11px] text-[#858B93]">Assign work item to sprint backlog</p>
                </div>
              </div>
              <button onClick={() => setCreateModalOpen(false)} className="p-1 rounded-xl text-[#858B93] hover:text-[#191C20]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Conduct accessibility audit on mobile shell"
                  className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:outline-none focus:border-[#315BDB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#191C20] mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:outline-none focus:border-[#315BDB]"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#191C20] mb-1">Due Date</label>
                  <input
                    type="text"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    placeholder="e.g. Today / 12 Nov"
                    className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:outline-none focus:border-[#315BDB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#191C20] mb-1">Project</label>
                  <input
                    type="text"
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:outline-none focus:border-[#315BDB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#191C20] mb-1">Assignee</label>
                  <select
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:outline-none focus:border-[#315BDB]"
                  >
                    <option value="Ishita Verma">Ishita Verma</option>
                    <option value="Vedant Patil">Vedant Patil</option>
                    <option value="Omkar Kumbhar">Omkar Kumbhar</option>
                    <option value="Aarav Deshmukh">Aarav Deshmukh</option>
                    <option value="Akshay More">Akshay More</option>
                    <option value="Meera Joshi">Meera Joshi</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F2F1ED] text-xs font-bold text-[#191C20]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-xs font-bold text-white shadow-xs cursor-pointer"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
