import { Box, Button, Rating, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import styles from "../../../styles/HighLights.module.scss";
import limitCharacters from "../../Tools/limitCharacters";

export default function HighLights(props) {
  const [animesIndex, setAnimesIndex] = useState({
    current: 0,
    next: 1,
  });
  const { animeList } = props;
  const animesRef = useRef(null);

  const addAnime = (ref, current, next, limit) => {
    if (ref) {
      const animes = ref.current.getElementsByClassName(styles.animePoster);
      animes[current].classList.add(styles.makeVisible);
      animes[current].classList.add(styles.apperAnimation);
      setTimeout(() => {
        animes[current].classList.remove(styles.apperAnimation);
        if (!animes[current].classList.contains(styles.apperAnimation)) {
          animes[current].classList.add(styles.vanishAnimation);
          setTimeout(() => {
            animes[current].classList.remove(styles.makeVisible);
            animes[current].classList.remove(styles.vanishAnimation);
            if (current === limit) {
              setAnimesIndex({
                current: 0,
                next: 1,
              });
            } else {
              setAnimesIndex({
                current: next,
                next: next + 1,
              });
            }
          }, 5000); /* animation time  */
          clearTimeout();
        }
      }, 60000); /* animation time  */
      clearTimeout();
    }
  };

  useEffect(() => {
    addAnime(animesRef, animesIndex.current, animesIndex.next, 6);
  }, [animesIndex]);

  return (
    <Box className={styles.container} ref={animesRef}>
      {animeList.map((anime, index) => {
        let rating = parseFloat(anime.averageRating) / 10 / 2;
        return (
          <Box
            key={index}
            className={styles.animePoster}
            style={{
              backgroundImage: `url(${anime.coverImage})`,
            }}
          >
            <Container maxWidth={"lg"}>
              <Box className={styles.animeDescription}>
                <Typography
                  variant="h2"
                  fontSize={{ xs: 35, sm: 55 }}
                  fontWeight={700}
                  sx={{ textShadow: "1px 1px #000000" }}
                >
                  {anime.title}
                </Typography>
                <Typography
                  variant="caption"
                  className={styles.resume}
                  fontSize={{ sx: 12, sm: 18 }}
                  sx={{ textShadow: "1px 1px #000000" }}
                >
                  {limitCharacters(anime.synopsis, 200)}
                </Typography>
                <div className={styles.btnContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    href={`animes/${anime.id}`}
                    target={"_blank"}
                  >
                    Read More
                  </Button>
                </div>
              </Box>
              <Box className={[styles.bottomDescription]}>
                <Box>
                  <Typography
                    component={"h6"}
                    sx={{ textShadow: "1px 1px #000000" }}
                  >
                    Rating
                  </Typography>
                  <Rating
                    name="animeRating"
                    value={parseFloat(anime.averageRating)}
                    precision={0.5}
                    readOnly
                  />
                </Box>
              </Box>
            </Container>
          </Box>
        );
      })}
    </Box>
  );
}
