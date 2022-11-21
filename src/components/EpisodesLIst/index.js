import { async } from "@firebase/util";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

import styles from "../../../styles/EpisodesList.module.scss";
import handleDontExists from "../../Tools/handleDontExists";

export default function EpisodesList(props) {
  const { episode, animeData, movie } = props;
  var data = episode;
  if (movie) {
    data = animeData;
  }
  console.log(data);

  return (
    <Box className={styles.episode}>
      <Box>
        <img src={data.thumbnail || "???"} />
      </Box>
      <Box className={styles.txt}>
        <Typography variant="subtitle1">{data.title || "???"}</Typography>
        <Typography variant="subtitle2" sx={{ overflowY: "auto" }}>
          {data.synopsis || ""}
        </Typography>
      </Box>
    </Box>
  );
}
