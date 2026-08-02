import { useState, useEffect } from "react";
import { getEntries } from "./journalService.js";
import JournalCard from "./components/JournalCard.jsx";
import "../../styles/styles.css"
/*
This page will display the user's most recent 10 journal entries.
    - entries displayed as cards in album
Each journal entry may be clicked on to navigate to a page to view/edit that entry.
User can search by date or species to find past journal entries.
*/

export default function DashboardPage() {

    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

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
            <div className="journal-grid">
                {entries.map((entry) => (
                    <JournalCard key={entry.id} entry={entry} />
                ))}
            </div>
        </div>
    );
}