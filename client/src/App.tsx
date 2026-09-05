import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import DrivesPage from "./pages/DrivesPage";
import DriveDetailPage from "./pages/DriveDetailPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import ApplyPage from "./pages/ApplyPage";
import SettingsPage from "./pages/SettingsPage";
import { defaultUser, type UserProfile } from "./types/user";

export type Page =
  | "dashboard"
  | "profile"
  | "drives"
  | "applications"
  | "schedule"
  | "notifications"
  | "settings";

export interface ApplicationEntry {
  driveId: number;
  appliedAt: Date;
  status: "Applied" | "Shortlisted" | "Rejected" | "On Hold" | "Offer";
}

type View =
  | { screen: "list" }
  | { screen: "detail"; driveId: number }
  | { screen: "apply"; driveId: number };

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [driveView, setDriveView] = useState<View>({ screen: "list" });
  const [applications, setApplications] = useState<ApplicationEntry[]>([]);
  const [user, setUser] = useState<UserProfile>(defaultUser);

  const applyToDrive = (driveId: number) => {
    if (!applications.find((a) => a.driveId === driveId)) {
      setApplications((prev) => [
        ...prev,
        { driveId, appliedAt: new Date(), status: "Applied" },
      ]);
    }
  };

  const hasApplied = (driveId: number) =>
    applications.some((a) => a.driveId === driveId);

  const goToDrive = (driveId: number) => {
    setActivePage("drives");
    setDriveView({ screen: "detail", driveId });
  };

  const goToApply = (driveId: number) => {
    setActivePage("drives");
    setDriveView({ screen: "apply", driveId });
  };

  const handleNav = (p: Page) => {
    setActivePage(p);
    setDriveView({ screen: "list" });
  };

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />;

  if (activePage === "profile") {
    return (
      <ProfilePage onNav={handleNav} activePage={activePage} user={user} />
    );
  }

  if (activePage === "settings") {
    return (
      <SettingsPage
        onNav={handleNav}
        activePage={activePage}
        user={user}
        onSave={setUser}
      />
    );
  }

  if (activePage === "applications") {
    return (
      <ApplicationsPage
        onNav={handleNav}
        activePage={activePage}
        applications={applications}
        onSelectDrive={goToDrive}
      />
    );
  }

  if (activePage === "drives") {
    if (driveView.screen === "apply") {
      return (
        <ApplyPage
          driveId={driveView.driveId}
          onBack={() =>
            setDriveView({ screen: "detail", driveId: driveView.driveId })
          }
          onNav={handleNav}
          activePage={activePage}
          onApply={() => applyToDrive(driveView.driveId)}
        />
      );
    }

    if (driveView.screen === "detail") {
      return (
        <DriveDetailPage
          driveId={driveView.driveId}
          onBack={() => setDriveView({ screen: "list" })}
          onNav={handleNav}
          activePage={activePage}
          hasApplied={hasApplied(driveView.driveId)}
          onApply={() => goToApply(driveView.driveId)}
        />
      );
    }

    return (
      <DrivesPage
        onNav={handleNav}
        activePage={activePage}
        onSelectDrive={(id) => setDriveView({ screen: "detail", driveId: id })}
        hasApplied={hasApplied}
        onApply={goToApply}
      />
    );
  }

  return (
    <Dashboard
      onNav={handleNav}
      activePage={activePage}
      onSelectDrive={goToDrive}
      hasApplied={hasApplied}
      onApply={goToApply}
      applicationCount={applications.length}
    />
  );
}
