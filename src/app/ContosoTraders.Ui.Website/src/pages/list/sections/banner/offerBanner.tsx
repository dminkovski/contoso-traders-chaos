import {OfferBanner as OfferBannerImg} from "app/assets/images";

const OfferBanner = () => {
    return (
        <div className="offer_banner">
            <img src={OfferBannerImg} style={{width:"100%"}}/>
        </div>
    );
};

export default (OfferBanner);
