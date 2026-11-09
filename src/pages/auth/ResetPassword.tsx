import React, { useState } from "react";
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";
import masterLogo from "../../assets/logo/Master Brand Logo.png";

export const ResetPassword: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword === confirmPassword) {
      setCompleted(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F2F1ED] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#E3E8EE] shadow-xl">
        <div className="flex items-center gap-2 mb-8">
          <img src={masterLogo} alt="INVEON WORKHUB" className="h-8 w-auto object-contain" />
        </div>

        {completed ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-2xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center mx-auto mb-4 border border-[#A7F3D0]">
              <CheckCircle2 size={28} />
            </div>
            <h2 className="text-xl font-black text-[#191C20] mb-2">Password Reset Complete</h2>
            <p className="text-xs text-[#858B93] mb-6">
              Your password has been successfully updated. You can now sign in with your new credentials.
            </p>
            {onNavigate && (
              <button
                onClick={() => onNavigate("login")}
                className="w-full py-2.5 rounded-xl bg-[#315BDB] text-white text-xs font-bold hover:bg-[#244BB5] transition-colors"
              >
                Sign In Now
              </button>
            )}
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-black text-[#191C20] mb-1">Set New Password</h1>
            <p className="text-xs text-[#858B93] mb-6">Must be at least 8 characters with numbers and symbols.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#191C20] uppercase tracking-wider mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="Enter new password"
                    className="w-full pl-3 pr-10 py-2.5 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] focus:border-[#315BDB] text-xs font-medium focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#858B93]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#191C20] uppercase tracking-wider mb-1.5">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-type new password"
                  className="w-full px-3 py-2.5 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] focus:border-[#315BDB] text-xs font-medium focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#315BDB]/25"
              >
                <span>Save New Password</span>
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
