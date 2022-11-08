import SideBar from "../SideBar";
import styles from "../../../styles/MainContainer.module.scss";
import { Footer } from "../index";
import { useRouter } from "next/router";
import { Box } from "@mui/material";

export default function MainContainer({ children }, props) {
  const router = useRouter();
  const renderSideBar = router.pathname.startsWith("/auth");

  return (
    <Box className={styles.container}>
      {renderSideBar ? <></> : <SideBar />}
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
        {children}
      </Box>
    </Box>
  );
}
