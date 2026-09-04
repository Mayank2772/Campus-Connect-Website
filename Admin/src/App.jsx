import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import PlacementDrives from "./pages/PlacementDrives";
import Applications from "./pages/Applications";
import Students from "./pages/Students";
import Shortlisted from "./pages/Shortlisted";

const pageTitles = {
  dashboard: "Dashboard",
  drives: "Placement Drives",
  applications: "Applications",
  students: "Students",
  shortlisted: "Shortlisted",
};

const pages = {
  dashboard: Dashboard,
  drives: PlacementDrives,
  applications: Applications,
  students: Students,
  shortlisted: Shortlisted,
};

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const PageComponent = pages[activePage] || Dashboard;

  return (
    <div className="flex h-full overflow-hidden" style={{ backgroundColor: "#f0f4fb" }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-3.5 bg-white border-b flex-shrink-0" style={{ borderColor: "#e8edf5" }}>
          <h2 className="font-semibold text-base" style={{ color: "#0f172a" }}>{pageTitles[activePage]}</h2>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex items-center gap-2 rounded-xl px-3.5 py-2 border" style={{ borderColor: "#e2e8f0", backgroundColor: "#f8fafc" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input placeholder="Search companies, roles..." className="text-sm outline-none bg-transparent" style={{ color: "#0f172a", width: 180 }} />
            </div>
            {/* Bell */}
            <button className="relative rounded-xl p-2 hover:bg-gray-100 transition-colors" style={{ color: "#64748b" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span className="absolute top-1.5 right-1.5 rounded-full" style={{ width: 7, height: 7, backgroundColor: "#ef4444" }} />
            </button>
            {/* Avatar */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="flex items-center justify-center rounded-full text-white text-xs font-bold" style={{ width: 34, height: 34, background: "linear-gradient(135deg,#4f7ef7,#6c63ff)" }}>
                AD
              </div>
              <div className="text-sm">
                <div className="font-semibold" style={{ color: "#0f172a" }}>Admin User</div>
                <div className="text-xs" style={{ color: "#94a3b8" }}>Placement Officer</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-hidden">
          <PageComponent />
        </main>
      </div>
    </div>
  );
}
