import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "../../styles/layout.css";


export default function Navbar() {
    const [isSticky, setIsSticky] = useState(false);
    const [user, setUser] = useState(null);

    // apply sticky effect to navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 150) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // listen for authentication from supabase session
    useEffect(() => {
        // get currently signed-in user
        async function getUser() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            setUser(user);
        }
        getUser();

        // listen for login/logout changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <header>
            <div className="banner-background"></div>

            <div className={`topnav-container ${isSticky ? "sticky" : ""}`}>
                <nav className="topnav">
                    <Link to="/">Home </Link>

                    {user ? (
                        <>
                            <Link to="/dashboard">My Journal</Link>
                            <Link to="/entries">New Entry</Link>
                            <Link to="/edit">Edit Entry</Link>
                            <Link to="/signout">Sign Out</Link>
                        </>
                    ) : (
                        <Link to="/login">Sign In</Link>

                    )}

                </nav>
            </div>
        </header>
    );
}