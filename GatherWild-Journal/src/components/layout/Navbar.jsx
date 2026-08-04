import React, { useEffect, useState } from "react";
import "../../styles/layout.css";

export default function Navbar() {
    const [isSticky, setIsSticky] = useState(false);

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

    return (
        <header >
            <div className="banner-background"></div>

            <nav className={`topnav-container ${isSticky ? "sticky" : ""}`}>
                <div className="topnav">
                    <a className="active" href="/dashboard">Journal Home</a>
                    <a href="/entries">New Entry</a>
                    <a href="/edit">Edit Entry</a>
                    <a href="/signout">Sign Out</a>
                </div>
            </nav>

        </header>
    );
}