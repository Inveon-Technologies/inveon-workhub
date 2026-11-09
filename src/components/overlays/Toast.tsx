import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useAuth();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto p-3.5 rounded-2xl shadow-xl border flex items-center justify-between gap-3 text-xs font-semibold animate-in slide-in-from-bottom-2 fade-in duration-200 ${
            t.type === "success"
              ? "bg-[#10B981] text-white border-[#059669]"
              : t.type === "warning"
              ? "bg-[#F59E0B] text-white border-[#D97706]"
              : "bg-[#191C20] text-white border-[#334155]"
          }`}
        >
          <div className="flex items-center gap-2">
            {t.type === "success" && <CheckCircle2 size={16} className="shrink-0" />}
            {t.type === "warning" && <AlertCircle size={16} className="shrink-0" />}
            {t.type === "info" && <Info size={16} className="shrink-0 text-[#93C5FD]" />}
            <span>{t.message}</span>
          </div>

          <button
            onClick={() => removeToast(t.id)}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
