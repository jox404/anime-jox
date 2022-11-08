import axios from "axios";
import handleDontExists from "../../Tools/handleDontExists";

export default async function getAnimeData(id) {
  let dataAnime;
  const url = `https://kitsu.io/api/edge/anime/${id}?fields[anime]=posterImage,titles,startDate,endDate,status,coverImage,episodes,averageRating,synopsis,genres`;

  await axios.get(url).then(async (response) => {
    const data = response.data.data;
    dataAnime = {
      posterImage: await handleDontExists("text", data.attributes.posterImage, [
        "original",
        "medium",
        "small",
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
        "medium",
        "small",
        "large",
        "tiny",
      ]),
      averageRating: data.attributes.averageRating,
      episodesLink: data.relationships.episodes.links.related,
      episodesList: [],
      genresLink: data.relationships.genres.links.related,
      genresList: [],
    };
  });

  const getEpisodesList = async (link) => {
    await axios
      .get(`${link}?fields[episodes]=titles,synopsis,thumbnail`)
      .then(async (response) => {
        dataAnime.episodesList = dataAnime.episodesList.concat(
          response.data.data
        );
        if (response.data.links.hasOwnProperty("next")) {
          await getEpisodesList(response.data.links.next);
        } else {
          return;
        }
      });
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
  await getEpisodesList(dataAnime.episodesLink);

  return dataAnime;
}
