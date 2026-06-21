import { api } from "./api"; // Sesuaikan path ke file tempat Anda membuat instance Axios

export const getAlerts = async (plan = "All", page = 1) => {
  try {
    const token = localStorage.getItem("token");
    let response;

    if (plan === "All") {
      response = await api.get("/alerts", {
        params: { page: page, limit: 5 },
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      // Endpoint sesuai backend: /alerts/plan/:plan
      response = await api.get(`/alerts/plan/${plan.toLowerCase()}`, {
        params: { page: page, limit: 5 },
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "Terjadi kesalahan saat mengambil data alert"
    );
  }
};

export const getAlertById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/alerts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "Terjadi kesalahan saat mengambil detail alert"
    );
  }
};

export const getAlertStats = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/alerts/stats", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "Terjadi kesalahan saat mengambil data statistik alert"
    );
  }
};

export const markAlertAsResolved = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.patch(`/alerts/${id}/resolved`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "Terjadi kesalahan saat memperbarui status alert"
    );
  }
};