import { JSX, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import type { Page } from "../App";
import type { UserProfile } from "../types/user";

interface Props {
  onNav: (p: Page) => void;
  activePage: Page;
  user: UserProfile;
  onSave: (u: UserProfile) => void;
}

type Tab = "personal" | "academic" | "social" | "security";

const tabs: { id: Tab; label: string; icon: JSX.Element }[] = [
  {
    id: "personal",
    label: "Personal Info",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: "academic",
    label: "Academic",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    id: "social",
    label: "Links & Skills",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    id: "security",
    label: "Security",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

export default function SettingsPage({
  onNav,
  activePage,
  user,
  onSave,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const [draft, setDraft] = useState<UserProfile>({ ...user });
  const [saved, setSaved] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<{
    text: string;
    ok: boolean;
  } | null>(null);

  const set = (key: keyof UserProfile, value: string | boolean | string[]) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    onSave(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addSkill = () => {
    const s = newSkill.trim();
    if (s && !draft.skills.includes(s)) {
      set("skills", [...draft.skills, s]);
    }
    setNewSkill("");
  };

  const removeSkill = (s: string) =>
    set(
      "skills",
      draft.skills.filter((x) => x !== s),
    );

  const handlePasswordChange = () => {
    if (!oldPassword) {
      setPasswordMsg({ text: "Enter your current password.", ok: false });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordMsg({
        text: "New password must be at least 8 characters.",
        ok: false,
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ text: "Passwords do not match.", ok: false });
      return;
    }
    setPasswordMsg({ text: "Password updated successfully.", ok: true });
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const hasChanges = JSON.stringify(draft) !== JSON.stringify(user);

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "#f0f6ff" }}
    >
      <Sidebar activePage={activePage} onNav={onNav} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title="Settings" onNav={onNav} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            {/* Saved toast */}
            {saved && (
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl mb-5 text-sm font-medium"
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #86efac",
                  color: "#15803d",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Profile updated successfully! Changes are now reflected on your
                profile page.
              </div>
            )}

            {/* Tab bar */}
            <div
              className="flex gap-1 p-1 mb-6 rounded-xl"
              style={{ background: "white", border: "1px solid #e2e8f0" }}
            >
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: activeTab === t.id ? "#1d4ed8" : "transparent",
                    color: activeTab === t.id ? "white" : "#64748b",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {t.icon}
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div
              className="bg-white rounded-2xl p-6"
              style={{ border: "1px solid #e2e8f0" }}
            >
              {/* Personal Info */}
              {activeTab === "personal" && (
                <div>
                  <SectionHeader
                    title="Personal Information"
                    subtitle="Update your basic personal details."
                  />

                  {/* Avatar row */}
                  <div
                    className="flex items-center gap-4 mb-6 pb-6"
                    style={{ borderBottom: "1px solid #f1f5f9" }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #1d4ed8, #60a5fa)",
                      }}
                    >
                      {draft.firstName[0]}
                      {draft.lastName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {draft.firstName} {draft.lastName}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {draft.email}
                      </p>
                      <button className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                        Change Photo
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="First Name"
                      value={draft.firstName}
                      onChange={(v) => set("firstName", v)}
                    />
                    <Field
                      label="Last Name"
                      value={draft.lastName}
                      onChange={(v) => set("lastName", v)}
                    />
                    <Field
                      label="Email Address"
                      value={draft.email}
                      onChange={(v) => set("email", v)}
                      type="email"
                    />
                    <Field
                      label="Phone Number"
                      value={draft.phone}
                      onChange={(v) => set("phone", v)}
                    />
                    <Field
                      label="Date of Birth"
                      value={draft.dob}
                      onChange={(v) => set("dob", v)}
                      type="date"
                    />
                    <SelectField
                      label="Gender"
                      value={draft.gender}
                      onChange={(v) => set("gender", v)}
                      options={[
                        "Male",
                        "Female",
                        "Non-binary",
                        "Prefer not to say",
                      ]}
                    />
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Bio / About You
                      </label>
                      <textarea
                        rows={3}
                        value={draft.bio}
                        onChange={(e) => set("bio", e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none transition-all"
                        style={{
                          border: "1px solid #e2e8f0",
                          fontFamily: "var(--font-body)",
                          color: "#334155",
                          lineHeight: "1.6",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#2563eb")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Field
                        label="Address"
                        value={draft.address}
                        onChange={(v) => set("address", v)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Academic */}
              {activeTab === "academic" && (
                <div>
                  <SectionHeader
                    title="Academic Details"
                    subtitle="Keep your academic information up to date."
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="Roll Number"
                      value={draft.rollNumber}
                      onChange={(v) => set("rollNumber", v)}
                    />
                    <SelectField
                      label="Branch / Department"
                      value={draft.branch}
                      onChange={(v) => set("branch", v)}
                      options={[
                        "Computer Science & Engineering",
                        "Electronics & Communication",
                        "Information Technology",
                        "Electrical Engineering",
                        "Mechanical Engineering",
                        "Civil Engineering",
                      ]}
                    />
                    <SelectField
                      label="Current Semester"
                      value={draft.semester}
                      onChange={(v) => set("semester", v)}
                      options={[
                        "1st Semester",
                        "2nd Semester",
                        "3rd Semester",
                        "4th Semester",
                        "5th Semester",
                        "6th Semester",
                        "7th Semester",
                        "8th Semester",
                      ]}
                    />
                    <Field
                      label="Current CGPA"
                      value={draft.cgpa}
                      onChange={(v) => set("cgpa", v)}
                      placeholder="e.g. 8.4"
                    />
                    <Field
                      label="10th Percentage (%)"
                      value={draft.tenthPercent}
                      onChange={(v) => set("tenthPercent", v)}
                    />
                    <Field
                      label="12th Percentage (%)"
                      value={draft.twelfthPercent}
                      onChange={(v) => set("twelfthPercent", v)}
                    />
                  </div>

                  {/* Live preview */}
                  <div
                    className="mt-6 pt-5 rounded-xl p-4"
                    style={{
                      background: "#f8fafc",
                      border: "1px solid #f1f5f9",
                    }}
                  >
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                      How it appears on your profile
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        {
                          label: `CGPA: ${draft.cgpa}`,
                          color: "#2563eb",
                          bg: "#eff6ff",
                        },
                        {
                          label: `10th: ${draft.tenthPercent}%`,
                          color: "#0891b2",
                          bg: "#ecfeff",
                        },
                        {
                          label: `12th: ${draft.twelfthPercent}%`,
                          color: "#7c3aed",
                          bg: "#f5f3ff",
                        },
                        {
                          label: "No Active Backlog",
                          color: "#059669",
                          bg: "#ecfdf5",
                        },
                      ].map((t) => (
                        <span
                          key={t.label}
                          className="text-xs font-semibold px-3 py-1 rounded-full"
                          style={{ background: t.bg, color: t.color }}
                        >
                          {t.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Social / Skills */}
              {activeTab === "social" && (
                <div>
                  <SectionHeader
                    title="Links & Skills"
                    subtitle="Add your online profiles and technical skills."
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <Field
                      label="LinkedIn"
                      value={draft.linkedin}
                      onChange={(v) => set("linkedin", v)}
                      placeholder="linkedin.com/in/username"
                      icon="in"
                    />
                    <Field
                      label="GitHub"
                      value={draft.github}
                      onChange={(v) => set("github", v)}
                      placeholder="github.com/username"
                      icon="gh"
                    />
                    <div className="sm:col-span-2">
                      <Field
                        label="Portfolio / Website"
                        value={draft.portfolio}
                        onChange={(v) => set("portfolio", v)}
                        placeholder="yourwebsite.com (optional)"
                      />
                    </div>
                  </div>

                  {/* Skills editor */}
                  <div
                    className="pt-5"
                    style={{ borderTop: "1px solid #f1f5f9" }}
                  >
                    <label className="block text-xs font-semibold text-slate-600 mb-3">
                      Technical Skills
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {draft.skills.map((s) => (
                        <span
                          key={s}
                          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg"
                          style={{
                            background: "#eff6ff",
                            color: "#1d4ed8",
                            border: "1px solid #bfdbfe",
                          }}
                        >
                          {s}
                          <button
                            onClick={() => removeSkill(s)}
                            className="hover:text-red-500 transition-colors leading-none"
                          >
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                            >
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addSkill()}
                        placeholder="Type a skill and press Enter"
                        className="flex-1 h-9 px-3 rounded-xl text-sm outline-none transition-all"
                        style={{
                          border: "1px solid #e2e8f0",
                          fontFamily: "var(--font-body)",
                          color: "#334155",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#2563eb")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                      />
                      <button
                        onClick={addSkill}
                        className="px-4 h-9 rounded-xl text-xs font-semibold text-white"
                        style={{ background: "#1d4ed8" }}
                      >
                        Add
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1.5">
                      Press Enter or click Add. Click × on a skill to remove it.
                    </p>
                  </div>
                </div>
              )}

              {/* Security */}
              {activeTab === "security" && (
                <div>
                  <SectionHeader
                    title="Security"
                    subtitle="Manage your password and account security."
                  />

                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Enter current password"
                        className="w-full h-10 px-3 rounded-xl text-sm outline-none transition-all"
                        style={{
                          border: "1px solid #e2e8f0",
                          fontFamily: "var(--font-body)",
                          color: "#334155",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#2563eb")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="At least 8 characters"
                        className="w-full h-10 px-3 rounded-xl text-sm outline-none transition-all"
                        style={{
                          border: "1px solid #e2e8f0",
                          fontFamily: "var(--font-body)",
                          color: "#334155",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#2563eb")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                      />
                      {newPassword && (
                        <div className="flex gap-1 mt-1.5">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className="flex-1 h-1 rounded-full transition-all"
                              style={{
                                background:
                                  newPassword.length > i * 2 + 2
                                    ? newPassword.length >= 12
                                      ? "#10b981"
                                      : newPassword.length >= 8
                                        ? "#f59e0b"
                                        : "#ef4444"
                                    : "#e2e8f0",
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter new password"
                        className="w-full h-10 px-3 rounded-xl text-sm outline-none transition-all"
                        style={{
                          border: "1px solid #e2e8f0",
                          fontFamily: "var(--font-body)",
                          color: "#334155",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#2563eb")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                      />
                    </div>

                    {passwordMsg && (
                      <div
                        className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg"
                        style={{
                          background: passwordMsg.ok ? "#f0fdf4" : "#fef2f2",
                          color: passwordMsg.ok ? "#15803d" : "#dc2626",
                        }}
                      >
                        {passwordMsg.ok ? (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                        )}
                        {passwordMsg.text}
                      </div>
                    )}

                    <button
                      onClick={handlePasswordChange}
                      className="w-full h-10 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{
                        background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      Update Password
                    </button>
                  </div>

                  {/* Account info */}
                  <div
                    className="mt-8 pt-6"
                    style={{ borderTop: "1px solid #f1f5f9" }}
                  >
                    <p className="text-xs font-semibold text-slate-600 mb-3">
                      Account Information
                    </p>
                    <div className="space-y-2">
                      {[
                        { label: "Account Type", value: "Student" },
                        { label: "Institution", value: "NIT Raipur" },
                        { label: "Member Since", value: "August 2021" },
                        { label: "Last Login", value: "Today, 12:47 PM" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center justify-between py-2 text-xs"
                          style={{ borderBottom: "1px solid #f8fafc" }}
                        >
                          <span className="text-slate-500">{item.label}</span>
                          <span className="font-semibold text-slate-700">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Save bar — only for non-security tabs */}
            {activeTab !== "security" && (
              <div className="flex items-center justify-between mt-5 px-1">
                {hasChanges ? (
                  <p className="text-xs text-amber-600 flex items-center gap-1.5">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    You have unsaved changes
                  </p>
                ) : (
                  <p className="text-xs text-slate-400">All changes saved</p>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={() => setDraft({ ...user })}
                    disabled={!hasChanges}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background: "#f1f5f9",
                      color: "#475569",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    Discard
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!hasChanges}
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-5 pb-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
      <h3
        className="text-base font-bold text-slate-900"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h3>
      <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  icon?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
            {icon === "in" ? "Li" : "GH"}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-10 px-3 rounded-xl text-sm outline-none transition-all"
          style={{
            border: "1px solid #e2e8f0",
            fontFamily: "var(--font-body)",
            color: "#334155",
            paddingLeft: icon ? "44px" : undefined,
          }}
          onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
          onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 px-3 rounded-xl text-sm outline-none transition-all"
        style={{
          border: "1px solid #e2e8f0",
          fontFamily: "var(--font-body)",
          color: "#334155",
          background: "white",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
        onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
