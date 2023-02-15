import React from "react";
import { Box } from "@mui/material";
import styles from "../../../styles/Card.module.scss";
import { AiFillAlert, AiOutlinePlayCircle } from "react-icons/ai";

export default function CardAnime(props) {
  const { bgImage, id, size, video } = props;
  var length;
  switch (size) {
    case "small":
      length = 200;
      break;
    case "medium":
      length = 300;
      break;
    case "large":
      length = 450;
      break;
    case "extraSmall":
      length = 200;
      break;
    default:
      length = 300;
      break;
  }

  return (
    <Box
      className={styles.container}
      sx={[
        {
          bgcolor: "#212121",
          display: "flex",
          backgroundImage: `url( ${bgImage} )`,
        },
        size === "large"
          ? {
              height: { xs: length / 2, lg: length / 1.25, xl: length },
              width: { xs: length, sm: "100%" },
            }
          : size === "medium"
          ? {
              height: length / 1.1,
              width: "100%",
            }
          : size === "extraSmall"
          ? {
              height: length / 1.3,
              width: "100%",
            }
          : {
              height: length,
              width: { xs: length, sm: length },
            },
      ]}
      component={"a"}
      href={`/animes/${id}`}
      target={"_blank"}
    >
      {video ? (
        <Box className={styles.video}>
          <AiOutlinePlayCircle />
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}
