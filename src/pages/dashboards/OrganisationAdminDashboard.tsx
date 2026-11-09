import React from "react";
import { TeamPresenceStrip } from "../../components/shell/TeamPresenceStrip";
import { HeroSection } from "../../components/dashboard/HeroSection";
import { BentoDashboard } from "../../components/dashboard/BentoDashboard";

export const OrganisationAdminDashboard: React.FC = () => {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Sub-Header: Team & Organisation Presence Strip */}
      <TeamPresenceStrip />

      {/* Centerpiece: The Organisation OS Architectural Hero */}
      <HeroSection />

      {/* Lower Bento Execution Dashboard */}
      <BentoDashboard />
    </div>
  );
};