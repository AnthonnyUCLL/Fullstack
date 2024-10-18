import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Language from '../pages/HomePage/Components/Languages/index';

function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleClose = () => {
    setAnchorEl(null);
  };
  

  const handleDropDownMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorEl !== null) {
      handleClose();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const toProfile = () => {
    router.push('../Profile/Profile');
  };

  return (
    <div>
  <AppBar position="fixed" sx={{ zIndex: 2000 }}>
    <Toolbar
      sx={{
        backgroundColor: '#e00049',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', // Center vertically
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <DashboardIcon sx={{ color: 'white', mr: 2, transform: 'translateY(-2px)' }} />
        <Typography variant="h6" noWrap component="div" color="white">
          UConnect
        </Typography>
      </div>
      <Box sx={{ display: 'flex', gap: '2em', alignItems: 'center' }}>
        <Language />
        <Button
          onClick={handleDropDownMenu}
          style={{
            width: '45px',
            height: '45px',
            justifyContent: 'flex-end',
            borderRadius: '50%',
          }}
        >
          <Avatar
            alt={'profile'}
            src='/img/profileImage.jpeg'
            style={{
              width: '45px',
              height: '45px',
              objectFit: 'cover',
            }}
          />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={toProfile}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Manage Friends</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  </AppBar>
</div>

  );
}


export default Header;