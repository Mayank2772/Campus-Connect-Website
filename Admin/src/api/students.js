const API_URL = "http://localhost:8000/api/students";

async function request(path = "") {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Student request failed");
  return data;
}

export function getStudents() {
  return request();
}

export async function updateStudent(id, student) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(student),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update student");
  }
  return data;
}

export async function deleteStudent(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete student");
  }
  return data;
}

export async function fetchStudentResume(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/${id}/resume`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Failed to load resume");
  }

  return response.blob();
}
