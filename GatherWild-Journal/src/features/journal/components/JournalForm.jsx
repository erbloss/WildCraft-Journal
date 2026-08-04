import { useState, useEffect } from "react";

import InputPredictor from "./InputPredictor";
import "../../../styles/journal.css";

// This file is responsible for displaying fields and validating input. It then returns the form data.

export default function JournalForm({
    initialData = null,
    onSubmit,
    submitText = "Save Entry",
    loading = false,
    // for edit page to show delete button
    showDelete = false,
    onDelete,
}) {

    const [species_found, setSpeciesFound] = useState("");
    const [date, setDateFound] = useState("");
    const [location_name, setLocationName] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [weather, setWeather] = useState("");
    const [notes, setNotes] = useState("");
    const [image_url, setImageFile] = useState(null);

    const [message, setMessage] = useState("");

    useEffect(() => {
        console.log("INITIAL DATA: ", initialData)
        if (initialData) {
            setSpeciesFound(initialData.species_found || "");
            setDateFound(initialData.date ?
                initialData.date.split("T")[0]
                : "");
            setLocationName(initialData.location_name || "");
            setLatitude(initialData.latitude || "");
            setLongitude(initialData.longitude || "");
            setNotes(initialData.notes || "");
            setWeather(initialData.weather || "");
        }
    }, [initialData]);

    // determine if input is in decimal degree format 'XXX.XXXXXXXX'
    // returns true if correct or null. False if incorrect format.
    function isDecimalDegree(input) {
        //allow for blank imput
        if (input === "") return true;

        const regex = /^[-+]?((1[0-7]\d(\.\d{1,8})?)|([1-9]?\d(\.\d{1,8})?)|180(\.0{1,8})?)$/;

        return regex.test(input);
    }

    // handle the submit button being clicked.  
    const handleSubmit = async (e) => {
        e.preventDefault();

        // validate latitude and longitude
        if (!isDecimalDegree(latitude)) {
            setMessage("Invalid latitude value.");
            return alert("Invalid latitude value");
        }
        if (!isDecimalDegree(longitude)) {
            setMessage("Invalid longitude value.");
            return alert("Invalid longitude value.");
        }
        // return form data
        await onSubmit({
            species_found,
            date,
            location_name,
            latitude,
            longitude,
            weather,
            notes,
            image_url,
        })
    }


    return (
        <form onSubmit={handleSubmit} className="journal-form">

            <div className="form-row">
                <label>Species Found</label>

                <InputPredictor
                    value={species_found}
                    onChange={setSpeciesFound}
                />
            </div>

            <div className="form-row mb-10">
                <label>Date Found</label>

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDateFound(e.target.value)}
                    required
                />
            </div>

            <div className="grouped-area mb-10">

                <div className="form-row">
                    <label>Location</label>

                    <input
                        type="text"
                        value={location_name}
                        onChange={(e) => setLocationName(e.target.value)}
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

            </div>

            <div className="form-row">
                <label>Weather</label>

                <input
                    type="text"
                    value={weather}
                    onChange={(e) => setWeather(e.target.value)}
                />
            </div>

            <div className="form-row mb-10">
                <label>Notes</label>

                <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>

            <div className="form-row mb-10">
                <label>Image</label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                />
            </div>

            <div className="button-row">
                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Saving..." : submitText}
                </button>

                {showDelete && (
                    <button
                        type="button"
                        onClick={onDelete}
                        className="delete-btn"
                    > Delete Entry
                    </button>
                )}
            </div>

        </form>
    );
}
