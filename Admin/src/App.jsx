import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import PlacementDrives from "./pages/PlacementDrives";
import Applications from "./pages/Applications";
import Students from "./pages/Students";
import Shortlisted from "./pages/Shortlisted";
import Login from "./pages/Login";
import Resources from "./pages/Resources";

const pageTitles = {
  "/": "Dashboard",
  "/drives": "Placement Drives",
  "/applications": "Applications",
  "/students": "Students",
  "/shortlisted": "Shortlisted",
  "/resources": "Interview Prep Resources",
};

function AppLayout() {
  const location = useLocation();

  const pageTitle = pageTitles[location.pathname] || "Dashboard";

  return (
    <div
      className="flex h-full overflow-hidden"
      style={{
        backgroundColor: "#f0f4fb",
      }}
    >
      {/* Sidebar */}
      <Sidebar
        onLogout={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.reload();
        }}
      />

      {/* Main area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar pageTitle={pageTitle} />

        {/* Page content */}
        <main className="flex-1 overflow-hidden">
          <Routes>
            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* Placement Drives */}
            <Route path="/drives" element={<PlacementDrives />} />

            {/* Applications */}
            <Route path="/applications" element={<Applications />} />

            {/* Students */}
            <Route path="/students" element={<Students />} />

            {/* Shortlisted */}
            <Route path="/shortlisted" element={<Shortlisted />} />

            <Route path="/resources" element={<Resources />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) return false;

    try {
      return JSON.parse(storedUser).role === "admin";
    } catch {
      return false;
    }
  });

  if (!authenticated) {
    return <Login onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
