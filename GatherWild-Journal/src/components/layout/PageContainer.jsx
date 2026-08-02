import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

import "../../styles/layout.css";

import soilTexture from "../../assets/textures/Texturelabs_Soil_128S.jpg"

export default function PageContainer() {
    return (
        <div className="page-container">
            <Navbar />

            <main className="page-content">
                <section className="background-wrap">
                    <img className="soil-background" src={soilTexture}>
                    </img>

                    <div className="content-container">
                        <Outlet />
                    </div>

                </section>
            </main>

            <Footer />
        </div>
    );
}