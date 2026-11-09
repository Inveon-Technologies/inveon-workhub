import React, { useState } from "react";
import {
  DollarSign,
  Download,
  FileText,
  Calculator,
  Plus,
  X,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const PayrollModule: React.FC = () => {
  const { user, showToast } = useAuth();
  const [activeTab, setActiveTab] = useState<"slip" | "tax" | "claims">("slip");
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [payslipModalOpen, setPayslipModalOpen] = useState(false);

  const earnings = [
    { component: "Basic Salary", amount: 65000 },
    { component: "House Rent Allowance (HRA)", amount: 32500 },
    { component: "Special Allowance", amount: 37500 },
    { component: "Statutory Performance Bonus", amount: 10000 },
  ];

  const deductions = [
    { component: "Employee Provident Fund (EPF)", amount: 7800 },
    { component: "Professional Tax (PT)", amount: 200 },
    { component: "Tax Deducted at Source (TDS / IT)", amount: 8550 },
  ];

  const totalEarnings = earnings.reduce((sum, item) => sum + item.amount, 0);
  const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);
  const netPay = totalEarnings - totalDeductions;

  const [claims, setClaims] = useState([
    { id: "EXP-890", title: "Broadband & Fiber Internet Allowance", amount: 1500, date: "02 Nov 2026", status: "Approved" },
    { id: "EXP-891", title: "Client Dinner & Offsite Meeting Travel", amount: 3450, date: "05 Nov 2026", status: "Under Review" },
  ]);

  // New claim form state
  const [claimTitle, setClaimTitle] = useState("");
  const [claimAmount, setClaimAmount] = useState("");

  const handleAddClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimTitle || !claimAmount) return;

    const newClaim = {
      id: `EXP-${claims.length + 892}`,
      title: claimTitle,
      amount: parseInt(claimAmount),
      date: "09 Nov 2026 (Today)",
      status: "Submitted",
    };

    setClaims([newClaim, ...claims]);
    showToast(`Reimbursement claim (${claimTitle}) submitted to Finance.`, "success");
    setClaimModalOpen(false);
    setClaimTitle("");
    setClaimAmount("");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#E3E8EE] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-extrabold tracking-widest text-[#858B93] uppercase">
              PAYROLL & STATUTORY OS
            </span>
            <div className="h-[1px] w-12 bg-[#858B93]/40" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#191C20] tracking-tight">
            Compensation, Slips & Tax Vault
          </h1>
          <p className="text-xs lg:text-sm text-[#858B93] font-medium mt-1">
            View salary structures, download verified Form 16 payslips and declare 80C tax investments.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setClaimModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#F2F1ED] hover:bg-[#EEF3FF] hover:text-[#315BDB] text-[#191C20] text-xs font-bold flex items-center gap-2 transition-colors border border-[#E2E0D8] cursor-pointer"
          >
            <Plus size={15} />
            <span>Submit Claim</span>
          </button>
          <button
            onClick={() => setPayslipModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <Download size={15} />
            <span>View & Download Payslip</span>
          </button>
        </div>
      </div>

      {/* Salary Overview Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs">
          <span className="text-xs font-bold text-[#858B93] block mb-1">Gross Salary (October 2026)</span>
          <h2 className="text-3xl font-black text-[#191C20]">₹{totalEarnings.toLocaleString()}</h2>
          <span className="text-[11px] text-[#858B93] block mt-1">Fixed Monthly Compensation</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs">
          <span className="text-xs font-bold text-[#858B93] block mb-1">Total Deductions (EPF + TDS)</span>
          <h2 className="text-3xl font-black text-[#EF4444]">₹{totalDeductions.toLocaleString()}</h2>
          <span className="text-[11px] text-[#858B93] block mt-1">Statutory PF & Income Tax</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs bg-gradient-to-br from-white via-white to-[#EEF3FF]">
          <span className="text-xs font-bold text-[#315BDB] block mb-1">Net Take-Home Pay (Disbursed)</span>
          <h2 className="text-3xl font-black text-[#10B981]">₹{netPay.toLocaleString()}</h2>
          <span className="text-[11px] text-[#10B981] font-bold block mt-1">Deposited to HDFC Bank ****4820</span>
        </div>
      </div>

      {/* Tabs & Content */}
      <div className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#F2F1ED]">
          <div className="flex items-center bg-[#F2F1ED] p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveTab("slip")}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === "slip" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
              }`}
            >
              Salary Breakdown
            </button>
            <button
              onClick={() => setActiveTab("claims")}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === "claims" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
              }`}
            >
              Expense Claims ({claims.length})
            </button>
            <button
              onClick={() => setActiveTab("tax")}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === "tax" ? "bg-white text-[#191C20] shadow-xs" : "text-[#858B93]"
              }`}
            >
              80C / 80D Tax Declarations
            </button>
          </div>
        </div>

        {/* Salary Breakdown Tab */}
        {activeTab === "slip" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Earnings */}
            <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] space-y-3">
              <h3 className="text-xs font-black text-[#191C20] uppercase tracking-wider pb-2 border-b border-[#EBEBEB]">
                Earnings & Allowances
              </h3>
              {earnings.map((e, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1">
                  <span className="font-semibold text-[#475569]">{e.component}</span>
                  <span className="font-black text-[#191C20]">₹{e.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-[#EBEBEB] flex items-center justify-between text-xs font-black">
                <span>Total Gross Earnings</span>
                <span className="text-[#315BDB]">₹{totalEarnings.toLocaleString()}</span>
              </div>
            </div>

            {/* Deductions */}
            <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] space-y-3">
              <h3 className="text-xs font-black text-[#191C20] uppercase tracking-wider pb-2 border-b border-[#EBEBEB]">
                Deductions & Retentions
              </h3>
              {deductions.map((d, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1">
                  <span className="font-semibold text-[#475569]">{d.component}</span>
                  <span className="font-black text-[#EF4444]">₹{d.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-[#EBEBEB] flex items-center justify-between text-xs font-black">
                <span>Total Deductions</span>
                <span className="text-[#EF4444]">₹{totalDeductions.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Expense Claims Tab */}
        {activeTab === "claims" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F2F1ED] text-[#858B93] font-bold">
                  <th className="pb-3 pl-2">Claim ID</th>
                  <th className="pb-3">Title / Expense Item</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 pr-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F1ED]">
                {claims.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-3.5 pl-2 font-mono font-bold text-[#858B93]">{c.id}</td>
                    <td className="py-3.5 font-bold text-[#191C20]">{c.title}</td>
                    <td className="py-3.5 font-black text-[#191C20]">₹{c.amount.toLocaleString()}</td>
                    <td className="py-3.5 text-[#858B93]">{c.date}</td>
                    <td className="py-3.5 pr-2 text-right">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        c.status === "Approved" ? "bg-[#ECFDF5] text-[#10B981]" : "bg-[#FFFBEB] text-[#F59E0B]"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tax Declarations Tab */}
        {activeTab === "tax" && (
          <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-black text-[#191C20]">Section 80C Tax Investment Limits (FY 2026-27)</h4>
                <p className="text-[#858B93]">EPF, ELSS, Life Insurance, PPF (Max Exemption: ₹1,50,000)</p>
              </div>
              <span className="text-sm font-black text-[#10B981]">₹1,50,000 Declared (Max Cap Reached)</span>
            </div>
            <div className="w-full h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div className="bg-[#10B981] h-full rounded-full" style={{ width: "100%" }} />
            </div>
            <div className="pt-2 text-[#858B93] flex items-center justify-between">
              <span>Section 80D Mediclaim: ₹25,000 Verified</span>
              <span>Regime: New Tax Regime (Section 115BAC)</span>
            </div>
          </div>
        )}
      </div>

      {/* Payslip Modal (Formatted Printable PDF preview) */}
      {payslipModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-8 shadow-2xl border border-[#D8D9D6] max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#F2F1ED]">
              <div>
                <h3 className="text-lg font-black text-[#191C20]">INVEON TECHNOLOGIES PVT LTD</h3>
                <p className="text-xs text-[#858B93]">Salary Slip for the month of October 2026</p>
              </div>
              <button onClick={() => setPayslipModalOpen(false)} className="p-1 rounded-xl text-[#858B93] hover:text-[#191C20]">
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB]">
              <div>
                <p>Employee Name: <strong className="text-[#191C20]">{user.name}</strong></p>
                <p>Employee ID: <strong className="font-mono text-[#191C20]">{user.employeeId}</strong></p>
                <p>Designation: <strong className="text-[#191C20]">{user.designation}</strong></p>
              </div>
              <div>
                <p>Bank: <strong className="text-[#191C20]">HDFC Bank Ltd</strong></p>
                <p>Account No: <strong className="font-mono text-[#191C20]">**** **** 4820</strong></p>
                <p>PAN: <strong className="font-mono text-[#191C20]">ABCDE1234F</strong></p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <h4 className="font-bold text-[#191C20] mb-2">Earnings</h4>
                {earnings.map((e, i) => (
                  <div key={i} className="flex justify-between py-1 border-b border-[#F2F1ED]">
                    <span>{e.component}</span>
                    <span className="font-bold">₹{e.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="font-bold text-[#191C20] mb-2">Deductions</h4>
                {deductions.map((d, i) => (
                  <div key={i} className="flex justify-between py-1 border-b border-[#F2F1ED]">
                    <span>{d.component}</span>
                    <span className="font-bold text-[#EF4444]">₹{d.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-between text-sm font-black text-[#10B981]">
              <span>Net Take-Home Pay</span>
              <span>₹{netPay.toLocaleString()}</span>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#F2F1ED]">
              <button
                onClick={() => setPayslipModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#F2F1ED] text-xs font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  showToast("Downloading verified PDF payslip...", "success");
                  setPayslipModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Download size={14} />
                <span>Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Claim Modal */}
      {claimModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D8D9D6]">
            <div className="flex items-center justify-between pb-4 border-b border-[#F2F1ED] mb-4">
              <h3 className="text-base font-extrabold text-[#191C20]">Submit Expense Claim</h3>
              <button onClick={() => setClaimModalOpen(false)} className="p-1 rounded-xl text-[#858B93] hover:text-[#191C20]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddClaim} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-1">Expense Description</label>
                <input
                  type="text"
                  required
                  value={claimTitle}
                  onChange={(e) => setClaimTitle(e.target.value)}
                  placeholder="e.g. Travel cab allowance for client demo"
                  className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-1">Claim Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(e.target.value)}
                  placeholder="e.g. 1500"
                  className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setClaimModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F2F1ED] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#315BDB] text-xs font-bold text-white shadow-xs cursor-pointer"
                >
                  Submit Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
