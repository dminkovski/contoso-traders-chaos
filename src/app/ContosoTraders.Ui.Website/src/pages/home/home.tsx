import "./home.scss";

import React from "react";

import Finalsection from "./sections/finalSection";
import Gridsection from "./sections/gridSection";
import Hero from "./sections/hero";

const Home = ():React.ReactElement => {

    return (
        <div className="home">
            <Hero />
            <Gridsection />
            <Finalsection />
        </div>
    );
};

export default Home;
