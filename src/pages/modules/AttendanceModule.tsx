import React, { useState, useEffect } from "react";
import {
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Play,
  Square,
  Coffee,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const AttendanceModule: React.FC = () => {
  const { showToast } = useAuth();
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [seconds, setSeconds] = useState(14820); // ~4 hours 7 mins
  const [activeTab, setActiveTab] = useState<"logs" | "calendar" | "roster">("logs");
  const [regularizeModalOpen, setRegularizeModalOpen] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isCheckedIn && !isOnBreak) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isCheckedIn, isOnBreak]);

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePunch = () => {
    if (isCheckedIn) {
      setIsCheckedIn(false);
      showToast("Punched out for today. Shift ended.", "info");
    } else {
      setIsCheckedIn(true);
      showToast("Punched in successfully at 09:30 AM (Pune HQ).", "success");
    }
  };

  const handleBreak = () => {
    if (!isOnBreak) {
      setIsOnBreak(true);
      showToast("Started lunch/tea break. Timer paused.", "info");
    } else {
      setIsOnBreak(false);
      showToast("Resumed working from break.", "success");
    }
  };

  const [logs] = useState([
    { date: "09 Nov 2026 (Today)", inTime: "09:28 AM", outTime: "--", duration: "4h 07m", status: "Present", loc: "Pune HQ" },
    { date: "08 Nov 2026", inTime: "09:32 AM", outTime: "06:35 PM", duration: "9h 03m", status: "Present", loc: "Pune HQ" },
    { date: "07 Nov 2026", inTime: "09:25 AM", outTime: "06:40 PM", duration: "9h 15m", status: "Present", loc: "Remote (Hybrid)" },
    { date: "06 Nov 2026", inTime: "09:48 AM", outTime: "06:30 PM", duration: "8h 42m", status: "Late", loc: "Pune HQ" },
    { date: "05 Nov 2026", inTime: "09:30 AM", outTime: "06:32 PM", duration: "9h 02m", status: "Present", loc: "Pune HQ" },
  ]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#E3E8EE] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-extrabold tracking-widest text-[#858B93] uppercase">
              TIME & ATTENDANCE OS
            </span>
            <div className="h-[1px] w-12 bg-[#858B93]/40" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#191C20] tracking-tight">
            Attendance, Shifts & Punches
          </h1>
          <p className="text-xs lg:text-sm text-[#858B93] font-medium mt-1">
            Real-time biometric shift timer, geofenced punch logs and regularization requests.
          </p>
        </div>

        <button
          onClick={() => setRegularizeModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#F2F1ED] hover:bg-[#EEF3FF] hover:text-[#315BDB] text-[#191C20] text-xs font-bold flex items-center gap-2 transition-colors border border-[#E2E0D8] cursor-pointer"
        >
          <Plus size={15} />
          <span>Request Regularization</span>
        </button>
      </div>

      {/* Live Shift Punch Clock Widget */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3E8EE] shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-[#EEF3FF] text-[#315BDB] flex items-center justify-center font-bold shrink-0">
            <Clock size={32} />
          </div>
          <div>
            <span className="text-xs font-bold text-[#858B93] block">Current Shift Session</span>
            <h2 className="text-3xl font-mono font-black text-[#191C20] tracking-tight">{formatTimer(seconds)}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2.5 h-2.5 rounded-full ${isCheckedIn ? (isOnBreak ? "bg-[#F59E0B]" : "bg-[#10B981] animate-pulse") : "bg-[#EF4444]"}`} />
              <span className="text-xs font-bold text-[#191C20]">{isCheckedIn ? (isOnBreak ? "On Break" : "Working Active") : "Shift Ended"}</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 space-y-1 text-xs text-[#858B93] border-y md:border-y-0 md:border-x border-[#F2F1ED] py-3 md:py-0 md:px-6">
          <p>Punch-in Time: <strong className="text-[#191C20]">09:28 AM (Today)</strong></p>
          <p>Designated Shift: <strong className="text-[#191C20]">09:30 AM - 06:30 PM (General Shift)</strong></p>
          <p>Location: <strong className="text-[#315BDB]">Pune HQ Geofence (Verified)</strong></p>
        </div>

        <div className="md:col-span-4 flex items-center justify-end gap-3">
          {isCheckedIn && (
            <button
              onClick={handleBreak}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isOnBreak ? "bg-[#10B981] text-white" : "bg-[#FFFBEB] text-[#F59E0B] border border-[#FDE68A]"
              }`}
            >
              <Coffee size={14} />
              <span>{isOnBreak ? "Resume Work" : "Take Break"}</span>
            </button>
          )}

          <button
            onClick={handlePunch}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer ${
              isCheckedIn
                ? "bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444] border border-[#FECACA]"
                : "bg-[#10B981] hover:bg-[#059669] text-white"
            }`}
          >
            {isCheckedIn ? <Square size={14} /> : <Play size={14} />}
            <span>{isCheckedIn ? "Punch Out" : "Punch In Now"}</span>
          </button>
        </div>
      </div>

      {/* Tabs & Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F2F1ED]">
          <div className="flex items-center bg-[#F2F1ED] p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveTab("logs")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "logs" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
              }`}
            >
              Punch History Logs
            </button>
            <button
              onClick={() => setActiveTab("calendar")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "calendar" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
              }`}
            >
              Monthly Attendance Grid
            </button>
            <button
              onClick={() => setActiveTab("roster")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "roster" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
              }`}
            >
              Shift Rosters
            </button>
          </div>

          <span className="text-xs font-bold text-[#10B981] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full">
            94.2% Attendance Score (Good Standing)
          </span>
        </div>

        {activeTab === "logs" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F2F1ED] text-[#858B93] font-bold">
                  <th className="pb-3 pl-2">Date</th>
                  <th className="pb-3">Punch In</th>
                  <th className="pb-3">Punch Out</th>
                  <th className="pb-3">Total Hours</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Location</th>
                  <th className="pb-3 pr-2 text-right">Regularize</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F1ED]">
                {logs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-[#191C20]">{log.date}</td>
                    <td className="py-3.5 font-mono text-[#191C20]">{log.inTime}</td>
                    <td className="py-3.5 font-mono text-[#858B93]">{log.outTime}</td>
                    <td className="py-3.5 font-bold text-[#315BDB]">{log.duration}</td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        log.status === "Present" ? "bg-[#ECFDF5] text-[#10B981]" : "bg-[#FFFBEB] text-[#F59E0B]"
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-[#858B93] flex items-center gap-1">
                      <MapPin size={12} />
                      <span>{log.loc}</span>
                    </td>
                    <td className="py-3.5 pr-2 text-right">
                      {log.status === "Late" && (
                        <button
                          onClick={() => setRegularizeModalOpen(true)}
                          className="text-xs font-bold text-[#315BDB] hover:underline"
                        >
                          Request Correction
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "calendar" && (
          <div className="p-4 text-center text-xs text-[#858B93] space-y-4">
            <p className="font-bold text-[#191C20]">November 2026 Monthly Breakdown</p>
            <div className="grid grid-cols-7 gap-2 max-w-2xl mx-auto">
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                <div
                  key={day}
                  className={`h-10 rounded-xl flex items-center justify-center font-bold ${
                    day === 9
                      ? "bg-[#315BDB] text-white"
                      : day > 9 && day < 13
                      ? "bg-[#FAFAFA] text-[#858B93]"
                      : day >= 13 && day <= 16
                      ? "bg-[#FEF3EC] text-[#F07838]"
                      : "bg-[#ECFDF5] text-[#10B981]"
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 pt-3 text-[11px]">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> Present (21)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#F07838]" /> Diwali Holiday (4)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#315BDB]" /> Today (9)</span>
            </div>
          </div>
        )}

        {activeTab === "roster" && (
          <div className="p-4 space-y-3">
            <h4 className="text-xs font-bold text-[#191C20]">Active Weekly Shift Schedule</h4>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d, i) => (
                <div key={i} className="p-3 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                  <span className="text-[11px] font-black text-[#191C20] block">{d}</span>
                  <span className="text-xs text-[#315BDB] font-bold block mt-1">09:30 AM - 06:30 PM</span>
                  <span className="text-[10px] text-[#858B93] block">General Shift (9h)</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Regularize Modal */}
      {regularizeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D8D9D6]">
            <div className="flex items-center justify-between pb-4 border-b border-[#F2F1ED] mb-4">
              <h3 className="text-base font-extrabold text-[#191C20]">Punch Regularization</h3>
              <button onClick={() => setRegularizeModalOpen(false)} className="p-1 rounded-xl text-[#858B93] hover:text-[#191C20]">
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast("Regularization request submitted to HR.", "success");
                setRegularizeModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-1">Date to Regularize</label>
                <input
                  type="date"
                  defaultValue="2026-11-06"
                  className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-1">Actual In-Time</label>
                <input
                  type="text"
                  defaultValue="09:30 AM"
                  className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-1">Reason for Punch Exception</label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Biometric reader was undergoing maintenance on 3rd floor"
                  className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRegularizeModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F2F1ED] text-xs font-bold text-[#191C20]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#315BDB] text-xs font-bold text-white shadow-xs cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
