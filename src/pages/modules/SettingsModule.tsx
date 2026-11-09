import React, { useState } from "react";
import {
  Settings,
  Building,
  Clock,
  Calendar,
  Shield,
  Bell,
  Save,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const SettingsModule: React.FC = () => {
  const { showToast } = useAuth();
  const [activeTab, setActiveTab] = useState<"general" | "attendance" | "leave" | "security">("general");

  // Form states
  const [orgName, setOrgName] = useState("Inveon Technologies Pvt Ltd");
  const [domain, setDomain] = useState("inveontechnologies.in");
  const [timezone, setTimezone] = useState("Asia/Kolkata (IST +05:30)");
  const [workHours, setWorkHours] = useState("09:30 AM - 06:30 PM");
  const [gracePeriod, setGracePeriod] = useState("15 Minutes");
  const [casualLeaveQuota, setCasualLeaveQuota] = useState("12 Days / Year");
  const [sickLeaveQuota, setSickLeaveQuota] = useState("10 Days / Year");
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30 Days");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Organisation policies & settings updated successfully.", "success");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#E3E8EE] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-extrabold tracking-widest text-[#858B93] uppercase">
              ORGANISATION OS SETTINGS
            </span>
            <div className="h-[1px] w-12 bg-[#858B93]/40" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#191C20] tracking-tight">
            Policies & Workspace Control
          </h1>
          <p className="text-xs lg:text-sm text-[#858B93] font-medium mt-1">
            Configure working hours, shift schedules, leave allocations and platform security.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
        >
          <Save size={15} />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Tabs (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-4 border border-[#E3E8EE] shadow-xs space-y-1 self-start">
          {[
            { id: "general", label: "Organisation Profile", icon: Building },
            { id: "attendance", label: "Working Hours & Shifts", icon: Clock },
            { id: "leave", label: "Leave Policies & Quotas", icon: Calendar },
            { id: "security", label: "Security & Access", icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#315BDB] text-white shadow-xs"
                    : "text-[#191C20] hover:bg-[#F2F1ED]"
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Content (9 cols) */}
        <div className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-[#E3E8EE] shadow-xs">
          <form onSubmit={handleSave} className="space-y-6">
            {activeTab === "general" && (
              <div className="space-y-4">
                <h3 className="text-base font-extrabold text-[#191C20] pb-3 border-b border-[#F2F1ED]">
                  Organisation Profile
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#191C20] mb-1.5">Company Legal Name</label>
                    <input
                      type="text"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:border-[#315BDB] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#191C20] mb-1.5">Official Domain</label>
                    <input
                      type="text"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:border-[#315BDB] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#191C20] mb-1.5">Primary Timezone</label>
                  <input
                    type="text"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:border-[#315BDB] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {activeTab === "attendance" && (
              <div className="space-y-4">
                <h3 className="text-base font-extrabold text-[#191C20] pb-3 border-b border-[#F2F1ED]">
                  Working Hours & Shift Policy
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#191C20] mb-1.5">Standard Daily Shift</label>
                    <input
                      type="text"
                      value={workHours}
                      onChange={(e) => setWorkHours(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:border-[#315BDB] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#191C20] mb-1.5">Late Punch-in Grace Period</label>
                    <input
                      type="text"
                      value={gracePeriod}
                      onChange={(e) => setGracePeriod(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:border-[#315BDB] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "leave" && (
              <div className="space-y-4">
                <h3 className="text-base font-extrabold text-[#191C20] pb-3 border-b border-[#F2F1ED]">
                  Annual Leave Quotas
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#191C20] mb-1.5">Casual Leave (CL)</label>
                    <input
                      type="text"
                      value={casualLeaveQuota}
                      onChange={(e) => setCasualLeaveQuota(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:border-[#315BDB] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#191C20] mb-1.5">Sick Leave (SL)</label>
                    <input
                      type="text"
                      value={sickLeaveQuota}
                      onChange={(e) => setSickLeaveQuota(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:border-[#315BDB] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-4">
                <h3 className="text-base font-extrabold text-[#191C20] pb-3 border-b border-[#F2F1ED]">
                  Enterprise Security & MFA
                </h3>

                <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#191C20]">Enforce 2-Factor Authentication (2FA)</h4>
                    <p className="text-[11px] text-[#858B93]">Require all employees to use TOTP authenticator app</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={twoFactorAuth}
                    onChange={(e) => setTwoFactorAuth(e.target.checked)}
                    className="w-4 h-4 text-[#315BDB] rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#191C20] mb-1.5">Session Persistence</label>
                  <input
                    type="text"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:border-[#315BDB] focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-[#F2F1ED] flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
