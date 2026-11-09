import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import loginHero from "../../assets/images/login-left-hero.png";
import { useAuth } from "../../context/AuthContext";
import { InveonLogo } from "../../components/common/InveonLogo";

export const Login: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const { login } = useAuth();
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
        setErrorMessage(res.message || "Invalid work email or password. Please verify your credentials.");
      }
      setIsLoading(false);
    }, 250);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      login("admin@inveon.com", "admin123");
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F6F9] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans selection:bg-[#2563EB] selection:text-white">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-12">
        {/* Left: Master Architectural Hero Graphic (From New UI Mockup: Login Page.png) */}
        <div className="hidden lg:flex lg:col-span-7 flex-col justify-between rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#E2E8F0] bg-white h-[660px] relative select-none">
          <img
            src={loginHero}
            alt="Inveon WorkHub Architectural Campus"
            className="w-full h-full object-cover object-left-top"
          />
        </div>

        {/* Right: Floating White Login Card (Exact reproduction of UI design) */}
        <div className="col-span-1 lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[450px] bg-white rounded-[32px] p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.07)] border border-[#E2E8F0]">
            {/* Logo on top of card */}
            <div className="mb-6 flex items-center justify-between">
              <InveonLogo size="md" />
              <span className="text-[11px] font-semibold text-[#858B93] bg-[#F4F6F9] px-2.5 py-0.5 rounded-full border border-[#E2E8F0]">
                WorkHub OS
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#191C20] tracking-tight mb-2">
                Welcome back
              </h1>
              <p className="text-sm text-[#858B93] font-medium">
                Sign in to continue to your workspace.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA] flex items-start gap-2.5 text-xs text-[#EF4444] font-medium animate-in fade-in">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-2">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#CBD5E1] bg-white focus:border-[#2563EB] focus:ring-3 focus:ring-[#2563EB]/15 text-sm text-[#191C20] outline-none transition-all placeholder:text-[#94A3B8]"
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
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#CBD5E1] bg-white focus:border-[#2563EB] focus:ring-3 focus:ring-[#2563EB]/15 text-sm text-[#191C20] outline-none transition-all placeholder:text-[#94A3B8]"
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
                    className="w-4 h-4 rounded text-[#2563EB] focus:ring-[#2563EB] border-[#CBD5E1] cursor-pointer"
                  />
                  <span className="text-xs font-medium text-[#64748B]">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate("forgot")}
                  className="text-xs font-semibold text-[#2563EB] hover:underline cursor-pointer"
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

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E2E8F0]" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-[#94A3B8] font-medium">or continue with</span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#191C20] text-xs font-bold flex items-center justify-center gap-2.5 transition-all shadow-2xs hover:shadow-xs cursor-pointer active:scale-[0.99]"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.31 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>

            {/* Footer Trust Markers */}
            <div className="mt-6 pt-5 border-t border-[#F1F5F9] flex flex-col items-center gap-2">
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
