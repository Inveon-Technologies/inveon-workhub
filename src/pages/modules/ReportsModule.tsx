import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Users,
  Clock,
  Layers,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useAuth } from "../../context/AuthContext";

export const ReportsModule: React.FC = () => {
  const { showToast } = useAuth();
  const [reportType, setReportType] = useState<"headcount" | "attendance" | "velocity">("headcount");

  const headcountData = [
    { month: "Jun", count: 280, hires: 14 },
    { month: "Jul", count: 295, hires: 15 },
    { month: "Aug", count: 310, hires: 15 },
    { month: "Sep", count: 326, hires: 16 },
    { month: "Oct", count: 336, hires: 10 },
    { month: "Nov", count: 348, hires: 12 },
  ];

  const attendanceRateData = [
    { day: "Mon", rate: 96.2 },
    { day: "Tue", rate: 94.8 },
    { day: "Wed", rate: 95.1 },
    { day: "Thu", rate: 93.9 },
    { day: "Fri", rate: 91.4 },
  ];

  const handleExportCSV = () => {
    showToast("Exporting Workforce_Analytics_Q3_2026.csv...", "success");
  };

  const handleExportPDF = () => {
    showToast("Generating Executive_WorkHub_Summary.pdf...", "info");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#E3E8EE] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-extrabold tracking-widest text-[#858B93] uppercase">
              ANALYTICS & INTELLIGENCE OS
            </span>
            <div className="h-[1px] w-12 bg-[#858B93]/40" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#191C20] tracking-tight">
            Workforce Reports & Performance
          </h1>
          <p className="text-xs lg:text-sm text-[#858B93] font-medium mt-1">
            Real-time organizational telemetry, sprint velocity, and attendance analytics.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-[#F2F1ED] hover:bg-[#EAE8E2] text-[#191C20] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleExportPDF}
            className="px-4 py-2 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Download size={14} />
            <span>Download PDF Report</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Headcount", val: "348", sub: "+8.4% this quarter", icon: Users, color: "text-[#315BDB]", bg: "bg-[#EEF3FF]" },
          { label: "Avg Attendance", val: "94.2%", sub: "Above benchmark (90%)", icon: Clock, color: "text-[#10B981]", bg: "bg-[#ECFDF5]" },
          { label: "Sprint Velocity", val: "84 Pts", sub: "92% completion rate", icon: Layers, color: "text-[#F59E0B]", bg: "bg-[#FFFBEB]" },
          { label: "Retention Rate", val: "97.1%", sub: "Lowest attrition in sector", icon: TrendingUp, color: "text-[#8B5CF6]", bg: "bg-[#F5F3FF]" },
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

      {/* Main Chart Card */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#E3E8EE] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F2F1ED] mb-6">
          <div>
            <h3 className="text-base font-extrabold text-[#191C20]">Headcount Growth Trend (2026)</h3>
            <p className="text-xs text-[#858B93]">Monthly workforce scaling across engineering and product teams</p>
          </div>

          <div className="flex items-center bg-[#F2F1ED] p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setReportType("headcount")}
              className={`px-3 py-1 rounded-lg transition-all ${
                reportType === "headcount" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
              }`}
            >
              Headcount Trend
            </button>
            <button
              onClick={() => setReportType("attendance")}
              className={`px-3 py-1 rounded-lg transition-all ${
                reportType === "attendance" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
              }`}
            >
              Weekly Attendance
            </button>
          </div>
        </div>

        {/* Dynamic Chart Display */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {reportType === "headcount" ? (
              <AreaChart data={headcountData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#315BDB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#315BDB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F2F1ED" />
                <XAxis dataKey="month" stroke="#858B93" fontSize={12} tickLine={false} />
                <YAxis stroke="#858B93" fontSize={12} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#315BDB" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            ) : (
              <BarChart data={attendanceRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F2F1ED" />
                <XAxis dataKey="day" stroke="#858B93" fontSize={12} tickLine={false} />
                <YAxis stroke="#858B93" fontSize={12} tickLine={false} domain={[85, 100]} />
                <Tooltip />
                <Bar dataKey="rate" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
