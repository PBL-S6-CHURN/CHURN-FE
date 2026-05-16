import { api } from "./api";

export const getProfile = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await api.get("/profile", {
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