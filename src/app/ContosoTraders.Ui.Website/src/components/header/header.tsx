import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, IconButton } from '@mui/material';
import { BagIcon, CloseIcon, ControllersIcon, DesktopsIcon, LaptopsIcon, LogoutIcon, MobilesIcon, MonitorIcon, ProfileIcon } from "app/assets/images";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import CategoriesComponent from '../dropdowns/categories';

const CATEGORIES = {
    title: 'All Categories',
    categorylist: [
        {
            name: 'Laptops',
            url: '/list/laptops',
            img: LaptopsIcon
        },
        {
            name: 'Controllers',
            url: '/list/controllers',
            img: ControllersIcon
        },
        {
            name: 'Desktops',
            url: '/list/desktops',
            img: DesktopsIcon
        },
        {
            name: 'Mobiles',
            url: '/list/mobiles',
            img: MobilesIcon
        },
        {
            name: 'Monitors',
            url: '/list/monitors',
            img: MonitorIcon
        },
    ]
}

const Header = (props) => {
    const dispatch = useDispatch();
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
        alert("Logout successful.");
    }

    const onClickLogIn = async () => {
        const user = await instance.loginPopup();
        if (user) {
           
        }      
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
                    <div className="secondary-nav__login" onClick={()=>onClickLogout()}>
                    <IconButton className='iconButton' aria-label="cart" color="inherit" >
                        <LogoutIcon/>
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
                        <MenuIcon />
                </button>
            </nav>
        </header>

    );
}


export default Header;
