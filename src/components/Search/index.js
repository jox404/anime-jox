import {
  Alert,
  AlertTitle,
  Button,
  Collapse,
  IconButton,
  InputBase,
  List,
  ListItem,
  Rating,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import styles from "../../../styles/Search.module.scss";
import getAnimesDataByName from "../../connections/kitsuApi/getAnimesDataByText";
import limitCharacters from "../../Tools/limitCharacters";

export default function Search(props) {
  const refContainer = useRef(null);
  const { setVisible, visible } = props;
  const [inputSearch, setInputSearch] = useState("");
  const [animeData, setAnimeData] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [links, setLinks] = useState(null);

  const hideContainer = (event) => {
    if (refContainer.current) {
      if (!refContainer.current.contains(event.target)) {
        setVisible(false);
        console.log("clickou fora");
      } else {
        console.log("clickou dentro");
        /*  setVisible(true); */
      }
    }
  };

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        document.addEventListener("click", (e) => {
          hideContainer(e);
        });
      }, 1);
      clearTimeout();
    } else {
      console.log("fechado");
    }
  }, [visible]);

  const makeSearch = async (name) => {
    if (name.length < 3) {
      setAlertOpen(true);
    } else {
      try {
        let { data, links } = await getAnimesDataByName(name);
        setAnimeData(data);
        console.log(animeData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Box className={styles.container} sx={{ display: "flex" }}>
        <Box sx={{ height: "100vh" }} ref={refContainer}>
          <Collapse in={alertOpen} className={styles.alert}>
            <Alert
              severity={"warning"}
              action={
                <IconButton onClick={() => setAlertOpen(false)}>
                  <AiOutlineClose />
                </IconButton>
              }
            >
              <AlertTitle>Warning</AlertTitle>
              Please enter at least <strong>3 characters to search...</strong>
            </Alert>
          </Collapse>

          <Box className={styles.search}>
            <InputBase
              placeholder="Search..."
              sx={{ width: "100%" }}
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />
            <IconButton onClick={() => makeSearch(inputSearch)}>
              <BsFillArrowRightCircleFill className={styles.icon} />
            </IconButton>
          </Box>

          <List className={styles.animesList}>
            {animeData ? (
              animeData.map((anime, index) => {
                return (
                  <ListItem key={index}>
                    <Box
                      className={styles.cardAnime}
                      component={"a"}
                      href={`/animes/${anime.id}`}
                      target={"_blank"}
                    >
                      <img src={anime.posterImage} />
                      <Box>
                        <Typography>
                          {limitCharacters(anime.title, 25)}
                        </Typography>
                        <Rating
                          name="animeRating"
                          value={5}
                          precision={anime.averageRating}
                          readOnly
                        />
                      </Box>
                    </Box>
                  </ListItem>
                );
              })
            ) : (
              <>
                <Typography></Typography>
              </>
            )}
          </List>
        </Box>
      </Box>
    </>
  );
}
