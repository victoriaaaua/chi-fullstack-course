import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';
import { useContext, useState } from 'react';

const drawerWidth = 240; 

const MainLayout = () => {
    const { themeContext } = useContext(ThemeContext);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = (isOpen) => {
        setDrawerOpen(isOpen);
    };

    return (
        <div>
            <NavBar onDrawerToggle={handleDrawerToggle} />
            <Box sx={{ display: 'flex', height: '100vh', background: themeContext.palette.background.main }}>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 12,
                        pt: 8,
                        ml: drawerOpen ? `${drawerWidth}px` : '0', 
                        transition: 'margin 0.3s ease', 
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </div>
    );
};

export default MainLayout;