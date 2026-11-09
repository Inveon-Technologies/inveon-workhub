import React from "react";
import { Users, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const TeamPresenceStrip: React.FC = () => {
  const { user, setActiveModule } = useAuth();

  const isMainAdmin = user.role === "admin";

  const memberAvatars = [
    { name: "Vedant P.", role: "Product", src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80" },
    { name: "Rutuja S.", role: "Design", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
    { name: "Akshay M.", role: "Engineering", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
    { name: "Priya K.", role: "People", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E3E8EE] px-4 py-2.5 shadow-xs flex flex-wrap items-center justify-between gap-3 transition-all mb-4">
      {/* Left: Team Count & Title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-[#F2F1ED] flex items-center justify-center text-[#191C20]">
          <Users size={16} />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#191C20]">
              {isMainAdmin ? "ORGANISATION PRESENCE" : "MY TEAM"}
            </span>
            <span className="text-[10px] text-[#858B93] font-bold">•</span>
            <span className="text-[11px] font-bold text-[#858B93]">
              {isMainAdmin ? "348 MEMBERS" : "4 MEMBERS"}
            </span>
          </div>
          <p className="text-[11px] text-[#858B93] font-medium leading-none">
            {isMainAdmin ? "Live attendance status across organisation" : "Direct Reports"}
          </p>
        </div>
      </div>

      {/* Middle: Status Telemetry Counters */}
      <div className="flex items-center gap-4 lg:gap-6 flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs font-bold text-[#191C20]">{isMainAdmin ? "312" : "3"}</span>
          <span className="text-xs font-medium text-[#858B93]">Working</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
          <span className="text-xs font-bold text-[#191C20]">{isMainAdmin ? "12" : "1"}</span>
          <span className="text-xs font-medium text-[#858B93]">On Break</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]" />
          <span className="text-xs font-bold text-[#191C20]">{isMainAdmin ? "18" : "0"}</span>
          <span className="text-xs font-medium text-[#858B93]">Not Started</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
          <span className="text-xs font-bold text-[#191C20]">{isMainAdmin ? "6" : "0"}</span>
          <span className="text-xs font-medium text-[#858B93]">On Leave</span>
        </div>
      </div>

      {/* Right: Member Avatars & Action */}
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2 overflow-hidden">
          {memberAvatars.map((m, idx) => (
            <img
              key={idx}
              src={m.src}
              alt={m.name}
              title={`${m.name} (${m.role})`}
              className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
            />
          ))}
          <div className="w-7 h-7 rounded-full bg-[#F2F1ED] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#858B93]">
            {isMainAdmin ? "+344" : "+0"}
          </div>
        </div>

        <button
          onClick={() => setActiveModule("people")}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#F2F1ED] hover:bg-[#EEF3FF] hover:text-[#315BDB] text-xs font-bold text-[#191C20] transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};
