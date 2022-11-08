import { CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import React, { Component } from "react";
import { Card, Box } from "@mui/material";

export default function CardAnime(props) {
  const redirectPage = (id) => {
    window.location.href = `/animes/${id}`;
  };

  const { bgImage, id, size } = props;

  return (
    <>
      <Box
        onClick={() => redirectPage(id)}
        elevation={15}
        sx={{ bgcolor: "#212121" }}
        style={{
          width: "100%",
          height: size === "small" ? 200 : 320,
          display: "flex",
          backgroundImage: `url( ${bgImage} )`,
          position: "relative",
          borderRadius: 20,
          margin: "0px 0px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          cursor: "pointer",
        }}
      ></Box>
    </>
  );
}
