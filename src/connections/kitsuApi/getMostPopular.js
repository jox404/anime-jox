import { async } from "@firebase/util";
import axios from "axios";
import { useState } from "react";
import handleDontExists from "../../Tools/handleDontExists";

export default async function getMostPopular(amount) {
  var data = [];
  await axios
    .get(
      `https://kitsu.io/api/edge/anime?page[limit]=${amount}&sort=popularityRank&fields[anime]=posterImage`
    )
    .then((res) => {
      try {
        res.data.data.map(async (anime) => {
          console.log(anime, "dataAnime");
          const dataAnime = {
            posterImage: await handleDontExists(
              "text",
              anime.attributes.posterImage,
              ["small", "original", "medium", "large", "tiny"]
            ),
            id: anime.id,
            /* averageRating: anime.attributes.averageRating, */
          };
          console.log(dataAnime, "dataAnime");
          data.push(dataAnime);
        });
      } catch (error) {
        console.log(error);
      }
    });
  return data;
}
