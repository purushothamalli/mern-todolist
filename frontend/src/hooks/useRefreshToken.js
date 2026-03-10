import { axiosPublic } from "../api/axios";
import { useAuthContext } from "./useAuthContext";
import { useCallback } from "react";

export const useRefreshToken = () => {
    const { setAccessToken, dispatch } = useAuthContext();

    const refresh = useCallback(async () => {
        try {
            const response = await axiosPublic.post("/user/refresh");
            const newAccessToken = response.data.accessToken;

            // 1. Save new Access Token to memory
            setAccessToken(newAccessToken);

            // 2. Ensure User state is still active
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser) {
                dispatch({ type: "LOGIN", payload: storedUser });
            }

            return newAccessToken;
        } catch (err) {
            // Only log out if it's a 401 Unauthorized error (token invalid/expired)
            if (err.response?.status === 401) {
                dispatch({ type: "LOGOUT" });
            }
            return null;
        }
    }, [dispatch, setAccessToken]);

    return refresh;
};
