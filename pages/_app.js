import { ThemeProvider } from "@mui/material";
import MainContainer from "../src/components/MainContainer/MainContainer";
import "../styles/globals.scss";
import DefaultTheme from "../src/Themes/DefaultTheme";
import { AuthContextProvider, DocContextProvider } from "../src/contexts/";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <DocContextProvider>
        <ThemeProvider theme={DefaultTheme}>
          <MainContainer>
            <Component {...pageProps} />
          </MainContainer>
        </ThemeProvider>
      </DocContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
