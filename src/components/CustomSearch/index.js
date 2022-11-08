import { Button, Grid, Typography } from "@mui/material";

import { Box } from "@mui/system";
import { React, Component, useEffect, useState } from "react";

import { CardAnime } from "../index";

//ICONS
import CircularProgress from "@mui/material/CircularProgress";
import { AiFillDownCircle } from "react-icons/ai";

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
  const [yearFromFilter, setYearFromFilter] = useState("2010");
  const [yearToFilter, setYearToFilter] = useState("2018");

  const makeSearch = async () => {
    const data = await getCustomSearch(
      categoryFilter,
      genreFilter,
      seasonFilter,
      yearFromFilter,
      yearToFilter
    );
    setDataAnime(data);
    console.log(dataAnime, "dataAnime");
  };

  useEffect(() => {
    makeSearch();
  }, []);

  return (
    <Box className={styles.container}>
      <Box
        sx={{ display: "flex", mt: 5, mb: 5, justifyContent: "space-around" }}
      >
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
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year"]}
              label="From"
              value={yearFromFilter}
              onChange={(event) => {
                setYearFromFilter(event);
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
                setYearToFilter(event);
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
        </Box>
        {/*  <Filter title={"Status"} list /> */}
        {/*   <Filter title={"Year"} list /> */}
        <Button onClick={() => makeSearch()}>Search</Button>
      </Box>
      <Box mt={2} sx={{ minHeight: 0 }}>
        {dataAnime.length > 0 ? (
          <Grid
            container
            spacing={2}
            style={{ display: "flex", justifyContent: "left" }}
          >
            {dataAnime.map((anime, index) => {
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
            })}
          </Grid>
        ) : (
          <Typography textAlign={"center"} fontSize={"30px"}>
            No anime found...
          </Typography>
        )}
      </Box>
    </Box>
  );
}

{
  /* <CircularProgress
              sx={{
                display: `${
                  this.state.loadingAnimes === true ? "flex" : "none"
                }`,
                marginTop: 40,
              }}
            /> */
}
