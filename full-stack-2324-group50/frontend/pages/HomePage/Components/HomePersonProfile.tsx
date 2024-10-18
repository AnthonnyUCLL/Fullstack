import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Backdrop, Container, Dialog, DialogContent, IconButton, Input } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';



function HomePersonProfile() {
    return(
        <div>
    <Card
            sx={{
                position: 'fixed',
                top: '75px',
                right: '10px',
                width: '20%',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderRadius: '5px',
                fontSize: '18px',
                height: 'calc(100vh - 90px)',
                overflow: 'auto',
            }}
            >
            <img
                    src="/img/bannerPicture.webp"
                    alt="Banner Picture"
                    style={{ width: '100%', height: '170px', objectFit: 'cover' }}
                />
            <Avatar
                    src="/"
                    sx={{
                    position: 'absolute',
                    top: '11%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                    width: 80,
                    height: 80,
                    border: '2px solid white',
                    }}
                />
                <Box sx={{display:'flex', gap:'40px', mt:"10px", borderBottom:'1px solid lightgrey'}}>
                <IconButton>
                    <LocalPhoneIcon></LocalPhoneIcon>
                </IconButton>
                <IconButton>
                    <VideoChatIcon></VideoChatIcon>
                </IconButton>
                <IconButton>
                    <MoreHorizIcon></MoreHorizIcon>
                </IconButton>
                </Box>

                
                <Typography variant="h4">John Doe</Typography>
                <Box sx={{flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '10px',}}>
                <Typography variant="subtitle1">title</Typography>
                <Typography variant="body1">location</Typography>
                <Typography variant="body2">connections</Typography>
                <Typography variant="body1" sx={{ marginTop: '20px' }}>
                    about
                </Typography>
                </Box>
            </Card>
        </div>
    )
}

export default HomePersonProfile;
