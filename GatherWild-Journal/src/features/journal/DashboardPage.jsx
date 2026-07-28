import { useState } from "react";
import { getEntry } from "./journalService.js";
import Navbar from "../../components/layout/Navbar.jsx";
/*
This page will display the user's most recent 10 journal entries.
    - entries displayed as cards in album
Each journal entry may be clicked on to navigate to a page to view/edit that entry.
User can search by date or species to find past journal entries.
*/

export default function DashboardPage() {

    // function to retrieve up to 10 most recent entries


    return (
        <div className="container mt-5">
            <Navbar />
            <h1>Your Foraging Companion</h1>
            <h2>~ Explore previous entries here. ~</h2>
        </div>
    );
}