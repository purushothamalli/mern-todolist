import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, error, isLoading } = useSignup();
    const handleSignup = async (event) => {
        event.preventDefault();
        await signup(email, password);
    };
    return (
        <div className="container-lg p-5 border border-dark border-2 rounded w-25 bg-secondary-subtle my-5">
            <form className="signup" onSubmit={handleSignup}>
                <h2 className="text-primary text-decoration-underline">
                    Signup
                </h2>
                <label className="form-label mb-1 fs-5 font-weight-bold">
                    Email:
                </label>
                <input
                    type="text"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="form-control m-2 border border-1 border-dark"
                    required
                />
                <label className="form-label mb-1 fs-5 font-weight-bold">
                    Password:
                </label>
                <input
                    type="text"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="form-control m-2 border border-1 border-dark"
                    required
                />
                <div className="text-center mt-3">
                    <button
                        className="btn btn-outline-secondary"
                        disabled={isLoading}
                    >
                        Signup
                    </button>
                </div>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}
export default Signup;
