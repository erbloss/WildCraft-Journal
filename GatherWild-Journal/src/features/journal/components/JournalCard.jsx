import { Link } from "react-router-dom";
import "../../../styles/journalCard.css";

export default function JournalCard({ entry }) {
    return (
        <article className="journal-card">
            {entry.image_url && (
                <img className="journal-card-img" src={entry.image_url} alt={entry.species_found} />
            )}

            <div className="journal-entry-content">
                <h2>{entry.species_found}</h2>

                <p>
                    <strong>Date Found:</strong>
                    {" "}{new Date(entry.date).toLocaleDateString()}
                </p>

                <p>
                    <strong>Location:</strong>
                    {" "}{entry.location_name}
                </p>

                <p className="journal-entry-notes">
                    {entry.notes}
                </p>

                <Link to={`/entries/${entry.id}/edit`} className="journal-card-button">
                    View / Edit
                </Link>
            </div>
        </article>
    );
}