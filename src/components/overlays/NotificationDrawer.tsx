import React, { useState } from "react";
import { Bell, X, CheckCircle2, Clock, FileText, Check, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const NotificationDrawer: React.FC = () => {
  const { notificationsOpen, setNotificationsOpen, showToast, setActiveModule } = useAuth();
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      title: "Leave Request Approved",
      desc: "Your casual leave request for 18-19 Nov was approved by Aarav Deshmukh.",
      time: "10 mins ago",
      read: false,
      type: "leave",
    },
    {
      id: "notif-2",
      title: "New Task Assigned",
      desc: "Rohan Mehta assigned you 'Refactor Global Navigation Rail for Mobile'.",
      time: "1 hour ago",
      read: false,
      type: "work",
    },
    {
      id: "notif-3",
      title: "Diwali Office Holiday Notice",
      desc: "WorkHub campus will remain closed from Friday 13 Nov to Monday 16 Nov.",
      time: "3 hours ago",
      read: true,
      type: "announcement",
    },
    {
      id: "notif-4",
      title: "LMS Certificate Awarded",
      desc: "You earned 'WorkHub Security & HIPAA Compliance Certification'.",
      time: "Yesterday",
      read: true,
      type: "growth",
    },
  ]);

  if (!notificationsOpen) return null;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    showToast("All notifications marked as read.", "success");
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const filtered = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/30 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl border-l border-[#D8D9D6] p-6 flex flex-col justify-between animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#F2F1ED]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#EEF3FF] text-[#315BDB] flex items-center justify-center font-bold">
                <Bell size={16} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#191C20]">Notification Centre</h3>
                <span className="text-[11px] text-[#858B93] font-medium">
                  {notifications.filter((n) => !n.read).length} unread alerts
                </span>
              </div>
            </div>

            <button
              onClick={() => setNotificationsOpen(false)}
              className="p-1 rounded-xl text-[#858B93] hover:text-[#191C20] hover:bg-[#F2F1ED] transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center bg-[#F2F1ED] p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  filter === "all" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  filter === "unread" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
                }`}
              >
                Unread
              </button>
            </div>

            <button
              onClick={markAllRead}
              className="text-xs font-bold text-[#315BDB] hover:underline flex items-center gap-1"
            >
              <Check size={12} />
              <span>Mark all read</span>
            </button>
          </div>

          {/* List */}
          <div className="space-y-2.5 overflow-y-auto max-h-[calc(100vh-230px)] pr-1">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-xs text-[#858B93]">No notifications to display.</div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markAsRead(item.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    !item.read
                      ? "bg-[#EEF3FF]/40 border-[#D0E0FF] hover:bg-[#EEF3FF]/60"
                      : "bg-[#FAFAFA] border-[#EBEBEB] hover:bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-xs font-bold text-[#191C20]">{item.title}</h4>
                    <span className="text-[10px] text-[#858B93] whitespace-nowrap">{item.time}</span>
                  </div>
                  <p className="text-[11px] text-[#475569] leading-snug">{item.desc}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#F2F1ED]">
          <button
            onClick={() => {
              setNotificationsOpen(false);
              setActiveModule("settings");
            }}
            className="w-full py-2.5 rounded-xl bg-[#F2F1ED] hover:bg-[#EAE8E2] text-xs font-bold text-[#191C20] transition-colors flex items-center justify-center gap-2"
          >
            <span>Notification Preferences</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
