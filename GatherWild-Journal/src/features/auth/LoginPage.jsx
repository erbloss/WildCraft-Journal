import { useState } from "react";
import { signUp, signIn } from "./authService.js";

export default function LoginPage() {
    /*const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignup(e) {
        e.preventDefault();

        const { error } = await signUp(email, password);

        if (error) {
            alert(error.message);
        } else {
            alert("Sign-up Successful!");
        }
    }*/

    return (
        <div className="container mt-5">
            <h1>Wildcraft Journal</h1>

            <p>Your digital field journal.</p>
        </div>
    );
}