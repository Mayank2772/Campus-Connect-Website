import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import type { Page } from "../App";

interface Props {
  onNav: (p: Page) => void;
  activePage: Page;
}

const skills = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "SQL",
  "Git",
  "Data Structures",
  "Algorithms",
];
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

export default function ProfilePage({ onNav, activePage }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);

  const completionItems = [
    { label: "Basic Info", done: true },
    { label: "Academic Details", done: true },
    { label: "Skills", done: true },
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
              {/* Banner */}
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
                <div className="absolute top-3 right-4">
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-white/30"
                    style={{
                      background: "rgba(255,255,255,0.2)",
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
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    {editMode ? "Save Profile" : "Edit Profile"}
                  </button>
                </div>
              </div>
              <div className="px-6 pb-6">
                {/* Avatar row */}
                <div className="flex items-end justify-between -mt-10 mb-4">
                  <div className="relative">
                    <div
                      className="w-20 h-20 rounded-2xl border-4 border-white flex items-center justify-center text-white text-2xl font-bold"
                      style={{
                        background: "linear-gradient(135deg, #1d4ed8, #60a5fa)",
                      }}
                    >
                      MV
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
                    +91 98765 43210
                  </div>
                </div>

                {/* Name block */}
                <h2
                  className="text-xl font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Mayank Verma
                </h2>
                <p className="text-slate-500 text-sm mt-0.5">
                  B.Tech Computer Science • NIT Raipur • Class of 2025
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    { label: "CGPA: 8.4", color: "#2563eb", bg: "#eff6ff" },
                    { label: "10th: 92%", color: "#0891b2", bg: "#ecfeff" },
                    { label: "12th: 88%", color: "#7c3aed", bg: "#f5f3ff" },
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Left: completion + skills + certs */}
              <div className="space-y-5">
                {/* Profile completion */}
                <div
                  className="bg-white rounded-2xl p-5"
                  style={{ border: "1px solid #e2e8f0" }}
                >
                  <h3
                    className="text-sm font-semibold text-slate-800 mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Profile Completion
                  </h3>
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
                  <h3
                    className="text-sm font-semibold text-slate-800 mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s) => (
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
                </div>
              </div>

              {/* Right: academic + projects + resume */}
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
                        score: "CGPA: 8.4 / 10",
                        year: "2021–2025",
                      },
                      {
                        label: "Class XII (CBSE)",
                        inst: "Delhi Public School, Raipur",
                        score: "88.6%",
                        year: "2021",
                      },
                      {
                        label: "Class X (CBSE)",
                        inst: "Delhi Public School, Raipur",
                        score: "92.4%",
                        year: "2019",
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
                            style={{
                              background: ["#1d4ed8", "#0891b2", "#7c3aed"][i],
                            }}
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
                        link: true,
                      },
                      {
                        name: "E-Commerce Recommendation Engine",
                        tech: "Python, FastAPI, Collaborative Filtering",
                        desc: "Personalized product recommendations achieving 78% click-through improvement.",
                        link: true,
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
                          {p.link && (
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
                          )}
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

                {/* Resume upload */}
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
                          Mayank_Verma_Resume.pdf
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
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90 active:scale-95"
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
