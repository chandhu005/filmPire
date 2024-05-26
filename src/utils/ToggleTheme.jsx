import React, { createContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

export const ColorModeContext = createContext();

const ToggleTheme = ({ children }) => {
    const [mode, setMode] = useState('light');
    const theme = useMemo(() => createTheme({
        palette: {
            mode: mode,
        }
    }), [mode]);

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default ToggleTheme;
