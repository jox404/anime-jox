import { IconButton, InputBase } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import styles from "../../../styles/Search.module.scss";

export default function Search(props) {
  const { visible, setVisibleSearch } = props;
  const refContainer = useRef(null);

  const hideContainer = (event) => {
    if (refContainer.current) {
      if (refContainer.current.contains(event.target)) {
        console.log("clickou dentro");
      } else {
        console.log("clickou fora");
        setVisibleSearch(false);
        document.removeEventListener("click", (e) => {});
      }
    }
  };
  useEffect(() => {
    if (visible) {
      document.addEventListener("click", (e) => {
        hideContainer(e);
      });
    }
  }, [visible]);

  return (
    <Box
      className={styles.container}
      sx={{ display: visible ? "flex" : "none" }}
    >
      <Box sx={{ bgcolor: "#606060", height: "80vh" }} ref={refContainer}>
        <Box className={styles.search}>
          <InputBase placeholder="Search..." sx={{ width: "100%" }} />
          <IconButton>
            <BsFillArrowRightCircleFill className={styles.icon} />
          </IconButton>
        </Box>
        <Box>AnimeList</Box>
      </Box>
    </Box>
  );
}
