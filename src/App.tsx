import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppLayout } from "./components/shell/AppLayout";
import { OrganisationAdminDashboard } from "./pages/dashboards/OrganisationAdminDashboard";
import { EmployeeDashboard } from "./pages/dashboards/EmployeeDashboard";
import { InternDashboard } from "./pages/dashboards/InternDashboard";
import { HRAdminDashboard } from "./pages/dashboards/HRAdminDashboard";
import { ManagerDashboard } from "./pages/dashboards/ManagerDashboard";
import { RecruiterDashboard } from "./pages/dashboards/RecruiterDashboard";
import { SuperAdminDashboard } from "./pages/dashboards/SuperAdminDashboard";

const DashboardRouter: React.FC = () => {
  const { user } = useAuth();

  switch (user.role) {
    case "employee":
      return <EmployeeDashboard />;
    case "intern":
      return <InternDashboard />;
    case "hr":
      return <HRAdminDashboard />;
    case "manager":
      return <ManagerDashboard />;
    case "recruiter":
      return <RecruiterDashboard />;
    case "super_admin":
      return <SuperAdminDashboard />;
    case "admin":
    default:
      return <OrganisationAdminDashboard />;
  }
};

export default function App() {
  return (
    <AuthProvider>
      <AppLayout>
        <DashboardRouter />
      </AppLayout>
    </AuthProvider>
  );
}
