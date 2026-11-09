import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, UserRole, ActiveModule } from "../types";

export interface MockCredential {
  role: UserRole;
  roleLabel: string;
  email: string;
  password: string;
  name: string;
  designation: string;
}

export const MOCK_ACCOUNTS: MockCredential[] = [
  {
    role: "admin",
    roleLabel: "Organisation Main Admin",
    email: "admin@inveon.com",
    password: "admin123",
    name: "Omkar Kumbhar",
    designation: "Product & Operations",
  },
  {
    role: "hr",
    roleLabel: "HR Admin",
    email: "hr@inveon.com",
    password: "hr123",
    name: "Aarav Deshmukh",
    designation: "HR Operations Lead",
  },
  {
    role: "manager",
    roleLabel: "Manager / Team Lead",
    email: "manager@inveon.com",
    password: "manager123",
    name: "Rohan Mehta",
    designation: "Engineering Manager",
  },
  {
    role: "employee",
    roleLabel: "Employee",
    email: "employee@inveon.com",
    password: "emp123",
    name: "Ishita Verma",
    designation: "UI/UX Designer",
  },
  {
    role: "intern",
    roleLabel: "Intern",
    email: "intern@inveon.com",
    password: "intern123",
    name: "Meera Joshi",
    designation: "Product Intern",
  },
  {
    role: "recruiter",
    roleLabel: "Recruiter / Talent Lead",
    email: "recruiter@inveon.com",
    password: "rec123",
    name: "Neha Sharma",
    designation: "Talent Acquisition Lead",
  },
  {
    role: "super_admin",
    roleLabel: "Platform Super Admin",
    email: "superadmin@inveon.com",
    password: "super123",
    name: "Aditya Rao",
    designation: "Platform Principal",
  },
];

