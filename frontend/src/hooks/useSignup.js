import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { axiosPublic } from "../api/axios";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch, setAccessToken } = useAuthContext();

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axiosPublic.post("/user/signup", { email, password });
            const data = response.data; // { email, accessToken }

            // 1. Store ONLY basic info in localStorage
            localStorage.setItem("user", JSON.stringify({ email: data.email }));

            // 2. Update Auth state
            setAccessToken(data.accessToken);
            dispatch({ type: "LOGIN", payload: { email: data.email } });

            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setError(err.response?.data?.error || "Signup failed");
        }
    };

    return { signup, error, isLoading };
};
