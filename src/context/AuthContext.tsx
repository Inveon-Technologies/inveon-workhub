import React, { createContext, useContext, useState } from "react";
import { UserProfile, UserRole } from "../types";

export interface AuthContextType {
  user: UserProfile;
  setRole: (role: UserRole) => void;
  login: (email?: string, role?: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
  organization: {
    id: string;
    name: string;
    tagline: string;
    logoUrl?: string;
  };
}

const PRESET_USERS: Record<UserRole, UserProfile> = {
  admin: {
    id: "usr_admin_01",
    name: "Omkar Kumbhar",
    email: "omkar.k@inveon.com",
    role: "admin",
    designation: "Product & Operations",
    department: "Executive Leadership",
    employeeId: "INV-ADM-000001",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  employee: {
    id: "usr_emp_02",
    name: "Ishita Verma",
    email: "ishita.v@inveon.com",
    role: "employee",
    designation: "UI/UX Designer",
    department: "Design & Product",
    employeeId: "INV-EMP-000012",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  },
  intern: {
    id: "usr_int_03",
    name: "Meera Joshi",
    email: "meera.j@inveon.com",
    role: "intern",
    designation: "Product Intern",
    department: "Product Engineering",
    employeeId: "INV-INT-000007",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
  hr: {
    id: "usr_hr_04",
    name: "Aarav Deshmukh",
    email: "aarav.d@inveon.com",
    role: "hr",
    designation: "HR Operations Lead",
    department: "People Operations",
    employeeId: "INV-HR-000003",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  manager: {
    id: "usr_mgr_05",
    name: "Rohan Mehta",
    email: "rohan.m@inveon.com",
    role: "manager",
    designation: "Engineering Manager",
    department: "Core Engineering",
    employeeId: "INV-MGR-000002",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  recruiter: {
    id: "usr_rec_06",
    name: "Neha Sharma",
    email: "neha.s@inveon.com",
    role: "recruiter",
    designation: "Talent Acquisition Lead",
    department: "Recruitment",
    employeeId: "INV-REC-000005",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
  super_admin: {
    id: "usr_sa_07",
    name: "Aditya Rao",
    email: "aditya.r@inveon.com",
    role: "super_admin",
    designation: "Platform Principal",
    department: "Platform Engineering",
    employeeId: "INV-SYS-000001",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>("admin");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const user = PRESET_USERS[currentRole];

  const organization = {
    id: "org_inveon_01",
    name: "Your Organisation",
    tagline: "Your People. Your Work. One Platform.",
  };

  const handleSetRole = (role: UserRole) => {
    setCurrentRole(role);
  };

  const login = (_email?: string, role: UserRole = "admin") => {
    setCurrentRole(role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setRole: handleSetRole,
        login,
        logout,
        isAuthenticated,
        organization,
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
