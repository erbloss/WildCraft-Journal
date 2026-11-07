import "../../styles/styles.css";
import Facts from "../../features/filler_content/Facts";
import Weather from "../../features/filler_content/Weather";


export default function LeftColumnContent() {

    return (
        <div className="left-column-content">
            <Weather />
            <Facts />

        </div>
    )
}