import { Link } from "react-router-dom";

// Handles the 404 page not found error
// user may click link to return to home page 

export default function NotFoundPage() {
    return (
        <div className="">404 Page Not Found
            <Link to="/">Return</Link>
        </div>
    );
}