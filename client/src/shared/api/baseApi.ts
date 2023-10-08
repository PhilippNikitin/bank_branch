import axios from "axios";


export const baseApi = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
});

// baseApi.interceptors.request.use((config) => {
//     if (config.headers) {
//         config.headers.Authorization =
//             localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
//     }
//     return config;
// });