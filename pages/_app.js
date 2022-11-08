import { ThemeProvider } from "@mui/material";
import MainContainer from "../src/components/MainContainer/MainContainer";
import "../styles/globals.scss";
import DefaultTheme from "../src/Themes/DefaultTheme";
import { AuthContextProvider } from "../src/contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={DefaultTheme}>
        <MainContainer>
          <Component {...pageProps} />
        </MainContainer>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
