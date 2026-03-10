import { useAuthContext } from "./useAuthContext";
import { axiosPublic } from "../api/axios";

export const useLogout = () => {
    const { dispatch, setAccessToken } = useAuthContext();

    const logout = async () => {
        try {
            // 1. Tell backend to clear the Refresh Token cookie
            await axiosPublic.post('/user/logout');
        } catch (err) {
            console.error("Logout request failed", err);
        } finally {
            // 2. Clear local memory regardless of network success
            localStorage.removeItem("user");
            setAccessToken(null);
            dispatch({ type: "LOGOUT" });
        }
    };

    return { logout };
};
