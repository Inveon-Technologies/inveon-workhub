import React from "react";
import { LucideIcon, ArrowRight, Sparkles } from "lucide-react";
import heroBg from "../../assets/images/hero-architecture-bg.png";

export interface HeaderStat {
  label: string;
  value: string;
  change?: string;
  icon?: LucideIcon;
  color?: string;
}

export interface ModuleHeaderProps {
  tag: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  stats?: HeaderStat[];
  primaryAction?: {
    label: string;
    icon?: LucideIcon;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    icon?: LucideIcon;
    onClick: () => void;
  };
  children?: React.ReactNode;
}

export const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  tag,
  title,
  titleHighlight,
  subtitle,
  stats,
  primaryAction,
  secondaryAction,
  children,
}) => {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-xs border border-[#E3E8EE] mb-6 bg-white animate-fade-in-up">
      {/* Background Architectural Layer with Glass Gradient Wash */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src={heroBg}
          alt="Inveon Architectural Campus"
          className="w-full h-full object-cover object-right opacity-90 transition-transform duration-700 hover:scale-105"
        />
        {/* Soft gradient wash on left for maximum readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent w-full md:w-3/4" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 p-6 lg:p-8 flex flex-col justify-between min-h-[160px]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left Title & Tag Area */}
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-extrabold tracking-widest text-[#858B93] uppercase flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#315BDB]" />
                <span>{tag}</span>
              </span>
              <div className="h-[1px] w-12 bg-[#858B93]/30" />
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191C20] tracking-tight leading-tight">
              {title}{" "}
              {titleHighlight && (
                <span className="font-serif italic font-normal text-[#315BDB]">
                  {titleHighlight}
                </span>
              )}
            </h1>

            <p className="text-xs sm:text-sm text-[#475569] font-medium mt-1 leading-relaxed max-w-lg">
              {subtitle}
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            {secondaryAction && (
              <button
                type="button"
                onClick={secondaryAction.onClick}
                className="px-4 py-2.5 rounded-xl bg-white/90 hover:bg-white text-[#191C20] border border-[#CBD5E1] text-xs font-bold flex items-center gap-2 transition-all shadow-2xs hover:shadow-xs cursor-pointer active:scale-95"
              >
                {secondaryAction.icon && React.createElement(secondaryAction.icon, { size: 15 })}
                <span>{secondaryAction.label}</span>
              </button>
            )}

            {primaryAction && (
              <button
                type="button"
                onClick={primaryAction.onClick}
                className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-[#2563EB]/20 hover:shadow-lg hover:shadow-[#2563EB]/30 cursor-pointer active:scale-95"
              >
                {primaryAction.icon && React.createElement(primaryAction.icon, { size: 15 })}
                <span>{primaryAction.label}</span>
              </button>
            )}
          </div>
        </div>

        {/* Floating Telemetry Stats / Metrics (Optional) */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-slate-200/60">
            {stats.map((st, i) => (
              <div
                key={i}
                className="p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-2xs flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#858B93] uppercase tracking-wider block">
                    {st.label}
                  </span>
                  <span className="text-base font-extrabold text-[#191C20] mt-0.5 block">
                    {st.value}
                  </span>
                </div>
                {st.icon && (
                  <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#2563EB] flex items-center justify-center shrink-0">
                    {React.createElement(st.icon, { size: 16 })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
};
