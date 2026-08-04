import { useNavigate } from "react-router-dom";
import { createEntry, getUserID, uploadJournalImage } from "./journalService";
import { supabase } from "../../lib/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import JournalForm from "./components/JournalForm";

// Used to upload images and inserts a new record/entry into Supabase

export default function CreateEntryPage() {
    const navigate = useNavigate();

    // handle the submit button being clicked.  
    async function handleCreate(formData) {
        const user_id = await getUserID();

        // convert image file
        const { publicUrl, error } =
            await uploadJournalImage(formData.image_url, user_id);

        if (error) {
            console.error(error);
            return;
        }

        // insert entry into database
        const { error: insertError } =
            await createEntry({
                location_name: formData.location_name,
                latitude: formData.latitude,
                longitude: formData.longitude,
                date: formData.date,
                notes: formData.notes,
                weather: formData.weather,
                species_found: formData.species_found,
                image_url: publicUrl,
            });

        if (insertError) {
            console.error(insertError);
            return;
        }

        alert("Journal Entry Created!");

        // go to dashboard of entries upon successful submission
        navigate("/dashboard", { replace: true });
    }


    return (
        <div className="container-centered">
            <h1>Log a New Journal Entry</h1>

            <JournalForm
                onSubmit={handleCreate}
                submitText="Create Entry"
            />
        </div >
    )
};
