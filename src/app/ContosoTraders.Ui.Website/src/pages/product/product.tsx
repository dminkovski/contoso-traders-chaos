import './product.scss'

import { Alert, Button, Grid, Snackbar } from "@mui/material";
import { AddToBagIcon, DiscountImage } from 'app/assets/images';
import CustomizedAccordions from "app/components/accordion/accordion";
import Breadcrump from "app/components/breadcrumb/breadcrumb";
import LoadingSpinner from "app/components/loadingSpinner/loadingSpinner";
import QuantityPicker from "app/components/quantityCounter/productCounter";
import { Link } from 'react-router-dom';

import useProductLogic from './product.logic';

const Product = () => {
    const { state, actions } = useProductLogic();
    const {product, alert, loading } = state;
    const {handleClose, addProductToCart, setQuantity} = actions;

    const accordionItems = [
        {
          name: 'panel1',
          title: 'Description',
          body:
            <Grid container spacing={2}>
              {product?.features.map((feature:{title:string, description:string}, index:number) => {
                return (
                  <div key={index}>
                    <Grid item xs={4} className="descpAttributes">
                      {feature.title}
                    </Grid>
                    <Grid item xs={8} className="descpDetails">
                      {feature.description}
                    </Grid>
                  </div>
                )
              })}
            </Grid>
        },
        {
          name : 'panel2',
          title : 'Offers',
          body :
          <div className="OffersSection">
          <div className="Offerslist">
            <span><img src={DiscountImage} className="discount_icon" alt=""/></span>
            <span>
              10% off on SBI Credit Card, up to ₹1,750, on orders of ₹5000 and
              above <Link to="/" className="TClink">T&C</Link>
            </span>
          </div>
          <div className="Offerslist">
          <span><img src={DiscountImage} className="discount_icon" alt=""/></span>
            <span>
              10% off on SBI Credit Card EMI Transactions, up to ₹2,250, on
              orders of ₹5000 and above <Link to="/" className="TClink">T&C</Link>
            </span>
          </div>
          <div className="Offerslist">
          <span><img src={DiscountImage} className="discount_icon" alt=""/></span>
            <span>
              Additional ₹750 discount on SBI Credit Card and EMI txns on net
              cart value of INR 29,999 and above <Link to="/" className="TClink">T&C</Link>
            </span>
          </div>
          <div className="Offerslist">
          <span><img src={DiscountImage} className="discount_icon" alt=""/></span>
            <span>
              No cost EMI ₹8,815/month. Standard EMI also available <Link to="/" className="TClink">View plans</Link>
            </span>
          </div>
          </div>
        }
      ]

      
    return (
        <div className="ProductContainerSectionMain">
            <Breadcrump parentPath='Products' parentUrl="/list/all-products" currentPath={product?.name} />
            <div className="ProductContainerSection">
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={alert.open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity={alert.type} sx={{ width: '100%' }}>
                        {alert.message}
                    </Alert>
                </Snackbar>
                {loading && <LoadingSpinner />}
                { product && (
                    <div className="ProductDetailsSection">
                    <Grid container>
                      <Grid item lg={6} md={5} xs={12} className="ProductImagesSection">
                        <Grid container>
                          <Grid item xs={10} className="productdetailsimagediv" style={{backgroundImage:`url(${product.imageUrl})`}}>
                            <img src={product.imageUrl} className="productdetailsimage" alt="" />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item lg={6} md={7} xs={12}>
                        <div className="detailsection">
                          <div className="productdetailName">
                            {product.name ? product.name : 'Default Product Name'}
                          </div>
                          <div >
                            <span className="newprice">
                                ${(product.price*0.75).toFixed(2)}
                            </span>
                            <span className="oldprice">{'$' + product.price?.toFixed(2)}</span>
                            <span className="newoffer">15%Off</span>
                          </div>
                          <div>
                            <span className="prodattributes">Quantity</span>
                            <span>
                              <QuantityPicker min={1} max={10} setQty={setQuantity} />
                            </span>
                          </div>
                          <div>
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<AddToBagIcon/>}
                              className="CartButton"
                              onClick={() => addProductToCart()}
                              disabled={loading}
                            >
                              {loading ? 'Adding...' : 'Add To Bag'}
                            </Button>
                          </div>
                          <div>
                            <div>
                              <CustomizedAccordions accordionItems={accordionItems} />
                            </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                    )
                }
            </div>
        </div>
    );
}

export default Product;