import React from "react";
import symbolImg from "../../assets/logo/inveon-symbol-transparent.png";

export const InveonLogo: React.FC<{ size?: "sm" | "md" | "lg"; light?: boolean }> = ({
  size = "md",
  light = false,
}) => {
  const iconHeight = size === "sm" ? "h-6" : size === "lg" ? "h-10" : "h-8";
  const titleSize = size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-base";
  const subSize = size === "sm" ? "text-[8px]" : size === "lg" ? "text-[11px]" : "text-[9px]";

  return (
    <div className="flex items-center gap-2.5 select-none">
      <img
        src={symbolImg}
        alt="Inveon Symbol"
        className={`${iconHeight} w-auto object-contain transition-transform group-hover:scale-105 shrink-0`}
      />
      <div className="flex flex-col">
        <div className={`font-black tracking-wider leading-none ${titleSize} flex items-center gap-1.5`}>
          <span className={light ? "text-white" : "text-[#191C20]"}>INVEON</span>
          <span className="text-[#315BDB]">WORKHUB</span>
        </div>
        <span
          className={`font-semibold tracking-tight uppercase leading-tight mt-1 ${subSize} ${
            light ? "text-white/70" : "text-[#858B93]"
          }`}
        >
          Your People. Your Work. One Platform.
        </span>
      </div>
    </div>
  );
};
