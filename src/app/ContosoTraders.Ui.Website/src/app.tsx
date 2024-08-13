import "app/main.scss";

import { WarningIcon } from 'app/assets/images';
import {Appbar, Footer, Header, HeaderMessage} from "app/components";
import {
  AboutUs,
  Arrivals,
  Cart,
  Detail,
  ErrorPage,
  Home,
  List,
  Profile,
  RefundPolicy,
  SuggestedProductsList,
  TermsOfService,
} from "app/pages";
import React, { Fragment } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
    const location = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
      <div className={`App light`}>
        <Fragment>
          <div className="mainHeader">
            <HeaderMessage type="warning" icon={WarningIcon} message="This Is A Demo Store For Testing Purposes — No Orders Shall Be Fulfilled."/>
            <Appbar />
            {location.pathname === '/' || location.pathname === '/new-arrivals' ?
              <Header/>
              :
              <div id="box"></div>}
          </div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/new-arrivals" element={<Arrivals/>} />
            <Route path="/list" element={<List/>} />
            <Route path="/list/:code" element={<List/>} />
            <Route
              path="/suggested-products-list"
              element={<SuggestedProductsList/>}
            />
            <Route
              path="/product/detail/:productId"
              element={<Detail/>}
            />
            <Route path="/refund-policy" element={<RefundPolicy/>} />
            <Route path="/terms-of-service" element={<TermsOfService/>} />
            <Route path="/about-us" element={<AboutUs/>} />
            <Route path="/profile/:page" element={<Profile/>} />
            <Route path="/cart" element={<Cart/>}/>
            <Route path="*" element={<ErrorPage/>} />
          </Routes>
          <Footer />
        </Fragment>
      </div>
    );
  }
// }

export default App;
