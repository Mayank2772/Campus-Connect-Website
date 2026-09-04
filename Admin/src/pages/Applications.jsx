import { useState } from "react";

const initialApps = [
  { id: 1, name: "Arjun Mehta", roll: "CSE/2025/042", branch: "CSE", cgpa: 8.9, company: "Google", role: "Software Engineer (SDE-1)", appliedOn: "2025-07-15", status: "Shortlisted" },
  { id: 2, name: "Priya Sharma", roll: "ECE/2025/017", branch: "ECE", cgpa: 8.2, company: "Microsoft", role: "Software Development Engineer", appliedOn: "2025-07-18", status: "Applied" },
  { id: 3, name: "Rohit Gupta", roll: "CSE/2025/088", branch: "CSE", cgpa: 7.6, company: "Amazon", role: "SDE-1", appliedOn: "2025-07-20", status: "On Hold" },
  { id: 4, name: "Anjali Singh", roll: "IT/2025/031", branch: "IT", cgpa: 7.1, company: "Infosys", role: "Systems Engineer", appliedOn: "2025-07-22", status: "Rejected" },
  { id: 5, name: "Vikram Nair", roll: "CSE/2025/064", branch: "CSE", cgpa: 9.1, company: "Google", role: "Software Engineer (SDE-1)", appliedOn: "2025-07-15", status: "Offer" },
  { id: 6, name: "Sneha Patel", roll: "CSE/2025/011", branch: "CSE", cgpa: 8.5, company: "Adobe", role: "Computer Scientist", appliedOn: "2025-07-25", status: "Shortlisted" },
  { id: 7, name: "Karan Verma", roll: "ECE/2025/055", branch: "ECE", cgpa: 7.8, company: "Wipro", role: "Project Engineer", appliedOn: "2025-07-28", status: "Applied" },
  { id: 8, name: "Meera Iyer", roll: "CSE/2025/022", branch: "CSE", cgpa: 8.7, company: "Flipkart", role: "SDE-1", appliedOn: "2025-08-01", status: "Shortlisted" },
  { id: 9, name: "Aditya Kumar", roll: "IT/2025/044", branch: "IT", cgpa: 7.3, company: "Deloitte", role: "Analyst", appliedOn: "2025-08-03", status: "Offer" },
  { id: 10, name: "Pooja Reddy", roll: "CSE/2025/077", branch: "CSE", cgpa: 9.3, company: "Microsoft", role: "Software Development Engineer", appliedOn: "2025-07-18", status: "Offer" },
  { id: 11, name: "Rahul Joshi", roll: "CSE/2025/033", branch: "CSE", cgpa: 7.9, company: "Amazon", role: "SDE-1", appliedOn: "2025-07-20", status: "Applied" },
  { id: 12, name: "Divya Nair", roll: "EEE/2025/009", branch: "EEE", cgpa: 7.0, company: "Infosys", role: "Systems Engineer", appliedOn: "2025-07-22", status: "Rejected" },
];

const statusConfig = {
  Applied:     { bg: "#dbeafe", text: "#2563eb" },
  Shortlisted: { bg: "#d1fae5", text: "#059669" },
  "On Hold":   { bg: "#fef3c7", text: "#d97706" },
  Rejected:    { bg: "#fee2e2", text: "#dc2626" },
  Offer:       { bg: "#ede9fe", text: "#6c63ff" },
};

const tabs = ["All", "Applied", "Shortlisted", "On Hold", "Rejected", "Offer"];

function Avatar({ name }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["#4f7ef7", "#6c63ff", "#10b981", "#f59e0b", "#ec4899", "#ef4444", "#14b8a6"];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div className="flex items-center justify-center rounded-full text-white text-xs font-bold flex-shrink-0"
      style={{ width: 34, height: 34, background: color }}>{initials}</div>
  );
}

export default function Applications() {
  const [apps, setApps] = useState(initialApps);
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = apps.filter(a => {
    const matchTab = tab === "All" || a.status === tab;
    const matchSearch = !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.company.toLowerCase().includes(search.toLowerCase()) ||
      a.roll.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const updateStatus = (id, status) => setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a));

  const counts = tabs.reduce((acc, t) => {
    acc[t] = t === "All" ? apps.length : apps.filter(a => a.status === t).length;
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-5 p-6 overflow-y-auto h-full" style={{ backgroundColor: "#f0f4fb" }}>
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "#0f172a" }}>Applications</h1>
        <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>Review and manage all student applications</p>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-5 gap-3">
        {["Applied", "Shortlisted", "On Hold", "Rejected", "Offer"].map(s => (
          <div key={s} className="bg-white rounded-2xl px-4 py-4 text-center" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div className="text-2xl font-bold" style={{ color: (statusConfig[s] || {}).text || "#0f172a" }}>{counts[s] || 0}</div>
            <div className="text-xs font-medium mt-0.5" style={{ color: "#64748b" }}>{s}</div>
          </div>
        ))}
      </div>

      {/* Tabs + Search */}
      <div className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4 flex-wrap" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div className="flex gap-2 flex-wrap flex-1">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ backgroundColor: tab === t ? "#4f7ef7" : "#f1f5f9", color: tab === t ? "#fff" : "#64748b" }}>
              {t}
              <span className="rounded-full px-1.5 py-0.5 text-xs" style={{ backgroundColor: tab === t ? "rgba(255,255,255,0.2)" : "#e2e8f0", color: tab === t ? "#fff" : "#94a3b8" }}>
                {counts[t]}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border" style={{ borderColor: "#e2e8f0" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student, company..."
            className="text-sm outline-none bg-transparent" style={{ color: "#0f172a", width: 180 }} />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div className="px-5 py-3 border-b" style={{ borderColor: "#f1f5f9" }}>
          <span className="text-sm font-medium" style={{ color: "#64748b" }}>{filtered.length} applications</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: "#f8fafc" }}>
                {["Student", "Roll No.", "Branch", "CGPA", "Company", "Role", "Applied On", "Status", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "#64748b" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "#f1f5f9" }}>
              {filtered.map(a => (
                <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={a.name} />
                      <span className="text-sm font-medium" style={{ color: "#0f172a" }}>{a.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#64748b" }}>{a.roll}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#334155" }}>{a.branch}</td>
                  <td className="px-4 py-3 text-sm font-medium" style={{ color: "#334155" }}>{a.cgpa}</td>
                  <td className="px-4 py-3 text-sm font-medium" style={{ color: "#0f172a" }}>{a.company}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#64748b" }}>{a.role}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#94a3b8" }}>{a.appliedOn}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: (statusConfig[a.status] || {}).bg, color: (statusConfig[a.status] || {}).text }}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select value={a.status} onChange={e => updateStatus(a.id, e.target.value)}
                      className="text-xs rounded-lg px-2 py-1.5 border outline-none cursor-pointer" style={{ borderColor: "#e2e8f0", color: "#334155" }}>
                      {["Applied", "Shortlisted", "On Hold", "Rejected", "Offer"].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="px-4 py-16 text-center text-sm" style={{ color: "#94a3b8" }}>No applications found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
