const API_BASE_URL = "http://localhost:5000/api";

async function request(url, options = {}) {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export async function getSubscriptions() {
  return request("/subscriptions");
}

export async function createSubscription(subscription) {
  return request("/subscriptions", {
    method: "POST",
    body: JSON.stringify(subscription)
  });
}

export async function getDashboardMetrics() {
  return request("/subscriptions/dashboard");
}

export async function updateSubscriptionStatus(id, status) {
  return request(`/subscriptions/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status })
  });
}