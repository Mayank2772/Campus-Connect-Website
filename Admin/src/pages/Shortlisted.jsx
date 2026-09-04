import { useState } from "react";

const shortlistedStudents = [
  { id: 1, name: "Arjun Mehta", roll: "CSE/2025/042", branch: "CSE", cgpa: 8.9, company: "Google", role: "Software Engineer (SDE-1)", round: "Technical Interview", roundStatus: "Pending", appliedOn: "2025-07-15" },
  { id: 2, name: "Sneha Patel", roll: "CSE/2025/011", branch: "CSE", cgpa: 8.5, company: "Adobe", role: "Computer Scientist", round: "HR Interview", roundStatus: "Pending", appliedOn: "2025-07-25" },
  { id: 3, name: "Meera Iyer", roll: "CSE/2025/022", branch: "CSE", cgpa: 8.7, company: "Flipkart", role: "SDE-1", round: "Offer", roundStatus: "Completed", appliedOn: "2025-08-01" },
  { id: 4, name: "Vikram Nair", roll: "CSE/2025/064", branch: "CSE", cgpa: 9.1, company: "Google", role: "Software Engineer (SDE-1)", round: "Offer", roundStatus: "Completed", appliedOn: "2025-07-15" },
  { id: 5, name: "Pooja Reddy", roll: "CSE/2025/077", branch: "CSE", cgpa: 9.3, company: "Microsoft", role: "Software Development Engineer", round: "Offer", roundStatus: "Completed", appliedOn: "2025-07-18" },
  { id: 6, name: "Aditya Kumar", roll: "IT/2025/044", branch: "IT", cgpa: 7.3, company: "Deloitte", role: "Analyst", round: "Offer", roundStatus: "Completed", appliedOn: "2025-08-03" },
  { id: 7, name: "Rahul Joshi", roll: "CSE/2025/033", branch: "CSE", cgpa: 7.9, company: "Amazon", role: "SDE-1", round: "Online Test", roundStatus: "Pending", appliedOn: "2025-07-20" },
  { id: 8, name: "Priya Sharma", roll: "ECE/2025/017", branch: "ECE", cgpa: 8.2, company: "Microsoft", role: "Software Development Engineer", round: "Group Discussion", roundStatus: "Pending", appliedOn: "2025-07-18" },
];

const rounds = ["Online Test", "Group Discussion", "Technical Interview", "HR Interview", "Offer"];

const roundConfig = {
  "Online Test":       { color: "#4f7ef7", bg: "#dbeafe" },
  "Group Discussion":  { color: "#f59e0b", bg: "#fef3c7" },
  "Technical Interview":{ color: "#6c63ff", bg: "#ede9fe" },
  "HR Interview":      { color: "#ec4899", bg: "#fce7f3" },
  "Offer":             { color: "#10b981", bg: "#d1fae5" },
};

function Avatar({ name }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["#4f7ef7", "#6c63ff", "#10b981", "#f59e0b", "#ec4899", "#ef4444", "#14b8a6"];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div className="flex items-center justify-center rounded-full text-white text-xs font-bold flex-shrink-0"
      style={{ width: 34, height: 34, background: color }}>{initials}</div>
  );
}

function RoundProgress({ current }) {
  const idx = rounds.indexOf(current);
  return (
    <div className="flex items-center gap-0.5">
      {rounds.map((r, i) => (
        <div key={r} className="flex items-center gap-0.5">
          <div className="rounded-full" title={r}
            style={{ width: 10, height: 10, backgroundColor: i <= idx ? (roundConfig[r]?.color || "#4f7ef7") : "#e2e8f0" }} />
          {i < rounds.length - 1 && <div style={{ width: 12, height: 2, backgroundColor: i < idx ? "#4f7ef7" : "#e2e8f0" }} />}
        </div>
      ))}
    </div>
  );
}

