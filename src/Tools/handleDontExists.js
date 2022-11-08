export default async function handleDontExists(type, obj, values) {
  let data;
  if (type === "text") {
    const prop = values.find((value) => {
      return obj.hasOwnProperty(value);
    });
    console.log(prop, "prop");
    if (prop) {
      data = obj[prop];
    } else {
      data = "???";
    }
  } else if (type === "thumbnail") {
    const prop = values.find((value) => {
      return obj.hasOwnProperty(value);
    });
    console.log(prop, "prop");
    if (prop) {
      data = obj[prop];
    } else {
      data =
        "https://images.pexels.com/photos/623147/pexels-photo-623147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    }
  }
  return data;
}
