import { api } from "./api";

export const getSummarizeData = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await api.get("/summarize", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        // Melempar error agar bisa ditangkap oleh komponen UI
        throw error.response?.data?.message || "Terjadi kesalahan saat mengambil data sentiment";
    }
};