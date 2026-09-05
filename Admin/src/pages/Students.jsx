import { useState } from "react";

const initialStudents = [
  {
    id: 1,
    name: "Arjun Mehta",
    roll: "CSE/2025/042",
    branch: "CSE",
    batch: 2025,
    cgpa: 8.9,
    tenth: 92,
    twelfth: 88,
    backlog: false,
    phone: "+91 98765 43210",
    email: "arjun.mehta@nitr.ac.in",
    placed: true,
    company: "Google",
    ctc: "₹32 LPA",
  },
  {
    id: 2,
    name: "Priya Sharma",
    roll: "ECE/2025/017",
    branch: "ECE",
    batch: 2025,
    cgpa: 8.2,
    tenth: 89,
    twelfth: 85,
    backlog: false,
    phone: "+91 87654 32109",
    email: "priya.sharma@nitr.ac.in",
    placed: false,
    company: "",
    ctc: "",
  },
  {
    id: 3,
    name: "Rohit Gupta",
    roll: "CSE/2025/088",
    branch: "CSE",
    batch: 2025,
    cgpa: 7.6,
    tenth: 85,
    twelfth: 80,
    backlog: true,
    phone: "+91 76543 21098",
    email: "rohit.gupta@nitr.ac.in",
    placed: false,
    company: "",
    ctc: "",
  },
  {
    id: 4,
    name: "Anjali Singh",
    roll: "IT/2025/031",
    branch: "IT",
    batch: 2025,
    cgpa: 7.1,
    tenth: 78,
    twelfth: 76,
    backlog: false,
    phone: "+91 65432 10987",
    email: "anjali.singh@nitr.ac.in",
    placed: false,
    company: "",
    ctc: "",
  },
  {
    id: 5,
    name: "Vikram Nair",
    roll: "CSE/2025/064",
    branch: "CSE",
    batch: 2025,
    cgpa: 9.1,
    tenth: 96,
    twelfth: 94,
    backlog: false,
    phone: "+91 54321 09876",
    email: "vikram.nair@nitr.ac.in",
    placed: true,
    company: "Google",
    ctc: "₹32 LPA",
  },
  {
    id: 6,
    name: "Sneha Patel",
    roll: "CSE/2025/011",
    branch: "CSE",
    batch: 2025,
    cgpa: 8.5,
    tenth: 91,
    twelfth: 87,
    backlog: false,
    phone: "+91 43210 98765",
    email: "sneha.patel@nitr.ac.in",
    placed: false,
    company: "",
    ctc: "",
  },
  {
    id: 7,
    name: "Karan Verma",
    roll: "ECE/2025/055",
    branch: "ECE",
    batch: 2025,
    cgpa: 7.8,
    tenth: 82,
    twelfth: 79,
    backlog: false,
    phone: "+91 32109 87654",
    email: "karan.verma@nitr.ac.in",
    placed: false,
    company: "",
    ctc: "",
  },
  {
    id: 8,
    name: "Meera Iyer",
    roll: "CSE/2025/022",
    branch: "CSE",
    batch: 2025,
    cgpa: 8.7,
    tenth: 93,
    twelfth: 91,
    backlog: false,
    phone: "+91 21098 76543",
    email: "meera.iyer@nitr.ac.in",
    placed: true,
    company: "Flipkart",
    ctc: "₹24 LPA",
  },
  {
    id: 9,
    name: "Aditya Kumar",
    roll: "IT/2025/044",
    branch: "IT",
    batch: 2025,
    cgpa: 7.3,
    tenth: 80,
    twelfth: 77,
    backlog: false,
    phone: "+91 10987 65432",
    email: "aditya.kumar@nitr.ac.in",
    placed: true,
    company: "Deloitte",
    ctc: "₹7 LPA",
  },
  {
    id: 10,
    name: "Pooja Reddy",
    roll: "CSE/2025/077",
    branch: "CSE",
    batch: 2025,
    cgpa: 9.3,
    tenth: 97,
    twelfth: 95,
    backlog: false,
    phone: "+91 09876 54321",
    email: "pooja.reddy@nitr.ac.in",
    placed: true,
    company: "Microsoft",
    ctc: "₹28 LPA",
  },
  {
    id: 11,
    name: "Rahul Joshi",
    roll: "CSE/2025/033",
    branch: "CSE",
    batch: 2025,
    cgpa: 7.9,
    tenth: 86,
    twelfth: 82,
    backlog: false,
    phone: "+91 98765 11111",
    email: "rahul.joshi@nitr.ac.in",
    placed: false,
    company: "",
    ctc: "",
  },
  {
    id: 12,
    name: "Divya Nair",
    roll: "EEE/2025/009",
    branch: "EEE",
    batch: 2025,
    cgpa: 7.0,
    tenth: 77,
    twelfth: 74,
    backlog: true,
    phone: "+91 87654 22222",
    email: "divya.nair@nitr.ac.in",
    placed: false,
    company: "",
    ctc: "",
  },
];

