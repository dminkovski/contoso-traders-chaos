import './header.scss'

import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { AppBar, Button } from '@mui/material';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { BagIcon, Logo, LogoutIcon, PersonalInformationIcon, ProfileIcon, SearchIconNew } from "app/assets/images";
import { Link } from 'react-router-dom';

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
  const renderMenu = (
    <StyledMenu
      id="profile-dropdown"
      anchorEl={null}
      keepMounted
      open={false}
    >
      <StyledMenuItem onClick={() => console.log("should navigate")}>
        <ListItemIcon>
          <PersonalInformationIcon/>
        </ListItemIcon>
        <ListItemText primary="Personal Information" />
        <ListItemIcon className='justify-content-end'></ListItemIcon>
      </StyledMenuItem>
      <StyledMenuItem onClick={()=> console.log("should logout")}>
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
              <img src={Logo} alt="" />
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
                onClick={()=> console.log("profile menu")}
                color="inherit"
              >
                <ProfileIcon/>
              </IconButton>
            </div>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <Button className='iconButton' aria-label="show 4 new mails" color="inherit" onClick={() => console.log("should login")} >
              Login
            </Button>
          </UnauthenticatedTemplate>
          <IconButton className='iconButton' aria-label="cart" color="inherit" onClick={() => console.log("should navigate to cart")} >
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