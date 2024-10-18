import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Language from '../pages/HomePage/Components/Languages/index';

function HeaderWithoutProfile(){
    return(
        <div>
            <AppBar position="fixed" sx={{ zIndex: 2000 }}>
                <Toolbar sx={{ backgroundColor: '#e00049', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <DashboardIcon sx={{ color: 'white', mr: 2, transform: 'translateY(-2px)' }} />
                        <Typography variant="h6" noWrap component="div" color="white">
                            UConnect
                        </Typography>
                    </div>
                    <Language />
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default HeaderWithoutProfile;