import companyName from "../../assets/images/companyName.png";

export default function Navbar() {
    return (
        <section className="header">
            <section className="banner-background"></section>

            <nav>
                <div className="topnav">
                    <a className="active" href="/dashboard">Journal Home</a>
                    <a href="/entries">New Entry</a>
                    <a href="/">Edit Entry</a>
                    <a href="/">Sign Out</a>
                </div>
            </nav>


        </section>
    );
}