import { async } from "@firebase/util";
import axios from "axios";
import { useState } from "react";
import handleDontExists from "../../Tools/handleDontExists";

export default async function getMostPopular(amount) {
  var data = [];
  await axios
    .get(
      `https://kitsu.io/api/edge/anime?page[limit]=${amount}&sort=popularityRank&fields[anime]=posterImage,titles,coverImage,averageRating,synopsis,genres`
    )
    .then((res) => {
      try {
        res.data.data.map(async (anime) => {
          const dataAnime = {
            id: anime.id,
            posterImage: await handleDontExists(
              "text",
              anime.attributes.posterImage,
              ["medium", "original", "small", "large", "tiny"]
            ),
            title: await handleDontExists("text", anime.attributes.titles, [
              "en",
              "en_us",
              "en_jp",
              "ja_jp",
            ]),
            synopsis: await handleDontExists("text", anime.attributes, [
              "synopsis",
              "description",
            ]),
            coverImage: await handleDontExists(
              "text",
              anime.attributes.coverImage,
              ["original", "medium", "small", "large", "tiny"]
            ),
            genresLink: anime.relationships.genres.links.related,
            genresList: [],
            averageRating: parseFloat(anime.attributes.averageRating) / 10 / 2,
          };
          const getGenresList = async (link) => {
            await axios
              .get(`${link}?fields[genres]=name,slug`)
              .then(async (response) => {
                let dataGenres = [];
                response.data.data.map((genre) => {
                  dataGenres.push(genre.attributes.name);
                });
                dataAnime.genresList = dataAnime.genresList.concat(dataGenres);
                if (response.data.links.hasOwnProperty("next")) {
                  await getGenresList(response.data.links.next);
                } else {
                  return;
                }
              });
          };
          await getGenresList(dataAnime.genresLink);
          data.push(dataAnime);
        });
      } catch (error) {
        console.log(error);
      }
    });

  return data;
}
