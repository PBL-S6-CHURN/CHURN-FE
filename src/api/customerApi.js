import { EventSourcePolyfill } from "event-source-polyfill";
import { api } from "./api";

export const getCustomers = async (page = 1) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/customers", {
      params: {
        page: page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    // Melempar error agar bisa ditangkap oleh komponen UI
    throw (
      error.response?.data?.message ||
      "Terjadi kesalahan saat mengambil data pelanggan"
    );
  }
};

export const getCustomerStats = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/customers/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    // Melempar error agar bisa ditangkap oleh komponen UI
    throw (
      error.response?.data?.message ||
      "Terjadi kesalahan saat mengambil data statistik pelanggan"
    );
  }
};

export const searchCustomers = async (name = "", page = 1) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/customers/search`, {
      params: {
        customer_id: name,
        page: page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw (
      err.response?.data?.message || "Terjadi kesalahan saat mencari pelanggan"
    );
  }
};

export const getCustomersByType = async (type, page = 1) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/customers/type/${type}`, {
      params: {
        page: page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw (
      err.response?.data?.message || "Terjadi kesalahan saat mencari pelanggan"
    );
  }
};

export const getCustomerById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw (
      err.response?.data?.message || "Terjadi kesalahan saat mencari pelanggan"
    );
  }
};

export const addCustomer = async ({
  customer_id,
  plan_id,
  contract_id,
  monthly_usage_hrs,
  feature_adoption_pct,
  payment_delay_count,
  support_ticket_last_90d,
  nps_score,
  tenure_months,
  last_login_days_ago,
  monthly_revenue,
  total_users,
}) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post(
      `/customers`,
      {
        customer_id,
        plan_id,
        contract_id,
        monthly_usage_hrs,
        feature_adoption_pct,
        payment_delay_count,
        support_ticket_last_90d,
        nps_score,
        tenure_months,
        last_login_days_ago,
        monthly_revenue,
        total_users,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw (
      err.response?.data?.message ||
      "Terjadi kesalahan saat menambahkan pelanggan"
    );
  }
};

export const uploadCustomerExcel = async (file) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post(`/customers/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    throw (
      err.response?.data?.message ||
      "Terjadi kesalahan saat menambahkan pelanggan"
    );
  }
};

export const getCustomerChurnStats = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/customers/stats/churn", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "Terjadi kesalahan saat mengambil statistik churn"
    );
  }
};

export const getCustomerRetentionStats = async (risk, page = 1) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/customers/risk/${risk.toLowerCase()}`, {
      params: {
        page: page,
        limit: 5, // Sesuaikan dengan limit pagination di backend Anda
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Tambahkan ini di file customerApi.js Anda
export const streamCustomerPredictions = (onDataReceived, onError) => {
  const token = localStorage.getItem("token");

  const eventSource = new EventSourcePolyfill(
    `http://localhost:8000/customers/predict/stream`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // 🔥 Persis seperti konfigurasi Postman Anda
      },
      heartbeatTimeout: 60000, // Timeout 1 menit jika server idle
    }
    );
    
    eventSource.onmessage = (event) => {
        if (event.data === '[DONE]') {
          console.log("🏁 Semua data stream selesai diterima.");
          eventSource.close(); // Tutup koneksi secara bersih
          return;
        }
      
        try {
          const parsedData = JSON.parse(event.data);
          onDataReceived(parsedData);
        } catch (err) {
          console.error("Gagal parsing data SSE:", err);
        }
      };

  eventSource.onerror = (error) => {
    console.error("SSE Connection Error:", error);
    if (onError) onError(error);
    eventSource.close();
  };

  return () => {
    eventSource.close();
    console.log("Koneksi SSE ditutup.");
  };
};

export const getCustomerRiskStats = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/customers/stats/risk", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "Terjadi kesalahan saat mengambil statistik risiko"
    );
  }
};
