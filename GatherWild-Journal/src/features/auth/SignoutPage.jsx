import { useState } from "react";
import { signOut } from "./authService.js";
import { Link, useNavigate } from "react-router-dom";

export default function SignoutPage() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        const { error } = await signOut();

        setLoading(false);

        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            alert("Successfully Signed Out");

            // go to login page upon successful submission
            navigate("/login", { replace: true });
        }
    };

    return (

        <div className="container-centered">
            <h1>Are you sure you want to leave?</h1>

            <form onSubmit={handleSubmit} className="button-row">
                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Sign Out"}
                </button>
            </form>

            <div>
                {message && (
                    <div className={`alert mt-3 ${message.startsWith("Error") ? "alert-danger" : "alert-success"}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}