import { api } from './api';

export const login = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        return response.data;
    } catch (error) {
        // Melempar error agar bisa ditangkap oleh komponen UI
        throw error.response?.data?.message || 'Terjadi kesalahan saat login';
    }
};

export const register = async (username, email, password) => {
    try {
        const response = await api.post('/register', { username, email, password });
        return response.data;
    } catch (error) {
        // Melempar error agar bisa ditangkap oleh komponen UI
        throw error.response?.data?.message || 'Terjadi kesalahan saat registrasi';
    }
}

export const logout = async () => {
    try {
        const token = localStorage.getItem("token");
        const tokenRefresh = localStorage.getItem("token-refresh");
        const response = await api.post('/logout', {
            refreshToken: tokenRefresh
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });


        return response.data;
    } catch (error) {
        // Melempar error agar bisa ditangkap oleh komponen UI
        throw error.response?.data?.message || 'Terjadi kesalahan saat logout';
    }
}