import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppLayout } from "./components/shell/AppLayout";
import { Login } from "./pages/auth/Login";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { ResetPassword } from "./pages/auth/ResetPassword";
import { EmailVerification } from "./pages/auth/EmailVerification";
import { ChooseOrganization } from "./pages/auth/ChooseOrganization";

// Role-Based Dashboards
import { OrganisationAdminDashboard } from "./pages/dashboards/OrganisationAdminDashboard";
import { EmployeeDashboard } from "./pages/dashboards/EmployeeDashboard";
import { InternDashboard } from "./pages/dashboards/InternDashboard";
import { HRAdminDashboard } from "./pages/dashboards/HRAdminDashboard";
import { ManagerDashboard } from "./pages/dashboards/ManagerDashboard";
import { RecruiterDashboard } from "./pages/dashboards/RecruiterDashboard";
import { SuperAdminDashboard } from "./pages/dashboards/SuperAdminDashboard";

// Full Module Pages (All 16 PRD Modules)
import { PeopleModule } from "./pages/modules/PeopleModule";
import { WorkModule } from "./pages/modules/WorkModule";
import { ProjectsModule } from "./pages/modules/ProjectsModule";
import { AttendanceModule } from "./pages/modules/AttendanceModule";
import { LeaveModule } from "./pages/modules/LeaveModule";
import { PayrollModule } from "./pages/modules/PayrollModule";
import { RecruitmentModule } from "./pages/modules/RecruitmentModule";
import { PerformanceModule } from "./pages/modules/PerformanceModule";
import { OnboardingModule } from "./pages/modules/OnboardingModule";
import { DocumentsModule } from "./pages/modules/DocumentsModule";
import { GrowthModule } from "./pages/modules/GrowthModule";
import { CalendarModule } from "./pages/modules/CalendarModule";
import { ChatModule } from "./pages/modules/ChatModule";
import { ReportsModule } from "./pages/modules/ReportsModule";
import { SettingsModule } from "./pages/modules/SettingsModule";
import { OrgAdminModule } from "./pages/modules/OrgAdminModule";

// Global Overlays
import { GlobalSearchModal } from "./components/overlays/GlobalSearchModal";
import { NotificationDrawer } from "./components/overlays/NotificationDrawer";
import { AppSwitcherModal } from "./components/overlays/AppSwitcherModal";
import { ProfileModal } from "./components/overlays/ProfileModal";
import { ToastContainer } from "./components/overlays/Toast";

const MainContentRouter: React.FC = () => {
  const { user, activeModule } = useAuth();

  switch (activeModule) {
    case "people":
      return <PeopleModule />;
    case "work":
      return <WorkModule />;
    case "projects":
      return <ProjectsModule />;
    case "attendance":
      return <AttendanceModule />;
    case "leave":
      return <LeaveModule />;
    case "payroll":
      return <PayrollModule />;
    case "recruitment":
      return <RecruitmentModule />;
    case "performance":
      return <PerformanceModule />;
    case "onboarding":
      return <OnboardingModule />;
    case "documents":
      return <DocumentsModule />;
    case "growth":
      return <GrowthModule />;
    case "calendar":
      return <CalendarModule />;
    case "chat":
      return <ChatModule />;
    case "reports":
      return <ReportsModule />;
    case "settings":
      return <SettingsModule />;
    case "org-admin":
      return <OrgAdminModule />;
    case "home":
    default:
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
  }
};

const AppShellRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [authPage, setAuthPage] = useState<"login" | "forgot" | "reset" | "verify" | "choose_org">("login");

  if (!isAuthenticated) {
    if (authPage === "forgot") return <ForgotPassword onNavigate={(p) => setAuthPage(p as any)} />;
    if (authPage === "reset") return <ResetPassword onNavigate={(p) => setAuthPage(p as any)} />;
    if (authPage === "verify") return <EmailVerification onNavigate={(p) => setAuthPage(p as any)} />;
    if (authPage === "choose_org") return <ChooseOrganization onSelect={() => setAuthPage("login")} />;
    return <Login onNavigate={(p) => setAuthPage(p as any)} />;
  }

  return (
    <AppLayout>
      <MainContentRouter />
      <GlobalSearchModal />
      <NotificationDrawer />
      <AppSwitcherModal />
      <ProfileModal />
      <ToastContainer />
    </AppLayout>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppShellRouter />
    </AuthProvider>
  );
}
