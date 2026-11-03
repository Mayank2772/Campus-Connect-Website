const API_URL = "http://localhost:8000/api/drives";

async function request(path = "", options = {}) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    const details = Array.isArray(data.errors)
      ? `: ${data.errors.map((error) => error.message).join(", ")}`
      : "";
    throw new Error(`${data.message || "Drive request failed"}${details}`);
  }
  return data;
}

export async function getDrives() {
  return request();
}

export async function createDrive(drive) {
  return request("/", { method: "POST", body: JSON.stringify(drive) });
}

export async function updateDrive(id, drive) {
  return request(`/${id}`, { method: "PUT", body: JSON.stringify(drive) });
}

export async function deleteDrive(id) {
  return request(`/${id}`, { method: "DELETE" });
}
