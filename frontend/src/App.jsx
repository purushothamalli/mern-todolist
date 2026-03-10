import {
    Route,
    Navigate,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import HomePage from "./pages/HomePage";
import CreateTodo from "./pages/CreateTodo";
import ViewTodo from "./pages/ViewTodo";
import UpdateTodo from "./pages/UpdateTodo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RootLayout from "./layouts/RootLayout";
import { useEffect } from "react";
import { useRefreshToken } from "./hooks/useRefreshToken";
function App() {
    const { user } = useAuthContext();
    const refresh = useRefreshToken();
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
                <Route
                    index
                    element={user ? <HomePage /> : <Navigate to="/login" />}
                />
                <Route
                    path="create-todolist"
                    element={user ? <CreateTodo /> : <Navigate to="/login" />}
                />
                <Route
                    path="view-todo/:todoId"
                    element={user ? <ViewTodo /> : <Navigate to="/login" />}
                />
                <Route
                    path="update-todo/:todoId"
                    element={user ? <UpdateTodo /> : <Navigate to="/login" />}
                />
                <Route
                    path="login"
                    element={!user ? <Login /> : <HomePage />}
                />
                <Route
                    path="signup"
                    element={!user ? <Signup /> : <HomePage />}
                />
            </Route>,
        ),
    );
    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    await refresh();
                }
            } catch (err) {
                console.error("Auto-login failed:", err);
            }
        };

        verifyRefreshToken();
    }, []);
    return <RouterProvider router={router} />;
}

export default App;
