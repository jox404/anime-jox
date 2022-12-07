import axios from "axios";
import handleDontExists from "../../Tools/handleDontExists";

export default async function getAnimeData(id) {
  let dataAnime;
  const url = `https://kitsu.io/api/edge/anime/${id}?fields[anime]=posterImage,titles,startDate,endDate,status,coverImage,episodes,averageRating,synopsis,genres`;

  await axios.get(url).then(async (response) => {
    const data = response.data.data;
    dataAnime = {
      posterImage: await handleDontExists("text", data.attributes.posterImage, [
        "small",
        "medium",
        "original",
        "large",
        "tiny",
      ]),
      title: await handleDontExists("text", data.attributes.titles, [
        "en",
        "en_us",
        "en_jp",
        "ja_jp",
      ]),
      synopsis: await handleDontExists("text", data.attributes, [
        "synopsis",
        "description",
      ]),
      startDate: await handleDontExists("text", data.attributes, ["startDate"]),
      endDate: await handleDontExists("text", data.attributes, ["endDate"]),
      status: await handleDontExists("text", data.attributes, ["status"]),
      coverImage: await handleDontExists("text", data.attributes.coverImage, [
        "original",
        "large",
        "small",
        "medium",
        "tiny",
      ]),
      averageRating: JSON.stringify(
        parseFloat(data.attributes.averageRating) / 10 / 2
      ),
      episodesLink: data.relationships.episodes.links.related,
      episodesList: [],
      genresLink: data.relationships.genres.links.related,
      genresList: [],
    };
  });

  const getEpisodesList = async (link) => {
    try {
      await axios
        .get(`${link}?fields[episodes]=titles,synopsis,thumbnail`)
        .then(async (response) => {
          const episodes = response.data.data;
          episodes.forEach(async (episode) => {
            const episodeData = {
              title: await handleDontExists("text", episode.attributes.titles, [
                "en",
                "en_us",
                "en_jp",
                "ja_jp",
              ]),
              synopsis: await handleDontExists("text", episode.attributes, [
                "synopsis",
                "description",
              ]),
              thumbnail: await handleDontExists(
                "thumbnail",
                episode.attributes.thumbnail,
                ["original", "medium", "small", "large", "tiny"]
              ),
            };
            dataAnime.episodesList.push(episodeData);
          });
          if (response.data.links.hasOwnProperty("next")) {
            await getEpisodesList(response.data.links.next);
          } else {
            return;
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getGenresList = async (link) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };
  await getGenresList(dataAnime.genresLink);
  await getEpisodesList(dataAnime.episodesLink);

  return dataAnime;
}
