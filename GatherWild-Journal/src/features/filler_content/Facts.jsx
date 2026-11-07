import { useState, useEffect } from "react";
import { getFactOfTheDay } from "./factsService.js";
import "../../styles/styles.css";

/*
Displays a nature fact of the day: a popular plant or fungi species and its Wikipedia summary.
The fact changes once per day.
*/

export default function Facts() {

    const [fact, setFact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getFactOfTheDay().then(({ data, error }) => {
            if (error) {
                setError(error);
            } else {
                setFact(data);
            }
            setLoading(false);
        });
    }, []);

    return (
        <div className="white-backer mb-10">
            <h2>Specimen of the Day:</h2>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && fact && (
                <div>
                    {fact.photoUrl && (
                        <img
                            className="fact-img"
                            src={fact.photoUrl}
                            alt={fact.commonName}
                            title={fact.photoAttribution}
                        />
                    )}
                    <h3 className="fact-name">{fact.commonName}</h3>
                    <p className="fact-scientific"><em>{fact.scientificName}</em></p>
                    <p>{fact.summary}</p>
                    <a href={fact.wikipediaUrl} target="_blank" rel="noreferrer">
                        Read more
                    </a>
                </div>
            )}
        </div>
    )
}
