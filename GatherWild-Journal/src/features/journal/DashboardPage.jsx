import { useState, useEffect } from "react";
import { getEntries } from "./journalService.js";
import JournalCard from "./components/JournalCard.jsx";
import "../../styles/styles.css"
import "../../styles/journal.css"
/*
This page will display the user's most recent 10 journal entries.
    - entries displayed as cards in album
Each journal entry may be clicked on to navigate to a page to view/edit that entry.
User can search by date or species to find past journal entries.
*/



export default function DashboardPage() {

    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("date_found");

    const sortedEntries = [...entries].sort((a, b) => {
        switch (sortBy) {
            // sorts by the date the specimen was added
            case "date_added":
                return new Date(b.created_at || 0) -
                    new Date(a.created_at || 0);

            // sorts by date the specimen was found. DEFAULT
            case "date_found":
                return new Date(b.date_found || 0) -
                    new Date(a.date_found || 0);

            // sorts alphabetically A-Z
            case "alphabetical":
                return (a.species_found || "").localeCompare(
                    b.species_found || "",
                    undefined,
                    { sensitivity: "base" }
                );

            // sorts by species category A-Z
            case "type":
                return (a.species_type || "").localeCompare(
                    b.species_type || "",
                    undefined,
                    { sensitivity: "base" }
                );

            default:
                return 0;
        }
    });


    useEffect(() => {
        async function loadEntries() {
            const { data, error } = await getEntries();
            if (!error) {
                setEntries(data);
            }
            setLoading(false);
        }
        loadEntries();
    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <h1>Your Foraging Companion</h1>

            {/* Sorting drop down*/}
            <div className="journal-sort">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="date_found">Date Found (Newest)</option>
                    <option value="date_added">Date Added (Newest)</option>
                    <option value="alphabetical">Alphabetical (A-Z)</option>
                    <option value="type">Species Type</option>

                </select>
            </div>

            {/* Journal card carousel */}
            <div className="journal-grid">

                {sortedEntries.map((entry) => (
                    <JournalCard
                        key={entry.id}
                        entry={entry}
                    />
                ))}

            </div>

        </div>
    );
}