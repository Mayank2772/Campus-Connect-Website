import { useState } from "react";

const initialDrives = [
  {
    id: 1,
    company: "Google",
    role: "Software Engineer (SDE-1)",
    type: "Dream",
    ctc: "32",
    ctcRange: "32-42",
    location: "Bangalore",
    mode: "On-Campus",
    openings: 12,
    cgpa: 7.5,
    backlog: false,
    deadline: "2025-08-05",
    status: "Closed",
    applied: 148,
    branches: ["CSE", "ECE", "IT", "EEE"],
    description:
      "Google is looking for passionate software engineers who build products used by billions.",
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Software Development Engineer",
    type: "Dream",
    ctc: "28",
    ctcRange: "28-38",
    location: "Hyderabad",
    mode: "On-Campus",
    openings: 8,
    cgpa: 7.0,
    backlog: false,
    deadline: "2025-08-12",
    status: "Closed",
    applied: 132,
    branches: ["CSE", "ECE", "IT"],
    description:
      "Join Microsoft to build products that empower billions of people worldwide.",
  },
  {
    id: 3,
    company: "Amazon",
    role: "SDE-1",
    type: "Dream",
    ctc: "26",
    ctcRange: "26-35",
    location: "Hyderabad / Bangalore",
    mode: "On-Campus",
    openings: 10,
    cgpa: 7.0,
    backlog: false,
    deadline: "2025-09-10",
    status: "Active",
    applied: 95,
    branches: ["CSE", "ECE", "IT", "EEE"],
    description:
      "Amazon SDE role focused on building scalable distributed systems.",
  },
  {
    id: 4,
    company: "Infosys",
    role: "Systems Engineer",
    type: "Mass",
    ctc: "4.5",
    ctcRange: "4.5-6",
    location: "Pune / Bangalore / Chennai",
    mode: "On-Campus",
    openings: 60,
    cgpa: 6.0,
    backlog: true,
    deadline: "2025-09-18",
    status: "Active",
    applied: 420,
    branches: ["CSE", "ECE", "IT", "EEE", "ME", "CE"],
    description: "Infosys Systems Engineer role for fresh graduates.",
  },
  {
    id: 5,
    company: "Wipro",
    role: "Project Engineer",
    type: "Mass",
    ctc: "3.5",
    ctcRange: "3.5-5",
    location: "Pan India",
    mode: "On-Campus",
    openings: 50,
    cgpa: 6.0,
    backlog: true,
    deadline: "2025-09-20",
    status: "Active",
    applied: 380,
    branches: ["CSE", "ECE", "IT", "EEE", "ME"],
    description:
      "Wipro Project Engineer role across multiple technology domains.",
  },
  {
    id: 6,
    company: "Adobe",
    role: "Computer Scientist",
    type: "Super Dream",
    ctc: "42",
    ctcRange: "42-55",
    location: "Bangalore / Noida",
    mode: "On-Campus",
    openings: 5,
    cgpa: 8.0,
    backlog: false,
    deadline: "2025-10-01",
    status: "Active",
    applied: 62,
    branches: ["CSE", "IT"],
    description:
      "Adobe seeks exceptional engineers for creative cloud products.",
  },
  {
    id: 7,
    company: "Deloitte",
    role: "Analyst",
    type: "Mass",
    ctc: "7",
    ctcRange: "7-9",
    location: "Mumbai / Delhi / Hyderabad",
    mode: "On-Campus",
    openings: 30,
    cgpa: 6.5,
    backlog: true,
    deadline: "2025-10-05",
    status: "Active",
    applied: 210,
    branches: ["CSE", "ECE", "IT", "ME", "CE"],
    description: "Deloitte Analyst program for technology consulting.",
  },
  {
    id: 8,
    company: "Flipkart",
    role: "SDE-1",
    type: "Dream",
    ctc: "24",
    ctcRange: "24-30",
    location: "Bangalore",
    mode: "On-Campus",
    openings: 8,
    cgpa: 7.5,
    backlog: false,
    deadline: "2025-10-12",
    status: "Active",
    applied: 88,
    branches: ["CSE", "ECE", "IT"],
    description:
      "Flipkart SDE-1 role building India's largest e-commerce platform.",
  },
];

