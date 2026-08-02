import { Link } from "react-router-dom";

import "../../../styles/journalCard.css";
import defaultImage from "../../../assets/images/leaf.png";

export default function JournalCard({ entry }) {
    return (
        <article className="journal-card">

            <img
                className="journal-card-img"
                src={entry.image_url || defaultImage}
                alt={entry.species_found}
            />

            <div className="journal-card-content">

                <h2 className="text-centered text-capitalized entry-species">{entry.species_found}</h2>

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
                    <small>Entry created{" "}
                        {new Date(entry.created_at).toLocaleDateString()}
                    </small>
                </p>

            </div>

        </article>
    );
}