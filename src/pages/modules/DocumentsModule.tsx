import React, { useState } from "react";
import {
  FileText,
  Upload,
  Download,
  ShieldCheck,
  Search,
  Plus,
  CheckCircle2,
  Lock,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const DocumentsModule: React.FC = () => {
  const { showToast } = useAuth();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const [docs, setDocs] = useState([
    { id: "DOC-101", title: "Employment Contract & Offer Letter", category: "Legal / HR", date: "Jan 2023", size: "2.4 MB", verified: true },
    { id: "DOC-102", title: "Non-Disclosure Agreement (NDA)", category: "Security", date: "Jan 2023", size: "1.1 MB", verified: true },
    { id: "DOC-103", title: "PAN Card & Government National ID", category: "Identification", date: "Jan 2023", size: "850 KB", verified: true },
    { id: "DOC-104", title: "Form 16 Annual Tax Certificate (FY 2025-26)", category: "Tax / Finance", date: "Jun 2026", size: "3.8 MB", verified: true },
    { id: "DOC-105", title: "Inveon Technologies Company Code of Conduct", category: "Company Policy", date: "Oct 2026", size: "4.2 MB", verified: true },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Identification");

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newDoc = {
      id: `DOC-10${docs.length + 1}`,
      title: newTitle,
      category: newCategory,
      date: "09 Nov 2026 (Today)",
      size: "1.5 MB",
      verified: true,
    };

    setDocs([newDoc, ...docs]);
    showToast(`Document "${newTitle}" uploaded to Digital Vault.`, "success");
    setUploadModalOpen(false);
    setNewTitle("");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#E3E8EE] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-extrabold tracking-widest text-[#858B93] uppercase">
              DOCUMENT VAULT OS
            </span>
            <div className="h-[1px] w-12 bg-[#858B93]/40" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#191C20] tracking-tight">
            Digital Document Vault & Policies
          </h1>
          <p className="text-xs lg:text-sm text-[#858B93] font-medium mt-1">
            Secure 256-bit encrypted storage for employment letters, tax forms and e-signed NDAs.
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#315BDB] hover:bg-[#244BB5] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
        >
          <Upload size={15} />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-3xl p-6 border border-[#E3E8EE] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F2F1ED]">
          <h3 className="text-base font-extrabold text-[#191C20]">Stored Documents ({docs.length})</h3>
          <span className="text-xs font-bold text-[#10B981] flex items-center gap-1.5">
            <ShieldCheck size={14} />
            <span>Encrypted & Verified</span>
          </span>
        </div>

        <div className="space-y-3">
          {docs.map((d) => (
            <div
              key={d.id}
              className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#EBEBEB] hover:border-[#315BDB] hover:bg-white transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#EEF3FF] text-[#315BDB] flex items-center justify-center font-bold shrink-0">
                  <FileText size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#191C20] group-hover:text-[#315BDB] transition-colors">
                    {d.title}
                  </h4>
                  <p className="text-[11px] text-[#858B93]">
                    {d.category} • Uploaded {d.date} • {d.size}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast(`Downloaded "${d.title}".`, "success")}
                  className="p-2 rounded-xl bg-[#F2F1ED] hover:bg-[#EEF3FF] hover:text-[#315BDB] text-[#858B93] transition-colors"
                  title="Download File"
                >
                  <Download size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D8D9D6]">
            <div className="flex items-center justify-between pb-4 border-b border-[#F2F1ED] mb-4">
              <h3 className="text-base font-extrabold text-[#191C20]">Upload to Vault</h3>
              <button onClick={() => setUploadModalOpen(false)} className="p-1 rounded-xl text-[#858B93]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Relieving Certificate"
                  className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#191C20] mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAFAFA] rounded-xl border border-[#D8D9D6] text-xs font-medium"
                >
                  <option value="Identification">Identification (PAN / Aadhaar)</option>
                  <option value="Legal / HR">Legal / HR Contracts</option>
                  <option value="Tax / Finance">Tax Documents (Form 16)</option>
                  <option value="Certificates">Certificates & Credentials</option>
                </select>
              </div>

              <div className="p-4 border-2 border-dashed border-[#D8D9D6] rounded-2xl text-center text-xs text-[#858B93]">
                <Upload size={20} className="mx-auto mb-1 text-[#315BDB]" />
                <span>Drag & drop PDF / JPG or click to browse</span>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F2F1ED] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#315BDB] text-xs font-bold text-white shadow-xs cursor-pointer"
                >
                  Upload File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
