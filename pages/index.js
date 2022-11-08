import { Box } from "@mui/material";
import { Container } from "@mui/system";
import { Famous, HighLights, Popular, CustomSearch } from "../src/components";
import getFilters from "../src/connections/kitsuApi/getFilters";
import getMostPopular from "../src/connections/kitsuApi/getMostPopular";
import styles from "../styles/Home.module.scss";

export async function getStaticProps() {
  const popular = await getMostPopular(12);
  const categories = await getFilters("categories");
  const genres = await getFilters("genres");

  return {
    props: {
      popular,
      categories,
      genres,
    },
  };
}

export default function Home({ popular, categories, genres }) {
  return (
    <Box className={styles.container}>
      <HighLights animeList={popular} />
      <Container maxWidth={"lg"}>
        <CustomSearch categories={categories} genres={genres} />
        <Popular animeList={popular} />
      </Container>
    </Box>
  );
}
