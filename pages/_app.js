import { ThemeProvider } from "@mui/material";
import MainContainer from "../src/components/MainContainer/MainContainer";
import "../styles/globals.scss";
import DefaultTheme from "../src/Themes/DefaultTheme";
import { AuthContextProvider, DocContextProvider } from "../src/contexts/";
import { Box } from "@mui/system";

function MyApp({ Component, pageProps }) {
  return (
    <Box>
      <AuthContextProvider>
        <DocContextProvider>
          <ThemeProvider theme={DefaultTheme}>
            <MainContainer>
              <Component {...pageProps} />
            </MainContainer>
          </ThemeProvider>
        </DocContextProvider>
      </AuthContextProvider>
    </Box>
  );
}

export default MyApp;
