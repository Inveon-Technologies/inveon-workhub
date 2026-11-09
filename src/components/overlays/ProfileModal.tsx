import React, { useState } from "react";
import { UserCircle, X, Mail, Phone, MapPin, Building, Calendar, ShieldCheck, Check } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const ProfileModal: React.FC = () => {
  const { user, profileModalOpen, setProfileModalOpen, updateUserProfile } = useAuth();

  const [name, setName] = useState(user.name);
  const [designation, setDesignation] = useState(user.designation);
  const [phone, setPhone] = useState(user.phone || "+91 98200 12345");
  const [location, setLocation] = useState(user.location || "Pune HQ");

  if (!profileModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, designation, phone, location });
    setProfileModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D8D9D6]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#F2F1ED] mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#EEF3FF] text-[#315BDB] flex items-center justify-center font-bold">
              <UserCircle size={18} />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#191C20]">My Profile Details</h3>
              <p className="text-[11px] text-[#858B93] font-medium">Manage your personal and role information</p>
            </div>
          </div>

          <button
            onClick={() => setProfileModalOpen(false)}
            className="p-1 rounded-xl text-[#858B93] hover:text-[#191C20] hover:bg-[#F2F1ED] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Profile Card Header */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] mb-6">
          <img
            src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
            alt={user.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black text-[#191C20]">{user.name}</h4>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-[#EEF3FF] text-[#315BDB]">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-[#858B93] font-medium">{user.designation} • {user.department}</p>
            <p className="text-[11px] text-[#858B93] font-mono mt-0.5">ID: {user.employeeId}</p>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#191C20] mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:outline-none focus:border-[#315BDB]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#191C20] mb-1">Designation</label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:outline-none focus:border-[#315BDB]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#191C20] mb-1">Contact Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:outline-none focus:border-[#315BDB]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#191C20] mb-1">Work Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:outline-none focus:border-[#315BDB]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#858B93] mb-1">Official Email (Managed by Admin)</label>
            <input
              type="text"
              disabled
              value={user.email}
              className="w-full px-3 py-2 bg-[#F2F1ED] rounded-xl border border-[#D8D9D6] text-xs text-[#858B93] font-medium cursor-not-allowed"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setProfileModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-[#F2F1ED] hover:bg-[#EAE8E2] text-xs font-bold text-[#191C20] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-xs font-bold text-white transition-colors shadow-xs"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
