import './cart.scss'

import { Button, Chip, Grid, InputAdornment, TextField } from "@mui/material";
import Breadcrumb from "app/components/breadcrumb/breadcrumb";
import LoadingSpinner from "app/components/loadingSpinner/loadingSpinner";
import QuantityPicker from "app/components/quantityCounter/productCounter";
import { Link } from 'react-router-dom';

import useCartLogic from "./cart.logic";

const Cart = () => {
  const { state , data, actions, refs } = useCartLogic();
  const { loading, grandTotal, cartItems, invalidCoupon, coupon, total, delivery, discountPrice } = state;
  const { currentPath, parentPath, parentUrl } = data;
  const { navigate, removeFromCart, setCoupon, setDiscountPercentage, getCartItems, checkDiscount } = actions;
  const { textInput} = refs;

  return (
    <>
      {loading ? <LoadingSpinner /> : <div className="CartMain">
        <Breadcrumb currentPath={currentPath} parentPath={parentPath} parentUrl={parentUrl}  />
        <div className="CartSection">
          <div className="CartTopHeadPart">
            <h5 className="MyCartHeading">My Cart</h5>
            {cartItems.length > 0 && <>
              <h5 className="CartTopHeadTotal">Grand Total:</h5>
              <h5 className="CartTopGrandTotal">${grandTotal?.toFixed(2)}</h5>
              <Button variant="contained" className="PlaceOrderButton">Place Order</Button>
            </>}
          </div>
          <hr />

          <div className="innerCart">
            {cartItems.length === 0 &&
              <Grid container>
                <Grid item xs={12} container className="CartHeadings justify-content-center flex-column align-items-center">
                  <h1 className="text-dark">Your Cart is empty</h1>
                  <Button variant="contained" className="PlaceOrderButton" onClick={() => navigate('/list/all-products')}>Start Shopping</Button>
                </Grid>
              </Grid>
            }
            {cartItems.length > 0 && <div className="cart-header d-none d-lg-block d-md-block">
              <Grid container>
                <Grid item xs={12} container className="CartHeadings">
                  <Grid item xs={1}>
                    <span style={{ position: 'absolute' }}>Product Name</span>
                  </Grid>
                  <Grid item xs={11} container className="CartProducts">
                    <Grid item xs={2}></Grid>
                    <Grid item xs={2}>
                      Price
                    </Grid>
                    <Grid item xs={2}>
                      Qty
                    </Grid>
                    <Grid item xs={2}>
                      Subtotal
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <hr />
            </div>}
            {cartItems.map((item:any, key:any) => (
              <div key={key}>
                <Grid container className="allProductlist">
                  <Grid item lg={1} md={1} sm={8} xs={12} onClick={() => navigate('/product/detail/'+item.productId)} role="button">
                    <img src={item.imageUrl} className="imagesection" alt="" />
                  </Grid>
                  <Grid item lg={11} md={11} xs={12} className="CartProducts">
                    <Grid item xs={12} className="Productname">
                      {item.name}
                    </Grid>
                    <Grid item xs={12} className="Producttype">
                      Price / Unit : ${item.price?.toFixed(2)}
                    </Grid>
                    <Grid item xs={12} container className="align-items-center">
                      <Grid item lg={2} md={2} xs={12} className="Productqty">
                        Qty&nbsp;&nbsp;
                        <QuantityPicker max={10} min={1} qty={item.quantity} detailProduct={item} getCartItems={getCartItems} page="cart" />
                      </Grid>
                      <Grid item lg={2} md={2} xs={12} className="Productprice">
                        <b className="cart-hidden-detail mt-2 mb-2 mr-2 d-lg-none  d-inline-block">Price : </b>${item.price?.toFixed(2)}
                      </Grid>
                      <Grid item lg={2} md={2} xs={12} className="Productprice">
                        <b className="cart-hidden-detail mt-2 mb-2 mr-2 d-lg-none  d-inline-block">Qty : </b>{item.quantity}
                      </Grid>
                      <Grid item lg={2} md={2} xs={12} className="Productprice">
                        <b className="cart-hidden-detail mt-2 mb-2 mr-2 d-lg-none  d-inline-block">Subtotal : </b>${(item.price * item.quantity)?.toFixed(2)}
                      </Grid>
                      {/* <Grid item lg={2} md={2} xs={6} className="Productlinks">
                      <Link to="#" className="wishlistlink">
                        Move to wishlist
                      </Link>
                    </Grid> */}
                      <Grid item lg={2} md={2} xs={12} className="Productlinks">
                        <Link to="#" className="removelink" onClick={() => removeFromCart(item)}>
                          Remove
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <hr />
              </div>
            ))}

            {cartItems.length > 0 && <div>
              <Grid container className="couponOrderSection">
                <Grid item lg={4} md={5} xs={12}>
                  <Grid container>
                    <Grid item xs={12}>
                      <h2 className="CouponHeading "> Coupons </h2>
                    </Grid>

                    <Grid item xs={12} className="Couponbarsection">
                      <div className="pincodebar">
                        <span>
                          <TextField
                            className="pincodesearchbar"
                            // label="Enter coupon code"
                            id="outlined-error-helper-text"
                            error={invalidCoupon}
                            helperText={invalidCoupon ? "This coupon is invalid" : ""}
                            placeholder="Enter coupon code"
                            variant="outlined"
                            inputRef={textInput}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end'>
                                  <Button className={`${coupon.length >= 1 ? "pinsearchbtn" : "pinsearchbtn"}`} onClick={() => checkDiscount()}>CHECK</Button>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </span>
                      </div>
                    </Grid>

                    {coupon && <Grid item xs={12} >
                      <Chip label={coupon} onDelete={() => {setCoupon('');setDiscountPercentage(0)}} className="CouponChip" />
                      <hr />
                    </Grid>}
                  </Grid>
                </Grid>
                <Grid item lg={3} md={2} className="d-none d-lg-block d-md-block"></Grid>
                <Grid item lg={5} md={5} xs={12}>
                  <Grid container>
                    <Grid item xs={12} className="CouponHeading ">
                      Order Summary <hr style={{ margin: '8px 0 18px 0' }} />
                    </Grid>
                    <Grid item xs={10} className="OrderSubHeading">
                      Sub Total
                    </Grid>
                    <Grid item xs={2} className="OrderSubPrice" data-testid="subtotal">
                      ${total?.toFixed(2)}
                    </Grid>
                    <Grid item xs={10} className="OrderSubHeading">
                      Discount
                    </Grid>
                    <Grid item xs={2} className="OrderSubPrice text-success" data-testid="discount">
                      -${discountPrice?.toFixed(2)}
                    </Grid>
                    <Grid item xs={10} className="OrderSubHeading">
                      Delivery Fee
                    </Grid>
                    <Grid item xs={2} className="OrderSubPrice">
                      ${delivery?.toFixed(2)}
                    </Grid>
                    <Grid item xs={10} className="OrdertotalHeading">
                      Grand Total
                    </Grid>
                    <Grid item xs={2} className="OrderTotalPrice">
                      ${grandTotal?.toFixed(2)}
                    </Grid>
                    <Grid item xs={12}>
                      <hr />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} className="OrderButtonsection">
                  <Button variant="contained" className="PlaceOrderButton">
                    Place Order
                  </Button>
                </Grid>
              </Grid>
            </div>}
          </div>
        </div>
      </div>}
    </>
  );

}
export default Cart;