import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { amber, deepOrange, grey } from '@mui/material/colors';
import { ThemeContextType } from '../types';

export const ColorModeContext = React.createContext<ThemeContextType>({ toggleColorMode: () => {},mode:'dark' });

export const ColorModeContextProvider = ({children}:any) => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            ...amber,
            ...(mode === 'dark' && {
              main: "#21262B",
            }),
          },
          ...(mode === 'dark' && {
            background: {
              default: "#21262B",
              paper: "#181C20",
            },
          }),
          text: {
            ...(mode === 'light'
              ? {
                  primary: grey[900],
                  secondary: grey[800],
                }
              : {
                  primary: '#EEF1F4',
                  secondary: grey[500],
                }),
          },
        },
        components: {
          MuiIcon: {
            styleOverrides: {
              root: {
                // Match 24px = 3 * 2 + 1.125 * 16
                boxSizing: 'content-box',
                padding: 3,
                fontSize: '1.125rem',
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export const useColorMode = ( ) => React.useContext(ColorModeContext)