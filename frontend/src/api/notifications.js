const API_URL = "http://localhost:8000/api/notifications";

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
    throw new Error(data.message || "Notification request failed");
  return data;
}

export function getNotifications() {
  return request();
}

export function markNotificationRead(id) {
  return request(`/${id}/read`, { method: "PATCH" });
}

export function markAllNotificationsRead() {
  return request("/read-all", { method: "PATCH" });
}

export function deleteNotification(id) {
  return request(`/${id}`, { method: "DELETE" });
}
