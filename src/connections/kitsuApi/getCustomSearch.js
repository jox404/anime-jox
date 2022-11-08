import axios from "axios";
import handleDontExists from "../../Tools/handleDontExists";

export default async function getCustomSearch(
  categories,
  genres,
  season,
  seasonYearFrom,
  seasonYearTo
) {
  var urlBase = `https://kitsu.io/api/edge/anime?&page[limit]=18&sort=popularityRank&fields[anime]=posterImage&`;
  if (categories) {
    urlBase = urlBase + `filter[categories]=${categories.toString()}&`;
  }
  if (genres) {
    console.log(genres, "genres");
    urlBase = urlBase + `filter[genres]=${genres.toString()}&`;
  }
  if (season) {
    urlBase = urlBase + `filter[season]=${season.toString()}&`;
  }
  if (seasonYearFrom && seasonYearTo) {
    urlBase =
      urlBase + `filter[seasonYear]=${seasonYearFrom}..${seasonYearTo}&`;
  } else if (seasonYearFrom) {
    urlBase = urlBase + `filter[seasonYear]=${seasonYearFrom}..&`;
  } else if (seasonYearTo) {
    urlBase = urlBase + `filter[seasonYear]=..${seasonYearTo}&`;
  }
  console.log(urlBase, "urlBase");

  var data = [];
  await axios.get(urlBase).then((res) => {
    try {
      res.data.data.map(async (anime) => {
        console.log(anime, "dataAnime");
        const dataAnime = {
          posterImage: await handleDontExists(
            "text",
            anime.attributes.posterImage,
            ["small", "medium", "large", "original", "tiny"]
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
