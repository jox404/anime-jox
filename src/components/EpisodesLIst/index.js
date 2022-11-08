import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";

import styles from "../../../styles/EpisodesList.module.scss";
import handleDontExists from "../../Tools/handleDontExists";

export default function EpisodesList(props) {
  const { episodesList } = props;
  console.log(episodesList, "episodesList");

  let data = [];

  useEffect(() => {
    episodesList.map(async (episode) => {
      const episodeData = {
        /* await handleDontExists(
          "thumbnail", */
        thumbnail: episode.attributes.thumbnail.original,
        /* ["original", "small", "medium", "large", "tiny"]
        ), */
        title: await handleDontExists("text", episode.attributes.titles, [
          "en",
          "en_us",
          "en_jp",
          "ja_jp",
        ]),
        synopsis: await handleDontExists("text", data.attributes, [
          "synopsis",
          "description",
        ]),
      };
      data.push(episodeData);
    });
  }, []);

  return (
    <Box className={styles.container}>
      <Typography component={"h2"}> Episodes</Typography>
      <Box className={styles.containerEpisodes}>
        {data.map(async (episode, index) => {
          return (
            <Box className={styles.episode} key={`episode${index}`}>
              <Box></Box>
              {/* <Box>
                <img src={episodeData.thumbnail} />
              </Box>
              <Box className={styles.txt}>
                <Typography variant="subtitle1">{episodeData.title}</Typography>
                <Typography variant="subtitle2" sx={{ overflowY: "auto" }}>
                  {episodeData}
                </Typography>
              </Box> */}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