const PRESET_USERS: Record<UserRole, UserProfile> = {
  admin: {
    id: "usr_admin_01",
    name: "Omkar Kumbhar",
    email: "admin@inveon.com",
    role: "admin",
    designation: "Product & Operations",
    department: "Executive Leadership",
    employeeId: "INV-ADM-000001",
    phone: "+91 98200 12345",
    joinDate: "Jan 2023",
    location: "Pune HQ",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  employee: {
    id: "usr_emp_02",
    name: "Ishita Verma",
    email: "employee@inveon.com",
    role: "employee",
    designation: "UI/UX Designer",
    department: "Design & Product",
    employeeId: "INV-EMP-000012",
    phone: "+91 98200 54321",
    joinDate: "Mar 2024",
    location: "Pune HQ / Hybrid",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  },
  intern: {
    id: "usr_int_03",
    name: "Meera Joshi",
    email: "intern@inveon.com",
    role: "intern",
    designation: "Product Intern",
    department: "Product Engineering",
    employeeId: "INV-INT-000007",
    phone: "+91 98200 99887",
    joinDate: "Aug 2026",
    location: "Pune HQ",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
  hr: {
    id: "usr_hr_04",
    name: "Aarav Deshmukh",
    email: "hr@inveon.com",
    role: "hr",
    designation: "HR Operations Lead",
    department: "People Operations",
    employeeId: "INV-HR-000003",
    phone: "+91 98200 11223",
    joinDate: "Jun 2023",
    location: "Pune HQ",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  manager: {
    id: "usr_mgr_05",
    name: "Rohan Mehta",
    email: "manager@inveon.com",
    role: "manager",
    designation: "Engineering Manager",
    department: "Core Engineering",
    employeeId: "INV-MGR-000002",
    phone: "+91 98200 44556",
    joinDate: "Feb 2023",
    location: "Pune HQ",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  recruiter: {
    id: "usr_rec_06",
    name: "Neha Sharma",
    email: "recruiter@inveon.com",
    role: "recruiter",
    designation: "Talent Acquisition Lead",
    department: "Recruitment",
    employeeId: "INV-REC-000005",
    phone: "+91 98200 77889",
    joinDate: "Oct 2023",
    location: "Remote",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
  super_admin: {
    id: "usr_sa_07",
    name: "Aditya Rao",
    email: "superadmin@inveon.com",
    role: "super_admin",
    designation: "Platform Principal",
    department: "Platform Engineering",
    employeeId: "INV-SYS-000001",
    phone: "+91 98200 00001",
    joinDate: "Jan 2022",
    location: "Cloud HQ",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
  },
};

export interface ToastInfo {
  id: string;
  message: string;
  type: "success" | "info" | "warning";
}

export interface AuthContextType {
  user: UserProfile;
  currentRole: UserRole;
  isAuthenticated: boolean;
  activeModule: ActiveModule;
  setActiveModule: (mod: ActiveModule) => void;
  login: (email: string, password: string) => { success: boolean; message?: string };
  quickLogin: (role: UserRole) => void;
  logout: () => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  organization: {
    id: string;
    name: string;
    tagline: string;
    logoUrl?: string;
  };
  // Modals & Overlays
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  appSwitcherOpen: boolean;
  setAppSwitcherOpen: (open: boolean) => void;
  profileModalOpen: boolean;
  setProfileModalOpen: (open: boolean) => void;
  toasts: ToastInfo[];
  showToast: (message: string, type?: "success" | "info" | "warning") => void;
  removeToast: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("inveon_authenticated") === "true";
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem("inveon_role") as UserRole;
    return saved && PRESET_USERS[saved] ? saved : "admin";
  });

  const [activeModule, setActiveModule] = useState<ActiveModule>("home");
  const [userProfile, setUserProfile] = useState<UserProfile>(() => PRESET_USERS[currentRole]);

  // Overlays
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [appSwitcherOpen, setAppSwitcherOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  useEffect(() => {
    setUserProfile(PRESET_USERS[currentRole]);
    localStorage.setItem("inveon_role", currentRole);
  }, [currentRole]);

  const showToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = (email: string, password: string): { success: boolean; message?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const found = MOCK_ACCOUNTS.find(
      (acc) => acc.email.toLowerCase() === cleanEmail && acc.password === password
    );

    if (found) {
      setCurrentRole(found.role);
      setIsAuthenticated(true);
      setActiveModule("home");
      localStorage.setItem("inveon_authenticated", "true");
      localStorage.setItem("inveon_role", found.role);
      showToast(`Welcome back, ${found.name}! Signed in as ${found.roleLabel}.`, "success");
      return { success: true };
    }

    // Fallback: check if email matches any account with default password 'admin123' or 'inveon123'
    const emailMatch = MOCK_ACCOUNTS.find((acc) => acc.email.toLowerCase() === cleanEmail);
    if (emailMatch) {
      return { success: false, message: `Invalid password for ${emailMatch.email}. Use "${emailMatch.password}"` };
    }

    return {
      success: false,
      message: "Account not found. Please click any 'Quick Demo' role button below or use admin@inveon.com",
    };
  };

  const quickLogin = (role: UserRole) => {
    const acc = MOCK_ACCOUNTS.find((a) => a.role === role) || MOCK_ACCOUNTS[0];
    setCurrentRole(role);
    setIsAuthenticated(true);
    setActiveModule("home");
    localStorage.setItem("inveon_authenticated", "true");
    localStorage.setItem("inveon_role", role);
    showToast(`Logged in as ${acc.name} (${acc.roleLabel})`, "success");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setActiveModule("home");
    localStorage.removeItem("inveon_authenticated");
    showToast("Signed out successfully.", "info");
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
    showToast("Profile details updated successfully.", "success");
  };

  const organization = {
    id: "org_inveon_01",
    name: "Inveon Technologies",
    tagline: "Your People. Your Work. One Platform.",
  };

  return (
    <AuthContext.Provider
      value={{
        user: userProfile,
        currentRole,
        isAuthenticated,
        activeModule,
        setActiveModule,
        login,
        quickLogin,
        logout,
        updateUserProfile,
        organization,
        searchOpen,
        setSearchOpen,
        notificationsOpen,
        setNotificationsOpen,
        appSwitcherOpen,
        setAppSwitcherOpen,
        profileModalOpen,
        setProfileModalOpen,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
