import React from "react";
import { Box } from "@mui/material";
import styles from "../../../styles/Card.module.scss";

export default function CardAnime(props) {
  const { bgImage, id, size } = props;
  var length;
  switch (size) {
    case "small":
      length = 200;
      break;
    case "medium":
      length = 250;
      break;
    case "large":
      length = 450;
      break;
    default:
      length = 300;
      break;
  }

  return (
    <Box
      className={styles.container}
      sx={{
        bgcolor: "#212121",
        height:
          size === "large"
            ? { xs: length / 2, lg: length / 1.25, xl: length }
            : length,
        display: "flex",
        width: size === "large" ? "100%" : length,
        backgroundImage: `url( ${bgImage} )`,
      }}
      component={"a"}
      href={`/animes/${id}`}
      target={"_blank"}
    ></Box>
  );
}
