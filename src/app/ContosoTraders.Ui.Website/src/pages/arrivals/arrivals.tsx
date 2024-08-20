import './arrivals.scss'

import Slider from "app/components/slider/slider";
import Banner from "app/pages/home/sections/banner";

const Arrivals = () => {
    return (
        <div className="arrivals">
            <Banner firstHeading="Newly Launched Lunar Shift Controller" secondHeading="Textured triggers and bumpers | Hybrid D-pad | Button mapping | Bluetooth® technology"/>
            <Slider firstHeading="Newly Arrived" secondHeading="CONTROLLERS"/>
            <hr/>
            <Slider firstHeading="Newly Arrived" secondHeading="LAPTOPS"/>
            <hr/>
            <Slider firstHeading="Newly Arrived" secondHeading="GAMING ACCESSORIES"/>
            <hr/>
        </div>
    );
};

export default Arrivals;