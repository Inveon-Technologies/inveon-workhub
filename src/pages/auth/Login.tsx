import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, KeyRound, ChevronDown, ChevronUp } from "lucide-react";
import { InveonLogo } from "../../components/common/InveonLogo";
import authArt from "../../assets/images/auth-architectural-art.png";
import { useAuth, MOCK_ACCOUNTS } from "../../context/AuthContext";
import { UserRole } from "../../types";

export const Login: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const { login, quickLogin } = useAuth();
  const [email, setEmail] = useState("admin@inveon.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showCheatSheet, setShowCheatSheet] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      if (!res.success) {
        setErrorMessage(res.message || "Invalid credentials");
      }
      setIsLoading(false);
    }, 400);
  };

  const handleSelectRole = (acc: typeof MOCK_ACCOUNTS[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#F2F1ED] flex items-center justify-center p-4 lg:p-8 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#E3E8EE] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
        {/* Left: Login Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            {/* Header Brand Logo (100% Transparent, No White Patch) */}
            <div className="flex items-center justify-between mb-8">
              <InveonLogo size="md" />
              <span className="hidden sm:inline-block text-xs font-semibold text-[#858B93] bg-[#F2F1ED] px-3 py-1 rounded-full border border-[#E2E0D8]">
                v2.0 Production
              </span>
            </div>

            {/* Form Title */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#191C20] tracking-tight mb-1.5">
                Sign in to WorkHub
              </h1>
              <p className="text-xs sm:text-sm text-[#858B93] font-medium">
                Enter your work credentials to open your role-authorized workspace.
              </p>
            </div>

            {/* Quick Demo Role Selectors */}
            <div className="mb-6 p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-extrabold text-[#191C20] uppercase tracking-wider flex items-center gap-1.5">
                  <KeyRound size={13} className="text-[#315BDB]" />
                  <span>1-Click Demo Login (Select Role):</span>
                </span>
                <span className="text-[10px] text-[#858B93] font-semibold">Instant Auth</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {MOCK_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => {
                      handleSelectRole(acc);
                      quickLogin(acc.role);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      email === acc.email
                        ? "bg-[#315BDB] text-white shadow-xs"
                        : "bg-white hover:bg-[#EEF3FF] hover:text-[#315BDB] text-[#191C20] border border-[#E2E0D8]"
                    }`}
                  >
                    {acc.roleLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA] flex items-start gap-2.5 text-xs text-[#EF4444] font-medium animate-in fade-in">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#191C20] uppercase tracking-wider mb-1.5">
                  Work Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#858B93]">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@inveon.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAFA] hover:bg-white focus:bg-white text-xs sm:text-sm text-[#191C20] rounded-xl border border-[#D8D9D6] focus:border-[#315BDB] focus:outline-none transition-all shadow-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#191C20] uppercase tracking-wider">
                    Password
                  </label>
                  {onNavigate && (
                    <button
                      type="button"
                      onClick={() => onNavigate("forgot-password")}
                      className="text-xs font-bold text-[#315BDB] hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#858B93]">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter password"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#FAFAFA] hover:bg-white focus:bg-white text-xs sm:text-sm text-[#191C20] rounded-xl border border-[#D8D9D6] focus:border-[#315BDB] focus:outline-none transition-all shadow-xs font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#858B93] hover:text-[#191C20]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#315BDB] focus:ring-[#315BDB] border-[#D8D9D6] cursor-pointer"
                  />
                  <span className="text-xs font-medium text-[#858B93]">Remember credentials</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#315BDB]/25 hover:shadow-lg disabled:opacity-50 cursor-pointer"
              >
                <span>{isLoading ? "Authenticating..." : "Sign in to Workspace"}</span>
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Collapsible Credentials Guide */}
            <div className="mt-5 pt-3 border-t border-[#F2F1ED]">
              <button
                type="button"
                onClick={() => setShowCheatSheet(!showCheatSheet)}
                className="w-full flex items-center justify-between text-xs font-bold text-[#858B93] hover:text-[#191C20] transition-colors py-1"
              >
                <span>Mock Authority Logins & Passwords</span>
                {showCheatSheet ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {showCheatSheet && (
                <div className="mt-2 overflow-x-auto rounded-xl border border-[#EBEBEB] bg-[#FAFAFA] p-2.5 text-[11px]">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-[#EBEBEB] text-[#858B93] font-bold">
                        <th className="pb-1.5 pl-1">Role / Authority</th>
                        <th className="pb-1.5">Email ID</th>
                        <th className="pb-1.5">Password</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F1ED] font-mono">
                      {MOCK_ACCOUNTS.map((a) => (
                        <tr
                          key={a.role}
                          onClick={() => handleSelectRole(a)}
                          className="hover:bg-white cursor-pointer transition-colors"
                        >
                          <td className="py-1.5 pl-1 font-sans font-bold text-[#191C20]">{a.roleLabel}</td>
                          <td className="py-1.5 text-[#315BDB]">{a.email}</td>
                          <td className="py-1.5 text-[#191C20]">{a.password}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Security Badge */}
          <div className="pt-4 mt-6 border-t border-[#F2F1ED] flex items-center justify-between text-[11px] text-[#858B93]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#10B981]" />
              <span>Enterprise Role-Based Access Control</span>
            </div>
            <span>By Inveon Technologies</span>
          </div>
        </div>

        {/* Right: Architectural Hero Graphic (5 cols) */}
        <div className="hidden lg:block lg:col-span-5 relative bg-[#191C20] overflow-hidden">
          <img
            src={authArt}
            alt="Inveon Architectural Campus"
            className="w-full h-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-8 text-white">
            <span className="text-xs font-extrabold uppercase tracking-widest text-white/70 mb-2">
              The Organisation OS
            </span>
            <h2 className="text-2xl font-extrabold leading-tight mb-2">
              Your people. Your work. <br />
              <span className="font-serif italic font-normal text-[#93C5FD]">One unified platform.</span>
            </h2>
            <p className="text-xs text-white/75 font-medium leading-relaxed">
              Login with your verified organization credentials to access HRMS, ATS, LMS, Tasks, and Analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
