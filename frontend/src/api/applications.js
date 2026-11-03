const API_URL = "http://localhost:8000/api/applications";

export async function applyToDrive(driveId, payload = {}) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/apply/${driveId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      data.reason ? `${data.message}: ${data.reason}` : data.message || "Application failed",
    );
  }
  return data;
}

export async function getMyApplications() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load applications");
  }

  return data;
}
