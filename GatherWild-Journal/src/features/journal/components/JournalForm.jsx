import { useState, useEffect } from "react";
import ImageUploadPreview from "../../../utils/ImageUploadPreview";
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
    const [species_type, setSpeciesType] = useState("");
    const [otherValue, setOtherValue] = useState("");
    const [date, setDateFound] = useState("");
    const [location_name, setLocationName] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [weather, setWeather] = useState("");
    const [notes, setNotes] = useState("");
    const [image_url, setImageFile] = useState(null);

    const [message, setMessage] = useState("");

    // fill form if in edit mode for existing entry
    useEffect(() => {
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
            setSpeciesType(initialData.species_type || "");
        }
    }, [initialData]);


    function handleSpeciesChange(text) {
        setSpeciesFound(text);
        setSpeciesType("");
        setOtherValue("");
    }

    // disables the species type dropdown when input selector option is selected and sets species type, species found
    function handleSpeciesSelect(text) {
        if (text.food === "Other") {
            setSpeciesFound("");
            setOtherValue("");
            setSpeciesType("Other");
            return;
        }

        setSpeciesFound(text.food);
        setSpeciesType(text.category);
        setOtherValue("");
    }

    function handleOtherSpecies(text) {
        setOtherValue(text);
        setSpeciesFound(text);
        setSpeciesType("Other");
    }

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
            species_found: species_type === "Other" ?
                otherValue.trim() : species_found,
            species_type,
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
        <div>
            <form onSubmit={handleSubmit} className="flex-container">

                {/* New form section **************************** */}
                <div className="flex-section">

                    <label>Species Found*</label>
                    <InputPredictor
                        value={species_type === "Other" ?
                            "Other" : species_found}
                        onChange={handleSpeciesChange}
                        onSelect={handleSpeciesSelect}
                    />

                    {species_type === "Other" && (
                        <div>
                            <label htmlFor="other-species">
                                Species (other)*</label>
                            <input
                                id="other-species"
                                type="text"
                                value={otherValue}
                                onChange={(e) => handleOtherSpecies(e.target.value)}
                                placeholder="Enter other species"
                                required
                            />
                        </div>
                    )}

                    <label>Date Found*</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDateFound(e.target.value)}
                        required
                    />
                </div>

                {/* New form section **************************** */}
                <div className="flex-section">

                    <label>Location</label>
                    <input
                        type="text"
                        placeholder="Park name, city, etc."
                        value={location_name}
                        onChange={(e) => setLocationName(e.target.value)}
                    />

                    <label>Latitude, Longitude <small>(Decimal Degrees)</small>: </label>
                    <div className="flex-container">
                        <input
                            type="numeric"
                            className="lat-long-input"
                            placeholder="---.--------  latitude"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                        />
                        <input
                            type="numeric"
                            className="lat-long-input"
                            placeholder="---.--------  longitude"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                        />
                    </div>

                    <label>Weather</label>
                    <input
                        type="text"
                        placeholder="Rainy, unusually warm, etc."
                        value={weather}
                        onChange={(e) => setWeather(e.target.value)}
                    />
                </div>

                {/* New form section ***************************** */}
                <div className="flex-section">
                    <label>Notes</label>
                    <textarea
                        type="text"
                        placeholder="Trail name, harvesting details, recipes ..."
                        rows={5}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />

                    <label>Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setImageFile(e.target.files[0] ?? null)}
                    />

                    <ImageUploadPreview file={image_url} />

                    <div className="button-row flex-section">
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
                </div>
            </form>

            <p style={{ padding: `0 0 0 20px`, color: `white` }}>
                <small>* required field</small></p>

        </div >
    );
}
