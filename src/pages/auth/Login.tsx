import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import masterLogo from "../../assets/logo/Master Brand Logo.png";
import authArt from "../../assets/images/auth-architectural-art.png";
import { useAuth } from "../../context/AuthContext";

export const Login: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("omkar.kumbhar@inveontechnologies.in");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(email, "admin");
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-[#F2F1ED] flex items-center justify-center p-4 lg:p-8 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#E3E8EE] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left: Login Form (6 cols) */}
        <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-10">
              <img src={masterLogo} alt="INVEON WORKHUB" className="h-8 w-auto object-contain" />
              <div className="h-4 w-[1px] bg-[#D8D9D6] mx-1" />
              <span className="text-xs font-semibold text-[#858B93]">By Inveon Technologies</span>
            </div>

            {/* Form Header */}
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-extrabold text-[#191C20] tracking-tight mb-2">
                Sign in to WorkHub
              </h1>
              <p className="text-xs lg:text-sm text-[#858B93] font-medium">
                Enter your work credentials to access your organization workspace.
              </p>
            </div>

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
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAFA] hover:bg-white focus:bg-white text-xs lg:text-sm text-[#191C20] rounded-xl border border-[#D8D9D6] focus:border-[#315BDB] focus:outline-none transition-all shadow-xs"
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
                    className="w-full pl-10 pr-10 py-2.5 bg-[#FAFAFA] hover:bg-white focus:bg-white text-xs lg:text-sm text-[#191C20] rounded-xl border border-[#D8D9D6] focus:border-[#315BDB] focus:outline-none transition-all shadow-xs"
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
                  <span className="text-xs font-medium text-[#858B93]">Keep me signed in for 30 days</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs lg:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#315BDB]/25 hover:shadow-lg disabled:opacity-50"
              >
                <span>{isLoading ? "Signing in..." : "Sign in to Workspace"}</span>
                <ArrowRight size={16} />
              </button>
            </form>

            {/* SSO Options */}
            <div className="mt-8 pt-6 border-t border-[#F2F1ED]">
              <span className="text-[11px] font-bold text-[#858B93] uppercase tracking-wider block text-center mb-3">
                Or sign in with Single Sign-On (SSO)
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="py-2.5 px-3 rounded-xl border border-[#D8D9D6] bg-white hover:bg-[#FAFAFA] text-xs font-bold text-[#191C20] flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <span className="font-extrabold text-[#EA4335]">G</span>
                  <span>Google Workspace</span>
                </button>
                <button
                  type="button"
                  className="py-2.5 px-3 rounded-xl border border-[#D8D9D6] bg-white hover:bg-[#FAFAFA] text-xs font-bold text-[#191C20] flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <span className="font-extrabold text-[#00A4EF]">M</span>
                  <span>Microsoft Azure</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Security Badge */}
          <div className="pt-6 mt-6 border-t border-[#F2F1ED] flex items-center justify-between text-[11px] text-[#858B93]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#10B981]" />
              <span>Enterprise Grade 256-bit AES Encryption</span>
            </div>
            <span>v2.0 (Production)</span>
          </div>
        </div>

        {/* Right: Architectural Hero Graphic (6 cols) */}
        <div className="hidden lg:block lg:col-span-6 relative bg-[#191C20] overflow-hidden">
          <img
            src={authArt}
            alt="Inveon Architectural Campus"
            className="w-full h-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-10 text-white">
            <span className="text-xs font-extrabold uppercase tracking-widest text-white/70 mb-2">
              The Organisation OS
            </span>
            <h2 className="text-3xl font-extrabold leading-tight mb-2">
              Your people. Your work. <br />
              <span className="font-serif italic font-normal text-[#93C5FD]">One unified platform.</span>
            </h2>
            <p className="text-xs text-white/75 font-medium max-w-sm">
              Connecting teams, workflows, performance and growth into one frictionless enterprise workspace.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
