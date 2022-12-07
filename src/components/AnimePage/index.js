import { Grid, Typography, Box, Rating, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import styles from "../../../styles/AnimePage.module.scss";
import { EpisodesList, CardAnime } from "../index";

/* Icons */
import {
  MdFavorite,
  MdOutlineAccessTimeFilled,
  MdRemoveRedEye,
} from "react-icons/md";
import { BsTrash2Fill } from "react-icons/bs";
import { DocContext } from "../../contexts";
import getCustomSearch from "../../connections/kitsuApi/getCustomSearch";
import { Container } from "@mui/system";

export default function AnimePage(props) {
  const { animeData, id } = props;
  const { updateAnimeList, userAnimeData } = useContext(DocContext);
  const [listStatuses, setListStatuses] = useState({
    favorites: false,
    seeLater: false,
    watching: false,
    dropped: false,
  });
  const [recommendations, setRecommendations] = useState([]);
  const dataAnimeList = {
    id: id,
    title: animeData.title,
    averageRating: animeData.averageRating,
    posterImage: animeData.posterImage,
  };
  const isMovie = animeData.episodesList.length > 1 ? false : true;
  const InitialStatuses = async () => {
    var list = listStatuses;
    if (userAnimeData !== null) {
      const statuses = Object.keys(userAnimeData).map((key) => {
        return [key, userAnimeData[key]];
      });
      if (statuses[1] !== null) {
        statuses.map((status) => {
          const statusArray = status[1];
          if (statusArray !== null) {
            statusArray.map((value) => {
              const statusValue = value.mapValue.fields;
              if (statusValue.id.stringValue === id) {
                list = { ...list, [status[0]]: true };
              }
            });
          }
        });
      }
    }

    setListStatuses({
      favorites: list.favorites,
      seeLater: list.seeLater,
      watching: list.watching,
      dropped: list.dropped,
    });
  };
  const handleUpdateStatuses = (name) => {
    if (listStatuses[name]) {
      setListStatuses((prevState) => ({
        ...prevState,
        [name]: false,
      }));
    } else {
      setListStatuses((prevState) => ({
        ...prevState,
        [name]: true,
      }));
    }
  };

  const getRecommendations = async () => {
    const { data } = await getCustomSearch(
      false,
      7,
      animeData.genresList.slice(0, 3)
    );
    setRecommendations(data);
  };

  useEffect(() => {
    InitialStatuses();
    getRecommendations();
  }, []);
  return (
    <>
      <Container maxWidth={"lg"}>
        <Box className={styles.container}>
          <Box
            className={styles.posterBg}
            sx={{
              backgroundImage: `url(${animeData.coverImage})`,
            }}
          ></Box>

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
                sx={{ mb: 3 }}
              />
              <Box sx={{ mb: 3 }}>
                <IconButton
                  sx={{
                    ":hover": { bgcolor: "#ff555525" },
                  }}
                  onClick={async () => {
                    updateAnimeList(
                      listStatuses.favorites,
                      dataAnimeList,
                      "favorites"
                    );
                    handleUpdateStatuses("favorites");
                  }}
                >
                  <MdFavorite
                    color={listStatuses.favorites !== true ? "#fff" : "#ff5555"}
                  />
                </IconButton>
                <IconButton
                  sx={{
                    ":hover": { bgcolor: "#f1fa8c25" },
                  }}
                  onClick={async (event) => {
                    await updateAnimeList(
                      listStatuses.seeLater,
                      dataAnimeList,
                      "seeLater"
                    );
                    handleUpdateStatuses("seeLater");
                  }}
                >
                  <MdOutlineAccessTimeFilled
                    color={listStatuses.seeLater !== true ? "#fff" : "#f1fa8c"}
                  />
                </IconButton>
                <IconButton
                  sx={{
                    ":hover": { bgcolor: "#bd93f925" },
                  }}
                  onClick={async () => {
                    await updateAnimeList(
                      listStatuses.watching,
                      dataAnimeList,
                      "watching"
                    );
                    handleUpdateStatuses("watching");
                  }}
                >
                  <MdRemoveRedEye
                    color={listStatuses.watching != true ? "#fff" : "#bd93f9"}
                  />
                </IconButton>
                <IconButton
                  sx={{
                    ":hover": { bgcolor: "#ffb86c25" },
                  }}
                  onClick={async () => {
                    updateAnimeList(
                      listStatuses.dropped,
                      dataAnimeList,
                      "dropped"
                    );
                    handleUpdateStatuses("dropped");
                  }}
                >
                  <BsTrash2Fill
                    color={listStatuses.dropped !== true ? "#fff" : "#ffb86c"}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box className={styles.episodesList}>
              <Typography component={"h2"}>Episodes</Typography>
              <Box className={styles.containerEpisodes}>
                {animeData.episodesList.map((episode, index) => {
                  return (
                    <EpisodesList
                      episode={episode}
                      animeData={{
                        thumbnail: animeData.posterImage,
                        title: animeData.title,
                      }}
                      movie={isMovie}
                      key={`episode${index}`}
                    />
                  );
                })}
              </Box>
            </Box>
            <Box className={styles.description}>
              <Typography variant="body1">{animeData.synopsis}</Typography>
            </Box>
          </Box>
          <Box className={styles.recommendations}>
            <Typography variant="h3" fontSize={26} sx={{ mb: 2 }}>
              Recommendations
            </Typography>
            {recommendations.length > 0 ? (
              <Grid
                container
                spacing={2}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {recommendations.map((anime, index) => {
                  if (id !== anime.id && index < 6) {
                    return (
                      <Grid
                        item
                        key={index + "card"}
                        xs={12}
                        sm={4}
                        md={3}
                        lg={2}
                        xl={2}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          width: 0,
                          flexBasis: 0,
                        }}
                      >
                        <CardAnime
                          bgImage={anime.posterImage}
                          id={anime.id}
                          size={"small"}
                        />
                      </Grid>
                    );
                  }
                })}
              </Grid>
            ) : (
              <Typography textAlign={"center"} fontSize={"30px"}>
                No anime found...
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}
