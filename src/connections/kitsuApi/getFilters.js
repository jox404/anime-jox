import axios from "axios";

export default async function getFilters(filter) {
  var data = [];

  var url = "";

  if (filter == "genres") {
    url =
      "https://kitsu.io/api/edge/genres?fields%5Bcategories%5D=title&fields%5Bgenres%5D=name&page%5Blimit%5D=30&page%5Boffset%5D=0&sort=name";
  } else if (filter === "categories") {
    url =
      "https://kitsu.io/api/edge/categories?fields%5Bcategories%5D=title&page%5Blimit%5D=30&page%5Boffset%5D=0&sort=title";
  }
  var stillGenres = true;

  const filters = async (url) => {
    try {
      await axios
        .get(url)
        .then((res) => {
          data = data.concat(res.data.data);
          return res;
        })
        .then(async (res) => {
          if (res.data.links.next != undefined) {
            await filters(res.data.links.next);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  await filters(url);

  data = data.map((filter) => {
    if (filter.type === "genres") {
      return filter.attributes.name;
    } else if (filter.type === "categories") {
      return filter.attributes.title;
    }
  });

  return data;
}
