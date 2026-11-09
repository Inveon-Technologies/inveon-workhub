import React, { useState } from "react";
import { Lock, Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Check } from "lucide-react";
import loginHero from "../../assets/images/login-left-hero.png";

export const ResetPassword: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [updated, setUpdated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password === confirmPassword) {
      setUpdated(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F6F9] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans selection:bg-[#2563EB] selection:text-white">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-12">
        {/* Left: Master Architectural Hero Graphic */}
        <div className="hidden lg:flex lg:col-span-7 flex-col justify-between rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#E2E8F0] bg-white h-[700px] relative select-none">
          <img
            src={loginHero}
            alt="Inveon WorkHub Architectural Campus"
            className="w-full h-full object-cover object-left-top"
          />
        </div>

        {/* Right: Floating White Card */}
        <div className="col-span-1 lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[460px] bg-white rounded-[32px] p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.07)] border border-[#E2E8F0]">
            {/* Back link */}
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("login")}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#2563EB] hover:underline mb-6 cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Login</span>
            </button>

            {/* Title & Subtitle */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#191C20] tracking-tight mb-2">
                Create a new password
              </h1>
              <p className="text-xs sm:text-sm text-[#858B93] font-medium leading-relaxed">
                Choose a strong password to protect your WorkHub account.
              </p>
            </div>

            {updated ? (
              <div className="text-center py-6 animate-in fade-in">
                <div className="w-14 h-14 rounded-2xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center mx-auto mb-4 border border-[#A7F3D0]">
                  <CheckCircle2 size={28} />
                </div>
                <h2 className="text-lg font-bold text-[#191C20] mb-1.5">Password Updated!</h2>
                <p className="text-xs text-[#858B93] mb-6">
                  Your password has been changed successfully. You can now sign in with your new credentials.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate("login")}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-md shadow-[#2563EB]/25"
                >
                  Sign in with New Password
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#191C20] mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your new password"
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

                {/* Password Strength Meter */}
                <div>
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <span className="font-bold text-[#191C20]">Password Strength</span>
                    <span className="font-bold text-[#10B981] flex items-center gap-1">
                      <Check size={12} /> Strong
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    <div className="h-1.5 rounded-full bg-[#10B981]" />
                    <div className="h-1.5 rounded-full bg-[#10B981]" />
                    <div className="h-1.5 rounded-full bg-[#10B981]" />
                    <div className="h-1.5 rounded-full bg-[#10B981]" />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#858B93] mt-1 font-medium">
                    <span>Weak</span>
                    <span>Fair</span>
                    <span>Good</span>
                    <span className="font-bold text-[#10B981]">Strong</span>
                  </div>
                </div>

                {/* Requirements Card */}
                <div className="p-3 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] text-[11px] text-[#166534] space-y-1.5">
                  <span className="font-bold block mb-1">Password Requirements:</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <Check size={12} className="text-[#10B981] shrink-0" />
                      <span>At least 12 characters</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check size={12} className="text-[#10B981] shrink-0" />
                      <span>One lowercase letter</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check size={12} className="text-[#10B981] shrink-0" />
                      <span>One uppercase letter</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check size={12} className="text-[#10B981] shrink-0" />
                      <span>One number (0-9)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#191C20] mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your new password"
                      required
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#CBD5E1] bg-white focus:border-[#2563EB] focus:ring-3 focus:ring-[#2563EB]/15 text-sm text-[#191C20] outline-none transition-all placeholder:text-[#94A3B8]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#191C20] transition-colors cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#2563EB]/25 hover:shadow-lg cursor-pointer"
                >
                  <span>Update Password</span>
                  <ArrowRight size={17} />
                </button>
              </form>
            )}

            {/* Footer Trust Markers */}
            <div className="mt-8 pt-5 border-t border-[#F1F5F9] flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-[11px] text-[#64748B] font-medium text-center">
                <ShieldCheck size={14} className="text-[#2563EB] shrink-0" />
                <span>Your account security is important to us.</span>
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
