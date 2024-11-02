import React, { createContext, useState } from 'react';
import { createTheme } from '@mui/material';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#FBF8F1',
            },
            background: {
                default: '#B3A492',
                main: '#F0ECE3',
                paper: '#E1D7C6',
            },
            text: {
                primary: '#000000',
                secondary: '#000000',
                paragraph: '#697565'
            },
            hoverColor: {
                main: '#ECE8DD',
            },
            navBarColor: {
                main: '#27374D',
            },
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#DDE6ED',
            },
            hoverColor: {
                main: '#31363F',
            },
            background: {
                default: '#27374D',
                main: '#9DB2BF',
                paper: '#222831',
            },
            text: {
                primary: '#EEEEEE',
                secondary: '#343131',
                paragraph: '#1E201E'
            },
            navBarColor: {
                main: '#9DB2BF',
            }
        },
    });

    const [themeContext, setThemeContext] = useState(lightTheme);

    const toggleTheme = () => {
        setThemeContext((prevTheme) =>
            prevTheme.palette.mode === 'light' ? darkTheme : lightTheme
        );
    };

    return (
        <ThemeContext.Provider value={{ themeContext, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}