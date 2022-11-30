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
        <Typography variant="h1" textAlign={"center"}>
          Popular Anime
        </Typography>
        <Box sx={{ minHeight: 900 }}>
          <Grid
            container
            style={{ display: "flex", justifyContent: "left" }}
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
                  xs={index === 0 || index === 1 ? 6 : 6}
                  sm={index === 0 || index === 1 ? 6 : 4}
                  md={index === 0 || index === 1 ? 6 : 3}
                  lg={index === 0 || index === 1 ? 6 : 2}
                  xl={index === 0 || index === 1 ? 6 : 2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: 0,
                    flexBasis: 0,
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
                    size={index === 0 || index === 1 ? "large" : "medium"}
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
