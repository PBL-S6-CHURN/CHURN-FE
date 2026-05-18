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

export const updateProfile = async(username, email, profile_image) => {
    try {
        const token = localStorage.getItem("token");
        const formData = new FormData();

        formData.append("username", username);
        formData.append("email", email);
        
        if (profile_image) {
            formData.append("profile_image", profile_image);
        }

        const response = await api.put("/update-profile", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        });

        return response.data;
    } catch (error) {
        // Melempar error agar bisa ditangkap oleh komponen UI
        throw error.response?.data?.message || "Terjadi kesalahan saat mengambil data pelanggan";
    }
}

export const updatePassword = async(oldPassword, newPassword) => {
    try {
        const token = localStorage.getItem("token");
        const response = await api.put("/change-password", { oldPassword, newPassword }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        // Melempar error agar bisa ditangkap oleh komponen UI
        throw error.response?.data?.message || "Terjadi kesalahan saat mengambil data pelanggan";
    }
}