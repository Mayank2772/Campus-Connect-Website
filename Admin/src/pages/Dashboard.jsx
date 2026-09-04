import { useState } from "react";

const statCards = [
  { label: "Total Students", value: "1,284", change: "+24 this month", changePos: true, color: "#4f7ef7", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>) },
  { label: "Active Drives", value: "8", change: "3 closing this week", changePos: false, color: "#f59e0b", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>) },
  { label: "Total Applications", value: "3,542", change: "+187 this week", changePos: true, color: "#10b981", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>) },
  { label: "Offers Given", value: "312", change: "+18 this month", changePos: true, color: "#6c63ff", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>) },
  { label: "Shortlisted", value: "486", change: "Across 8 drives", changePos: true, color: "#ec4899", icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>) },
];

const recentDrives = [
  { company: "Google", role: "Software Engineer (SDE-1)", type: "Dream", ctc: "₹32 LPA", applied: 148, deadline: "Aug 5, 2025", status: "Closed" },
  { company: "Microsoft", role: "Software Development Engineer", type: "Dream", ctc: "₹28 LPA", applied: 132, deadline: "Aug 12, 2025", status: "Closed" },
  { company: "Amazon", role: "SDE-1", type: "Dream", ctc: "₹26 LPA", applied: 95, deadline: "Sep 10, 2025", status: "Active" },
  { company: "Infosys", role: "Systems Engineer", type: "Mass", ctc: "₹4.5 LPA", applied: 420, deadline: "Sep 18, 2025", status: "Active" },
  { company: "Wipro", role: "Project Engineer", type: "Mass", ctc: "₹3.5 LPA", applied: 380, deadline: "Sep 20, 2025", status: "Active" },
];

const recentApps = [
  { name: "Arjun Mehta", roll: "CSE/2025/042", company: "Google", status: "Shortlisted", statusColor: "#10b981" },
  { name: "Priya Sharma", roll: "ECE/2025/017", company: "Microsoft", status: "Applied", statusColor: "#4f7ef7" },
  { name: "Rohit Gupta", roll: "CSE/2025/088", company: "Amazon", status: "On Hold", statusColor: "#f59e0b" },
  { name: "Anjali Singh", roll: "IT/2025/031", company: "Infosys", status: "Rejected", statusColor: "#ef4444" },
  { name: "Vikram Nair", roll: "CSE/2025/064", company: "Google", status: "Offer", statusColor: "#6c63ff" },
];

const typeColor = {
  Dream: { bg: "#ede9fe", text: "#6c63ff" },
  Mass: { bg: "#fef3c7", text: "#d97706" },
  Super: { bg: "#dbeafe", text: "#4f7ef7" },
};

const statusDot = { Active: "#10b981", Closed: "#94a3b8" };

function Avatar({ name, size = 34 }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["#4f7ef7", "#6c63ff", "#10b981", "#f59e0b", "#ec4899", "#ef4444"];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div className="flex items-center justify-center rounded-full text-white text-xs font-bold flex-shrink-0"
      style={{ width: size, height: size, background: color }}>
      {initials}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 p-6 overflow-y-auto h-full" style={{ backgroundColor: "#f0f4fb" }}>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "#0f172a" }}>Dashboard</h1>
        <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-5 gap-4" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
        {statCards.map((s) => (
          <div key={s.label} className="rounded-2xl bg-white p-4 flex flex-col gap-3" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between">
              <div className="rounded-xl flex items-center justify-center" style={{ width: 42, height: 42, backgroundColor: s.color + "18" }}>
                <span style={{ color: s.color }}>{s.icon}</span>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: "#0f172a" }}>{s.value}</div>
              <div className="text-xs font-medium mt-0.5" style={{ color: "#64748b" }}>{s.label}</div>
            </div>
            <div className="text-xs font-medium" style={{ color: s.changePos ? "#10b981" : "#f59e0b" }}>
              {s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Recent Drives */}
        <div className="rounded-2xl bg-white" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#f1f5f9" }}>
            <div className="font-semibold text-sm" style={{ color: "#0f172a" }}>Recent Placement Drives</div>
            <button className="text-xs font-medium" style={{ color: "#4f7ef7" }}>View All →</button>
          </div>
          <div className="divide-y" style={{ borderColor: "#f1f5f9" }}>
            {recentDrives.map((d) => (
              <div key={d.company + d.role} className="flex items-center gap-3 px-5 py-3">
                <Avatar name={d.company} size={34} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate" style={{ color: "#0f172a" }}>{d.company}</div>
                  <div className="text-xs truncate" style={{ color: "#64748b" }}>{d.role}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold" style={{ color: "#0f172a" }}>{d.ctc}</div>
                  <div className="text-xs" style={{ color: "#94a3b8" }}>{d.applied} applied</div>
                </div>
                <div className="flex items-center gap-1.5 ml-2">
                  <div className="rounded-full" style={{ width: 7, height: 7, backgroundColor: statusDot[d.status] }} />
                  <span className="text-xs" style={{ color: "#64748b" }}>{d.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="rounded-2xl bg-white" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#f1f5f9" }}>
            <div className="font-semibold text-sm" style={{ color: "#0f172a" }}>Recent Applications</div>
            <button className="text-xs font-medium" style={{ color: "#4f7ef7" }}>View All →</button>
          </div>
          <div className="divide-y" style={{ borderColor: "#f1f5f9" }}>
            {recentApps.map((a) => (
              <div key={a.name} className="flex items-center gap-3 px-5 py-3">
                <Avatar name={a.name} size={34} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate" style={{ color: "#0f172a" }}>{a.name}</div>
                  <div className="text-xs truncate" style={{ color: "#64748b" }}>{a.roll}</div>
                </div>
                <div className="text-xs font-medium" style={{ color: "#64748b" }}>{a.company}</div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full ml-2" style={{ backgroundColor: a.statusColor + "18", color: a.statusColor }}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="rounded-2xl bg-white p-5" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div className="font-semibold text-sm mb-4" style={{ color: "#0f172a" }}>Placement Overview — Batch 2025</div>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Placement Rate", value: "78%", sub: "1,001 / 1,284 students", bar: 78, color: "#4f7ef7" },
            { label: "Avg. Package", value: "₹8.4 LPA", sub: "Up from ₹7.2 LPA last year", bar: 68, color: "#10b981" },
            { label: "Highest Package", value: "₹42 LPA", sub: "Google — SDE-2", bar: 90, color: "#6c63ff" },
            { label: "Companies Visited", value: "34", sub: "12 more expected this semester", bar: 60, color: "#f59e0b" },
          ].map((s) => (
            <div key={s.label}>
              <div className="flex items-end justify-between mb-1.5">
                <span className="text-xs" style={{ color: "#64748b" }}>{s.label}</span>
                <span className="text-sm font-bold" style={{ color: "#0f172a" }}>{s.value}</span>
              </div>
              <div className="rounded-full h-2 w-full" style={{ backgroundColor: "#f1f5f9" }}>
                <div className="rounded-full h-2 transition-all" style={{ width: `${s.bar}%`, backgroundColor: s.color }} />
              </div>
              <div className="text-xs mt-1.5" style={{ color: "#94a3b8" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
