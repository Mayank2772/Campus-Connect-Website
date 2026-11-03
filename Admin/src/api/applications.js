const API_URL = "http://localhost:8000/api/applications";

async function request(path = "", options = {}) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Application request failed");
  return data;
}

export function getApplications() {
  return request();
}

export async function downloadApplicationsExport(driveId) {
  const token = localStorage.getItem("token");
  const query = driveId ? `?driveId=${encodeURIComponent(driveId)}` : "";
  const response = await fetch(`${API_URL}/export${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Failed to export applications");
  }

  return response.blob();
}

export function updateApplicationStatus(id, status) {
  return request(`/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
