import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import type { Page } from "../App";
import type { UserProfile } from "../types/user";

interface Props {
  onNav: (p: Page) => void;
  activePage: Page;
  user: UserProfile;
}

const certs = [
  {
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Jan 2025",
  },
  {
    name: "Full Stack Development",
    issuer: "Coursera (Meta)",
    date: "Nov 2024",
  },
];

export default function ProfilePage({ onNav, activePage, user }: Props) {
  const [resumeUploaded, setResumeUploaded] = useState(user.resumeUploaded);

  const initials = `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`;

  const completionItems = [
    {
      label: "Basic Info",
      done: !!(user.firstName && user.lastName && user.phone),
    },
    { label: "Academic Details", done: !!(user.cgpa && user.branch) },
    { label: "Skills", done: user.skills.length > 0 },
    { label: "Projects", done: true },
    { label: "Resume Upload", done: resumeUploaded },
    { label: "Profile Photo", done: false },
    { label: "Certifications", done: true },
  ];
  const doneCount = completionItems.filter((c) => c.done).length;
  const pct = Math.round((doneCount / completionItems.length) * 100);

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "#f0f6ff" }}
    >
      <Sidebar activePage={activePage} onNav={onNav} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title="My Profile" onNav={onNav} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Profile hero card */}
            <div
              className="bg-white rounded-2xl overflow-hidden mb-6"
              style={{ border: "1px solid #e2e8f0" }}
            >
              <div
                className="h-28 relative"
                style={{
                  background:
                    "linear-gradient(135deg, #0f2a5e 0%, #1d4ed8 60%, #60a5fa 100%)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 20%, white 0%, transparent 40%)",
                  }}
                />
                {/* Settings shortcut */}
                <button
                  onClick={() => onNav("settings")}
                  className="absolute top-3 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-white/30"
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    color: "white",
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                  Edit in Settings
                </button>
              </div>

              <div className="px-6 pb-6">
                <div className="flex items-end justify-between -mt-10 mb-4">
                  <div className="relative">
                    <div
                      className="w-20 h-20 rounded-2xl border-4 border-white flex items-center justify-center text-white text-2xl font-bold"
                      style={{
                        background: "linear-gradient(135deg, #1d4ed8, #60a5fa)",
                      }}
                    >
                      {initials}
                    </div>
                    <div
                      className="absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"
                      style={{ background: "#10b981" }}
                    >
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
                    style={{
                      background: "#eff6ff",
                      color: "#2563eb",
                      border: "1px solid #bfdbfe",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    {user.phone}
                  </div>
                </div>

                <h2
                  className="text-xl font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-slate-500 text-sm mt-0.5">
                  B.Tech {user.branch} • NIT Raipur • Class of 2025
                </p>

                {user.bio && (
                  <p className="text-slate-500 text-sm mt-2 max-w-lg leading-relaxed">
                    {user.bio}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    {
                      label: `CGPA: ${user.cgpa}`,
                      color: "#2563eb",
                      bg: "#eff6ff",
                    },
                    {
                      label: `10th: ${user.tenthPercent}%`,
                      color: "#0891b2",
                      bg: "#ecfeff",
                    },
                    {
                      label: `12th: ${user.twelfthPercent}%`,
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

                {/* Social links */}
                {(user.linkedin || user.github || user.portfolio) && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {user.linkedin && (
                      <a
                        href={`https://${user.linkedin}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:underline"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                        {user.linkedin}
                      </a>
                    )}
                    {user.github && (
                      <a
                        href={`https://${user.github}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:underline"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                        {user.github}
                      </a>
                    )}
                    {user.portfolio && (
                      <a
                        href={`https://${user.portfolio}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:underline"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        {user.portfolio}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Left */}
              <div className="space-y-5">
                {/* Completion */}
                <div
                  className="bg-white rounded-2xl p-5"
                  style={{ border: "1px solid #e2e8f0" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3
                      className="text-sm font-semibold text-slate-800"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Profile Completion
                    </h3>
                    <button
                      onClick={() => onNav("settings")}
                      className="text-xs text-blue-600 hover:underline font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-2xl font-bold text-blue-600"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {pct}%
                    </span>
                    <span className="text-xs text-slate-400">
                      {doneCount}/{completionItems.length} done
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full mb-4"
                    style={{ background: "#e2e8f0" }}
                  >
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        background: "linear-gradient(90deg, #1d4ed8, #60a5fa)",
                      }}
                    />
                  </div>
                  <ul className="space-y-1.5">
                    {completionItems.map((item) => (
                      <li
                        key={item.label}
                        className="flex items-center gap-2 text-xs"
                      >
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background: item.done ? "#dcfce7" : "#f1f5f9",
                          }}
                        >
                          {item.done ? (
                            <svg
                              width="8"
                              height="8"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#16a34a"
                              strokeWidth="3"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          )}
                        </div>
                        <span
                          className={
                            item.done ? "text-slate-600" : "text-slate-400"
                          }
                        >
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div
                  className="bg-white rounded-2xl p-5"
                  style={{ border: "1px solid #e2e8f0" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3
                      className="text-sm font-semibold text-slate-800"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Technical Skills
                    </h3>
                    <button
                      onClick={() => onNav("settings")}
                      className="text-xs text-blue-600 hover:underline font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  {user.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((s) => (
                        <span
                          key={s}
                          className="text-xs font-medium px-2.5 py-1 rounded-lg"
                          style={{
                            background: "#eff6ff",
                            color: "#1d4ed8",
                            border: "1px solid #bfdbfe",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">
                      No skills added yet.{" "}
                      <button
                        onClick={() => onNav("settings")}
                        className="text-blue-600 hover:underline"
                      >
                        Add skills
                      </button>
                    </p>
                  )}
                </div>
              </div>

              {/* Right */}
              <div className="lg:col-span-2 space-y-5">
                {/* Academic */}
                <div
                  className="bg-white rounded-2xl p-5"
                  style={{ border: "1px solid #e2e8f0" }}
                >
                  <h3
                    className="text-sm font-semibold text-slate-800 mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Academic Details
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        label: "B.Tech CSE",
                        inst: "NIT Raipur",
                        score: `CGPA: ${user.cgpa} / 10`,
                        year: "2021–2025",
                        color: "#1d4ed8",
                      },
                      {
                        label: "Class XII (CBSE)",
                        inst: "Delhi Public School, Raipur",
                        score: `${user.twelfthPercent}%`,
                        year: "2021",
                        color: "#0891b2",
                      },
                      {
                        label: "Class X (CBSE)",
                        inst: "Delhi Public School, Raipur",
                        score: `${user.tenthPercent}%`,
                        year: "2019",
                        color: "#7c3aed",
                      },
                    ].map((a, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3.5 rounded-xl"
                        style={{
                          background: "#f8fafc",
                          border: "1px solid #f1f5f9",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                            style={{ background: a.color }}
                          >
                            {a.label[0]}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-800">
                              {a.label}
                            </div>
                            <div className="text-xs text-slate-500">
                              {a.inst}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-slate-900">
                            {a.score}
                          </div>
                          <div className="text-xs text-slate-400">{a.year}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div
                  className="bg-white rounded-2xl p-5"
                  style={{ border: "1px solid #e2e8f0" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className="text-sm font-semibold text-slate-800"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Projects
                    </h3>
                    <span className="text-xs text-blue-600 cursor-pointer hover:underline">
                      + Add Project
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        name: "Online Exam Proctoring System",
                        tech: "React, Node.js, WebRTC, MongoDB",
                        desc: "AI-powered live proctoring with face detection and tab-switch alerts.",
                      },
                      {
                        name: "E-Commerce Recommendation Engine",
                        tech: "Python, FastAPI, Collaborative Filtering",
                        desc: "Personalized product recommendations achieving 78% click-through improvement.",
                      },
                    ].map((p, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl group cursor-pointer transition-all hover:shadow-sm"
                        style={{
                          background: "#f8fafc",
                          border: "1px solid #f1f5f9",
                        }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold text-slate-800">
                            {p.name}
                          </h4>
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#94a3b8"
                            strokeWidth="2"
                            className="flex-shrink-0 mt-0.5 group-hover:stroke-blue-500 transition-colors"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{p.desc}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {p.tech.split(", ").map((t) => (
                            <span
                              key={t}
                              className="text-[10px] font-medium px-2 py-0.5 rounded"
                              style={{
                                background: "#e0e7ff",
                                color: "#4338ca",
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div
                  className="bg-white rounded-2xl p-5"
                  style={{ border: "1px solid #e2e8f0" }}
                >
                  <h3
                    className="text-sm font-semibold text-slate-800 mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Certifications
                  </h3>
                  <div className="space-y-2.5">
                    {certs.map((c) => (
                      <div
                        key={c.name}
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={{
                          background: "#f8fafc",
                          border: "1px solid #f1f5f9",
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: "#fef3c7" }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#d97706"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="8" r="6" />
                            <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-slate-800 truncate">
                            {c.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {c.issuer} • {c.date}
                          </div>
                        </div>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resume */}
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: resumeUploaded ? "#f0fdf4" : "#f8fafc",
                    border: `1px dashed ${resumeUploaded ? "#86efac" : "#cbd5e1"}`,
                  }}
                >
                  {resumeUploaded ? (
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "#dcfce7" }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#16a34a"
                          strokeWidth="2"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-green-800">
                          {user.firstName}_{user.lastName}_Resume.pdf
                        </div>
                        <div className="text-xs text-green-600">
                          Uploaded successfully
                        </div>
                      </div>
                      <button
                        onClick={() => setResumeUploaded(false)}
                        className="text-xs text-slate-400 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-2">
                      <svg
                        className="mx-auto mb-2"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <p className="text-sm font-medium text-slate-600 mb-1">
                        Upload Resume
                      </p>
                      <p className="text-xs text-slate-400 mb-3">
                        PDF or DOCX, max 5MB
                      </p>
                      <button
                        onClick={() => setResumeUploaded(true)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
                        style={{
                          background:
                            "linear-gradient(135deg, #1d4ed8, #3b82f6)",
                        }}
                      >
                        Browse Files
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
