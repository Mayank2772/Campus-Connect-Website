import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import DrivesPage from "./pages/DrivesPage";
import DriveDetailPage from "./pages/DriveDetailPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import ApplyPage from "./pages/ApplyPage";
import SettingsPage from "./pages/SettingsPage";

import Sidebar from "./components/Sidebar";

import { defaultUser } from "./data/data";
import Topbar from "./components/Topbar";

function AppLayout({ user, applications, setUser, applyToDrive, hasApplied }) {
  const navigate = useNavigate();

  const goToDrive = (driveId) => {
    navigate(`/drives/${driveId}`);
  };

  const goToApply = (driveId) => {
    navigate(`/drives/${driveId}/apply`);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Routes>
          {/* Dashboard */}
          <Route
            path="/"
            element={
              <Dashboard
                onSelectDrive={goToDrive}
                hasApplied={hasApplied}
                onApply={goToApply}
                applicationCount={applications.length}
              />
            }
          />

          {/* Profile */}
          <Route path="/profile" element={<ProfilePage user={user} />} />

          {/* Placement drives */}
          <Route
            path="/drives"
            element={
              <DrivesPage
                onSelectDrive={goToDrive}
                hasApplied={hasApplied}
                onApply={goToApply}
              />
            }
          />

          {/* Drive details */}
          <Route
            path="/drives/:driveId"
            element={
              <DriveDetailPage hasApplied={hasApplied} onApply={goToApply} />
            }
          />

          {/* Apply to drive */}
          <Route
            path="/drives/:driveId/apply"
            element={<ApplyPage onApply={applyToDrive} />}
          />

          {/* Applications */}
          <Route
            path="/applications"
            element={
              <ApplicationsPage
                applications={applications}
                onSelectDrive={goToDrive}
              />
            }
          />

          {/* Settings */}
          <Route
            path="/settings"
            element={<SettingsPage user={user} onSave={setUser} />}
          />

          {/* Unknown route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function AuthenticatedApp() {
  const [applications, setApplications] = useState([]);
  const [user, setUser] = useState(defaultUser);

  const applyToDrive = (driveId) => {
    setApplications((prev) => {
      const alreadyApplied = prev.some(
        (application) => application.driveId === driveId,
      );

      if (alreadyApplied) {
        return prev;
      }

      return [
        ...prev,
        {
          driveId,
          appliedAt: new Date(),
          status: "Applied",
        },
      ];
    });
  };

  const hasApplied = (driveId) => {
    return applications.some((application) => application.driveId === driveId);
  };

  return (
    <AppLayout
      user={user}
      applications={applications}
      setUser={setUser}
      applyToDrive={applyToDrive}
      hasApplied={hasApplied}
    />
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <BrowserRouter>
      <AuthenticatedApp />
    </BrowserRouter>
  );
}