const EMPTY_STUDENT = {
  name: "",
  roll: "",
  branch: "CSE",
  batch: 2025,
  cgpa: "",
  tenth: "",
  twelfth: "",
  backlog: false,
  phone: "",
  email: "",
  placed: false,
  company: "",
  ctc: "",
};

function Avatar({ name }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const colors = [
    "#4f7ef7",
    "#6c63ff",
    "#10b981",
    "#f59e0b",
    "#ec4899",
    "#ef4444",
    "#14b8a6",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      className="flex items-center justify-center rounded-full text-white text-xs font-bold flex-shrink-0"
      style={{ width: 34, height: 34, background: color }}>
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
        style={{ maxWidth: 580 }}>
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "#f1f5f9" }}>
          <h2 className="font-semibold text-base" style={{ color: "#0f172a" }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 hover:bg-gray-100"
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

function StudentForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState({ ...initial });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
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
        className="w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none"
        style={{ borderColor: "#e2e8f0", color: "#0f172a" }}
        onFocus={(e) => (e.target.style.borderColor = "#4f7ef7")}
        onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
      />
    </div>
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        {field("Full Name", "name", "text", "e.g. Arjun Mehta")}
        {field("Roll Number", "roll", "text", "e.g. CSE/2025/042")}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label
            className="block text-xs font-semibold mb-1.5"
            style={{ color: "#475569" }}>
            Branch
          </label>
          <select
            value={form.branch}
            onChange={(e) => set("branch", e.target.value)}
            className="w-full rounded-xl px-3.5 py-2.5 text-sm border outline-none"
            style={{ borderColor: "#e2e8f0", color: "#0f172a" }}>
            {["CSE", "ECE", "IT", "EEE", "ME", "CE"].map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        {field("Batch Year", "batch", "number", "2025")}
        {field("CGPA", "cgpa", "number", "e.g. 8.5")}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {field("10th %", "tenth", "number", "e.g. 92")}
        {field("12th %", "twelfth", "number", "e.g. 88")}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {field("Phone", "phone", "text", "+91 XXXXX XXXXX")}
        {field("Email", "email", "email", "student@nitr.ac.in")}
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.backlog}
            onChange={(e) => set("backlog", e.target.checked)}
          />
          <span className="text-xs font-semibold" style={{ color: "#475569" }}>
            Has Active Backlog
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.placed}
            onChange={(e) => set("placed", e.target.checked)}
          />
          <span className="text-xs font-semibold" style={{ color: "#475569" }}>
            Placed
          </span>
        </label>
      </div>
      {form.placed && (
        <div className="grid grid-cols-2 gap-4">
          {field("Company", "company", "text", "e.g. Google")}
          {field("CTC", "ctc", "text", "e.g. ₹32 LPA")}
        </div>
      )}
      <div className="flex gap-3 pt-1">
        <button
          onClick={onCancel}
          className="flex-1 rounded-xl py-2.5 text-sm font-semibold border"
          style={{ borderColor: "#e2e8f0", color: "#64748b" }}>
          Cancel
        </button>
        <button
          onClick={() => onSave(form)}
          className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white"
          style={{ backgroundColor: "#4f7ef7" }}>
          Save Student
        </button>
      </div>
    </div>
  );
}

