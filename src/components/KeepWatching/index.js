import { async } from "@firebase/util";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import getAnimeData from "../../connections/kitsuApi/getAnimeData";
import CardAnime from "../CardAnime";

const animeList = [
  {
    id: "",
    coverImage: "",
    posterImage: "",
    episodes: [
      {
        id: "",
        coverImage: "",
        posterImage: "",
      },
      {
        id: "",
        coverImage: "",
        posterImage: "",
      },
      {
        id: "",
        coverImage: "",
        posterImage: "",
      },
    ],
  },
  {
    id: "",
    coverImage: "",
    posterImage: "",
    episodes: [
      {
        id: "",
        coverImage: "",
        posterImage: "",
      },
      {
        id: "",
        coverImage: "",
        posterImage: "",
      },
      {
        id: "",
        coverImage: "",
        posterImage: "",
      },
    ],
  },
];

const watching = [43806, 13593, 13893];

export default function KeepWatching() {
  const [animesWatchingData, setAnimesWatchingData] = useState([]);

  useEffect(() => {
    if (animesWatchingData.length < 3) {
      watching.forEach(async (anime) => {
        const data = await getAnimeData(anime);
        setAnimesWatchingData((prev) => [...prev, data]);
      });
    }
  }, []);

  return (
    <Box m={"30px 0px"}>
      <Typography
        variant="h3"
        textAlign={"left"}
        fontSize={30}
        fontWeight={600}
      >
        Keep Watching
      </Typography>
      <Box>
        {animesWatchingData.map((anime, index) => {
          return (
            <Box
              sx={{
                m: "0px 0px",
              }}
              key={index}
            >
              <Typography
                variant="h4"
                textAlign={index % 2 !== 0 ? "left" : "right"}
                fontSize={24}
                fontWeight={600}
                m={"10px 0px"}
              >
                {anime.title}
              </Typography>
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: index % 2 !== 0 ? "row" : "row-reverse",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Grid item xs={2} sm={3} md={5} lg={5}>
                  <CardAnime
                    bgImage={anime.coverImage}
                    id={anime.id}
                    size={"medium"}
                  />
                </Grid>
                {anime.episodesList.map((episode, index) => {
                  if (index <= 2) {
                    return (
                      <Grid item xs={2} sm={3} md={3} lg={2} key={index}>
                        <CardAnime
                          bgImage={episode.thumbnail}
                          id={anime.id}
                          size={"extraSmall"}
                          video={true}
                        />
                      </Grid>
                    );
                  }
                })}
              </Grid>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