const typeStyle = {
  Dream: { bg: "#ede9fe", text: "#6c63ff" },
  Mass: { bg: "#fef3c7", text: "#d97706" },
  "Super Dream": { bg: "#dbeafe", text: "#4f7ef7" },
};

const statusStyle = {
  Active: { bg: "#d1fae5", text: "#059669" },
  Closed: { bg: "#f1f5f9", text: "#64748b" },
};

const EMPTY = {
  company: "",
  role: "",
  type: "Dream",
  ctc: "",
  ctcRange: "",
  location: "",
  mode: "On-Campus",
  openings: "",
  cgpa: "",
  backlog: false,
  deadline: "",
  status: "Active",
  branches: ["CSE"],
  description: "",
};

function Avatar({ name, size = 36 }) {
  const initials = name ? name.slice(0, 2).toUpperCase() : "??";
  const colors = [
    "#4f7ef7",
    "#6c63ff",
    "#10b981",
    "#f59e0b",
    "#ec4899",
    "#ef4444",
    "#14b8a6",
  ];
  const color = name ? colors[name.charCodeAt(0) % colors.length] : "#4f7ef7";
  return (
    <div
      className="flex items-center justify-center rounded-xl text-white text-sm font-bold shrink-0"
      style={{ width: size, height: size, background: color }}>
      {initials}
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-y-auto"
        style={{ maxWidth: 620 }}>
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "#f1f5f9" }}>
          <h2 className="font-semibold text-base" style={{ color: "#0f172a" }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 hover:bg-gray-100 transition-colors"
            style={{ color: "#64748b" }}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

function DriveForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState({ ...initial });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleBranch = (b) =>
    set(
      "branches",
      form.branches.includes(b)
        ? form.branches.filter((x) => x !== b)
        : [...form.branches, b],
    );
  const allBranches = ["CSE", "ECE", "IT", "EEE", "ME", "CE"];

  const field = (label, key, type = "text", placeholder = "") => (
    <div>
      <label
        className="block text-xs font-semibold mb-1.5"
        style={{ color: "#475569" }}>
        {label}
      </label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => set(key, e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none transition-all"
        style={{ borderColor: "#e2e8f0", color: "#0f172a" }}
        onFocus={(e) => (e.target.style.borderColor = "#4f7ef7")}
        onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        {field("Company Name", "company", "text", "e.g. Google")}
        {field("Job Role", "role", "text", "e.g. Software Engineer")}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label
            className="block text-xs font-semibold mb-1.5"
            style={{ color: "#475569" }}>
            Drive Type
          </label>
          <select
            value={form.type}
            onChange={(e) => set("type", e.target.value)}
            className="w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none"
            style={{ borderColor: "#e2e8f0", color: "#0f172a" }}>
            <option>Dream</option>
            <option>Super Dream</option>
            <option>Mass</option>
          </select>
        </div>
        <div>
          <label
            className="block text-xs font-semibold mb-1.5"
            style={{ color: "#475569" }}>
            Status
          </label>
          <select
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
            className="w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none"
            style={{ borderColor: "#e2e8f0", color: "#0f172a" }}>
            <option>Active</option>
            <option>Closed</option>
          </select>
        </div>
        <div>
          <label
            className="block text-xs font-semibold mb-1.5"
            style={{ color: "#475569" }}>
            Mode
          </label>
          <select
            value={form.mode}
            onChange={(e) => set("mode", e.target.value)}
            className="w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none"
            style={{ borderColor: "#e2e8f0", color: "#0f172a" }}>
            <option>On-Campus</option>
            <option>Off-Campus</option>
            <option>Virtual</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {field("CTC (LPA)", "ctc", "number", "e.g. 32")}
        {field("CTC Range", "ctcRange", "text", "e.g. 32-42")}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {field("Location", "location", "text", "e.g. Bangalore")}
        {field("Openings", "openings", "number", "e.g. 12")}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {field("Min CGPA", "cgpa", "number", "e.g. 7.5")}
        {field("Application Deadline", "deadline", "date")}
      </div>
      <div>
        <label
          className="block text-xs font-semibold mb-2"
          style={{ color: "#475569" }}>
          Eligible Branches
        </label>
        <div className="flex flex-wrap gap-2">
          {allBranches.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => toggleBranch(b)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                backgroundColor: form.branches.includes(b)
                  ? "#4f7ef7"
                  : "#f1f5f9",
                color: form.branches.includes(b) ? "#fff" : "#64748b",
              }}>
              {b}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={!form.backlog}
            onChange={(e) => set("backlog", !e.target.checked)}
            className="rounded"
          />
          <span className="text-xs font-semibold" style={{ color: "#475569" }}>
            No Active Backlog Required
          </span>
        </label>
      </div>
      <div>
        <label
          className="block text-xs font-semibold mb-1.5"
          style={{ color: "#475569" }}>
          Job Description
        </label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Describe the role..."
          className="w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none resize-none"
          style={{ borderColor: "#e2e8f0", color: "#0f172a" }}
          onFocus={(e) => (e.target.style.borderColor = "#4f7ef7")}
          onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
        />
      </div>
      <div className="flex gap-3 pt-1">
        <button
          onClick={onCancel}
          className="flex-1 rounded-xl py-2.5 text-sm font-semibold border transition-all"
          style={{ borderColor: "#e2e8f0", color: "#64748b" }}>
          Cancel
        </button>
        <button
          onClick={() => onSave(form)}
          className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white transition-all"
          style={{ backgroundColor: "#4f7ef7" }}>
          Save Drive
        </button>
      </div>
    </div>
  );
}

