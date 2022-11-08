import { useState, useEffect } from "react";

import { Box } from "@mui/system";
import { CircularProgress, Grid, Typography } from "@mui/material";

/* CSS */
import styles from "../../../styles/Popular.module.scss";
import { CardAnime } from "../index";

/* import Footer from "../Footer/Footer"; */

export default function Popular(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationAnimes, setPaginationAnimes] = useState([]);
  const [loadingAnimes, setLoadingAnimes] = useState([]);

  const paginationItems = props.animeList;

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
            spacing={{ xs: 1, sm: 2, md: 2, lg: 8, xl: 2 }}
          >
            <CircularProgress
              sx={{
                display: `${loadingAnimes === true ? "inline" : "none"}`,
                marginTop: 25,
              }}
            />
            {paginationItems.map((anime, index) => {
              return (
                <Grid
                  item
                  key={index}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <CardAnime
                    key={index}
                    bgImage={anime.posterImage}
                    id={anime.id}
                    size={"small"}
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
