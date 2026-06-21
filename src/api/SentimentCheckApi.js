import { api } from "./api";

export const checkSentiment = async ({text}) => {
    try {
        const token = localStorage.getItem("token");
        const response = await api.post(`/sentiment/check`,
            {
                text
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