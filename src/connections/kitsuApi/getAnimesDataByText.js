import axios from "axios";
import handleDontExists from "../../Tools/handleDontExists";

export default async function getAnimesDataByName(animeName) {
  let urlBase = `https://kitsu.io/api/edge/anime?filter[text]=${animeName}&fields[anime]=posterImage,titles,averageRating`;
  let data = [];
  let links;
  try {
    await axios.get(urlBase).then(async (response) => {
      try {
        response.data.data.map(
          async (anime) => {
            const dataAnime = {
              id: anime.id,
              title: await handleDontExists("text", anime.attributes.titles, [
                "en",
                "en_us",
                "en_jp",
                "ja_jp",
              ]),
              posterImage: await handleDontExists(
                "text",
                anime.attributes.posterImage,
                ["small", "medium", "large", "original", "tiny"]
              ),
              averageRating: JSON.stringify(
                parseFloat(anime.attributes.averageRating) / 10 / 2
              ),
            };

            data.push(dataAnime);
          },
          (links = {
            first: await handleDontExists("link", response.data.links, [
              "first",
            ]),
            prev: await handleDontExists("link", response.data.links, ["prev"]),
            next: await handleDontExists("link", response.data.links, ["next"]),
            last: await handleDontExists("link", response.data.links, ["last"]),
          })
        );
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
  return { data, links };
}
