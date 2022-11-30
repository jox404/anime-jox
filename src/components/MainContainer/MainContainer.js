import SideBar from "../SideBar";
import styles from "../../../styles/MainContainer.module.scss";
import { Footer, Search } from "../index";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { useState } from "react";

export default function MainContainer({ children }, props) {
  const router = useRouter();
  const renderSideBar = router.pathname.startsWith("/auth");
  const [visibleSearch, setVisibleSearch] = useState(false);

  return (
    <Box className={styles.container}>
      {renderSideBar ? <></> : <SideBar setVisibleSearch={setVisibleSearch} />}
      <Box
        className={styles.containerPageRander}
        sx={
          renderSideBar
            ? { width: "100vw" }
            : {
                width: "calc(100vw - 300px)",
                marginLeft: "300px",
              }
        }
      >
        <Search visible={visibleSearch} setVisibleSearch={setVisibleSearch} />
        {children}
      </Box>
    </Box>
  );
}
