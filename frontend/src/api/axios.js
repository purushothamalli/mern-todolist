import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
// 1. Create a public instance (for login/signup/refresh)
export const axiosPublic = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // Crucial for sending/receiving cookies
});
// 2. Create a private instance (for todos)
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
// 3. Add an interceptor to the private instance
export const setupInterceptors = (accessToken, setAccessToken) => {
    // Request Interceptor: Attach the Access Token to every request
    const requestIntercept = axiosPrivate.interceptors.request.use(
        (config) => {
            if (!config.headers["authorization"]) {
                config.headers["authorization"] = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error),
    );
    // Response Interceptor: Catch 401 errors
    const responseIntercept = axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
            const prevRequest = error?.config;
            if (error?.response?.status === 401 && !prevRequest?.sent) {
                prevRequest.sent = true; // Mark to avoid infinite loop
                try {
                    // Call the refresh route to get a new Access Token
                    const response = await axiosPublic.post("/user/refresh");
                    const newAccessToken = response.data.accessToken;
                    // Update the state in AuthContext
                    setAccessToken(newAccessToken);
                    // Retry the original request with the new token
                    prevRequest.headers["authorization"] =
                        `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                } catch (refreshError) {
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        },
    );

    return { requestIntercept, responseIntercept };
};
