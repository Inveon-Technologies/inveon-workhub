import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Search,
  Filter,
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { HeroSection } from "../../components/dashboard/HeroSection";

export const HRAdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"pending" | "approved" | "history">("pending");

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: "LR-101",
      employee: "Siddharth Rao",
      role: "Senior Frontend Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      type: "Paid Leave",
      duration: "3 Days (12 Nov - 14 Nov)",
      reason: "Family wedding in Pune",
      status: "pending",
    },
    {
      id: "LR-102",
      employee: "Aarti Deshmukh",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      type: "Sick Leave",
      duration: "1 Day (Today)",
      reason: "Severe migraine, doctor visit",
      status: "pending",
    },
    {
      id: "LR-103",
      employee: "Nikhil Joshi",
      role: "Backend Intern",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100",
      type: "Casual Leave",
      duration: "2 Days (18 Nov - 19 Nov)",
      reason: "University semester examinations",
      status: "pending",
    },
  ]);

  const handleAction = (id: string, action: "approve" | "reject") => {
    setLeaveRequests((prev) =>
      prev.map((lr) => (lr.id === id ? { ...lr, status: action === "approve" ? "approved" : "rejected" } : lr))
    );
  };

  const pendingCount = leaveRequests.filter((lr) => lr.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Top Hero Banner */}
      <HeroSection />

      {/* Workforce Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Headcount", val: "348", sub: "+12 this month", icon: Users, color: "text-[#315BDB]", bg: "bg-[#EEF3FF]" },
          { label: "Attendance Today", val: "94.2%", sub: "312 of 331 active", icon: Clock, color: "text-[#10B981]", bg: "bg-[#ECFDF5]" },
          { label: "Onboarding Cohort", val: "14", sub: "Joining next Monday", icon: UserPlus, color: "text-[#F59E0B]", bg: "bg-[#FFFBEB]" },
          { label: "Open Approvals", val: pendingCount.toString(), sub: "Require HR action", icon: AlertCircle, color: "text-[#F07838]", bg: "bg-[#FEF3EC]" },
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

      {/* Main Grid: Attendance Breakdown & Leave Approval Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Attendance Pulse & Analytics (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-extrabold text-[#191C20]">Attendance Pulse</h3>
              <span className="text-xs font-bold text-[#10B981] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                Live Today
              </span>
            </div>
            <p className="text-xs text-[#858B93] mb-6 font-medium">Real-time organizational check-in distribution.</p>

            {/* Attendance Donut / Visual Stack */}
            <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] mb-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#191C20]">Office & Remote Present</span>
                <span className="text-[#10B981]">312 (89.6%)</span>
              </div>
              <div className="w-full h-2.5 bg-[#E2E8F0] rounded-full overflow-hidden flex">
                <div className="bg-[#10B981] h-full" style={{ width: "89.6%" }} />
                <div className="bg-[#F59E0B] h-full" style={{ width: "5.2%" }} />
                <div className="bg-[#8B5CF6] h-full" style={{ width: "3.4%" }} />
                <div className="bg-[#EF4444] h-full" style={{ width: "1.8%" }} />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-[#858B93] font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span>On Duty: 312</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                  <span>On Break: 18</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                  <span>Approved Leave: 12</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                  <span>Missed Check-in: 6</span>
                </div>
              </div>
            </div>

            {/* Policy & Compliance Alert Box */}
            <div className="p-4 rounded-2xl bg-[#FEF3EC] border border-[#FCD9BD] flex items-start gap-3">
              <AlertCircle size={18} className="text-[#F07838] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#191C20] leading-tight mb-1">
                  Holiday Calendar Notice: Diwali Break
                </h4>
                <p className="text-[11px] text-[#858B93] leading-snug">
                  Official office shutdown begins Friday, 13 Nov. Ensure all emergency contact rosters are finalized.
                </p>
              </div>
            </div>
          </div>

          <a
            href="#attendance-roster"
            className="mt-6 w-full py-2.5 text-center text-xs font-bold text-[#315BDB] hover:bg-[#EEF3FF] rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Open Comprehensive Roster</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Leave & Exception Approval Queue (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-[#191C20]">Leave & Exception Requests</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FEF3EC] text-[#F07838] border border-[#FCD9BD]">
                  {pendingCount} Pending Action
                </span>
              </div>
              <p className="text-xs text-[#858B93] font-medium mt-0.5">
                Review employee requests, balances, and manager recommendations.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex items-center bg-[#F2F1ED] p-1 rounded-xl self-start sm:self-auto">
              <button
                onClick={() => setSelectedTab("pending")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedTab === "pending" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                onClick={() => setSelectedTab("approved")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedTab === "approved" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setSelectedTab("history")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedTab === "history" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
                }`}
              >
                Log History
              </button>
            </div>
          </div>

          {/* Request Cards List */}
          <div className="space-y-3">
            {leaveRequests.map((lr) => (
              <div
                key={lr.id}
                className={`p-4 rounded-2xl border transition-all ${
                  lr.status === "approved"
                    ? "bg-[#ECFDF5]/40 border-[#A7F3D0]"
                    : lr.status === "rejected"
                    ? "bg-[#FEF2F2]/40 border-[#FECACA] opacity-60"
                    : "bg-[#FAFAFA] border-[#EBEBEB] hover:border-[#D8D9D6] hover:bg-white"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Left: Employee Info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={lr.avatar}
                      alt={lr.employee}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-black text-[#191C20]">{lr.employee}</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#EEF3FF] text-[#315BDB]">
                          {lr.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#858B93] font-medium">{lr.role}</p>
                    </div>
                  </div>

                  {/* Right: Duration & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F2F1ED]">
                    <div className="text-left sm:text-right">
                      <span className="text-xs font-bold text-[#191C20] block">{lr.duration}</span>
                      <span className="text-[11px] text-[#858B93] italic">"{lr.reason}"</span>
                    </div>

                    {lr.status === "pending" ? (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleAction(lr.id, "approve")}
                          className="px-3 py-1.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                        >
                          <CheckCircle2 size={13} />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleAction(lr.id, "reject")}
                          className="px-2.5 py-1.5 rounded-xl bg-[#F2F1ED] hover:bg-[#FEE2E2] hover:text-[#EF4444] text-[#858B93] text-xs font-bold flex items-center transition-colors"
                          title="Reject"
                        >
                          <XCircle size={14} />
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-extrabold capitalize ${
                          lr.status === "approved"
                            ? "bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0]"
                            : "bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]"
                        }`}
                      >
                        {lr.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-[#F2F1ED] flex items-center justify-between">
            <span className="text-xs text-[#858B93] font-medium">Showing 3 most urgent pending workflows</span>
            <a href="#all-leaves" className="text-xs font-bold text-[#315BDB] hover:underline flex items-center gap-1">
              <span>View All 18 Leave Records</span>
              <ChevronRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
