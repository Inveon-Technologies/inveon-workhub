import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  X,
  CheckCircle2,
  Building,
  Calendar,
  Briefcase,
  SlidersHorizontal,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { EmployeeRecord } from "../../types";

export const PeopleModule: React.FC = () => {
  const { showToast } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [activeTab, setActiveTab] = useState<"directory" | "hierarchy" | "departments">("directory");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeRecord | null>(null);

  // Initial employees list
  const [employees, setEmployees] = useState<EmployeeRecord[]>([
    {
      id: "INV-EMP-000001",
      name: "Omkar Kumbhar",
      email: "omkar.k@inveon.com",
      role: "Product & Operations Lead",
      department: "Executive Leadership",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      joinDate: "Jan 2023",
      location: "Pune HQ",
      performanceScore: 96,
    },
    {
      id: "INV-EMP-000002",
      name: "Rohan Mehta",
      email: "rohan.m@inveon.com",
      role: "Engineering Manager",
      department: "Engineering",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      joinDate: "Feb 2023",
      location: "Pune HQ",
      performanceScore: 92,
    },
    {
      id: "INV-EMP-000003",
      name: "Aarav Deshmukh",
      email: "aarav.d@inveon.com",
      role: "HR Operations Lead",
      department: "Human Resources",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      joinDate: "Jun 2023",
      location: "Pune HQ",
      performanceScore: 94,
    },
    {
      id: "INV-EMP-000012",
      name: "Ishita Verma",
      email: "ishita.v@inveon.com",
      role: "UI/UX Designer",
      department: "Design",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      joinDate: "Mar 2024",
      location: "Hybrid (Pune)",
      performanceScore: 95,
    },
    {
      id: "INV-EMP-000007",
      name: "Meera Joshi",
      email: "meera.j@inveon.com",
      role: "Product Intern",
      department: "Product Engineering",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      joinDate: "Aug 2026",
      location: "Pune HQ",
      performanceScore: 90,
    },
    {
      id: "INV-EMP-000005",
      name: "Neha Sharma",
      email: "neha.s@inveon.com",
      role: "Talent Acquisition Lead",
      department: "Recruitment",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
      joinDate: "Oct 2023",
      location: "Remote",
      performanceScore: 91,
    },
    {
      id: "INV-EMP-000021",
      name: "Vedant Patil",
      email: "vedant.p@inveon.com",
      role: "Senior Frontend Engineer",
      department: "Engineering",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
      joinDate: "Nov 2023",
      location: "Pune HQ",
      performanceScore: 93,
    },
    {
      id: "INV-EMP-000034",
      name: "Akshay More",
      email: "akshay.m@inveon.com",
      role: "Backend Architect",
      department: "Engineering",
      status: "On Leave",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      joinDate: "Dec 2023",
      location: "Pune HQ",
      performanceScore: 95,
    },
  ]);

  // Add Employee Form State
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newDept, setNewDept] = useState("Engineering");
  const [newLocation, setNewLocation] = useState("Pune HQ");

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail || !newRole) return;

    const newEmp: EmployeeRecord = {
      id: `INV-EMP-0000${employees.length + 10}`,
      name: newName,
      email: newEmail,
      role: newRole,
      department: newDept,
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      joinDate: "Nov 2026",
      location: newLocation,
      performanceScore: 88,
    };

    setEmployees([newEmp, ...employees]);
    showToast(`Employee ${newName} added to directory.`, "success");
    setAddModalOpen(false);
    setNewName("");
    setNewEmail("");
    setNewRole("");
  };

  const filtered = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase()) ||
      emp.id.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === "All" || emp.department === selectedDept;
    const matchesStatus = selectedStatus === "All" || emp.status === selectedStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const departments = ["All", "Executive Leadership", "Engineering", "Design", "Human Resources", "Recruitment", "Product Engineering"];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#E3E8EE] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-extrabold tracking-widest text-[#858B93] uppercase">
              PEOPLE & TALENT OS
            </span>
            <div className="h-[1px] w-12 bg-[#858B93]/40" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#191C20] tracking-tight">
            Workforce Directory & Teams
          </h1>
          <p className="text-xs lg:text-sm text-[#858B93] font-medium mt-1">
            Manage 348 employees, departments, reporting hierarchy and profile records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <UserPlus size={15} />
            <span>Add New Employee</span>
          </button>
        </div>
      </div>

      {/* Tabs & Controls Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E3E8EE] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2F1ED] pb-3">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2">
            {[
              { id: "directory", label: "Employee Directory", count: employees.length },
              { id: "departments", label: "Departments (6)", count: null },
              { id: "hierarchy", label: "Org Chart Hierarchy", count: null },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#315BDB] text-white shadow-xs"
                    : "text-[#858B93] hover:text-[#191C20] hover:bg-[#F2F1ED]"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Quick Count Badge */}
          <span className="text-xs font-bold text-[#858B93]">
            Showing {filtered.length} of {employees.length} members
          </span>
        </div>

        {/* Filters and Search Row */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative w-full md:flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#858B93]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by name, designation, department or ID..."
              className="w-full pl-10 pr-4 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] focus:border-[#315BDB] focus:outline-none text-xs font-medium"
            />
          </div>

          {/* Department Filter */}
          <div className="w-full md:w-auto flex items-center gap-2">
            <Filter size={15} className="text-[#858B93] shrink-0" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-semibold text-[#191C20] focus:border-[#315BDB] focus:outline-none"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-semibold text-[#191C20] focus:border-[#315BDB] focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>
      </div>

      {/* Directory Grid View */}
      {activeTab === "directory" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((emp) => (
            <div
              key={emp.id}
              onClick={() => setSelectedEmployee(emp)}
              className="bg-white rounded-3xl p-5 border border-[#E3E8EE] hover:border-[#315BDB] shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="relative">
                    <img
                      src={emp.avatar}
                      alt={emp.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-xs"
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ring-2 ring-white ${
                        emp.status === "Active" ? "bg-[#10B981]" : "bg-[#F59E0B]"
                      }`}
                    />
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      emp.status === "Active"
                        ? "bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0]"
                        : "bg-[#FFFBEB] text-[#F59E0B] border border-[#FDE68A]"
                    }`}
                  >
                    {emp.status}
                  </span>
                </div>

                <h3 className="text-sm font-black text-[#191C20] group-hover:text-[#315BDB] transition-colors">
                  {emp.name}
                </h3>
                <p className="text-xs text-[#858B93] font-medium leading-tight mb-2">{emp.role}</p>

                <div className="space-y-1 pt-2 border-t border-[#F2F1ED] text-[11px] text-[#475569]">
                  <div className="flex items-center gap-1.5">
                    <Building size={12} className="text-[#858B93]" />
                    <span className="truncate">{emp.department}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-[#858B93]" />
                    <span>{emp.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-[#858B93]" />
                    <span>Joined {emp.joinDate}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F2F1ED] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#858B93] font-bold">{emp.id}</span>
                <span className="text-xs font-bold text-[#315BDB] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  <span>Profile</span>
                  <ChevronRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Departments Overview Tab */}
      {activeTab === "departments" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Engineering", lead: "Rohan Mehta", count: 184, budget: "Optimal", color: "border-[#315BDB]" },
            { name: "Design & UX", lead: "Ishita Verma", count: 28, budget: "Optimal", color: "border-[#8B5CF6]" },
            { name: "Human Resources", lead: "Aarav Deshmukh", count: 16, budget: "Optimal", color: "border-[#10B981]" },
            { name: "Recruitment & Talent", lead: "Neha Sharma", count: 14, budget: "Hiring", color: "border-[#F59E0B]" },
            { name: "Executive Leadership", lead: "Omkar Kumbhar", count: 8, budget: "Executive", color: "border-[#191C20]" },
            { name: "Product Operations", lead: "Vedant Patil", count: 42, budget: "Optimal", color: "border-[#06B6D4]" },
          ].map((d, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-[#191C20]">{d.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F2F1ED] text-[#191C20]">
                  {d.count} Members
                </span>
              </div>
              <div className="text-xs text-[#858B93] space-y-1">
                <p>Department Lead: <strong className="text-[#191C20]">{d.lead}</strong></p>
                <p>Status: <span className="text-[#10B981] font-semibold">{d.budget}</span></p>
              </div>
              <button
                onClick={() => {
                  setSelectedDept(d.name.split(" ")[0]);
                  setActiveTab("directory");
                }}
                className="w-full py-2 rounded-xl bg-[#F2F1ED] hover:bg-[#EEF3FF] hover:text-[#315BDB] text-xs font-bold transition-colors"
              >
                View Department Members
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Org Hierarchy Tree Tab */}
      {activeTab === "hierarchy" && (
        <div className="bg-white rounded-3xl p-8 border border-[#E3E8EE] shadow-xs text-center space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#858B93]">Executive Command</span>
            <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-[#EEF3FF] border border-[#D0E0FF] mt-2 shadow-xs">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Omkar" className="w-10 h-10 rounded-full object-cover" />
              <div className="text-left">
                <h4 className="text-sm font-black text-[#191C20]">Omkar Kumbhar</h4>
                <p className="text-xs text-[#315BDB] font-semibold">Product & Operations</p>
              </div>
            </div>
          </div>

          <div className="w-[2px] h-8 bg-[#D8D9D6] mx-auto" />

          {/* Department Leads Row */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#858B93]">Department Leads</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-2">
              {[
                { name: "Rohan Mehta", role: "Engineering Lead", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
                { name: "Aarav Deshmukh", role: "People Lead", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
                { name: "Neha Sharma", role: "Talent Lead", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100" },
              ].map((lead, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] text-center">
                  <img src={lead.img} alt={lead.name} className="w-10 h-10 rounded-full object-cover mx-auto mb-2" />
                  <h5 className="text-xs font-black text-[#191C20]">{lead.name}</h5>
                  <p className="text-[11px] text-[#858B93]">{lead.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D8D9D6]">
            <div className="flex items-center justify-between pb-4 border-b border-[#F2F1ED] mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#EEF3FF] text-[#315BDB] flex items-center justify-center font-bold">
                  <UserPlus size={16} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#191C20]">Onboard New Employee</h3>
                  <p className="text-[11px] text-[#858B93]">Create credentials and employee record</p>
                </div>
              </div>
              <button onClick={() => setAddModalOpen(false)} className="p-1 rounded-xl text-[#858B93] hover:text-[#191C20]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddEmployee} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Siddharth Rao"
                  className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:outline-none focus:border-[#315BDB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-1">Official Work Email</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="siddharth.r@inveon.com"
                  className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:outline-none focus:border-[#315BDB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#191C20] mb-1">Designation</label>
                  <input
                    type="text"
                    required
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="e.g. Frontend Engineer"
                    className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:outline-none focus:border-[#315BDB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#191C20] mb-1">Department</label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:outline-none focus:border-[#315BDB]"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Recruitment">Recruitment</option>
                    <option value="Product Engineering">Product Engineering</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-1">Work Location</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium focus:outline-none focus:border-[#315BDB]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F2F1ED] text-xs font-bold text-[#191C20]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-xs font-bold text-white shadow-xs cursor-pointer"
                >
                  Confirm & Onboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Employee Detail Slideover */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/30 backdrop-blur-xs flex justify-end animate-in fade-in">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F2F1ED] mb-6">
                <span className="text-xs font-mono text-[#858B93] font-bold">{selectedEmployee.id}</span>
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="p-1 rounded-xl text-[#858B93] hover:text-[#191C20] hover:bg-[#F2F1ED]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="text-center pb-6 border-b border-[#F2F1ED]">
                <img
                  src={selectedEmployee.avatar}
                  alt={selectedEmployee.name}
                  className="w-20 h-20 rounded-3xl object-cover mx-auto ring-4 ring-[#EEF3FF] shadow-md mb-3"
                />
                <h3 className="text-lg font-black text-[#191C20]">{selectedEmployee.name}</h3>
                <p className="text-xs text-[#315BDB] font-bold">{selectedEmployee.role}</p>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#ECFDF5] text-[#10B981]">
                  {selectedEmployee.status}
                </span>
              </div>

              <div className="py-6 space-y-4 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-[#F2F1ED]">
                  <span className="text-[#858B93] font-medium">Department</span>
                  <span className="font-bold text-[#191C20]">{selectedEmployee.department}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#F2F1ED]">
                  <span className="text-[#858B93] font-medium">Email Address</span>
                  <span className="font-bold text-[#315BDB]">{selectedEmployee.email}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#F2F1ED]">
                  <span className="text-[#858B93] font-medium">Work Location</span>
                  <span className="font-bold text-[#191C20]">{selectedEmployee.location}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#F2F1ED]">
                  <span className="text-[#858B93] font-medium">Date Joined</span>
                  <span className="font-bold text-[#191C20]">{selectedEmployee.joinDate}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#F2F1ED]">
                  <span className="text-[#858B93] font-medium">Performance Rating</span>
                  <span className="font-black text-[#10B981]">{selectedEmployee.performanceScore}% (High)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                showToast(`Initiated direct check-in with ${selectedEmployee.name}.`, "info");
                setSelectedEmployee(null);
              }}
              className="w-full py-2.5 rounded-xl bg-[#315BDB] text-white text-xs font-bold hover:bg-[#244BB5] transition-colors"
            >
              Start 1-on-1 Communication
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
