import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { logout } from '../store/slices/userSlice';
import { Select, MenuItem, Typography } from '@mui/material';
import SwapVertSharpIcon from '@mui/icons-material/SwapVertSharp';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select';
import { RootState } from '../store/store';
import { UserState } from '../store/slices/userSlice';


interface ControlBarProps {
    isShowMyPosts?: boolean;
    handleSelectChange?: (event: SelectChangeEvent<string>) => void; 
    handleSort?: () => void;
  }

const ControlBar: React.FC<ControlBarProps> = ({
  isShowMyPosts = false,  
  handleSelectChange = () => {},  
  handleSort = () => {},  
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const userState = useSelector((state: RootState) => state.user.state);
  const username = useSelector((state: RootState) => state.user.userName); 


  const handleLogin = () => {
    navigate('/login');
  };

  const navigateToAddPhoto = () => {
    navigate('/post');
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  
  return (
    <>
      <Box sx={{ width: '100%', mb: 10, padding: 0 }}>
        <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0 }}>
          <Toolbar sx={{ padding: 0, display: 'flex', justifyContent: 'space-between' }}>
            <Box
              component={Link}
              to={(userState === UserState.loggedIn) ? "/home" : "/"}
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

            {(userState === UserState.loggedIn) && (
              <>
              
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={navigateToAddPhoto} sx={{ mr: 2 }}>
                  <AddIcon />
                </IconButton>
                <Typography sx={{fontSize: 18}}>
                {`Hello, ${username}`}
              </Typography>

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

            {(userState === UserState.loggedIn) ? (
              <Button sx={{ mr: 3 }} color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ):(
              <Button sx={{ mr: 3 }} color="inherit" onClick={handleLogin}>
              Login
            </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
     </>
  );
};

export default ControlBar;
