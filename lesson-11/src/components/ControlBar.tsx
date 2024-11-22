'use client'

import React from 'react';
import { AppBar, Box, Toolbar, Button, IconButton, Select, MenuItem, Typography} from '@mui/material';
import { useRouter } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import SwapVertSharpIcon from '@mui/icons-material/SwapVertSharp';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { logout } from '../store/slices/userSlice';
import { RootState } from '../store/store';
import { UserState } from '../store/slices/userSlice';
import { useControlBar } from '../contexts/ControlBarContext';

const ControlBar: React.FC<any> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user.state);
  const username = useSelector((state: RootState) => state.user.userName);

  const {handleSort, handleSelectChange, isShowMyPosts} = useControlBar();

  const handleLogin = () => router.push('/login'); 
  const handleLogout = () => {
    dispatch(logout());
    console.log("You are logged out")
    setTimeout(() => {
      router.push('/exhibits');
    }, 1000);
  };

  return (
    <Box sx={{ width: '100%', mb: 10, padding: 0 }}>
      <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0 }}>
        <Toolbar sx={{ padding: 0, display: 'flex', justifyContent: 'space-between' }}>
        <Link href={userState === UserState.loggedIn ? "/home" : "/exhibits"} passHref>
        <Box
          sx={{
            textDecoration: 'none',
            color: 'white',
            fontSize: '1.2rem',
            paddingRight: '1rem',
            ml: 3,
          }}
        >
            Home
          </Box>
          </Link>

          {userState === UserState.loggedIn && (
            <>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={() => router.push('/new-post')} sx={{ mr: 2 }}>
                <AddIcon />
              </IconButton>
              <Typography sx={{ fontSize: 18 }}>{`Hello, ${username}`}</Typography>
              <Select
                value={isShowMyPosts ? 'myPosts' : 'allPosts'}
                onChange={handleSelectChange}
                sx={{ color: 'white', ml: 2 }}
              >
                <MenuItem value="myPosts">My posts</MenuItem>
                <MenuItem value="allPosts">All posts</MenuItem>
              </Select>
              <IconButton onClick={handleSort} color="inherit">
                <SwapVertSharpIcon sx={{ cursor: 'pointer' }} />
              </IconButton>
            </>
          )}

          <Button sx={{ mr: 3 }} color="inherit" onClick={userState === UserState.loggedIn ? handleLogout : handleLogin}>
            {userState === UserState.loggedIn ? 'Logout' : 'Login'}
          </Button>
   
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ControlBar;
