import { useState } from "react";
import { signUp } from "./authService.js";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../components/layout/Navbar.jsx";
import Footer from "../../components/layout/Footer.jsx";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        const { error } = await signUp(email, password);

        setLoading(false);

        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            alert("Sign-up successful!");

            // go to login page upon successful submission
            navigate("/login", { replace: true });
        }
    }

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h1 >Welcome to WildCraft!</h1>
                <h3 className="text-centered">Create an account here to begin your journal.</h3>

                <form className="bordered-form" onSubmit={handleSubmit}>
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

                    <div className="mb-10">
                        <label htmlFor="password">Retype Password</label>
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
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Sign Up"}
                    </button>
                </form>

                <p className="mt-3 text-centered">
                    Already have an account?{" "}
                    <Link to="/login">Sign In</Link>
                </p>

                {message && (
                    <div className={`alert mt-3 ${message.startsWith("Error") ? "alert-danger" : "alert-success"}`}>
                        {message}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}