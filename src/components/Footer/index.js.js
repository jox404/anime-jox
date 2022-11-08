import { Divider, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Component, React } from "react";
//CSS
import "../../../styles/Footer.module.scss";

import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
export default function Footer(props) {
  return (
    <>
      <Box
        component={"footer"}
        sx={{
          width: "100%",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box justifyContent="space-evenly" display="flex" width={400}>
          <Link href="###" fontSize={28}>
            <IoLogoWhatsapp />
          </Link>
          <Link href="###" fontSize={28}>
            <AiFillLinkedin />
          </Link>
          <Link href="###" fontSize={28}>
            <AiFillGithub />
          </Link>
        </Box>
        <Box justifyContent="center" display="flex">
          <Typography variant="body2">
            email:joaovitorribeiroc1@gmail.com
          </Typography>
        </Box>
      </Box>
    </>
  );
}