export default function Students() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [filterBranch, setFilterBranch] = useState("All");
  const [filterPlaced, setFilterPlaced] = useState("All");
  const [modal, setModal] = useState(null);
  const [nextId, setNextId] = useState(200);

  const branches = ["All", "CSE", "ECE", "IT", "EEE", "ME", "CE"];

  const filtered = students.filter((s) => {
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.roll.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchBranch = filterBranch === "All" || s.branch === filterBranch;
    const matchPlaced =
      filterPlaced === "All" ||
      (filterPlaced === "Placed" ? s.placed : !s.placed);
    return matchSearch && matchBranch && matchPlaced;
  });

  const handleSave = (form) => {
    if (!modal) return;

    if (modal.type === "add")
      (setStudents((prev) => [...prev, { ...form, id: nextId }]),
        setNextId((n) => n + 1));
    else
      setStudents((prev) =>
        prev.map((s) => (s.id === modal.student.id ? { ...s, ...form } : s)),
      );
    setModal(null);
  };

  const handleDelete = () => {
    if (!modal?.student) return;

    setStudents((prev) => prev.filter((s) => s.id !== modal.student.id));
    setModal(null);
  };

  return (
    <div
      className="flex flex-col gap-5 p-6 overflow-y-auto h-full"
      style={{ backgroundColor: "#f0f4fb" }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#0f172a" }}>
            Students
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>
            Manage registered students
          </p>
        </div>
        <button
          onClick={() => setModal({ type: "add", student: EMPTY_STUDENT })}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
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
          Add Student
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: students.length, color: "#4f7ef7" },
          {
            label: "Placed",
            value: students.filter((s) => s.placed).length,
            color: "#10b981",
          },
          {
            label: "Unplaced",
            value: students.filter((s) => !s.placed).length,
            color: "#f59e0b",
          },
          {
            label: "With Backlog",
            value: students.filter((s) => s.backlog).length,
            color: "#ef4444",
          },
        ].map((s) => (
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
        className="bg-white rounded-2xl px-5 py-4 flex items-center gap-3 flex-wrap"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 border flex-1"
          style={{ borderColor: "#e2e8f0" }}>
          <svg
            width="14"
            height="14"
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
            placeholder="Search by name, roll number, email..."
            className="flex-1 text-sm outline-none bg-transparent"
            style={{ color: "#0f172a" }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {branches.map((b) => (
            <button
              key={b}
              onClick={() => setFilterBranch(b)}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                backgroundColor: filterBranch === b ? "#4f7ef7" : "#f1f5f9",
                color: filterBranch === b ? "#fff" : "#64748b",
              }}>
              {b}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {["All", "Placed", "Unplaced"].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPlaced(p)}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                backgroundColor: filterPlaced === p ? "#1a2340" : "#f1f5f9",
                color: filterPlaced === p ? "#fff" : "#64748b",
              }}>
              {p}
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
            {filtered.length} students
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: "#f8fafc" }}>
                {[
                  "Student",
                  "Roll No.",
                  "Branch",
                  "CGPA",
                  "10th",
                  "12th",
                  "Backlog",
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
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={s.name} />
                      <div>
                        <div
                          className="text-sm font-medium"
                          style={{ color: "#0f172a" }}>
                          {s.name}
                        </div>
                        <div className="text-xs" style={{ color: "#94a3b8" }}>
                          {s.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    className="px-4 py-3 text-sm"
                    style={{ color: "#64748b" }}>
                    {s.roll}
                  </td>
                  <td
                    className="px-4 py-3 text-sm"
                    style={{ color: "#334155" }}>
                    {s.branch}
                  </td>
                  <td
                    className="px-4 py-3 text-sm font-semibold"
                    style={{ color: "#0f172a" }}>
                    {s.cgpa}
                  </td>
                  <td
                    className="px-4 py-3 text-sm"
                    style={{ color: "#334155" }}>
                    {s.tenth}%
                  </td>
                  <td
                    className="px-4 py-3 text-sm"
                    style={{ color: "#334155" }}>
                    {s.twelfth}%
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: s.backlog ? "#fee2e2" : "#d1fae5",
                        color: s.backlog ? "#dc2626" : "#059669",
                      }}>
                      {s.backlog ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {s.placed ? (
                      <div>
                        <span
                          className="text-xs font-semibold px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: "#ede9fe",
                            color: "#6c63ff",
                          }}>
                          Placed
                        </span>
                        <div
                          className="text-xs mt-1"
                          style={{ color: "#94a3b8" }}>
                          {s.company} · {s.ctc}
                        </div>
                      </div>
                    ) : (
                      <span
                        className="text-xs font-semibold px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: "#fef3c7",
                          color: "#d97706",
                        }}>
                        Unplaced
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setModal({ type: "edit", student: s })}
                        title="Edit"
                        className="p-1.5 rounded-lg hover:bg-yellow-50"
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
                        onClick={() => setModal({ type: "delete", student: s })}
                        title="Delete"
                        className="p-1.5 rounded-lg hover:bg-red-50"
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
                    colSpan={9}
                    className="px-4 py-16 text-center text-sm"
                    style={{ color: "#94a3b8" }}>
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modal?.type === "add" && (
        <Modal title="Add Student" onClose={() => setModal(null)}>
          <StudentForm
            initial={EMPTY_STUDENT}
            onSave={handleSave}
            onCancel={() => setModal(null)}
          />
        </Modal>
      )}
      {modal?.type === "edit" && modal.student && (
        <Modal title="Edit Student" onClose={() => setModal(null)}>
          <StudentForm
            initial={modal.student}
            onSave={handleSave}
            onCancel={() => setModal(null)}
          />
        </Modal>
      )}
      {modal?.type === "delete" && modal.student && (
        <Modal title="Delete Student" onClose={() => setModal(null)}>
          <div className="flex flex-col items-center gap-4 py-2">
            <div
              className="rounded-full flex items-center justify-center"
              style={{ width: 52, height: 52, backgroundColor: "#fee2e2" }}>
              <svg
                width="22"
                height="22"
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
              </svg>
            </div>
            <div className="text-center">
              <div className="font-semibold" style={{ color: "#0f172a" }}>
                Delete Student
              </div>
              <div className="text-sm mt-1" style={{ color: "#64748b" }}>
                Remove <strong>{modal.student.name}</strong> (
                {modal.student.roll}) from the system?
              </div>
            </div>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setModal(null)}
                className="flex-1 rounded-xl py-2.5 text-sm font-semibold border"
                style={{ borderColor: "#e2e8f0", color: "#64748b" }}>
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: "#ef4444" }}>
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
