import React, { useState } from "react";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import masterLogo from "../../assets/logo/Master Brand Logo.png";
import authArt from "../../assets/images/auth-architectural-art.png";

export const ForgotPassword: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#F2F1ED] flex items-center justify-center p-4 lg:p-8 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#E3E8EE] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
        <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <img src={masterLogo} alt="INVEON WORKHUB" className="h-8 w-auto object-contain" />
              <div className="h-4 w-[1px] bg-[#D8D9D6] mx-1" />
              <span className="text-xs font-semibold text-[#858B93]">By Inveon Technologies</span>
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-3xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center mx-auto mb-4 border border-[#A7F3D0]">
                  <CheckCircle2 size={32} />
                </div>
                <h2 className="text-2xl font-black text-[#191C20] mb-2">Check your email</h2>
                <p className="text-xs text-[#858B93] mb-6 max-w-sm mx-auto">
                  We've sent password reset instructions to <strong className="text-[#191C20]">{email}</strong>. Please check your inbox and spam folder.
                </p>
                {onNavigate && (
                  <button
                    onClick={() => onNavigate("login")}
                    className="py-2.5 px-6 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    Return to Sign in
                  </button>
                )}
              </div>
            ) : (
              <div>
                <h1 className="text-2xl lg:text-3xl font-extrabold text-[#191C20] tracking-tight mb-2">
                  Reset Password
                </h1>
                <p className="text-xs text-[#858B93] font-medium mb-8">
                  Enter your verified work email address to receive password recovery instructions.
                </p>

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

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs lg:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#315BDB]/25"
                  >
                    <span>Send Reset Link</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-[#F2F1ED] flex items-center justify-between">
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("login")}
                className="text-xs font-bold text-[#858B93] hover:text-[#191C20] flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Back to login</span>
              </button>
            )}
            <span className="text-[11px] text-[#858B93]">Need help? Contact IT Admin</span>
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-5 relative bg-[#191C20] overflow-hidden">
          <img src={authArt} alt="Inveon" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 text-white">
            <h3 className="text-xl font-bold mb-1">Identity & Access</h3>
            <p className="text-xs text-white/70">Enterprise security governed by Inveon Technologies single sign-on.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
