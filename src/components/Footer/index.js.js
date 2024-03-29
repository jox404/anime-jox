import { Divider, Link, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { React } from "react";
//CSS
import styles from "../../../styles/Footer.module.scss";

import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import Image from "next/image";
import logo from "../../../public/assets/icons/logo.svg";
export default function Footer() {
  return (
    <>
      <Box className={styles.footer} component={"footer"}>
        <Container
          maxWidth={"lg"}
          className={styles.container}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Box>
              <Image src={logo} width={60} height={60} alt={"logo"} />
              <Typography variant="body2">
                Developed by{" "}
                <a
                  href="https://www.linkedin.com/in/joaocosta105/"
                  rel="noopener noreferrer"
                >
                  <strong>João Ribeiro</strong>
                </a>
              </Typography>

              <Typography variant="body2">
                All website content is promoted by{" "}
                <a
                  href="https://kitsu.docs.apiary.io/"
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  <strong>Kitsu API</strong>
                </a>
              </Typography>
              <Typography variant="body2">
                Copyright &#169; 2022 animeJox
              </Typography>
            </Box>
          </Box>

          <Box>
            <Box>
              <Typography variant="h6">
                {" "}
                <strong>Other Projects</strong>
              </Typography>
              <Typography
                variant="body2"
                component={"a"}
                href={"https://jox404.github.io/portifolio/"}
              >
                My Portifolio
              </Typography>
              <br />
              <Typography
                variant="body2"
                component={"a"}
                href={"https://jox404.github.io/photographer-portfolio/"}
              >
                Photographer Portfolio
              </Typography>{" "}
              <br />
              <Typography
                variant="body2"
                component={"a"}
                href={"https://github.com/jox404/weather-app"}
              >
                Weather App
              </Typography>{" "}
              <br />
              <Typography
                variant="body2"
                component={"a"}
                href={"https://jox404.github.io/portifolio/"}
              >
                Bolsa de Atletas
              </Typography>{" "}
              {/* <br /> */}
            </Box>
          </Box>
          <Box>
            <Box>
              <Typography variant="h6">
                {" "}
                <strong>Contact</strong>
              </Typography>
              <Typography variant="body2">
                <strong> Email:</strong>joaovitorribeiroc1@gmail.com
              </Typography>
              <Typography variant="body2">
                <strong> Telephone:</strong>(11)987984340
              </Typography>
            </Box>
            <Box
              mt={3}
              sx={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Link
                href="https://api.whatsapp.com/send/?phone=11987984340&text&type=phone_number&app_absent=0"
                target={"_blank"}
                fontSize={28}
                rel="noopener noreferrer"
              >
                <IoLogoWhatsapp />
              </Link>
              <Link
                href="https://www.linkedin.com/in/joaocosta105/"
                target={"_blank"}
                fontSize={28}
                rel="noopener noreferrer"
              >
                <AiFillLinkedin />
              </Link>
              <Link
                href="https://github.com/jox404"
                target={"_blank"}
                fontSize={28}
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </Link>
              <Link
                href="https://jox404.github.io/portifolio/"
                target={"_blank"}
                fontSize={28}
                rel="noopener noreferrer"
              >
                <CgWebsite />
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
