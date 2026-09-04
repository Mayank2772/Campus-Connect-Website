import { useState } from "react";

const navItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    key: "drives",
    label: "Placement Drives",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
    badge: 8,
  },
  {
    key: "applications",
    label: "Applications",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    key: "students",
    label: "Students",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    key: "shortlisted",
    label: "Shortlisted",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "#1a2340", width: 256, minWidth: 256 }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="flex items-center justify-center rounded-xl" style={{ width: 38, height: 38, background: "linear-gradient(135deg,#4f7ef7,#6c63ff)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div className="font-bold text-white text-sm leading-tight">CampusConnect</div>
          <div className="text-xs" style={{ color: "#8899bb" }}>Admin Portal</div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="text-xs font-semibold mb-3 px-3 tracking-widest uppercase" style={{ color: "#5a6a8a" }}>
          Main Menu
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const active = activePage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActivePage(item.key)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all duration-150"
                style={{
                  backgroundColor: active ? "#4f7ef7" : "transparent",
                  color: active ? "#ffffff" : "#8899bb",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = "rgba(79,126,247,0.12)"; e.currentTarget.style.color = active ? "#fff" : "#c4d0e8"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = active ? "#fff" : "#8899bb"; }}
              >
                <span style={{ opacity: active ? 1 : 0.75 }}>{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="text-xs font-semibold rounded-full px-2 py-0.5" style={{ backgroundColor: active ? "rgba(255,255,255,0.2)" : "#4f7ef7", color: "#fff" }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Admin user */}
      <div className="px-3 pb-4 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-center rounded-full text-xs font-bold text-white" style={{ width: 32, height: 32, background: "linear-gradient(135deg,#4f7ef7,#6c63ff)" }}>
            AD
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">Admin User</div>
            <div className="text-xs truncate" style={{ color: "#5a6a8a" }}>Placement Officer</div>
          </div>
          <button style={{ color: "#5a6a8a" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
