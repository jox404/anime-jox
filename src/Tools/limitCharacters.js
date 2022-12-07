const limitCharacters = (text, limit) => {
  if (text) {
    const textLength = text.length;
    text = text.split("");
    let limitArray = text.splice(0, limit);
    limitArray = limitArray.join("");

    limitArray = textLength > limit ? `${limitArray}...` : limitArray;
    return limitArray;
  } else {
    return "(unknown)";
  }
};
export default limitCharacters;
