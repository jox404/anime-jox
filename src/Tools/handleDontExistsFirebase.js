const handleDontExistsFirebase = async (dataDoc) => {
  const handleExists = (obj, prop) => {
    const hasProperty = obj.hasOwnProperty(prop);
    if (hasProperty) {
      return obj[prop];
    } else {
      return null;
    }
  };

  const favorites = await handleExists(
    dataDoc._document.data.value.mapValue.fields.animeList.mapValue.fields
      .favorites.arrayValue,
    "values"
  );
  const watching = await handleExists(
    dataDoc._document.data.value.mapValue.fields.animeList.mapValue.fields
      .watching.arrayValue,
    "values"
  );
  const seeLater = await handleExists(
    dataDoc._document.data.value.mapValue.fields.animeList.mapValue.fields
      .seeLater.arrayValue,
    "values"
  );
  const dropped = await handleExists(
    dataDoc._document.data.value.mapValue.fields.animeList.mapValue.fields
      .dropped.arrayValue,
    "values"
  );
  const animeData = {
    favorites: favorites,
    watching: watching,
    seeLater: seeLater,
    dropped: dropped,
  };

  return animeData;
};

export { handleDontExistsFirebase };
