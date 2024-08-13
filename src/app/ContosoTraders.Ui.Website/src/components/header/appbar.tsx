import './header.scss'

import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { AppBar, Button } from '@mui/material';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { BagIcon, Logo, LogoutIcon, PersonalInformationIcon, ProfileIcon, SearchIconNew } from "app/assets/images";
import { loginRequest } from 'app/config/authConfig';
import useAuthentication from 'app/hooks/useAuthentication';
import { dispatchLogin, dispatchLogout } from 'app/shared/reducers/authentication.reducer';
import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StyledMenu = ((props) => (
  <Menu
    elevation={0}
    getcontentanchorel={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = (MenuItem);
function TopAppBar(props) {  
  const menuId = 'primary-search-account-menu';
  const { actions: {login, logout} } = useAuthentication();

  const navigate = useNavigate();

  
  
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts, inProgress } = useMsal();
  const isLoading = useRef<boolean>(false);
  // Start a Login process if the user is not authenticated and there is no login process already going on.
  useEffect(() => {
      if (!isAuthenticated && inProgress == "none" && !isLoading.current) {
      (isLoading as any).current = true;
      dispatchLogout();
      login();
      (isLoading as any).current = false;
      } else {
      if (accounts.length > 0 && inProgress == "none" && !isLoading.current){
          (isLoading as any).current = true;
          dispatchLogout();
          const account = accounts[0];
          instance.acquireTokenSilent({
          scopes: loginRequest.scopes,
          account
          }).then((response) => {
              if(response) {
              dispatchLogin(account, response.accessToken);
              (isLoading as any).current = false;
              }
          });
      }
      }
  }, [isAuthenticated, inProgress, accounts]);

  const renderMenu = (
    <StyledMenu
      id="profile-dropdown"
      anchorEl={null}
      keepMounted
      open={false}
    >
      <StyledMenuItem onClick={() => navigate("/profile")}>
        <ListItemIcon>
          <PersonalInformationIcon/>
        </ListItemIcon>
        <ListItemText primary="Personal Information" />
        <ListItemIcon className='justify-content-end'></ListItemIcon>
      </StyledMenuItem>
      <StyledMenuItem onClick={()=> logout()}>
        <ListItemIcon>
          <LogoutIcon/>
        </ListItemIcon>
        <ListItemText primary="Logout" />
        <ListItemIcon className='justify-content-end'>
        </ListItemIcon>
      </StyledMenuItem>
    </StyledMenu>
  );

  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar color='inherit' className='appbar box-shadow-0' position="static">
        <Toolbar className='p-0'>
          <div className='headerLogo'>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div style={{ flexGrow: 1 }} />
          <AuthenticatedTemplate>
            <div className={`sectionDesktop d-none d-md-block`}>
              <IconButton
                className='iconButton'
                // edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={()=> navigate("/profile")}
                color="inherit"
              >
                <ProfileIcon/>
              </IconButton>
            </div>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <Button className='iconButton' aria-label="show 4 new mails" color="inherit" onClick={()=> login()} >
              Login
            </Button>
          </UnauthenticatedTemplate>
          <IconButton className='iconButton' aria-label="cart" color="inherit" onClick={() => navigate("/cart")} >
            <Badge badgeContent={props.quantity} color="secondary" overlap="rectangular">
              <BagIcon/>
            </Badge>
          </IconButton>
          <div className={`sectionMobile d-block d-md-none d-lg-none`}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={()=>console.log("mobile menu open")}
              color="inherit"
            >
             <SearchIconNew/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}

export default TopAppBar;