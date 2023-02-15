import { async } from "@firebase/util";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

import styles from "../../../styles/EpisodesList.module.scss";
import handleDontExists from "../../Tools/handleDontExists";

export default function EpisodesList(props) {
  const { animeData } = props;
  /*  var data = episode;
  if (movie) {
    data = animeData;
  } */
  const [episodesLimit, setEpisodesLimit] = useState(20);
  useEffect(() => {
    console.log(animeData);
  }, [episodesLimit]);
  return (
    <>
      {animeData.map((anime, index) => {
        if (index < episodesLimit) {
          return (
            <Box className={styles.episode} key={index}>
              <Box className={styles.containerThumbnail}>
                <img
                  src={anime.thumbnail || "???"}
                  alt={"thumbnail of anime"}
                />
              </Box>
              <Box className={styles.txt}>
                <Typography variant="subtitle1" fontSize={15}>
                  <strong> {anime.title || "???"}</strong>
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontSize={15}
                  sx={{ overflowY: "auto" }}
                >
                  {anime.synopsis || ""}
                </Typography>
              </Box>
            </Box>
          );
        }
      })}
      {episodesLimit ? (
        <Button onClick={() => setEpisodesLimit(episodesLimit + 20)}>
          Show More
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}
