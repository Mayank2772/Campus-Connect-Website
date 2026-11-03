const API_URL = "http://localhost:8000/api/resources";

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
    throw new Error(data.message || "Resource request failed");
  }
  return data;
}

export function getResources() {
  return request();
}

export async function fetchResourceFile(id, download = false) {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${API_URL}/${id}/file${download ? "?download=1" : ""}`,
    { headers: token ? { Authorization: `Bearer ${token}` } : {} },
  );
  if (!response.ok) throw new Error("Unable to access resource file");
  return response.blob();
}
