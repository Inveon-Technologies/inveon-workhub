import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Mail, ShieldCheck } from "lucide-react";
import loginHero from "../../assets/images/login-left-hero.png";

export const EmailVerification: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const [code, setCode] = useState(["8", "4", "2", "7", "1", "6"]);

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...code];
    updated[index] = val;
    setCode(updated);
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
          <div className="w-full max-w-[460px] bg-white rounded-[32px] p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.07)] border border-[#E2E8F0] text-center">
            {/* Back link */}
            <div className="text-left mb-4">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate("login")}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#2563EB] hover:underline cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
            </div>

            {/* Icon Graphic */}
            <div className="w-16 h-16 rounded-full bg-[#EEF2FF] text-[#2563EB] flex items-center justify-center mx-auto mb-4 border border-[#E0E7FF]">
              <Mail size={28} />
            </div>

            {/* Title & Subtitle */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#191C20] tracking-tight mb-2">
                Verify your email address
              </h1>
              <p className="text-xs sm:text-sm text-[#858B93] font-medium leading-relaxed">
                We've sent a verification code to your work email address. Enter the code below to continue.
              </p>
            </div>

            {/* Masked Email Badge */}
            <div className="mb-6 p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-xs px-3 text-[#475569]">
              <div className="flex items-center gap-1.5 font-mono">
                <Mail size={13} className="text-[#858B93]" />
                <span>o*****r@inveon.com</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate("login")}
                className="text-[#2563EB] font-bold hover:underline"
              >
                Change
              </button>
            </div>

            {/* 6 Digit Verification Code Inputs */}
            <div className="mb-6">
              <label className="block text-left text-xs font-bold text-[#191C20] mb-2.5">
                Verification Code
              </label>
              <div className="grid grid-cols-6 gap-2">
                {code.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(idx, e.target.value)}
                    className="w-full h-12 rounded-xl text-center font-bold text-lg text-[#191C20] border border-[#CBD5E1] bg-white focus:border-[#2563EB] focus:ring-3 focus:ring-[#2563EB]/15 outline-none transition-all"
                  />
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("choose_org")}
              className="w-full py-3 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#2563EB]/25 hover:shadow-lg cursor-pointer"
            >
              <span>Verify Email</span>
              <ArrowRight size={17} />
            </button>

            {/* Resend status */}
            <div className="mt-4 text-xs text-[#858B93]">
              Didn't receive the code?{" "}
              <button type="button" className="font-bold text-[#2563EB] hover:underline">
                Resend Code
              </button>
            </div>

            {/* Footer Trust Markers */}
            <div className="mt-8 pt-5 border-t border-[#F1F5F9] flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-[11px] text-[#64748B] font-medium text-center">
                <ShieldCheck size={14} className="text-[#2563EB] shrink-0" />
                <span>Having trouble? Contact your organisation administrator.</span>
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
