import { ThemeProvider } from "@mui/material";
import MainContainer from "../src/components/MainContainer/MainContainer";
import "../styles/globals.scss";
import DefaultTheme from "../src/Themes/DefaultTheme";
import { AuthContextProvider, DocContextProvider } from "../src/contexts/";
import { Quicksand, Ubuntu } from "@next/font/google";
import { Box } from "@mui/system";

const quicksand = Quicksand({ subsets: ["latin"], style: "normal" });
const ubuntu = Quicksand({ subsets: ["latin"], style: "normal" });

function MyApp({ Component, pageProps }) {
  return (
    <Box className={[quicksand.className, ubuntu.className]}>
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
