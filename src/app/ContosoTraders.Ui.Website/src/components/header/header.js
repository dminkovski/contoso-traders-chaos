import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';

import CategoriesComponent from '../dropdowns/categories';

import { Badge, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';

import laptopsImg from '../../assets/images/original/Contoso_Assets/Mega_menu_dropdown_assets/laptop_icon.svg';
import controllersImg from '../../assets/images/original/Contoso_Assets/Mega_menu_dropdown_assets/controllers_icon.svg';
import desktopsImg from '../../assets/images/original/Contoso_Assets/Mega_menu_dropdown_assets/desktops_icon.svg';
import mobilesImg from '../../assets/images/original/Contoso_Assets/Mega_menu_dropdown_assets/mobiles_icon.svg';
import monitorImg from '../../assets/images/original/Contoso_Assets/Mega_menu_dropdown_assets/monitor_icon.svg';
import ProfileIcon from '../../assets/images/original/Contoso_Assets/Icons/profile_icon.svg'
import BagIcon from '../../assets/images/original/Contoso_Assets/Icons/cart_icon.svg'
import logout_icon from "../../assets/images/original/Contoso_Assets/profile_page_assets/logout_icon.svg";
import { ReactComponent as Close } from '../../assets/images/icon-close.svg';

const CATEGORIES = {
    title: 'All Categories',
    categorylist: [
        {
            name: 'Laptops',
            url: '/list/laptops',
            img: laptopsImg
        },
        {
            name: 'Controllers',
            url: '/list/controllers',
            img: controllersImg
        },
        {
            name: 'Desktops',
            url: '/list/desktops',
            img: desktopsImg
        },
        {
            name: 'Mobiles',
            url: '/list/mobiles',
            img: mobilesImg
        },
        {
            name: 'Monitors',
            url: '/list/monitors',
            img: monitorImg
        },
    ]
}

const Header = (props) => {
    const [isOpened, setIsOpened] = useState(false);
    const { instance } = useMsal();
    const locationPath = window.location.pathname;

    const setComponentVisibility = (width) => {
        if (width > 1280) {
            setIsOpened(false);
        }
    }

    const toggleIsOpened = () => {
        setIsOpened(o => !o);
    }

    const onClickLogout = async () => {
        localStorage.clear();
        await instance.logout();
    }

    const onClickLogIn = async () => {
        await instance.loginPopup();
    }

    useEffect(()=>{
        setComponentVisibility(document.documentElement.clientWidth);
        window.addEventListener('resize', function () {
            setComponentVisibility(document.documentElement.clientWidth);
        });
    }, []);

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
                    <button className="u-empty main-nav__item" onClick={()=>onClickLogout()}>
                        Logout
                    </button>
                </div>
                <button className="u-empty btn-close" onClick={()=>toggleIsOpened()}>
                    <Close />
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
                            <img src={ProfileIcon} alt="iconimage" />
                        </IconButton>
                    </Link>
                </AuthenticatedTemplate>
                <Link className="secondary-nav__cart" to="/cart">
                    <IconButton className='iconButton' aria-label="cart" color="inherit" >
                        <Badge badgeContent={props.quantity} color="secondary" overlap="rectangular">
                            <img src={BagIcon} alt="iconimage" />
                        </Badge>
                    </IconButton>
                </Link>
                <AuthenticatedTemplate>
                    <div className="secondary-nav__login" onClick={()=>onClickLogout()}>
                    <IconButton className='iconButton' aria-label="cart" color="inherit" >
                        <img src={logout_icon} alt="iconimage" />
                    </IconButton>
                    </div>
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                    <div className="secondary-nav__login" onClick={()=>onClickLogIn()}>
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
                    <IconButton
                        aria-label="show more"
                        aria-haspopup="true"
                        // onClick={handleMobileMenuOpen}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                </button>
            </nav>
        </header>

    );
}

const mapStateToProps = (state) => { 
    return { 
      theme :  state.login.theme,
      quantity : state.login.quantity
    }
  };

export default (connect(mapStateToProps)(Header));
