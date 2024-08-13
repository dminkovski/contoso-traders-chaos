import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, IconButton } from '@mui/material';
import { BagIcon, CloseIcon, LogoutIcon, ProfileIcon } from "app/assets/images";
import CategoriesComponent from 'app/components/dropdowns/categories';
import { Link } from 'react-router-dom';

import useHeaderLogic from './header.logic';

const Header = (props) => {
    const { state, actions, data} = useHeaderLogic();
    const {CATEGORIES, locationPath} = data;
    const {isOpened} = state;
    const {logout, toggleIsOpened, login } = actions;
  
    return (
        <header className="header">
            <CategoriesComponent categories={CATEGORIES} />
            <nav className={isOpened ? 'main-nav is-opened' : 'main-nav'}>
                <Link className={locationPath === '/list/all-products' ? "main-nav__item_active" : "main-nav__item"} to="/list/all-products">
                    All Products
                </Link>
                {CATEGORIES.categorylist.map((item, key) => {
                    return (
                        <Link key={key} className={window.location.pathname === item.url ? "main-nav__item_active" : "main-nav__item"} to={item.url}>
                            {item.name}
                        </Link>
                    )
                })}
                <div className="main-nav__actions">
                    <Link className="main-nav__item" to="/profile/personal">
                        Profile
                    </Link>
                    <button className="u-empty main-nav__item" onClick={()=>logout()}>
                        Logout
                    </button>
                </div>
                <button className="u-empty btn-close" onClick={()=>toggleIsOpened()}>
                    <CloseIcon />
                </button>
            </nav>
            <nav className="secondary-nav">
                <AuthenticatedTemplate>
                    <Link to="/profile/personal">
                        <IconButton
                            className='iconButton'
                            // edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            //   onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <ProfileIcon/>
                        </IconButton>
                    </Link>
                </AuthenticatedTemplate>
                <Link className="secondary-nav__cart" to="/cart">
                    <IconButton className='iconButton' aria-label="cart" color="inherit" >
                        <Badge badgeContent={props.quantity} color="secondary" overlap="rectangular">
                            <BagIcon/>
                        </Badge>
                    </IconButton>
                </Link>
                <AuthenticatedTemplate>
                    <div className="secondary-nav__login" onClick={()=>logout()}>
                    <IconButton className='iconButton' aria-label="cart" color="inherit" >
                        <LogoutIcon/>
                    </IconButton>
                    </div>
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                    <div className="secondary-nav__login" onClick={()=>login()}>
                        <IconButton
                            aria-label="show more"
                            aria-haspopup="true"
                            // onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <LoginIcon />
                        </IconButton>
                    </div>
                </UnauthenticatedTemplate>
                <button className="u-empty" onClick={()=>toggleIsOpened()}>
                    {/* <Hamburger /> */}
                        <MenuIcon />
                </button>
            </nav>
        </header>

    );
}


export default Header;
