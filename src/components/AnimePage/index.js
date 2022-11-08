import {
  Grid,
  Typography,
  Box,
  Rating,
  Button,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import styles from "../../../styles/AnimePage.module.scss";
import getAnimeData from "../../connections/kitsuApi/getAnimeData";
import { EpisodesList } from "../index";

/* Icons */
import {
  MdFavorite,
  MdOutlineAccessTimeFilled,
  MdRemoveRedEye,
} from "react-icons/md";

export default function AnimePage(props) {
  const { animeData } = props;

  useEffect(() => {
    /* console.log(animeData); */
  }, [animeData]);
  return (
    <>
      <Box
        className={styles.container}
        sx={{
          "::before": {
            backgroundImage: `url(${animeData.coverImage})`,
          },
        }}
      >
        <Box
          className={styles.posterAnime}
          sx={{
            backgroundColor: "#fff00",
          }}
        >
          <Box className={styles.image}>
            <img src={animeData.posterImage}></img>
          </Box>
          <Box className={styles.infos}>
            <Typography variant="h1">{animeData.title}</Typography>
            <Typography variant="caption">{animeData.title}</Typography>
            <Typography variant="subtitle1">
              {animeData.startDate.slice(0, 4)} -{" "}
              {animeData.endDate.slice(0, 4)}
            </Typography>

            <Typography component={"p"}>
              {animeData.genresList.join().replaceAll(",", ", ")}
            </Typography>

            <Rating
              name="animeRating"
              value={4.5}
              precision={0.5}
              readOnly
              sx={{ mb: 5 }}
            />
            <Box>
              <IconButton
                sx={{
                  bgcolor: "#32323234",
                  ":hover": { bgcolor: "#6060609d" },
                }}
              >
                <MdFavorite color="#FF9F9F" />
              </IconButton>
              <IconButton>
                <MdRemoveRedEye color="#E14D2A" />
              </IconButton>
              <IconButton>
                <MdFavorite color="#fff" />
              </IconButton>
              <IconButton>
                <MdOutlineAccessTimeFilled color="#E14D2A" />
              </IconButton>
              <IconButton>
                <MdFavorite color="#fff" />
              </IconButton>
            </Box>
          </Box>
          <Box className={styles.episodesList}>
            <EpisodesList episodesList={animeData.episodesList} />
          </Box>
          <Box className={styles.descriptions}>
            <Typography variant="body1">{animeData.synopsis}</Typography>
          </Box>
        </Box>
        <Box className={styles.recommendation}></Box>
      </Box>
    </>
  );
}
