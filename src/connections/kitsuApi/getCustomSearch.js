import axios from "axios";
import handleDontExists from "../../Tools/handleDontExists";

export default async function getCustomSearch(
  link,
  categories,
  genres,
  season,
  seasonYearFrom,
  seasonYearTo
) {
  var urlBase = `https://kitsu.io/api/edge/anime?&page[limit]=18&sort=popularityRank&fields[anime]=posterImage&`;
  if (link) {
    urlBase = link;
  } else {
    if (categories) {
      urlBase = urlBase + `filter[categories]=${categories.toString()}&`;
    }
    if (genres) {
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
  }

  var data = [];
  var links;
  console.log(urlBase, "urlBase");
  await axios.get(urlBase).then(async (res) => {
    try {
      res.data.data.map(
        async (anime) => {
          const dataAnime = {
            posterImage: await handleDontExists(
              "text",
              anime.attributes.posterImage,
              ["small", "medium", "large", "original", "tiny"]
            ),
            id: anime.id,
          };
          data.push(dataAnime);
        },
        (links = {
          first: await handleDontExists("link", res.data.links, ["first"]),
          prev: await handleDontExists("link", res.data.links, ["prev"]),
          next: await handleDontExists("link", res.data.links, ["next"]),
          last: await handleDontExists("link", res.data.links, ["last"]),
        })
      );
    } catch (error) {
      console.log(error);
    }
  });

  return { data, links };
}
