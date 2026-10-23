import React, { useState } from "react";
import { speciesList } from "../../../assets/data/speciesList";

// For predicting and sugggesting the input for species found when creating new entries

export default function InputPredictor({
    value = "",
    onChange = () => { },
    onSelect = () => { }, } = {}) {

    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // SpeciesList asset converted into array of objects
    const foods = Object.entries(speciesList).flatMap(
        ([category, species]) => {
            if (!Array.isArray(species)) {
                return [];
            }

            return species.map((food) => ({
                food, category,
            }));
        }
    );

    // display suggested input selection based on user input
    function handleChange(e) {
        const text = e.target.value;
        onChange(text);

        if (!text.trim()) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        const filtered = foods.filter(({ food }) =>
            food.toLowerCase().includes(text.toLowerCase())
        );
        setSuggestions(filtered);
        setShowSuggestions(true);
    }

    // selection handler
    function selectSuggestion(suggestion) {
        onChange(suggestion.food);
        onSelect(suggestion);

        setSuggestions([]);
        setShowSuggestions(false);
        //TESTING
        console.log("TEST selection = ", suggestion);
    }

    return (
        <div className="predictor">
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="What did you find?"
                autoComplete="off"
                required
            />

            {showSuggestions && suggestions.length > 0 && (

                <ul className="suggestions">
                    {suggestions.map(({ food, category }) => (

                        <li
                            key={`${category}-${food}`}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                selectSuggestion({ food, category })
                            }}
                        >
                            {food} <small>({category})</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
