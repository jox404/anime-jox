import { Box, Button, Rating, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import styles from "../../../styles/HighLights.module.scss";
import getMostPopular from "../../connections/kitsuApi/getMostPopular";
import limitCharacters from "../../Tools/limitCharacters";

export default function HighLights(props) {
  const [currentImage, setCurrentImage] = useState(4);

  /*   const limitCharacters = (text, limit) => {
    text = text.split("");
    let limitArray = text.splice(0, limit);
    limitArray = limitArray.join("");
    return limitArray;
  }; */

  let counter = 0;
  /*  useEffect(() => {
    setInterval(() => {
      if (counter === 4) {
        counter = 0;
      } else {
        counter = counter + 1;
      }
      setCurrentImage(counter);
    }, 60000);
    clearInterval();
  }, []); */
  useEffect(() => {}, []);

  return (
    <Box className={styles.container}>
      {/*  {props.animeList.map((anime, index) => {
        let rating = parseFloat(anime.attributes.averageRating) / 10 / 2;
        const data = {
          rating: rating,
          genres: ["Action", "Drama", "Fantasy"],
        };
        return (
          <Box
            key={index}
            className={styles.animePoster}
            style={{
              backgroundImage: `url(${(anime.attributes.coverImage.original =
                !undefined ? anime.attributes.coverImage.original : anime)})`,

              display: index === currentImage ? "flex" : "none",
            }}
          >
            <Container maxWidth={"lg"}>
              <Box className={styles.animeDescription}>
                <h2>{anime.attributes.titles.en}</h2>
                <p>
                  {limitCharacters(anime.attributes.description, 200) + "..."}
                </p>
                <div className={styles.btnContainer}>
                  <Button variant="contained" color="primary">
                    Read More
                  </Button>
                </div>
              </Box>
              <Box className={[styles.bottomDescription]}>
                <Box>
                  <Typography component={"h6"}>Rating</Typography>
                  <Rating
                    name="animeRating"
                    value={data.rating}
                    precision={0.5}
                    readOnly
                  />
                </Box>
                <Box>
                  <Typography component={"h6"}>Genres</Typography>
                  <Box className={styles.genresList}>
                    {data.genres.map((genre, index) => {
                      return (
                        <Typography key={index} component={"p"}>
                          {genre}
                        </Typography>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>
        );
      })} */}
    </Box>
  );
}
