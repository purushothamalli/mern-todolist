import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isLoading } = useLogin();
    const handleLogin = (e) => {
        e.preventDefault();
        login(email, password);
    };
    return (
        <div className="container-lg p-5 border border-dark border-2 rounded w-25 bg-secondary-subtle my-5">
            <form onSubmit={handleLogin} className="login">
                <h2 className="text-secondary text-decoration-underline">
                    Login
                </h2>
                <label className="form-label mb-1 fs-5 font-weight-bold">
                    Email:
                </label>
                <input
                    type="text"
                    placeholder="Enter email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    className="form-control m-2 border border-1 border-dark"
                    value={email}
                    required
                />
                <label className="form-label mb-1 fs-5 font-weight-bold">
                    Password:
                </label>
                <input
                    type="text"
                    placeholder="Enter password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    className="form-control m-2 border border-1 border-dark"
                    value={password}
                    required
                />
                <div className="text-center mt-3">
                    <button
                        className="btn btn-outline-primary"
                        disabled={isLoading}
                    >
                        Login
                    </button>
                </div>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}
export default Login;
