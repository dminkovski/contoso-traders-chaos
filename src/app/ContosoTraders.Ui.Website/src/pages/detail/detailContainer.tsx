import './detail.scss'

import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Alert, Snackbar } from "@mui/material";
import React, { useCallback } from "react";
import { connect } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";

import Breadcrump from "../../components/breadcrumb/breadcrumb";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";
import { CartService, ProductService } from '../../services';
import ProductDetails from "./productDetails";

function DetailContainer(props) {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [detailProduct, setDetailProduct] = React.useState({})
    const [loadingRelated, setLoadingRelated] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [alert, setAlert] = React.useState({ open: false, type: 'error', message: '' })
    const relatedDetailProducts = []
    const [qty, setQty] = React.useState(1);

    const isAuthenticated = useIsAuthenticated();
    const { accounts } = useMsal();



    const getDetailPageData = useCallback( async (productId) => {
        let detailProducts = await ProductService.getDetailProductData(productId);
        if(detailProducts){
            setDetailProduct(detailProducts)
        }else{
            navigate('/product-not-found');
        }
        setLoading(false)
    },[navigate]);

    React.useEffect(() => {
        getDetailPageData(productId);
    }, [productId, getDetailPageData]);


    const getQuantity = async () => {
        if (props.userInfo.token) {
            const shoppingcart = await CartService.getShoppingCart(
                props.userInfo.token
            );
            if (shoppingcart) {
                let quantity = shoppingcart.length;
                props.getCartQuantity(quantity)
            }
        }else{
            let cartItem = localStorage.getItem('cart_items') ? JSON.parse(localStorage.getItem('cart_items')) : []
            let quantity = cartItem.length;
            props.getCartQuantity(quantity)
        }
    }


    const addProductToCart = useCallback(async () => {
        var tempProps = JSON.parse(JSON.stringify(detailProduct));
        if(!isAuthenticated){
            let cartItem = {
                imageUrl: detailProduct.imageUrl,
                name: detailProduct.name,
                price: detailProduct.price,
                productId: detailProduct.id,
                quantity: qty,
                type: detailProduct.type
            }
            let arr = localStorage.getItem('cart_items') ? JSON.parse(localStorage.getItem('cart_items')) : []
            let objIndex = arr.findIndex((obj => obj.productId === detailProduct.id));
            if(objIndex === -1){
                arr.push(cartItem)
                localStorage.setItem('cart_items',JSON.stringify(arr))
                showSuccesMessage(`Added ${detailProduct.name} to Cart`)
            }else{
                showErrorMessage({errMessage : `Already Added to Cart`})
            }
            setLoadingRelated(true)
            getQuantity()
        }else {
            if (accounts.length > 0) {
                const email = accounts[0].username;
                tempProps.email = email;
                tempProps.quantity = qty;
                Object.preventExtensions(tempProps);
                setDetailProduct(tempProps)
                const productToCart = await CartService.addProduct(props.userInfo.token, tempProps)

                if (productToCart.errMessage) {
                    return showErrorMessage(productToCart)
                } else {
                    // Show UI message and not server response
                    showSuccesMessage("Added to shopping cart!");
                    getQuantity();
                }
            } else {
                console.error("The account is missing.");
            }
            
        }
    }, [accounts]);

    const showSuccesMessage = (data) => {
        setAlert({ open: true, type: 'success', message: data })
    }

    const showErrorMessage = (data) => {
        setAlert({ open: true, type: 'error', message: data.errMessage })
    }
    const handleClose = () => {
        setAlert({ open: false, type: 'error', message: '' })
    }
    return (
        <div className="ProductContainerSectionMain">
            <Breadcrump parentPath='Products' parentUrl="/list/all-products" currentPath={detailProduct.name} />
            <div className="ProductContainerSection">
                <Snackbar anchorOrigin={{ vertical:'bottom', horizontal:'right' }} open={alert.open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alert.type} sx={{ width: '100%' }}>
                        {alert.message}
                    </Alert>
                </Snackbar>
                {loading ? <LoadingSpinner /> :
                    <ProductDetails
                        loggedIn={isAuthenticated}
                        detailProductData={detailProduct}
                        addProductToCart={addProductToCart}
                        loadingRelated={loadingRelated}
                        relatedDetailProducts={relatedDetailProducts}
                        setQty={setQty}
                    />
                }
            </div>
        </div>
    );
}
// }

const mapStateToProps = state => state.login;

const mapDispatchToProps = (dispatch) => ({
    getCartQuantity: (value) => dispatch(getCartQuantity(value)),
})

export default connect(mapStateToProps,mapDispatchToProps)(DetailContainer);