import './product.scss'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const Product = (props) => {
  const navigate = useNavigate()
  const  { prodImg, imageUrl, name, price, id, type } = props;
  const productDetailPage = (id = 1) => {
   navigate('/product/detail/'+id)
  }

  const discountOffer = (price) => {
    let dicsount:number = price*0.75;
    return(
      <Typography variant="h6" color="initial" component="h6" style={{marginRight:'auto'}} className="productOrgPrice m-0 mr-1">
        ${dicsount.toFixed(2)}
      </Typography>
    )
  }

  return (
    <Card className="productCard" onClick={() => productDetailPage(id)}>
      <CardMedia
        image={prodImg?prodImg:imageUrl}
        title={name?name:''}
      />
      <CardContent>
        <div style={{display:'flex',alignItems:'center',marginBottom:'8.25px'}}>
            <Typography variant="h6" color="initial" component="h6" className='productName' style={{marginRight:'auto'}}>
                {name?name:'Lunar Shift Special Edition'}
            </Typography>
            <IconButton className='wishlist_icon' aria-label="add to favorites">
                {/* <img src={WishlistIcon} alt="like"/> */}
            </IconButton>
        </div>
        <Typography variant="body2" color="textSecondary" className='productType' component="p">
          {type?type.name:'Controller'}
        </Typography>
        <div style={{display:'flex',alignItems:'center',paddingTop:'10px'}}>
            {discountOffer(price)}
            <Typography paragraph color="textSecondary" className="productOldPrice m-0 mr-1">
              ${price?price.toFixed(2):'00.00'} 
            </Typography>
            <Typography paragraph color="error" className="productOffer m-0 mr-1 ">
                15% OFF
            </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
export default Product;