
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

import { createEntry } from "./journalService";

export default function CreateEntryPage() {
    const [location_name, setLocation] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");
    const [weather, setWeather] = useState("");
    const [speciesFound, setSpeciesFound] = useState([""]);
    const [imageURL, setImageURL] = useState("");
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

        if (!isDecimalDegree(latitude)) {
            setMessage("Invalid latitude value.");
            return;
        }
        if (!isDecimalDegree(longitude)) {
            setMessage("Invalid longitude value.");
        }

        // insert entry into database
        createEntry([
            {
                location_name: location_name,
                latitude: latitude,
                longitude: longitude,
                date: date,
                notes: notes,
                weather: weather,
                species_found: speciesFound,
                image_url: imageURL
            }
        ]);

        if (error) {
            // display error if entry is not a unique celebrity
            setMessage("** OOPS! TRY AGAIN **");
            console.log("Error adding entry: ", error);
        }
        else {
            setMessage("Journal Entry Created!")
            // go to dashboard of entries upon successful submission
            navigate("/dashboard", { replace: true });
        };

        // clear submission form
        setTitle("");
        setLocationName("");
        // ......... More here if needed to clear all
    }

    return (
        <div>
            <h1>Add Your Next Entry</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>Species Found: </label>
                    <input
                        type="text[]"
                        placeholder="i.e., morel, ramps"
                        value={speciesFound}
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
                    <label>Latitude (Decimal Degrees): </label>
                    <input
                        type="numeric"
                        placeholder="xx.xxxxx"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                </div>

                <div className="form-row">
                    <label>Longitude (Decimal Degrees): </label>
                    <input
                        type="numeric"
                        placeholder="xx.xxxxx"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                </div>

                <div className="form-row">
                    <label>Notes: </label>
                    <input
                        type="text"
                        placeholder="i.e., quantity, nearby species, ..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Add Image: </label>
                    <input
                        type="file"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                    />
                </div>
                <br />

                <button type="submit">Create Entry</button>
                <p>{message}</p>
            </form>



        </div >
    );
}