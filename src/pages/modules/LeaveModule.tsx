import React, { useState } from "react";
import {
  Calendar,
  Plus,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  X,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const LeaveModule: React.FC = () => {
  const { showToast } = useAuth();
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"history" | "holidays" | "team">("history");

  const [balances] = useState([
    { type: "Casual Leave (CL)", consumed: 4, quota: 12, remaining: 8, bg: "bg-[#EEF3FF]", color: "text-[#315BDB]" },
    { type: "Sick Leave (SL)", consumed: 3, quota: 10, remaining: 7, bg: "bg-[#ECFDF5]", color: "text-[#10B981]" },
    { type: "Privilege Leave (PL)", consumed: 2, quota: 18, remaining: 16, bg: "bg-[#FFFBEB]", color: "text-[#F59E0B]" },
    { type: "Compensatory Off", consumed: 0, quota: 2, remaining: 2, bg: "bg-[#F5F3FF]", color: "text-[#8B5CF6]" },
  ]);

  const [leaveHistory, setLeaveHistory] = useState([
    { id: "LR-901", type: "Casual Leave", dates: "18 Nov - 19 Nov 2026", days: 2, status: "Pending", reason: "Family event in Pune" },
    { id: "LR-882", type: "Sick Leave", dates: "24 Oct 2026", days: 1, status: "Approved", reason: "Fever and rest" },
    { id: "LR-810", type: "Privilege Leave", dates: "10 Sep - 12 Sep 2026", days: 3, status: "Approved", reason: "Annual vacation" },
  ]);

  // Apply form state
  const [leaveType, setLeaveType] = useState("Casual Leave (CL)");
  const [startDate, setStartDate] = useState("2026-11-20");
  const [endDate, setEndDate] = useState("2026-11-21");
  const [reason, setReason] = useState("");

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) return;

    const newReq = {
      id: `LR-${leaveHistory.length + 902}`,
      type: leaveType.split(" (")[0],
      dates: `${startDate} to ${endDate}`,
      days: 2,
      status: "Pending",
      reason: reason,
    };

    setLeaveHistory([newReq, ...leaveHistory]);
    showToast(`Leave application (${newReq.type}) submitted for manager approval.`, "success");
    setApplyModalOpen(false);
    setReason("");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#E3E8EE] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-extrabold tracking-widest text-[#858B93] uppercase">
              LEAVE & TIME-OFF OS
            </span>
            <div className="h-[1px] w-12 bg-[#858B93]/40" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#191C20] tracking-tight">
            Leave Balances & Time-Off
          </h1>
          <p className="text-xs lg:text-sm text-[#858B93] font-medium mt-1">
            Apply for planned leaves, view quota balances and track manager signoffs.
          </p>
        </div>

        <button
          onClick={() => setApplyModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
        >
          <Plus size={15} />
          <span>Apply for Leave</span>
        </button>
      </div>

      {/* 4 Quota Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {balances.map((b, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-5 border border-[#E3E8EE] shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-[#858B93] block mb-1">{b.type}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#191C20]">{b.remaining}</span>
                <span className="text-xs text-[#858B93] font-medium">/ {b.quota} Total Days</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F2F1ED] flex items-center justify-between text-[11px] text-[#858B93]">
              <span>Used: {b.consumed} Days</span>
              <span className={`font-bold ${b.color}`}>Available</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs & Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F2F1ED]">
          <div className="flex items-center bg-[#F2F1ED] p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveTab("history")}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === "history" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
              }`}
            >
              My Leave Applications
            </button>
            <button
              onClick={() => setActiveTab("holidays")}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === "holidays" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
              }`}
            >
              2026 Company Holidays
            </button>
          </div>
        </div>

        {activeTab === "history" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F2F1ED] text-[#858B93] font-bold">
                  <th className="pb-3 pl-2">Request ID</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Leave Duration</th>
                  <th className="pb-3">Days</th>
                  <th className="pb-3">Reason</th>
                  <th className="pb-3 pr-2 text-right">Approval Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F1ED]">
                {leaveHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-3.5 pl-2 font-mono font-bold text-[#858B93]">{item.id}</td>
                    <td className="py-3.5 font-bold text-[#191C20]">{item.type}</td>
                    <td className="py-3.5 text-[#191C20]">{item.dates}</td>
                    <td className="py-3.5 font-black text-[#191C20]">{item.days} Day(s)</td>
                    <td className="py-3.5 text-[#858B93] italic">"{item.reason}"</td>
                    <td className="py-3.5 pr-2 text-right">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        item.status === "Approved" ? "bg-[#ECFDF5] text-[#10B981]" : "bg-[#FEF3EC] text-[#F07838]"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "holidays" && (
          <div className="space-y-3">
            {[
              { name: "Diwali & New Year Break", date: "13 Nov - 16 Nov 2026", type: "National Mandatory", days: "4 Days Off" },
              { name: "Christmas Day", date: "25 Dec 2026", type: "Public Holiday", days: "1 Day Off" },
              { name: "Republic Day", date: "26 Jan 2027", type: "National Holiday", days: "1 Day Off" },
            ].map((h, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#191C20]">{h.name}</h4>
                  <p className="text-[11px] text-[#858B93]">{h.date} • {h.type}</p>
                </div>
                <span className="px-3 py-1 rounded-xl bg-[#FEF3EC] text-[#F07838] text-xs font-bold border border-[#FCD9BD]">
                  {h.days}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Apply Leave Modal */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D8D9D6]">
            <div className="flex items-center justify-between pb-4 border-b border-[#F2F1ED] mb-4">
              <h3 className="text-base font-extrabold text-[#191C20]">Apply for Leave</h3>
              <button onClick={() => setApplyModalOpen(false)} className="p-1 rounded-xl text-[#858B93] hover:text-[#191C20]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleApplyLeave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-1">Leave Type</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium"
                >
                  <option value="Casual Leave (CL)">Casual Leave (CL) - 8 Remaining</option>
                  <option value="Sick Leave (SL)">Sick Leave (SL) - 7 Remaining</option>
                  <option value="Privilege Leave (PL)">Privilege Leave (PL) - 16 Remaining</option>
                  <option value="Compensatory Off">Compensatory Off - 2 Remaining</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#191C20] mb-1">From Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#191C20] mb-1">To Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-1">Reason / Note</label>
                <textarea
                  required
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Explain reason for time-off..."
                  className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setApplyModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F2F1ED] text-xs font-bold text-[#191C20]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#315BDB] text-xs font-bold text-white shadow-xs cursor-pointer"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
