import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, Grid, ChevronDown, UserCircle, LogOut, Settings, Building2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { InveonLogo } from "../common/InveonLogo";

export const GlobalHeader: React.FC = () => {
  const {
    user,
    logout,
    setActiveModule,
    setSearchOpen,
    notificationsOpen,
    setNotificationsOpen,
    appSwitcherOpen,
    setAppSwitcherOpen,
    setProfileModalOpen,
  } = useAuth();

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

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E3E8EE] px-4 lg:px-6 h-16 flex items-center justify-between transition-all">
      {/* Left: Brand Identity (Transparent Logo without Patch) */}
      <div className="flex items-center gap-3 lg:gap-4">
        <button
          onClick={() => setActiveModule("home")}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <InveonLogo size="md" />
        </button>

        <div className="hidden sm:block h-5 w-[1px] bg-[#D8D9D6]" />

        <span className="hidden sm:inline-block text-xs font-semibold text-[#858B93] tracking-tight">
          By Inveon Technologies
        </span>

        {/* Organisation Selector */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setOrgOpen(!orgOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F2F1ED] hover:bg-[#EAE8E2] text-xs font-semibold text-[#191C20] transition-colors border border-[#E2E0D8] cursor-pointer"
          >
            <span className="w-5 h-5 rounded-lg bg-[#315BDB] text-white flex items-center justify-center text-[10px] font-bold">
              IT
            </span>
            <span>Inveon Technologies</span>
            <ChevronDown size={14} className="text-[#858B93]" />
          </button>

          {orgOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#D8D9D6] p-3 z-50 animate-in fade-in">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#F2F1ED]">
                <div className="w-8 h-8 rounded-xl bg-[#EEF3FF] text-[#315BDB] flex items-center justify-center font-bold text-xs">
                  <Building2 size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#191C20]">Inveon Technologies</h4>
                  <p className="text-[10px] text-[#858B93]">Enterprise Tenant • 348 Seats</p>
                </div>
              </div>
              <p className="text-[11px] text-[#858B93] py-2">
                Domain: <strong className="text-[#191C20]">inveontechnologies.in</strong>
              </p>
              <button
                onClick={() => setOrgOpen(false)}
                className="w-full py-1.5 rounded-lg bg-[#F2F1ED] hover:bg-[#EEF3FF] hover:text-[#315BDB] text-xs font-bold text-[#191C20] transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Center: Global Search Bar with Ctrl + K */}
      <div className="flex-1 max-w-xl mx-4 lg:mx-8 hidden sm:block">
        <button
          onClick={() => setSearchOpen(true)}
          className="w-full relative group text-left cursor-pointer"
        >
          <div className="w-full pl-10 pr-16 py-2 bg-[#F2F1ED]/80 hover:bg-[#F2F1ED] text-xs lg:text-sm text-[#858B93] rounded-full border border-transparent hover:border-[#D8D9D6] transition-all shadow-inner flex items-center">
            <Search size={16} className="absolute left-3.5 text-[#858B93] group-hover:text-[#315BDB]" />
            <span>Search people, work, projects, meetings...</span>
            <div className="absolute right-3">
              <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-[#858B93] bg-white border border-[#D8D9D6] rounded shadow-xs">
                Ctrl + K
              </kbd>
            </div>
          </div>
        </button>
      </div>

      {/* Right: Actions & User Profile */}
      <div className="flex items-center gap-2 lg:gap-3" ref={dropdownRef}>
        {/* Notification Bell */}
        <button
          onClick={() => setNotificationsOpen(!notificationsOpen)}
          className="relative p-2 rounded-full text-[#858B93] hover:text-[#191C20] hover:bg-[#F2F1ED] transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F07838] ring-2 ring-white animate-pulse" />
        </button>

        {/* App Switcher */}
        <button
          onClick={() => setAppSwitcherOpen(!appSwitcherOpen)}
          className="p-2 rounded-full text-[#858B93] hover:text-[#191C20] hover:bg-[#F2F1ED] transition-colors cursor-pointer"
          title="Apps & Modules"
        >
          <Grid size={18} />
        </button>

        <div className="h-5 w-[1px] bg-[#D8D9D6] mx-1" />

        {/* User Profile Chip with Clean Dropdown (NO Role Switcher) */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 p-1 lg:pr-2.5 rounded-full hover:bg-[#F2F1ED] transition-all border border-transparent hover:border-[#D8D9D6] cursor-pointer"
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

          {/* Clean Profile Menu (Profile, Settings, Sign Out) */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#D8D9D6] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-3 border-b border-[#F2F1ED]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#191C20]">{user.name}</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-[#EEF3FF] text-[#315BDB] uppercase">
                    {user.role.replace("_", " ")}
                  </span>
                </div>
                <p className="text-xs text-[#858B93] font-medium truncate">{user.email}</p>
                <p className="text-[10px] text-[#858B93] font-mono mt-0.5">{user.employeeId}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    setProfileModalOpen(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#191C20] hover:bg-[#F2F1ED] transition-colors text-left cursor-pointer"
                >
                  <UserCircle size={15} className="text-[#858B93]" />
                  <span>My Profile Details</span>
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    setActiveModule("settings");
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#191C20] hover:bg-[#F2F1ED] transition-colors text-left cursor-pointer"
                >
                  <Settings size={15} className="text-[#858B93]" />
                  <span>Organisation Settings</span>
                </button>
              </div>

              <div className="pt-1 border-t border-[#F2F1ED]">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#EF4444] hover:bg-[#FEF2F2] transition-colors text-left font-bold cursor-pointer"
                >
                  <LogOut size={15} />
                  <span>Sign out of WorkHub</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
