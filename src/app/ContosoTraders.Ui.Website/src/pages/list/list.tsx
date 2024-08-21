import { Grid } from "@mui/material";
import Breadcrumb  from "app/components/breadcrumb/breadcrumb";
import { useLocation } from "react-router-dom";

import { ListAside, ListGrid, OfferBanner } from "./sections";

const List = ({ typesList, brandsList, onFilterChecked, productsList }) => {
    const location = useLocation();
    const currentCategory = location?.pathname?.split("/")?.pop()?.replaceAll('-',' ');

    return (
        <div className="list">
            {currentCategory === 'all products'?
            <Breadcrumb currentPath='Product Collection' />
            :
            <Breadcrumb parentPath='Product Collection' parentUrl="/list/all-products" currentPath={currentCategory} />}
            <OfferBanner />
            <div className="list__content">
                <h6 className="mainHeading">{currentCategory}</h6>
                <Grid container>
                    <Grid item lg={3} xs={12}>
                        <ListAside
                            onFilterChecked={onFilterChecked}
                            typesList={typesList}
                            brandsList={brandsList}
                        />
                    </Grid>
                    <Grid item lg={9} xs={12}>
                        <ListGrid productsList={productsList} />
                    </Grid>
                </Grid>
            </div>
            <hr className="m-0"/>
        </div>
    );
};

export default (List);
