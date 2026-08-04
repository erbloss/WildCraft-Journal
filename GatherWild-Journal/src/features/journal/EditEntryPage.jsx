import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEntries, uploadJournalImage, updateEntry, deleteEntry } from "./journalService";
import { supabase } from "../../lib/supabase";
import defaultImage from "../../assets/images/leaf.png";
import JournalForm from "./components/JournalForm";
import "../../styles/journal.css";

/* 
This is responsible for updating or deleting existing records
*/
export default function EditEntryPage() {
    const [entries, setEntries] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [entry, setEntry] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // load user's entries
    useEffect(() => {
        loadEntries();
    }, []);

    async function loadEntries() {
        const { data, error } = await getEntries();
        if (!error) {
            setEntries(data);
        }
        setLoading(false);
    }

    // handle dropdown selection
    function handleSelect(e) {
        const id = e.target.value;
        setSelectedId(id);
        const selected = entries.find(
            entry => entry.id === id
        );
        setEntry(selected);
    }

    // handle updating an existing entry
    async function handleUpdate(formData) {
        let imageUrl = entry.image_url;
        if (formData.image_url instanceof File) {
            const { publicUrl, error } =
                await uploadJournalImage(formData.image_url, formData.user_id);

            if (error) {
                setMessage("Error uploading image. ", error);
                return;
            }
            imageUrl = publicUrl;
        }

        // TEST
        console.log("selected ID: ", selectedId);
        const { data, err } = await supabase
            .from("journal_entries")
            .select("id, user_id")
            .eq("id", selectedId);

        console.log(data);
        console.log(err);


        const { error } = await updateEntry(selectedId, {
            location_name: formData.location_name,
            latitude: formData.latitude,
            longitude: formData.longitude,
            date: formData.date,
            notes: formData.notes,
            weather: formData.weather,
            species_found: formData.species_found,
            image_url: imageUrl,
        });

        alert("Entry has been updated");
        navigate("/dashboard", { replace: true });
    }

    // handle delete 
    async function handleDelete() {
        if (!window.confirm("Delete this journal entry?")) {
            return;
        }

        await deleteEntry(selectedId);
        await loadEntries();
        setEntry(null);
        setSelectedId("");
        navigate("/dashboard", { replace: true });
    }

    return (
        <div>
            <h1>Edit An Entry</h1>
            <div className="container-centered">
                <select
                    value={selectedId}
                    onChange={handleSelect}
                    className="entries-dropdown"
                >
                    <option value="">
                        Select a journal entry
                    </option>
                    {entries.map(entry => (
                        <option
                            key={entry.id}
                            value={entry.id}
                        >
                            {entry.species_found} —{" "}
                            {new Date(entry.created_at).toLocaleDateString()}
                        </option>
                    ))}
                </select>
            </div>

            {entry && (
                <div className="journal-form">
                    <div className="journal-img-container">
                        <img
                            className="journal-img"
                            src={entry.image_url || defaultImage}

                        />
                    </div>
                    <h2 className="entry-species text-centered">
                        <strong>{entry.species_found}</strong></h2>


                    <JournalForm
                        initialData={entry}
                        onSubmit={handleUpdate}
                        submitText="Update Entry"
                        showDelete={true}
                        onDelete={handleDelete}
                    />

                </div>
            )}
        </div>
    );
}