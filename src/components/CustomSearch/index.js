import { Button, Grid, Typography } from "@mui/material";

import { Box } from "@mui/system";
import { React, useEffect, useState, useRef } from "react";

import { CardAnime } from "../index";

//ICONS
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";

//CSS
import styles from "../../../styles/CustomSearch.module.scss";
import getCustomSearch from "../../connections/kitsuApi/getCustomSearch";
import Filter from "../Filter";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function CustomSearch(props) {
  const [dataAnime, setDataAnime] = useState([]);
  const { categories, genres } = props;
  const season = ["winter", "spring", "summer", "fall"];

  const [categoryFilter, setCategoryFilter] = useState(["Adventure"]);
  const [genreFilter, setGenreFilter] = useState(["Action"]);
  const [seasonFilter, setSeasonFilter] = useState([
    "fall",
    "winter",
    "spring",
    "summer",
  ]);
  const [yearFromFilter, setYearFromFilter] = useState("2018");
  const [yearToFilter, setYearToFilter] = useState("2022");
  const [links, setLinks] = useState(null);
  const cardsContainerRef = useRef(null);

  const cardAnimation = (side, func) => {
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.classList;
      if (side === "right") {
        func;
        cards.add(styles.animeSlideRight);
        setTimeout(() => {
          cards.remove(styles.animeSlideRight);
        }, 2000);
        clearTimeout();
      } else {
        func;
        cards.add(styles.animeSlideLeft);
        setTimeout(() => {
          cards.remove(styles.animeSlideLeft);
        }, 2000);
        clearTimeout();
      }
    }
  };

  const makeSearch = async (link, ...filters) => {
    if (!link !== null) {
      const { data, links } = await getCustomSearch(link, ...filters);
      setDataAnime(data);
      setLinks(links);
    }
  };

  useEffect(() => {
    makeSearch(
      false,
      18,
      genreFilter,
      categoryFilter,
      seasonFilter,
      yearFromFilter,
      yearToFilter
    );
  }, []);

  return (
    <Box className={styles.container}>
      <Box
        sx={{ display: "flex", mt: 5, mb: 5, justifyContent: "space-between" }}
      >
        <Box className={styles.filters}>
          <Filter
            title={"Category"}
            list={categories}
            setData={setCategoryFilter}
            value={categoryFilter}
          />
          <Filter
            title={"Genre"}
            list={genres}
            setData={setGenreFilter}
            value={genreFilter}
          />
          <Filter
            title={"Season"}
            list={season}
            setData={setSeasonFilter}
            value={seasonFilter}
          />
        </Box>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year"]}
              label="From"
              value={yearFromFilter}
              onChange={(event) => {
                if (event !== null) {
                  const value =
                    event.$y != "NaN" ? event.$y.toString() : undefined;
                  setYearFromFilter(value);
                } else {
                  setYearFromFilter(undefined);
                }
              }}
              renderInput={({ inputRef, inputProps, InputProps }) => {
                return (
                  <Box className={styles.inputDateContainer}>
                    <Typography sx={{ mr: 1 }}>From</Typography>
                    <input
                      ref={inputRef}
                      {...inputProps}
                      className={styles.inputDate}
                    />
                    {InputProps?.endAdornment}
                  </Box>
                );
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year"]}
              label="To"
              value={yearToFilter}
              onChange={(event) => {
                if (event !== null) {
                  const value =
                    event.$y != "NaN" ? event.$y.toString() : undefined;
                  setYearToFilter(value);
                } else {
                  setYearToFilter(undefined);
                }
              }}
              renderInput={({ inputRef, inputProps, InputProps }) => {
                return (
                  <Box className={styles.inputDateContainer}>
                    <Typography sx={{ mr: 1 }}>To</Typography>
                    <input
                      ref={inputRef}
                      {...inputProps}
                      className={styles.inputDate}
                    />
                    {InputProps?.endAdornment}
                  </Box>
                );
              }}
            />
          </LocalizationProvider>
          <Button
            onClick={() =>
              makeSearch(
                false,
                18,
                genreFilter,
                categoryFilter,
                seasonFilter,
                yearFromFilter,
                yearToFilter
              )
            }
            variant={"contained"}
          >
            Search
          </Button>
        </Box>
      </Box>

      <Box mt={2} sx={{ minHeight: 0 }}>
        {dataAnime.length > 0 ? (
          <Grid
            container
            spacing={2}
            style={{ display: "flex", justifyContent: "center" }}
            ref={cardsContainerRef}
          >
            {dataAnime.map((anime, index) => {
              return (
                <Grid
                  item
                  key={index + "card"}
                  xs={6}
                  sm={4}
                  md={4}
                  lg={2}
                  xl={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
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
            })}
          </Grid>
        ) : (
          <Typography textAlign={"center"} fontSize={"30px"}>
            No anime found...
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Box>
          <Button
            onClick={() => {
              if (links.prev !== null) {
                cardAnimation("left", makeSearch(links.prev));
              }
            }}
            startIcon={<BsArrowLeftShort />}
          >
            Prev
          </Button>
          <Button
            onClick={() => {
              if (links.first !== null) {
                cardAnimation("left", makeSearch(links.first));
              }
            }}
          >
            First
          </Button>
        </Box>
        <Box>
          <Button
            onClick={() => {
              if (links.last !== null) {
                cardAnimation("right", makeSearch(links.last));
              }
            }}
          >
            Last
          </Button>

          <Button
            onClick={() => {
              if (links.next !== null) {
                cardAnimation("right", makeSearch(links.next));
              }
            }}
            endIcon={<BsArrowRightShort />}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
