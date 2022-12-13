import { RemoveCircle } from "@mui/icons-material";
import {
  List,
  ListItem,
  Typography,
  Box,
  IconButton,
  Rating,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { DocContext } from "../../contexts";
import limitCharacters from "../../Tools/limitCharacters";
import styles from "../../../styles/AnimeListDrawer.module.scss";
import animePageIconsButtom from "../../../public/assets/images/animePageIconsButtom.png";
import Image from "next/image";

export default function AnimeListDrawer(props) {
  const { currentDrawer } = props;
  const { updateAnimeList, userAnimeData, updateUserAnimeData } =
    useContext(DocContext);
  const [animeList, setAnimeList] = useState([]);
  const refAnimeList = useRef(null);

  const updateList = () => {
    if (currentDrawer && userAnimeData) {
      let dataAnime = [];
      if (userAnimeData[currentDrawer]) {
        userAnimeData[currentDrawer].forEach((anime) => {
          dataAnime.push(anime.mapValue.fields);
        });
        setAnimeList(dataAnime);
      } else {
        setAnimeList([]);
      }
    } else {
      setAnimeList([]);
    }
  };

  const animationRemove = (index) => {
    const anime = refAnimeList.current.getElementsByTagName("li");
    if (anime[index].classList.contains(styles.newPosition)) {
      anime[index].classList.remove(styles.newPosition);
      animationRemove(index);
    } else {
      anime[index].classList.add(styles.removeAnime);
      if (index + 1 < anime.length) {
        anime[index + 1].classList.add(styles.newPosition);
      }
    }
  };

  const removeAnime = async (index, data, currentDrawer) => {
    await animationRemove(index);
    setTimeout(async () => {
      await updateAnimeList(true, data, currentDrawer);
    }, 1000);
  };

  useEffect(() => {
    updateList();
  }, [currentDrawer]);
  useEffect(() => {
    updateUserAnimeData();
  }, [animeList]);

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <List ref={refAnimeList}>
        {animeList.length > 0 ? (
          animeList.map((anime, index) => {
            const data = {
              averageRating: anime.averageRating.stringValue,
              id: anime.id.stringValue,
              posterImage: anime.posterImage.stringValue,
              title: anime.title.stringValue,
            };
            return (
              <ListItem key={index} sx={{ padding: "10px" }}>
                <Box className={styles.cardContainer}>
                  <img
                    src={data.posterImage}
                    style={{
                      borderRadius: 5,
                      width: 100,
                      objectFit: "cover",
                      objectPosition: "top center",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography>{limitCharacters(data.title, 20)}</Typography>
                    <Rating
                      name="animeRating"
                      value={parseFloat(data.averageRating)}
                      precision={0.5}
                      readOnly
                    />
                  </Box>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => removeAnime(index, data, currentDrawer)}
                    >
                      <RemoveCircle />
                    </IconButton>
                  </Box>
                </Box>
              </ListItem>
            );
          })
        ) : currentDrawer ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography fontSize={20} textAlign={"center"} mt={10}>
              You Don't Have Animes In This List
            </Typography>
            <Typography fontSize={13} textAlign={"center"} mt={1} mb={2}>
              You may add animes to the list clicking in the icons buttons, on
              the anime page.
            </Typography>
            <Image
              src={animePageIconsButtom}
              style={{ borderRadius: "10px" }}
            />
          </Box>
        ) : (
          <></>
        )}
      </List>
    </Box>
  );
}
