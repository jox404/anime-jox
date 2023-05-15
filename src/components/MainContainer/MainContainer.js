import SideBar from "../SideBar";
import styles from "../../../styles/MainContainer.module.scss";
import { Footer, Search } from "../index";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

export default function MainContainer({ children }, props) {
  const router = useRouter();
  const renderSideBarAndFooter = router.pathname.startsWith("/auth");
  const [visible, setVisible] = useState(false);

  return (
    <Box className={styles.container}>
      {renderSideBarAndFooter ? <></> : <SideBar setVisible={setVisible} />}
      <Box
        className={styles.containerPageRander}
        sx={
          renderSideBarAndFooter
            ? { width: "100vw" }
            : {
                width: {
                  xs: "calc(100vw)",
                  md: "calc(100vw - 300px)",
                },
                marginLeft: {
                  xs: "0px",
                  md: "300px",
                },
              }
        }
      >
        {visible ? <Search setVisible={setVisible} visible={visible} /> : <></>}

        {children}
        {renderSideBarAndFooter ? <></> : <Footer />}
      </Box>
    </Box>
  );
}
