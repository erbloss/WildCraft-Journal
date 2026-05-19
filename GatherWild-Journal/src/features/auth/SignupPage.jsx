import { useState } from "react";
import { signUp } from "./authService.js";
import { Link } from "react-router-dom";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        const { error } = await signUp(email, password);

        setLoading(false);

        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            setMessage("Sign-up successful! Check your email to confirm your account.");
        }
    }

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h1>WildCraft Journal</h1>
            <p>Create your account.</p>

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
                    {loading ? "Loading..." : "Sign Up"}
                </button>
            </form>

            <p className="mt-3 text-center">
                Already have an account?{" "}
                <Link to="/login">Sign In</Link>
            </p>

            {message && (
                <div className={`alert mt-3 ${message.startsWith("Error") ? "alert-danger" : "alert-success"}`}>
                    {message}
                </div>
            )}
        </div>
    );
}