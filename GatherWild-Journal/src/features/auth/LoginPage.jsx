import { useState } from "react";
import { signIn } from "./authService.js";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        const { error } = await signIn(email, password);

        setLoading(false);

        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            alert("Signed in successfully!");

            // go to dashboard of entries upon successful submission
            navigate("/entries", { replace: true });
        }
    }

    return (

        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="form-control"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-success w-100"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Sign In"}
                </button>
            </form>

            <p className="mt-3 text-centered">
                Don't have an account?{" "}
                <Link to="/signup">Sign Up</Link>
            </p>

            {message && (
                <div className={`alert mt-3 ${message.startsWith("Error") ? "alert-danger" : "alert-success"}`}>
                    {message}
                </div>
            )}
        </div>
    );
}