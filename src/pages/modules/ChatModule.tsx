import React, { useState } from "react";
import {
  MessageSquare,
  Send,
  Hash,
  User,
  Search,
  MoreVertical,
  Paperclip,
  Smile,
  CheckCheck,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { ChatMessage } from "../../types";

export const ChatModule: React.FC = () => {
  const { user } = useAuth();
  const [activeChannel, setActiveChannel] = useState("#general");
  const [inputText, setInputText] = useState("");

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    "#general": [
      {
        id: "msg-1",
        sender: "Omkar Kumbhar",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
        content: "Hi everyone! Welcome to the new Inveon WorkHub platform.",
        timestamp: "10:15 AM",
      },
      {
        id: "msg-2",
        sender: "Rohan Mehta",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
        content: "The architectural UI looks stunning and all modules are connected cleanly.",
        timestamp: "10:18 AM",
      },
      {
        id: "msg-3",
        sender: "Ishita Verma",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
        content: "Reviewing the design system tokens and navigation rail responsiveness now!",
        timestamp: "10:22 AM",
      },
    ],
    "#product-announcements": [
      {
        id: "msg-4",
        sender: "Omkar Kumbhar",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
        content: "WorkHub v2.0 is officially rolling out across the entire organization today! 🚀",
        timestamp: "09:00 AM",
      },
    ],
    "#engineering": [
      {
        id: "msg-5",
        sender: "Akshay More",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        content: "Vite build times are under 1.9 seconds with zero TypeScript errors.",
        timestamp: "10:05 AM",
      },
    ],
  });

  const channels = ["#general", "#product-announcements", "#engineering", "#design-critique", "#random"];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: user.name,
      avatar: user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      content: inputText.trim(),
      timestamp: "Just now",
      isMe: true,
    };

    setMessages((prev) => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMsg],
    }));

    setInputText("");
  };

  const currentMessages = messages[activeChannel] || [];

  return (
    <div className="bg-white rounded-3xl border border-[#E3E8EE] shadow-xs overflow-hidden h-[calc(100vh-140px)] flex flex-col md:flex-row">
      {/* Channels Sidebar (w-72) */}
      <div className="w-full md:w-72 border-r border-[#F2F1ED] p-4 flex flex-col justify-between shrink-0 bg-[#FAFAFA]">
        <div>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#EBEBEB]">
            <div className="w-8 h-8 rounded-xl bg-[#EEF3FF] text-[#315BDB] flex items-center justify-center font-bold">
              <MessageSquare size={16} />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#191C20]">Channels & Chat</h3>
              <p className="text-[10px] text-[#858B93]">Inveon Workspace</p>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#858B93] px-2 block mb-2">
              Organisation Channels
            </span>
            {channels.map((ch) => (
              <button
                key={ch}
                onClick={() => setActiveChannel(ch)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeChannel === ch
                    ? "bg-[#315BDB] text-white shadow-xs"
                    : "text-[#191C20] hover:bg-[#F2F1ED]"
                }`}
              >
                <Hash size={14} className={activeChannel === ch ? "text-white" : "text-[#858B93]"} />
                <span>{ch.replace("#", "")}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#EBEBEB] space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#858B93] px-2 block mb-1">
              Direct Messages
            </span>
            {[
              { name: "Omkar Kumbhar", status: "online" },
              { name: "Rohan Mehta", status: "online" },
              { name: "Ishita Verma", status: "away" },
              { name: "Meera Joshi", status: "online" },
            ].map((dm, idx) => (
              <div key={idx} className="flex items-center justify-between px-3 py-1.5 rounded-xl hover:bg-[#F2F1ED] transition-colors cursor-pointer">
                <span className="text-xs font-semibold text-[#191C20]">{dm.name}</span>
                <span className={`w-2 h-2 rounded-full ${dm.status === "online" ? "bg-[#10B981]" : "bg-[#F59E0B]"}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-[#EBEBEB] text-[11px] text-[#858B93] flex items-center justify-between">
          <span>Encrypted Enterprise Chat</span>
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
        </div>
      </div>

      {/* Main Conversation Canvas */}
      <div className="flex-1 flex flex-col justify-between h-full bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-[#F2F1ED] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash size={18} className="text-[#315BDB]" />
            <div>
              <h4 className="text-sm font-black text-[#191C20]">{activeChannel}</h4>
              <p className="text-[10px] text-[#858B93]">Real-time company conversation channel</p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#10B981] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full">
            Active Now
          </span>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {currentMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.isMe ? "flex-row-reverse" : ""}`}
            >
              <img
                src={msg.avatar}
                alt={msg.sender}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-xs shrink-0"
              />
              <div className={`max-w-md ${msg.isMe ? "text-right" : "text-left"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#191C20]">{msg.sender}</span>
                  <span className="text-[10px] text-[#858B93]">{msg.timestamp}</span>
                </div>
                <div
                  className={`p-3 rounded-2xl text-xs font-medium leading-relaxed inline-block ${
                    msg.isMe
                      ? "bg-[#315BDB] text-white rounded-tr-xs"
                      : "bg-[#F2F1ED] text-[#191C20] rounded-tl-xs"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input Box */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-[#F2F1ED] flex items-center gap-2 bg-[#FAFAFA]">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message ${activeChannel}...`}
            className="flex-1 px-4 py-2.5 bg-white rounded-xl border border-[#D8D9D6] focus:border-[#315BDB] focus:outline-none text-xs font-medium shadow-xs"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white transition-colors cursor-pointer shadow-xs"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
