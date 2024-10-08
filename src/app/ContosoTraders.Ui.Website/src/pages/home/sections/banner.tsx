import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface BannerProps {
  firstHeading: string;
  secondHeading: string;
}

function Banner(props:BannerProps) {
  const history = useNavigate()
  const startShopping = () => {
    history('/list/controllers')
  }
  return (
    <section>
      <Grid className="BannerSection" container>
        <Grid item xs={6}>
          <div className="BannerHeading">
            {props.firstHeading}
          </div>
          <div className="BannerContent">
            {props.secondHeading}
          </div>
          <div className="BannerButtondiv">
            <button className="BannerButton" onClick={() => startShopping()} >Start Shopping</button>
          </div>
        </Grid>
      </Grid>
    </section>
  );
}

export default Banner;