import React, { useState } from "react";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import loginHero from "../../assets/images/login-left-hero.png";
import { InveonLogo } from "../../components/common/InveonLogo";

export const ForgotPassword: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F6F9] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans selection:bg-[#2563EB] selection:text-white">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-12">
        {/* Left: Master Architectural Hero Graphic */}
        <div className="hidden lg:flex lg:col-span-7 flex-col justify-between rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#E2E8F0] bg-white h-[660px] relative select-none">
          <img
            src={loginHero}
            alt="Inveon WorkHub Architectural Campus"
            className="w-full h-full object-cover object-left-top"
          />
        </div>

        {/* Right: Floating White Card */}
        <div className="col-span-1 lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[450px] bg-white rounded-[32px] p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.07)] border border-[#E2E8F0]">
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
                Forgot your password?
              </h1>
              <p className="text-xs sm:text-sm text-[#858B93] font-medium leading-relaxed">
                Don't worry. Enter your registered work email address and we'll send you instructions to reset your password.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-6 animate-in fade-in">
                <div className="w-14 h-14 rounded-2xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center mx-auto mb-4 border border-[#A7F3D0]">
                  <CheckCircle2 size={28} />
                </div>
                <h2 className="text-lg font-bold text-[#191C20] mb-1.5">Check your inbox</h2>
                <p className="text-xs text-[#858B93] mb-6">
                  If an account exists for <strong className="text-[#191C20]">{email}</strong>, password reset instructions have been sent.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate("login")}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-md shadow-[#2563EB]/25"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#2563EB]/25 hover:shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  <span>{loading ? "Sending link..." : "Send Reset Link"}</span>
                  <ArrowRight size={17} />
                </button>

                <div className="text-center pt-2">
                  <span className="text-xs text-[#858B93]">Remember your password? </span>
                  <button
                    type="button"
                    onClick={() => onNavigate && onNavigate("login")}
                    className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer"
                  >
                    Sign in
                  </button>
                </div>
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
