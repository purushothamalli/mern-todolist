import { createContext, useReducer, useState } from "react";
export const AuthContext = createContext();
export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                user: action.payload,
            };
        case "LOGOUT":
            return { user: null };
        default:
            return state;
    }
};
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: JSON.parse(localStorage.getItem("user")) || null,
    });
    const [accessToken, setAccessToken] = useState(null);
    console.log("AuthContext", state);
    return (
        <AuthContext.Provider
            value={{ ...state, dispatch, accessToken, setAccessToken }}
        >
            {children}
        </AuthContext.Provider>
    );
};