export default function Shortlisted() {
  const [students, setStudents] = useState(shortlistedStudents);
  const [search, setSearch] = useState("");
  const [filterCompany, setFilterCompany] = useState("All");
  const [filterRound, setFilterRound] = useState("All");

  const companies = ["All", ...Array.from(new Set(shortlistedStudents.map(s => s.company)))];

  const updateRound = (id, round) => setStudents(prev => prev.map(s => s.id === id ? { ...s, round } : s));

  const filtered = students.filter(s => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.toLowerCase().includes(search.toLowerCase());
    const matchCompany = filterCompany === "All" || s.company === filterCompany;
    const matchRound = filterRound === "All" || s.round === filterRound;
    return matchSearch && matchCompany && matchRound;
  });

  const stats = [
    { label: "Total Shortlisted", value: students.length, color: "#4f7ef7" },
    { label: "Offers Given", value: students.filter(s => s.round === "Offer").length, color: "#10b981" },
    { label: "In Process", value: students.filter(s => s.round !== "Offer").length, color: "#f59e0b" },
    { label: "Companies", value: new Set(students.map(s => s.company)).size, color: "#6c63ff" },
  ];

  return (
    <div className="flex flex-col gap-5 p-6 overflow-y-auto h-full" style={{ backgroundColor: "#f0f4fb" }}>
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "#0f172a" }}>Shortlisted Students</h1>
        <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>Track students across selection rounds</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-sm font-medium" style={{ color: "#64748b" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Round Summary Cards */}
      <div className="grid grid-cols-5 gap-3">
        {rounds.map(r => {
          const count = students.filter(s => s.round === r).length;
          const cfg = roundConfig[r];
          return (
            <div key={r} className="bg-white rounded-2xl px-4 py-4 text-center" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div className="text-xl font-bold" style={{ color: cfg.color }}>{count}</div>
              <div className="text-xs font-medium mt-1" style={{ color: "#64748b" }}>{r}</div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl px-5 py-4 flex items-center gap-3 flex-wrap" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border flex-1" style={{ borderColor: "#e2e8f0" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student..." className="flex-1 text-sm outline-none bg-transparent" style={{ color: "#0f172a" }} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {companies.map(c => (
            <button key={c} onClick={() => setFilterCompany(c)}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ backgroundColor: filterCompany === c ? "#4f7ef7" : "#f1f5f9", color: filterCompany === c ? "#fff" : "#64748b" }}>
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", ...rounds].map(r => (
            <button key={r} onClick={() => setFilterRound(r)}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ backgroundColor: filterRound === r ? "#1a2340" : "#f1f5f9", color: filterRound === r ? "#fff" : "#64748b" }}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div className="px-5 py-3 border-b" style={{ borderColor: "#f1f5f9" }}>
          <span className="text-sm font-medium" style={{ color: "#64748b" }}>{filtered.length} students</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: "#f8fafc" }}>
                {["Student", "Roll No.", "Branch", "CGPA", "Company", "Role", "Progress", "Current Round", "Update Round"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "#64748b" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "#f1f5f9" }}>
              {filtered.map(s => {
                const cfg = roundConfig[s.round] || {};
                return (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={s.name} />
                        <span className="text-sm font-medium" style={{ color: "#0f172a" }}>{s.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: "#64748b" }}>{s.roll}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: "#334155" }}>{s.branch}</td>
                    <td className="px-4 py-3 text-sm font-semibold" style={{ color: "#0f172a" }}>{s.cgpa}</td>
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: "#0f172a" }}>{s.company}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: "#64748b" }}>{s.role}</td>
                    <td className="px-4 py-3"><RoundProgress current={s.round} /></td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                        {s.round}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select value={s.round} onChange={e => updateRound(s.id, e.target.value)}
                        className="text-xs rounded-lg px-2 py-1.5 border outline-none cursor-pointer" style={{ borderColor: "#e2e8f0", color: "#334155" }}>
                        {rounds.map(r => <option key={r}>{r}</option>)}
                      </select>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="px-4 py-16 text-center text-sm" style={{ color: "#94a3b8" }}>No students found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
