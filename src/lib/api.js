const API_ROOT = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

async function request(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(`${API_ROOT}${path}`, {
      ...options,
      signal: controller.signal,
      headers: { "content-type": "application/json", ...options.headers },
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(payload.error || payload.message || "The request could not be completed.");
      error.fields = payload.fields;
      throw error;
    }
    return payload;
  } catch (error) {
    if (error.name === "AbortError") throw new Error("The service took too long to respond. Please retry.");
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export const api = {
  recommend: (conditions) => request("/crops/recommend", { method: "POST", body: JSON.stringify(conditions) }),
  schemes: (search = "") => request(`/schemes${search ? `?search=${encodeURIComponent(search)}` : ""}`),
  contact: (message) => request("/message/send", { method: "POST", body: JSON.stringify(message) }),
};
