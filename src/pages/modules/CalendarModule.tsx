import React, { useState } from "react";
import {
  CalendarDays,
  Plus,
  Clock,
  Video,
  Users,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { ScheduleItem } from "../../types";

export const CalendarModule: React.FC = () => {
  const { showToast } = useAuth();
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [currentDate] = useState("November 2026");

  const [events, setEvents] = useState<ScheduleItem[]>([
    {
      id: "EVT-101",
      time: "10:00 AM - 11:00 AM",
      title: "Product Sync & Sprint 24 Review",
      location: "Conference Room A (In-person)",
      platform: "In-Person",
      type: "Meeting",
      attendees: 8,
    },
    {
      id: "EVT-102",
      time: "11:30 AM - 12:30 PM",
      title: "Project Review – WorkHub v2.0 Architecture",
      location: "Google Meet",
      platform: "Online",
      type: "Review",
      attendees: 12,
    },
    {
      id: "EVT-103",
      time: "02:00 PM - 02:45 PM",
      title: "Technical Interview – Lead UI/UX Designer",
      location: "Google Meet",
      platform: "Online",
      type: "Interview",
      attendees: 3,
    },
    {
      id: "EVT-104",
      time: "04:30 PM - 05:00 PM",
      title: "Team Check-in & Weekly Retrospective",
      location: "Design Studio Room",
      platform: "In-Person",
      type: "Meeting",
      attendees: 6,
    },
  ]);

  // New Event Form State
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("03:00 PM - 04:00 PM");
  const [newLocation, setNewLocation] = useState("Google Meet");
  const [newType, setNewType] = useState<"Meeting" | "Review" | "Interview">("Meeting");

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newEvt: ScheduleItem = {
      id: `EVT-${events.length + 105}`,
      title: newTitle,
      time: newTime,
      location: newLocation,
      platform: newLocation.includes("Meet") ? "Online" : "In-Person",
      type: newType,
      attendees: 4,
    };

    setEvents([...events, newEvt]);
    showToast(`Meeting "${newTitle}" scheduled.`, "success");
    setScheduleModalOpen(false);
    setNewTitle("");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#E3E8EE] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-extrabold tracking-widest text-[#858B93] uppercase">
              CALENDAR & MEETINGS OS
            </span>
            <div className="h-[1px] w-12 bg-[#858B93]/40" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#191C20] tracking-tight">
            Schedule, Meetings & Rooms
          </h1>
          <p className="text-xs lg:text-sm text-[#858B93] font-medium mt-1">
            Coordinate team agendas, online Google Meet calls, and conference room reservations.
          </p>
        </div>

        <button
          onClick={() => setScheduleModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
        >
          <Plus size={15} />
          <span>Schedule Meeting</span>
        </button>
      </div>

      {/* Main Grid: Interactive Calendar & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Month Calendar (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#F2F1ED] mb-4">
            <h3 className="text-base font-extrabold text-[#191C20]">{currentDate}</h3>
            <div className="flex items-center gap-1.5">
              <button className="p-1.5 rounded-lg border border-[#D8D9D6] hover:bg-[#F2F1ED] text-[#858B93]">
                <ChevronLeft size={16} />
              </button>
              <button className="p-1.5 rounded-lg border border-[#D8D9D6] hover:bg-[#F2F1ED] text-[#858B93]">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-[#858B93] mb-3">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Calendar Day Tiles */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {[
              { day: 1, active: false },
              { day: 2, active: false },
              { day: 3, active: false },
              { day: 4, active: false },
              { day: 5, active: false },
              { day: 6, active: false },
              { day: 7, active: false },
              { day: 8, active: false, hasEvent: true },
              { day: 9, active: true, hasEvent: true },
              { day: 10, active: false, hasEvent: true },
              { day: 11, active: false },
              { day: 12, active: false, hasEvent: true },
              { day: 13, active: false, isHoliday: true },
              { day: 14, active: false, isHoliday: true },
              { day: 15, active: false, isHoliday: true },
              { day: 16, active: false, isHoliday: true },
              { day: 17, active: false },
              { day: 18, active: false, hasEvent: true },
              { day: 19, active: false },
              { day: 20, active: false },
              { day: 21, active: false },
              { day: 22, active: false },
              { day: 23, active: false },
              { day: 24, active: false },
              { day: 25, active: false },
              { day: 26, active: false },
              { day: 27, active: false },
              { day: 28, active: false },
              { day: 29, active: false },
              { day: 30, active: false },
            ].map((d, idx) => (
              <div
                key={idx}
                className={`h-12 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                  d.active
                    ? "bg-[#315BDB] text-white font-extrabold shadow-sm"
                    : d.isHoliday
                    ? "bg-[#FEF3EC] text-[#F07838] font-bold"
                    : "hover:bg-[#F2F1ED] text-[#191C20] font-semibold"
                }`}
              >
                <span>{d.day}</span>
                {d.hasEvent && !d.active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#315BDB] mt-1" />
                )}
                {d.isHoliday && (
                  <span className="text-[9px] font-extrabold leading-none mt-0.5">Off</span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-[#F2F1ED] flex items-center justify-between text-xs text-[#858B93]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#315BDB]" />
                <span>Today's Date</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F07838]" />
                <span>Diwali Holidays (13-16 Nov)</span>
              </span>
            </div>
            <span>Timezone: IST (UTC+05:30)</span>
          </div>
        </div>

        {/* Today's Agenda List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F2F1ED] mb-4">
              <div>
                <h3 className="text-base font-extrabold text-[#191C20]">Today's Schedule</h3>
                <p className="text-[11px] text-[#858B93]">Monday, 9 Nov 2026</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EEF3FF] text-[#315BDB] border border-[#D0E0FF]">
                {events.length} Meetings
              </span>
            </div>

            <div className="space-y-3">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] hover:border-[#315BDB] transition-all space-y-2 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-[#315BDB] flex items-center gap-1">
                      <Clock size={12} />
                      <span>{evt.time}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-[#F2F1ED] text-[#858B93]">
                      {evt.type}
                    </span>
                  </div>

                  <h4 className="text-xs font-black text-[#191C20] group-hover:text-[#315BDB] transition-colors">
                    {evt.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-[#858B93]">
                    <span>{evt.location}</span>
                    <span>{evt.attendees} attendees</span>
                  </div>

                  {evt.platform === "Online" && (
                    <a
                      href="https://meet.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-1.5 px-3 rounded-xl bg-[#EEF3FF] hover:bg-[#315BDB] text-[#315BDB] hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Video size={13} />
                      <span>Join Google Meet</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setScheduleModalOpen(true)}
            className="mt-4 w-full py-2.5 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
          >
            <Plus size={14} />
            <span>Book Conference Room</span>
          </button>
        </div>
      </div>

      {/* Schedule Meeting Modal */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D8D9D6]">
            <div className="flex items-center justify-between pb-4 border-b border-[#F2F1ED] mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#EEF3FF] text-[#315BDB] flex items-center justify-center font-bold">
                  <CalendarDays size={16} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#191C20]">Schedule New Meeting</h3>
                  <p className="text-[11px] text-[#858B93]">Reserve calendar slot and invite teammates</p>
                </div>
              </div>
              <button onClick={() => setScheduleModalOpen(false)} className="p-1 rounded-xl text-[#858B93] hover:text-[#191C20]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-1">Meeting Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Design System Token Review"
                  className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:outline-none focus:border-[#315BDB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#191C20] mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:outline-none focus:border-[#315BDB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#191C20] mb-1">Meeting Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:outline-none focus:border-[#315BDB]"
                  >
                    <option value="Meeting">General Meeting</option>
                    <option value="Review">Project Review</option>
                    <option value="Interview">Candidate Interview</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-1">Room or Platform</label>
                <select
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:outline-none focus:border-[#315BDB]"
                >
                  <option value="Google Meet">Online (Google Meet)</option>
                  <option value="Conference Room A (In-person)">Conference Room A (12 Seats)</option>
                  <option value="Conference Room B (In-person)">Conference Room B (6 Seats)</option>
                  <option value="Design Studio Room">Design Studio Room</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setScheduleModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F2F1ED] text-xs font-bold text-[#191C20]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-xs font-bold text-white shadow-xs cursor-pointer"
                >
                  Confirm & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
