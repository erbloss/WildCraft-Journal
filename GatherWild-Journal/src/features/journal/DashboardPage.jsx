/*
TEMP ENTRY FORM 
*/

import { useState } from "react";
import { createEntry } from "./journalService.js";

export default function DashboardPage() {
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const { error } = await createEntry({
            title,
            notes,
        });

        if (error) {
            alert(error.message);
        } else {
            alert("Journal entry created!");

            setTitle("");
            setNotes("");
        }
    }

    return (
        <div className="container mt-5">
            <h1>Create Journal Entry</h1>

            <form
                className="d-flex flex-column gap-3"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Entry Title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Notes"
                    className="form-control"
                    rows="5"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />

                <button
                    type="submit"
                    className="btn btn-success"
                >
                    Save Entry
                </button>
            </form>
        </div>
    );
}