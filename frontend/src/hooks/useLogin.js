import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { axiosPublic } from "../api/axios";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch, setAccessToken } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axiosPublic.post("/user/login", { email, password });
            const data = response.data; // { email, accessToken }

            // 1. Store ONLY basic info in localStorage
            localStorage.setItem("user", JSON.stringify({ email: data.email }));

            // 2. Update Auth state (User info and Access Token)
            setAccessToken(data.accessToken);
            dispatch({ type: "LOGIN", payload: { email: data.email } });

            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setError(err.response?.data?.error || "Login failed");
        }
    };

    return { login, error, isLoading };
};
