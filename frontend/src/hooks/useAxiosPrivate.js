import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { useRefreshToken } from "./useRefreshToken";

export const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { accessToken } = useAuthContext();

    useEffect(() => {
        // Request Interceptor: Attach the Access Token to every request
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["authorization"]) {
                    config.headers["authorization"] = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response Interceptor: Catch 401 errors
        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                // If 401 (Unauthorized) and we haven't tried refreshing yet
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    try {
                        const newAccessToken = await refresh();
                        prevRequest.headers["authorization"] = `Bearer ${newAccessToken}`;
                        return axiosPrivate(prevRequest);
                    } catch (refreshError) {
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        // Cleanup: Remove interceptors when the component unmounts
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [accessToken, refresh]);

    return axiosPrivate;
};
