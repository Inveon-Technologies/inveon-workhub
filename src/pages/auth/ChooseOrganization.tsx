import React, { useState } from "react";
import { Search, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import { InveonLogo } from "../../components/common/InveonLogo";

interface Org {
  id: string;
  initials: string;
  name: string;
  role: string;
  department: string;
  lastAccessed: string;
}

export const ChooseOrganization: React.FC<{ onSelect?: (orgId: string) => void }> = ({ onSelect }) => {
  const [selectedId, setSelectedId] = useState("org_northstar");
  const [search, setSearch] = useState("");

  const orgs: Org[] = [
    {
      id: "org_acme",
      initials: "AT",
      name: "Acme Technologies",
      role: "Organisation Main Admin",
      department: "Administration",
      lastAccessed: "Recently",
    },
    {
      id: "org_northstar",
      initials: "NS",
      name: "Northstar Solutions",
      role: "Manager",
      department: "Operations",
      lastAccessed: "Yesterday",
    },
    {
      id: "org_vertex",
      initials: "VC",
      name: "Vertex Consulting",
      role: "Employee",
      department: "Technology",
      lastAccessed: "Last week",
    },
  ];

  const handleContinue = () => {
    if (onSelect) onSelect(selectedId);
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F6F9] flex flex-col justify-between p-6 lg:p-12 font-sans selection:bg-[#2563EB] selection:text-white">
      {/* Top Header */}
      <header className="w-full flex items-center justify-between pb-6 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <InveonLogo size="md" />
          <div className="h-4 w-[1px] bg-[#D8D9D6]" />
          <span className="text-xs font-semibold text-[#858B93]">By Inveon Technologies</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#191C20]">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Omkar Kumbhar"
            className="w-7 h-7 rounded-full object-cover"
          />
          <span>Omkar Kumbhar</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl w-full mx-auto py-12">
        <div className="mb-8">
          <div className="w-12 h-1 bg-[#2563EB] rounded-full mb-4" />
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#191C20] tracking-tight mb-2">
            Choose your workspace
          </h1>
          <p className="text-sm text-[#858B93] font-medium">
            Select an organisation to continue to your workspace.
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-8">
          <label className="block text-xs font-bold text-[#191C20] mb-2">Find an organisation</label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your organisations..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#CBD5E1] bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 text-sm text-[#191C20] outline-none transition-all placeholder:text-[#94A3B8]"
            />
          </div>
        </div>

        {/* Organisations Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {orgs.map((org) => {
            const isSelected = selectedId === org.id;
            return (
              <div
                key={org.id}
                onClick={() => setSelectedId(org.id)}
                className={`p-6 rounded-3xl bg-white border-2 cursor-pointer transition-all duration-200 relative ${
                  isSelected
                    ? "border-[#2563EB] shadow-lg shadow-[#2563EB]/10 scale-[1.02]"
                    : "border-[#E2E8F0] hover:border-[#CBD5E1] shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#2563EB] flex items-center justify-center font-bold text-sm tracking-wide">
                    {org.initials}
                  </div>
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center">
                      <CheckCircle2 size={16} />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-[#CBD5E1]" />
                  )}
                </div>

                <h3 className="font-bold text-base text-[#191C20] mb-4">{org.name}</h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-[#858B93]">
                    <span>Role</span>
                    <span className="font-bold text-[#191C20]">{org.role}</span>
                  </div>
                  <div className="flex justify-between text-[#858B93]">
                    <span>Department</span>
                    <span className="font-medium text-[#191C20]">{org.department}</span>
                  </div>
                  <div className="flex justify-between text-[#858B93]">
                    <span>Last accessed</span>
                    <span className="font-medium text-[#191C20]">{org.lastAccessed}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info & Action Button */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-xs text-[#858B93] flex items-center gap-1.5">
            <span>Your access and permissions depend on the selected organisation.</span>
          </p>

          <button
            type="button"
            onClick={handleContinue}
            className="py-3 px-8 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#2563EB]/25 hover:shadow-lg cursor-pointer"
          >
            <span>Continue to Workspace</span>
            <ArrowRight size={17} />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-[#94A3B8] pt-6 border-t border-[#E2E8F0]">
        Powered by <strong className="text-[#475569]">Inveon Technologies</strong>
      </footer>
    </div>
  );
};
