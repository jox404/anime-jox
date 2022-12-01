import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import styles from "../../../styles/Card.module.scss";

export default function CardAnime(props) {
  const { bgImage, id, size } = props;
  var height;
  switch (size) {
    case "small":
      height = 200;
      break;
    case "medium":
      height = 250;
      break;
    case "large":
      height = 400;
      break;
    default:
      height = 300;
      break;
  }

  return (
    <Box
      className={styles.container}
      sx={{
        bgcolor: "#212121",
        height: height,
        display: "flex",
        backgroundImage: `url( ${bgImage} )`,
      }}
      component={"a"}
      href={`/animes/${id}`}
      target={"_blank"}
    ></Box>
  );
}
