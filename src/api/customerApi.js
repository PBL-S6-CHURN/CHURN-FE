import { api } from "./api";

export const getCustomers = async (page = 1) => {
    try {
        const token = localStorage.getItem("token");
        const response = await api.get("/customers", {
            params: {
                page: page
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        // Melempar error agar bisa ditangkap oleh komponen UI
        throw error.response?.data?.message || "Terjadi kesalahan saat mengambil data pelanggan";
    }
};

export const getCustomerStats = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await api.get("/customers/stats", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        // Melempar error agar bisa ditangkap oleh komponen UI
        throw error.response?.data?.message || "Terjadi kesalahan saat mengambil data statistik pelanggan";
    }
};

export const searchCustomers = async(name="", page = 1) => {
    try { 
        const token = localStorage.getItem("token");
        const response = await api.get(`/customers/search`, {
            params: {
                customer_id: name,
                page: page
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        throw err.response?.data?.message || "Terjadi kesalahan saat mencari pelanggan";
    }
}

export const getCustomersByType = async(type, page=1) => {
    try { 
        const token = localStorage.getItem("token");
        const response = await api.get(`/customers/type/${type}`, {
            params: {
                page: page
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        throw err.response?.data?.message || "Terjadi kesalahan saat mencari pelanggan";
    }
}

export const getCustomerById = async(id) => {
    try { 
        const token = localStorage.getItem("token");
        const response = await api.get(`/customers/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        throw err.response?.data?.message || "Terjadi kesalahan saat mencari pelanggan";
    }
}