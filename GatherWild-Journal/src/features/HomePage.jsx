import leaf from "../assets/images/leaf.png";

export default function HomePage() {
    return (
        <div className="container-centered">
            <h1>Welcome to WildCraft Journal!</h1>
            <h3>Your favorite foraging companion</h3>

            <div className="row ">
                <div className="col orange-backer">
                    <p>
                        This is the place where you can maintain a record of the wild plants you've encountered.  Whether you're a mushroom hunter, berry picker, herbalist, or just like to get lost in the woods, we're here to keep track of your cool finds!
                    </p>
                    <p>
                        Log new entries with details such as location, weather, and any notes you may have.  Don't forget to include a picture as well!  Then visit your journal and see your entries whenever you'd like.
                    </p>
                    <p>
                        Exciting new features coming soon! Look for our map interface and fun facts about the plants you've discovered in the future.
                    </p>
                    <p>
                        <strong>
                            Happy foraging, wanderer!
                        </strong>
                    </p>
                </div>

                <div className="col">
                    <img src={leaf} alt="Leaf image" width="75"></img>
                    <h3>Need help?
                        We got you!</h3>

                    <h3>Have suggestions?
                        Let us know!</h3>

                    <p>DISCLAIMER: Never munch on a hunch!!! Please be certain that you have correctly identified the plant/fungus in question before consuming anything found or foraged in the wild.  We are not liable in the event of a misidentification. </p>

                </div>
            </div>
        </div>
    )
}