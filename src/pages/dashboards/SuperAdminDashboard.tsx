import React, { useState } from "react";
import {
  ShieldAlert,
  Server,
  Building2,
  Users,
  Activity,
  HardDrive,
  Cpu,
  ArrowRight,
  ExternalLink,
  Plus,
  CheckCircle2,
} from "lucide-react";
import { HeroSection } from "../../components/dashboard/HeroSection";

export const SuperAdminDashboard: React.FC = () => {
  const [tenants] = useState([
    {
      name: "Inveon Technologies",
      domain: "inveontechnologies.com",
      plan: "Enterprise Suite",
      seats: "348 / 500",
      region: "ap-south-1 (Mumbai)",
      status: "Healthy",
      statusColor: "text-[#10B981] bg-[#ECFDF5]",
    },
    {
      name: "NexGen Financial Systems",
      domain: "nexgenfin.io",
      plan: "Enterprise Suite",
      seats: "1,240 / 1,500",
      region: "us-east-1 (N. Virginia)",
      status: "Healthy",
      statusColor: "text-[#10B981] bg-[#ECFDF5]",
    },
    {
      name: "Apex Global Logistics",
      domain: "apexlogistics.net",
      plan: "Pro Growth",
      seats: "180 / 200",
      region: "eu-central-1 (Frankfurt)",
      status: "Healthy",
      statusColor: "text-[#10B981] bg-[#ECFDF5]",
    },
    {
      name: "BioHealth Diagnostics",
      domain: "biohealth.co",
      plan: "Pro Growth",
      seats: "92 / 100",
      region: "ap-southeast-1 (Singapore)",
      status: "Provisioning",
      statusColor: "text-[#F59E0B] bg-[#FFFBEB]",
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Top Architectural Hero */}
      <HeroSection />

      {/* Super Admin Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Tenants", val: "48 Orgs", sub: "3 onboarding this week", icon: Building2, color: "text-[#315BDB]", bg: "bg-[#EEF3FF]" },
          { label: "Managed Workforces", val: "14,890", sub: "Active platform seats", icon: Users, color: "text-[#10B981]", bg: "bg-[#ECFDF5]" },
          { label: "Platform Uptime", val: "99.98%", sub: "Zero critical incidents", icon: Server, color: "text-[#F59E0B]", bg: "bg-[#FFFBEB]" },
          { label: "API Global Latency", val: "42 ms", sub: "p99 < 85ms across nodes", icon: Activity, color: "text-[#8B5CF6]", bg: "bg-[#F5F3FF]" },
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

      {/* Tenants Management Table & Global Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tenants Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-extrabold text-[#191C20]">Tenant Organizations</h3>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#315BDB] text-white text-xs font-bold hover:bg-[#244BB5] transition-colors shadow-xs">
              <Plus size={13} />
              <span>Provision New Tenant</span>
            </button>
          </div>
          <p className="text-xs text-[#858B93] mb-5 font-medium">Enterprise instances, licenses and cluster locations.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F2F1ED] text-[#858B93] font-bold">
                  <th className="pb-3 pl-2">Organization</th>
                  <th className="pb-3">Tier Plan</th>
                  <th className="pb-3">Seats</th>
                  <th className="pb-3">Region</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 pr-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F1ED]">
                {tenants.map((t, idx) => (
                  <tr key={idx} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-3.5 pl-2">
                      <span className="font-extrabold text-[#191C20] block">{t.name}</span>
                      <span className="text-[11px] text-[#858B93] font-medium">{t.domain}</span>
                    </td>
                    <td className="py-3.5 font-bold text-[#191C20]">{t.plan}</td>
                    <td className="py-3.5 font-bold text-[#191C20]">{t.seats}</td>
                    <td className="py-3.5 text-[#858B93] font-medium">{t.region}</td>
                    <td className="py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${t.statusColor}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3.5 pr-2 text-right">
                      <button className="px-3 py-1 rounded-lg bg-[#F2F1ED] hover:bg-[#EEF3FF] text-[#191C20] hover:text-[#315BDB] font-bold text-xs transition-colors">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Cluster Health & Storage (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-extrabold text-[#191C20]">Cluster Telemetry</h3>
              <span className="text-xs font-bold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                All Systems Operational
              </span>
            </div>
            <p className="text-xs text-[#858B93] mb-5 font-medium">SaaS infrastructure health across cloud zones.</p>

            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="flex items-center gap-2 text-[#191C20]">
                    <HardDrive size={14} className="text-[#315BDB]" />
                    <span>Database Shard Storage</span>
                  </span>
                  <span>2.4 TB / 10 TB</span>
                </div>
                <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div className="bg-[#315BDB] h-full rounded-full" style={{ width: "24%" }} />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="flex items-center gap-2 text-[#191C20]">
                    <Cpu size={14} className="text-[#10B981]" />
                    <span>Edge Worker Capacity</span>
                  </span>
                  <span>38% Average Load</span>
                </div>
                <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div className="bg-[#10B981] h-full rounded-full" style={{ width: "38%" }} />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="flex items-center gap-2 text-[#191C20]">
                    <Activity size={14} className="text-[#8B5CF6]" />
                    <span>Global Webhook Deliverability</span>
                  </span>
                  <span className="text-[#10B981]">99.99%</span>
                </div>
                <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div className="bg-[#8B5CF6] h-full rounded-full" style={{ width: "99.99%" }} />
                </div>
              </div>
            </div>
          </div>

          <a
            href="#cloud-logs"
            className="mt-6 w-full py-2.5 text-center text-xs font-bold text-[#315BDB] hover:bg-[#EEF3FF] rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Platform Audit Log Archive</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
};
