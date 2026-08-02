import { Link } from "react-router-dom";

import "../../../styles/journalCard.css";

export default function JournalCard({ entry }) {
    return (
        <article className="journal-card">

            {entry.image_url && (
                <img
                    className="journal-card-image"
                    src={entry.image_url}
                    alt={entry.species_found}
                />
            )}

            <div className="journal-card-content">

                <h2 className="text-centered text-capitalized">{entry.species_found}</h2>

                <p>
                    <strong>Date Found:</strong>{" "}
                    {new Date(entry.date).toLocaleDateString()}
                </p>

                <p className="text-capitalized">
                    <strong>Location:</strong>{" "}
                    {entry.location_name} {" ("}
                    {entry.latitude} {", "} {entry.longitude}{")"}
                </p>

                <p className="journal-card-notes">
                    {entry.notes}
                </p>

                <Link
                    to={`/entries/${entry.id}/edit`}
                    className="button journal-card-button"
                >
                    View / Edit
                </Link>

                <p className="text-right">
                    <small>Entry created:{" "}
                        {new Date(entry.created_at).toLocaleDateString()}
                    </small>
                </p>

            </div>

        </article>
    );
}