function DeleteConfirm({ drive, onConfirm, onCancel }) {
  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <div
        className="rounded-full flex items-center justify-center"
        style={{ width: 56, height: 56, backgroundColor: "#fee2e2" }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4h6v2" />
        </svg>
      </div>
      <div className="text-center">
        <div className="font-semibold" style={{ color: "#0f172a" }}>
          Delete Placement Drive
        </div>
        <div className="text-sm mt-1" style={{ color: "#64748b" }}>
          Are you sure you want to delete{" "}
          <strong>
            {drive.company} — {drive.role}
          </strong>
          ? This action cannot be undone.
        </div>
      </div>
      <div className="flex gap-3 w-full pt-1">
        <button
          onClick={onCancel}
          className="flex-1 rounded-xl py-2.5 text-sm font-semibold border"
          style={{ borderColor: "#e2e8f0", color: "#64748b" }}>
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white"
          style={{ backgroundColor: "#ef4444" }}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default function PlacementDrives() {
  const [drives, setDrives] = useState(initialDrives);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [modal, setModal] = useState(null); // { type: "add"|"edit"|"delete"|"view", drive }
  const [nextId, setNextId] = useState(100);

  const filtered = drives.filter((d) => {
    const matchSearch =
      !search ||
      d.company.toLowerCase().includes(search.toLowerCase()) ||
      d.role.toLowerCase().includes(search.toLowerCase()) ||
      d.location.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "All" || d.type === filterType;
    const matchStatus = filterStatus === "All" || d.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const handleSave = (form) => {
    if (!modal) return;

    if (modal.type === "add") {
      setDrives((prev) => [...prev, { ...form, id: nextId, applied: 0 }]);
      setNextId((n) => n + 1);
    } else {
      setDrives((prev) =>
        prev.map((d) => (d.id === modal.drive.id ? { ...d, ...form } : d)),
      );
    }
    setModal(null);
  };

  const handleDelete = () => {
    if (!modal?.drive) return;

    setDrives((prev) => prev.filter((d) => d.id !== modal.drive.id));
    setModal(null);
  };

  const stats = [
    { label: "Total Drives", value: drives.length, color: "#4f7ef7" },
    {
      label: "Active",
      value: drives.filter((d) => d.status === "Active").length,
      color: "#10b981",
    },
    {
      label: "Closed",
      value: drives.filter((d) => d.status === "Closed").length,
      color: "#64748b",
    },
    {
      label: "Total Applied",
      value: drives.reduce((s, d) => s + d.applied, 0).toLocaleString(),
      color: "#6c63ff",
    },
  ];

  return (
    <div
      className="flex flex-col gap-5 p-6 overflow-y-auto h-full"
      style={{ backgroundColor: "#f0f4fb" }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#0f172a" }}>
            Placement Drives
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>
            Manage and track all placement drives
          </p>
        </div>
        <button
          onClick={() => setModal({ type: "add", drive: EMPTY })}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
          style={{ backgroundColor: "#4f7ef7" }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Drive
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div className="text-2xl font-bold" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-sm font-medium" style={{ color: "#64748b" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div
        className="bg-white rounded-2xl px-5 py-4 flex items-center gap-3"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div
          className="flex items-center gap-2 flex-1 rounded-xl px-3 py-2.5 border"
          style={{ borderColor: "#e2e8f0" }}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by company, role, location..."
            className="flex-1 text-sm outline-none bg-transparent"
            style={{ color: "#0f172a" }}
          />
        </div>
        <div className="flex gap-2">
          {["All", "Dream", "Super Dream", "Mass"].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                backgroundColor: filterType === t ? "#4f7ef7" : "#f1f5f9",
                color: filterType === t ? "#fff" : "#64748b",
              }}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {["All", "Active", "Closed"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                backgroundColor: filterStatus === s ? "#1a2340" : "#f1f5f9",
                color: filterStatus === s ? "#fff" : "#64748b",
              }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div
        className="bg-white rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div className="px-5 py-3 border-b" style={{ borderColor: "#f1f5f9" }}>
          <span className="text-sm font-medium" style={{ color: "#64748b" }}>
            {filtered.length} drives found
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: "#f8fafc" }}>
                {[
                  "Company",
                  "Role",
                  "Type",
                  "CTC",
                  "Openings",
                  "CGPA",
                  "Deadline",
                  "Applied",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold"
                    style={{ color: "#64748b" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "#f1f5f9" }}>
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={d.company} size={32} />
                      <div>
                        <div
                          className="text-sm font-semibold"
                          style={{ color: "#0f172a" }}>
                          {d.company}
                        </div>
                        <div className="text-xs" style={{ color: "#94a3b8" }}>
                          {d.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm" style={{ color: "#334155" }}>
                      {d.role}
                    </div>
                    <div className="text-xs" style={{ color: "#94a3b8" }}>
                      {d.mode}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: (
                          typeStyle[d.type] || typeStyle["Mass"]
                        ).bg,
                        color: (typeStyle[d.type] || typeStyle["Mass"]).text,
                      }}>
                      {d.type}
                    </span>
                  </td>
                  <td
                    className="px-4 py-3 text-sm font-semibold"
                    style={{ color: "#4f7ef7" }}>
                    ₹{d.ctc} LPA
                  </td>
                  <td
                    className="px-4 py-3 text-sm"
                    style={{ color: "#334155" }}>
                    {d.openings} seats
                  </td>
                  <td
                    className="px-4 py-3 text-sm"
                    style={{ color: "#334155" }}>
                    ≥ {d.cgpa}
                  </td>
                  <td
                    className="px-4 py-3 text-sm"
                    style={{ color: "#334155" }}>
                    {d.deadline}
                  </td>
                  <td
                    className="px-4 py-3 text-sm font-medium"
                    style={{ color: "#334155" }}>
                    {d.applied}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: statusStyle[d.status].bg,
                        color: statusStyle[d.status].text,
                      }}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setModal({ type: "view", drive: d })}
                        title="View"
                        className="p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                        style={{ color: "#4f7ef7" }}>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setModal({ type: "edit", drive: d })}
                        title="Edit"
                        className="p-1.5 rounded-lg hover:bg-yellow-50 transition-colors"
                        style={{ color: "#f59e0b" }}>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setModal({ type: "delete", drive: d })}
                        title="Delete"
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        style={{ color: "#ef4444" }}>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={10}
                    className="px-4 py-16 text-center text-sm"
                    style={{ color: "#94a3b8" }}>
                    No drives found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {modal?.type === "add" && (
        <Modal title="Add New Placement Drive" onClose={() => setModal(null)}>
          <DriveForm
            initial={EMPTY}
            onSave={handleSave}
            onCancel={() => setModal(null)}
          />
        </Modal>
      )}
      {modal?.type === "edit" && modal.drive && (
        <Modal title="Edit Placement Drive" onClose={() => setModal(null)}>
          <DriveForm
            initial={modal.drive}
            onSave={handleSave}
            onCancel={() => setModal(null)}
          />
        </Modal>
      )}
      {modal?.type === "delete" && modal.drive && (
        <Modal title="Confirm Delete" onClose={() => setModal(null)}>
          <DeleteConfirm
            drive={modal.drive}
            onConfirm={handleDelete}
            onCancel={() => setModal(null)}
          />
        </Modal>
      )}
      {modal?.type === "view" && modal.drive && (
        <Modal title="Drive Details" onClose={() => setModal(null)}>
          <div className="flex flex-col gap-4">
            <div
              className="flex items-start gap-4 pb-4 border-b"
              style={{ borderColor: "#f1f5f9" }}>
              <Avatar name={modal.drive.company} size={48} />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="font-bold text-lg"
                    style={{ color: "#0f172a" }}>
                    {modal.drive.company}
                  </span>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: (
                        typeStyle[modal.drive.type] || typeStyle["Mass"]
                      ).bg,
                      color: (typeStyle[modal.drive.type] || typeStyle["Mass"])
                        .text,
                    }}>
                    {modal.drive.type}
                  </span>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: statusStyle[modal.drive.status].bg,
                      color: statusStyle[modal.drive.status].text,
                    }}>
                    {modal.drive.status}
                  </span>
                </div>
                <div className="text-sm mt-0.5" style={{ color: "#334155" }}>
                  {modal.drive.role}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
                  {modal.drive.location} • {modal.drive.mode}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold" style={{ color: "#4f7ef7" }}>
                  ₹{modal.drive.ctc} LPA
                </div>
                <div className="text-xs" style={{ color: "#94a3b8" }}>
                  Range: ₹{modal.drive.ctcRange} LPA
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Openings", value: `${modal.drive.openings} seats` },
                { label: "Applications", value: modal.drive.applied },
                { label: "Min CGPA", value: `≥ ${modal.drive.cgpa}` },
                {
                  label: "Active Backlog",
                  value: modal.drive.backlog ? "Allowed" : "Not Allowed",
                },
                { label: "Deadline", value: modal.drive.deadline },
                {
                  label: "Eligible Branches",
                  value: modal.drive.branches?.join(", ") || "—",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-3"
                  style={{ backgroundColor: "#f8fafc" }}>
                  <div className="text-xs" style={{ color: "#94a3b8" }}>
                    {item.label}
                  </div>
                  <div
                    className="text-sm font-semibold mt-0.5"
                    style={{ color: "#0f172a" }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
            {modal.drive.description && (
              <div>
                <div
                  className="text-xs font-semibold mb-1.5"
                  style={{ color: "#475569" }}>
                  Job Description
                </div>
                <div
                  className="text-sm leading-relaxed"
                  style={{ color: "#334155" }}>
                  {modal.drive.description}
                </div>
              </div>
            )}
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setModal({ type: "edit", drive: modal.drive })}
                className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: "#4f7ef7" }}>
                Edit Drive
              </button>
              <button
                onClick={() => setModal(null)}
                className="flex-1 rounded-xl py-2.5 text-sm font-semibold border"
                style={{ borderColor: "#e2e8f0", color: "#64748b" }}>
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
