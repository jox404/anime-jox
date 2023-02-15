import { useState, useEffect } from "react";

import { Box } from "@mui/system";
import { CircularProgress, Grid, Typography } from "@mui/material";

/* CSS */
import styles from "../../../styles/Popular.module.scss";
import { CardAnime } from "../index";

/* import Footer from "../Footer/Footer"; */

export default function Popular(props) {
  const [loadingAnimes, setLoadingAnimes] = useState([]);

  const { animeList } = props;

  return (
    <>
      <Box className={styles.container}>
        <Typography
          variant="h3"
          textAlign={"left"}
          fontSize={30}
          fontWeight={600}
          mb={2}
        >
          Popular Anime
        </Typography>
        <Box>
          <Grid
            container
            style={{ display: "flex", justifyContent: "center" }}
            spacing={2}
          >
            <CircularProgress
              sx={{
                display: `${loadingAnimes === true ? "inline" : "none"}`,
                marginTop: 25,
              }}
            />
            {animeList.map((anime, index) => {
              return (
                <Grid
                  item
                  key={index}
                  xs={index === 0 || index === 1 ? 12 : 6}
                  sm={index === 0 || index === 1 ? 6 : 4}
                  md={index === 0 || index === 1 ? 6 : 4}
                  lg={index === 0 || index === 1 ? 6 : 2}
                  xl={index === 0 || index === 1 ? 6 : 2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexBasis: 0,
                    width: "100%",
                  }}
                >
                  <CardAnime
                    key={index}
                    bgImage={
                      index === 0 || index === 1
                        ? anime.coverImage
                        : anime.posterImage
                    }
                    id={anime.id}
                    size={index === 0 || index === 1 ? "large" : "small"}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
