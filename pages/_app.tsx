import type { AppProps } from 'next/app';

// MUI
import { createTheme, ThemeProvider } from '@mui/material';

// Redux
import { Provider } from 'react-redux';
import store from '../store';

// Styles and layout
import '../styles/globals.css';
import Layout from '../src/components/Layout/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(255, 90, 95)',
      light: 'rgb(255, 90, 95, 0.10)',
      dark: 'rgb(255, 90, 95, 0.80)',
    },
    secondary: {
      main: '#C7C7C7',
      light: '#C7C7C7',
    },
  },
  typography: {
    fontWeightBold: 700,
    fontSize: 14,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}
export default MyApp;
