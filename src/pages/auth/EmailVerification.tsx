import React, { useState } from "react";
import { MailCheck, ArrowRight, RefreshCw } from "lucide-react";
import { InveonLogo } from "../../components/common/InveonLogo";

export const EmailVerification: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (index: number, val: string) => {
    if (val.length <= 1) {
      const next = [...code];
      next[index] = val;
      setCode(next);
      if (val && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F2F1ED] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#E3E8EE] shadow-xl text-center">
        <div className="flex justify-center mb-6">
          <InveonLogo size="md" />
        </div>

        <div className="w-14 h-14 rounded-2xl bg-[#EEF3FF] text-[#315BDB] flex items-center justify-center mx-auto mb-4 border border-[#D0E0FF]">
          <MailCheck size={28} />
        </div>

        <h1 className="text-2xl font-black text-[#191C20] mb-1">Verify Your Email</h1>
        <p className="text-xs text-[#858B93] mb-6">
          We've sent a 6-digit confirmation code to your work email address.
        </p>

        {/* 6 Digit OTP inputs */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {code.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              className="w-11 h-12 text-center text-lg font-black text-[#191C20] bg-[#FAFAFA] border border-[#D8D9D6] rounded-xl focus:border-[#315BDB] focus:outline-none focus:bg-white shadow-xs"
            />
          ))}
        </div>

        <button
          onClick={() => onNavigate && onNavigate("choose-org")}
          className="w-full py-3 px-4 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#315BDB]/25 mb-4"
        >
          <span>Verify & Continue</span>
          <ArrowRight size={15} />
        </button>

        <div className="flex items-center justify-center gap-1.5 text-xs text-[#858B93]">
          <span>Didn't receive code?</span>
          <button className="font-bold text-[#315BDB] hover:underline flex items-center gap-1">
            <RefreshCw size={12} />
            <span>Resend Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};
