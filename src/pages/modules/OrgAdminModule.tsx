import React, { useState } from "react";
import {
  ShieldAlert,
  Users,
  Lock,
  History,
  Building,
  Key,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const OrgAdminModule: React.FC = () => {
  const { showToast } = useAuth();
  const [activeTab, setActiveTab] = useState<"roles" | "audit">("roles");

  const [roles] = useState([
    { role: "Organisation Main Admin", users: 1, permissions: "Full Read/Write/Delete on all organization modules" },
    { role: "HR Admin", users: 4, permissions: "Employee directory, attendance, leaves, onboarding and hiring" },
    { role: "Engineering Manager", users: 8, permissions: "Team workload, sprint code reviews and task signoffs" },
    { role: "Employee", users: 280, permissions: "Personal workspace, punch logs, leave applications and LMS courses" },
    { role: "Intern", users: 52, permissions: "Learning roadmap, assignments, mentor guidance and presence" },
    { role: "Recruiter", users: 3, permissions: "ATS candidate pipeline, job postings and interview schedule" },
  ]);

  const [auditLogs] = useState([
    { time: "09:28 AM (Today)", user: "Omkar Kumbhar", action: "User Login", ip: "103.21.244.18 (Pune HQ)" },
    { time: "08:45 AM (Today)", user: "Aarav Deshmukh", action: "Leave Approval", ip: "103.21.244.18 (Pune HQ)" },
    { time: "08:15 AM (Today)", user: "Vedant Patil", action: "Task Created (TSK-005)", ip: "103.21.244.20" },
    { time: "Yesterday", user: "Akshay More", action: "Password Changed", ip: "103.21.244.18" },
  ]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#E3E8EE] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-extrabold tracking-widest text-[#858B93] uppercase">
              SECURITY & GOVERNANCE OS
            </span>
            <div className="h-[1px] w-12 bg-[#858B93]/40" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#191C20] tracking-tight">
            Roles, Permissions & Audit Logs
          </h1>
          <p className="text-xs lg:text-sm text-[#858B93] font-medium mt-1">
            Manage granular RBAC permission matrices, tenant compliance and security audit trails.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0]">
          SOC2 Type II Certified
        </span>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F2F1ED]">
          <div className="flex items-center bg-[#F2F1ED] p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveTab("roles")}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === "roles" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
              }`}
            >
              Role Permission Matrix
            </button>
            <button
              onClick={() => setActiveTab("audit")}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === "audit" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
              }`}
            >
              Platform Security Audit Trail
            </button>
          </div>
        </div>

        {activeTab === "roles" && (
          <div className="space-y-3">
            {roles.map((r, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-[#191C20]">{r.role}</h4>
                  <p className="text-[11px] text-[#858B93]">{r.permissions}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white border border-[#D8D9D6] text-[#315BDB]">
                  {r.users} Active Account(s)
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "audit" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F2F1ED] text-[#858B93] font-bold">
                  <th className="pb-3 pl-2">Timestamp</th>
                  <th className="pb-3">User</th>
                  <th className="pb-3">Action Recorded</th>
                  <th className="pb-3 pr-2 text-right">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F1ED]">
                {auditLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-3.5 pl-2 font-mono text-[#858B93]">{log.time}</td>
                    <td className="py-3.5 font-bold text-[#191C20]">{log.user}</td>
                    <td className="py-3.5 text-[#315BDB] font-semibold">{log.action}</td>
                    <td className="py-3.5 pr-2 text-right font-mono text-[#858B93]">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
