
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEntry, getUserID } from "./journalService";
import { supabase } from "../../lib/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export default function CreateEntryPage() {
    const [location_name, setLocation] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");
    const [weather, setWeather] = useState("");
    const [species_found, setSpeciesFound] = useState("");
    const [image_url, setImageURL] = useState(null);

    const [message, setMessage] = useState("");

    const navigate = useNavigate();


    // determine if input is in decimal degree format 'XXX.XXXXXXXX'
    // returns true if correct or null. False if incorrect format.
    function isDecimalDegree(input) {
        const lonRegex = /^[-+]?((1[0-7]\d(\.\d{1,8})?)|([1-9]?\d(\.\d{1,8})?)|180(\.0{1,8})?)$/;
        var result = false;
        if (input === null) {
            result = true;
        } else {
            result = lonRegex.test(input);
        }
        return result;
    }

    // handle the submit button being clicked.  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_id = await getUserID();
        console.log("USER ID: " + user_id);

        // validate latitude and longitude
        if (!isDecimalDegree(latitude)) {
            setMessage("Invalid latitude value.");
            return;
        }
        if (!isDecimalDegree(longitude)) {
            setMessage("Invalid longitude value.");
            return;
        }

        // upload image file to supabase bucket
        let public_url = null;
        if (image_url) {

            // create unique filename to store images under user id folder
            const fileExt = image_url.name.split(".").pop();
            const fileName = `${user_id}/${Date.now()}.${fileExt}`;

            // upload image to bucket
            const { error: uploadError } = await supabase.storage
                .from("journal-images")
                .upload(fileName, image_url);

            if (uploadError) {
                console.error(uploadError);
                setMessage("Image upload failed.");
                return;
            }

            // get public URL
            const { data } = supabase.storage
                .from("journal-images")
                .getPublicUrl(fileName);

            public_url = data.publicUrl;
        }

        // insert entry into database
        const { data, error } = await createEntry(
            {
                location_name,
                latitude,
                longitude,
                date,
                notes,
                weather,
                species_found,
                image_url: public_url
            }
        );

        if (error) {
            // display error if entry is not a unique celebrity
            setMessage("** OOPS! TRY AGAIN **");
            console.log("Error adding entry: ", error);
        }
        else {
            alert("Journal Entry Created!");

            // clear form
            setLocation("");
            setLatitude("");
            setLongitude("");
            setDate("");
            setNotes("");
            setSpeciesFound("");
            setWeather("");
            setImageURL(null);

            // go to dashboard of entries upon successful submission
            navigate("/dashboard", { replace: true });
        }
    };

    return (
        <div className="container-centered">
            <h1>Log a New Journal Entry</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>Species Found: </label>
                    <input
                        type="text"
                        placeholder="i.e., morel, ramps"
                        value={species_found}
                        onChange={(e) => setSpeciesFound(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Date: </label>
                    <input
                        type="date"
                        placeholder="mm/dd/yyy"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Weather: </label>
                    <input
                        type="text"
                        placeholder="i.e., cold, rainy..."
                        value={weather}
                        onChange={(e) => setWeather(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Location: </label>
                    <input
                        type="text"
                        placeholder="i.e., park name, intersection"
                        value={location_name}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Latitude <small>(Decimal Degrees)</small>: </label>
                    <input
                        type="numeric"
                        placeholder="---.--------"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                </div>

                <div className="form-row">
                    <label>Longitude <small>(Decimal Degrees)</small>: </label>
                    <input
                        type="numeric"
                        placeholder="---.--------"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                </div>

                <div className="form-row">
                    <label>Field Notes: </label>
                    <input
                        type="text"
                        placeholder="i.e., quantity, nearby species, ..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Add Image: </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageURL(e.target.files[0])}
                    />
                </div>
                <br />

                <button type="submit">Add Entry</button>
                <p>{message}</p>

            </form>
        </div >
    );
}