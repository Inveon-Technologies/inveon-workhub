import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from "lucide-react";
import loginHero from "../../assets/images/login-left-hero.png";
import { useAuth, MOCK_ACCOUNTS } from "../../context/AuthContext";
import { InveonLogo } from "../../components/common/InveonLogo";

export const Login: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const { login, quickLogin } = useAuth();
  const [email, setEmail] = useState("admin@inveon.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      if (!res.success) {
        setErrorMessage(res.message || "Invalid credentials. Please verify or pick a role above.");
      }
      setIsLoading(false);
    }, 200);
  };

  const handleQuickRole = (role: typeof MOCK_ACCOUNTS[0]["role"]) => {
    const acc = MOCK_ACCOUNTS.find((a) => a.role === role);
    if (acc) {
      setEmail(acc.email);
      setPassword(acc.password);
      setErrorMessage(null);
      quickLogin(role);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F6F9] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans selection:bg-[#315BDB] selection:text-white">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-10">
        {/* Left: Master Architectural Hero Graphic (Clean, Sharp, High-Res 900x992) */}
        <div className="hidden lg:flex lg:col-span-7 flex-col justify-between rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#E2E8F0] bg-white h-[700px] relative select-none">
          <img
            src={loginHero}
            alt="Inveon WorkHub Campus"
            className="w-full h-full object-cover object-left-top"
          />
        </div>

        {/* Right: Floating Interactive White Login Card */}
        <div className="col-span-1 lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[460px] bg-white rounded-[32px] p-7 sm:p-9 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] border border-[#E2E8F0]">
            {/* Mobile-only logo */}
            <div className="lg:hidden mb-6 flex justify-center">
              <InveonLogo size="md" />
            </div>

            {/* Card Header matching design specification */}
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#191C20] tracking-tight mb-2">
                Welcome back
              </h1>
              <p className="text-sm text-[#858B93] font-medium">
                Sign in to continue to your workspace.
              </p>
            </div>

            {/* Quick Demo Role Selector Pills */}
            <div className="mb-6 p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#475569] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={13} className="text-[#315BDB]" />
                  <span>1-Click Role Access:</span>
                </span>
                <span className="text-[10px] text-[#94A3B8] font-semibold">Instant Login</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {MOCK_ACCOUNTS.map((acc) => {
                  const isSelected = email.toLowerCase() === acc.email.toLowerCase();
                  return (
                    <button
                      key={acc.role}
                      type="button"
                      onClick={() => handleQuickRole(acc.role)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#315BDB] text-white shadow-xs"
                          : "bg-white hover:bg-[#EEF3FF] hover:text-[#315BDB] text-[#475569] border border-[#E2E8F0]"
                      }`}
                      title={`Sign in as ${acc.roleLabel} (${acc.email})`}
                    >
                      {acc.roleLabel.replace("Organisation Main ", "").replace("Platform ", "")}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA] flex items-start gap-2.5 text-xs text-[#EF4444] font-medium animate-in fade-in">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Functional Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-2">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#CBD5E1] bg-white focus:border-[#315BDB] focus:ring-3 focus:ring-[#315BDB]/15 text-sm text-[#191C20] outline-none transition-all placeholder:text-[#94A3B8]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#191C20]">Password</label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#CBD5E1] bg-white focus:border-[#315BDB] focus:ring-3 focus:ring-[#315BDB]/15 text-sm text-[#191C20] outline-none transition-all placeholder:text-[#94A3B8]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#191C20] transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#315BDB] focus:ring-[#315BDB] border-[#CBD5E1] cursor-pointer"
                  />
                  <span className="text-xs font-medium text-[#64748B]">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate("forgot")}
                  className="text-xs font-semibold text-[#315BDB] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#2563EB]/25 hover:shadow-lg disabled:opacity-50 cursor-pointer active:scale-[0.99]"
              >
                <span>{isLoading ? "Signing in..." : "Sign In"}</span>
                <ArrowRight size={17} />
              </button>
            </form>

            {/* Footer Trust Markers */}
            <div className="mt-6 pt-5 border-t border-[#F1F5F9] flex flex-col items-center gap-2.5">
              <div className="flex items-center gap-2 text-[11px] text-[#64748B] font-medium text-center">
                <ShieldCheck size={14} className="text-[#2563EB] shrink-0" />
                <span>Secure access to your organisation's workspace.</span>
              </div>
              <p className="text-[11px] text-[#94A3B8] font-medium">
                Powered by <span className="font-bold text-[#191C20]">Inveon Technologies</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
