import { Grid } from "@mui/material";
import Product from "app/components/productCard/product";

const ListGrid = ({ productsList }) => {
    return (
        <div className="list-grid">
            <div className="filter-section">
                <div className="page">Showing 1 - {productsList ? productsList.length : 0} of {productsList ? productsList.length:0} items</div>
            </div>
            {productsList && productsList.length > 0 ?
            <Grid container justifyContent="center" spacing={3}>             
                {productsList && productsList.map((productsListInfo, index) => {
                    return <Grid key={index} item lg={4} sm={6} xs={12}><Product {...productsListInfo} key={index} /></Grid>;
                })}
            </Grid>
            :
            <p className="text-left">No Products Found</p>}
            <Grid className="pagination">
            </Grid>
        </div> 
    );
};

export default ListGrid;
