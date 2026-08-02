import React, { useState } from "react";
import { speciesList } from "../../../assets/data/speciesList";

// For predicting and sugggesting the input for species found when creating new entries

export default function InputPredictor({
    value = "",
    onChange = () => { }, } = {}) {

    // Flattened array of commonly foraged foods
    const foods = Object.values(speciesList).flat();

    const [suggestions, setSuggestions] = useState([]);

    function handleChange(e) {
        const text = e.target.value;
        onChange(text);

        if (!text.trim()) {
            setSuggestions([]);
            return;
        }
        const filtered = foods.filter(food =>
            food.toLowerCase().includes(text.toLowerCase())
        );
        setSuggestions(filtered);
    }

    function selectSuggestion(food) {
        onChange(food);
        setSuggestions([]);
    }

    return (
        <div className="predictor">
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="Species Found"
                autoComplete="off"
            />

            {suggestions.length > 0 && (

                <ul className="suggestions">
                    {suggestions.map(food => (

                        <li
                            key={food}
                            onMouseDown={() => selectSuggestion(food)}
                        >
                            {food}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
