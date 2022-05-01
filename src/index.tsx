import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { DARK_THEME, LIGHT_THEME } from './const/themes';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = setupStore();

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={LIGHT_THEME}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
