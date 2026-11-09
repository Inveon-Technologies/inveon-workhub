import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, Grid, ChevronDown, Check, UserCircle, LogOut, Settings, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { UserRole } from "../../types";
import masterLogo from "../../assets/logo/Master Brand Logo.png";

export const GlobalHeader: React.FC = () => {
  const { user, setRole } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [orgOpen, setOrgOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
        setOrgOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const rolesList: { role: UserRole; label: string; desc: string }[] = [
    { role: "admin", label: "Organisation Main Admin", desc: "Master OS & Organisation Workspace" },
    { role: "employee", label: "Employee Workspace", desc: "My Work, Attendance, Leave & Projects" },
    { role: "intern", label: "Intern Journey", desc: "Learning track, submissions, mentor card" },
    { role: "hr", label: "HR Admin", desc: "People ops, attendance donut, hiring triage" },
    { role: "manager", label: "Manager Console", desc: "Team workload, sprint reviews & approvals" },
    { role: "recruiter", label: "Recruiter Dashboard", desc: "ATS pipeline, openings, interview calendar" },
    { role: "super_admin", label: "Platform Super Admin", desc: "SaaS multi-tenant control" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E3E8EE] px-4 lg:px-6 h-16 flex items-center justify-between transition-all">
      {/* Left: Brand Identity */}
      <div className="flex items-center gap-3 lg:gap-4">
        <a href="/" className="flex items-center gap-2 group">
          <img
            src={masterLogo}
            alt="INVEON WORKHUB"
            className="h-8 lg:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
        </a>

        <div className="hidden sm:block h-5 w-[1px] bg-[#D8D9D6]" />

        <span className="hidden sm:inline-block text-xs font-medium text-[#858B93] tracking-tight">
          By Inveon Technologies
        </span>

        {/* Organisation Selector */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setOrgOpen(!orgOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F2F1ED] hover:bg-[#EAE8E2] text-xs font-semibold text-[#191C20] transition-colors border border-[#E2E0D8]"
          >
            <span className="w-5 h-5 rounded bg-[#315BDB] text-white flex items-center justify-center text-[10px] font-bold">
              YO
            </span>
            <span>Your Organisation</span>
            <ChevronDown size={14} className="text-[#858B93]" />
          </button>
        </div>
      </div>

      {/* Center: Global Search Bar with Ctrl + K */}
      <div className="flex-1 max-w-xl mx-4 lg:mx-8 hidden sm:block">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#858B93] group-focus-within:text-[#315BDB] transition-colors">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search people, work, projects, meetings..."
            className="w-full pl-10 pr-16 py-2 bg-[#F2F1ED]/80 hover:bg-[#F2F1ED] focus:bg-white text-xs lg:text-sm text-[#191C20] placeholder-[#858B93] rounded-full border border-transparent focus:border-[#315BDB] focus:outline-none transition-all shadow-inner focus:shadow-md"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-[#858B93] bg-white border border-[#D8D9D6] rounded shadow-xs">
              Ctrl + K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right: Actions & User Profile */}
      <div className="flex items-center gap-2 lg:gap-3" ref={dropdownRef}>
        {/* Notification Bell */}
        <button
          className="relative p-2 rounded-full text-[#858B93] hover:text-[#191C20] hover:bg-[#F2F1ED] transition-colors"
          title="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F07838] ring-2 ring-white animate-pulse" />
        </button>

        {/* App Switcher */}
        <button
          className="p-2 rounded-full text-[#858B93] hover:text-[#191C20] hover:bg-[#F2F1ED] transition-colors"
          title="Apps & Modules"
        >
          <Grid size={18} />
        </button>

        <div className="h-5 w-[1px] bg-[#D8D9D6] mx-1" />

        {/* User Profile Chip with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 p-1 lg:pr-2.5 rounded-full hover:bg-[#F2F1ED] transition-all border border-transparent hover:border-[#D8D9D6]"
          >
            <div className="relative">
              <img
                src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-[#D8D9D6]"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10B981] border-2 border-white rounded-full" />
            </div>

            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-[#191C20] leading-tight">
                {user.name}
              </span>
              <span className="text-[11px] font-medium text-[#858B93] leading-tight">
                {user.designation}
              </span>
            </div>

            <ChevronDown size={14} className="text-[#858B93] hidden lg:block" />
          </button>

          {/* Profile & Role Switcher Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-[#D8D9D6] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-3 border-b border-[#F2F1ED]">
                <p className="text-xs text-[#858B93] font-medium">Signed in as</p>
                <p className="text-sm font-bold text-[#191C20]">{user.name}</p>
                <p className="text-xs text-[#315BDB] font-semibold">{user.email}</p>
              </div>

              {/* Instant Role Preview Switcher */}
              <div className="px-3 py-2 border-b border-[#F2F1ED]">
                <div className="flex items-center justify-between mb-1.5 px-1">
                  <span className="text-[11px] font-bold text-[#858B93] uppercase tracking-wider">
                    Switch Active View (Role)
                  </span>
                  <ShieldCheck size={13} className="text-[#315BDB]" />
                </div>
                <div className="space-y-1">
                  {rolesList.map((r) => {
                    const isSelected = user.role === r.role;
                    return (
                      <button
                        key={r.role}
                        onClick={() => {
                          setRole(r.role);
                          setProfileOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors text-xs ${
                          isSelected
                            ? "bg-[#EEF3FF] text-[#315BDB] font-bold"
                            : "text-[#191C20] hover:bg-[#F2F1ED] font-medium"
                        }`}
                      >
                        <div>
                          <div>{r.label}</div>
                          <div className="text-[10px] text-[#858B93] font-normal">{r.desc}</div>
                        </div>
                        {isSelected && <Check size={14} className="text-[#315BDB]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="py-1">
                <a
                  href="#profile"
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#191C20] hover:bg-[#F2F1ED] transition-colors"
                >
                  <UserCircle size={15} className="text-[#858B93]" />
                  <span>My Profile</span>
                </a>
                <a
                  href="#settings"
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#191C20] hover:bg-[#F2F1ED] transition-colors"
                >
                  <Settings size={15} className="text-[#858B93]" />
                  <span>Settings & Preferences</span>
                </a>
                <a
                  href="#logout"
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#F07838] hover:bg-[#FEF3EC] transition-colors"
                >
                  <LogOut size={15} />
                  <span>Sign out</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};