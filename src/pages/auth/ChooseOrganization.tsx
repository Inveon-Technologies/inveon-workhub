import React from "react";
import { Building2, ArrowRight, ShieldCheck, Check } from "lucide-react";
import masterLogo from "../../assets/logo/Master Brand Logo.png";

export const ChooseOrganization: React.FC<{ onSelect?: (orgId: string) => void }> = ({ onSelect }) => {
  const orgs = [
    {
      id: "org-inveon",
      name: "Inveon Technologies Pvt Ltd",
      role: "Organisation Main Admin",
      avatarBg: "bg-[#315BDB]",
      abbr: "IT",
      activeUsers: "348 Members",
      current: true,
    },
    {
      id: "org-demo",
      name: "Inveon Innovation Labs",
      role: "Product Member",
      avatarBg: "bg-[#10B981]",
      abbr: "IL",
      activeUsers: "42 Members",
      current: false,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#F2F1ED] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-xl bg-white rounded-3xl p-8 lg:p-10 border border-[#E3E8EE] shadow-xl">
        <div className="flex items-center gap-2 mb-8">
          <img src={masterLogo} alt="INVEON WORKHUB" className="h-8 w-auto object-contain" />
          <div className="h-4 w-[1px] bg-[#D8D9D6] mx-1" />
          <span className="text-xs font-semibold text-[#858B93]">By Inveon Technologies</span>
        </div>

        <h1 className="text-2xl font-black text-[#191C20] mb-1">Select an Organisation</h1>
        <p className="text-xs text-[#858B93] mb-6">
          Your account has access to multiple workspace domains. Choose where to enter:
        </p>

        <div className="space-y-3 mb-8">
          {orgs.map((org) => (
            <div
              key={org.id}
              onClick={() => onSelect && onSelect(org.id)}
              className="p-4 rounded-2xl border border-[#EBEBEB] hover:border-[#315BDB] bg-[#FAFAFA] hover:bg-white transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-2xl ${org.avatarBg} text-white font-extrabold flex items-center justify-center text-sm shadow-xs`}>
                  {org.abbr}
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#191C20] group-hover:text-[#315BDB] transition-colors">
                    {org.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-bold text-[#315BDB]">{org.role}</span>
                    <span className="text-[10px] text-[#858B93]">•</span>
                    <span className="text-[11px] text-[#858B93] font-medium">{org.activeUsers}</span>
                  </div>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#F2F1ED] group-hover:bg-[#EEF3FF] group-hover:text-[#315BDB] flex items-center justify-center text-[#858B93] transition-colors">
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#F2F1ED] flex items-center justify-between text-[11px] text-[#858B93]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#10B981]" />
            <span>Multi-Tenant Enterprise Isolation</span>
          </div>
          <button className="text-[#315BDB] font-bold hover:underline">Join Another Org</button>
        </div>
      </div>
    </div>
  );
};
