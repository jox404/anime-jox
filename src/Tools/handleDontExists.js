export default async function handleDontExists(type, obj, values) {
  let data = "???";

  if (typeof obj !== "undefined") {
    if (type === "text") {
      if (obj === null) {
        return (data = "???");
      } else {
        const prop = values.find((value) => {
          return obj.hasOwnProperty(value);
        });

        if (prop) {
          data = obj[prop];
        } else {
          data = "???";
        }
      }
    } else if (type === "thumbnail") {
      if (obj === null) {
        return (data =
          "https://images.pexels.com/photos/623147/pexels-photo-623147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
      } else {
        const prop = values.find((value) => {
          return obj.hasOwnProperty(value);
        });

        if (prop) {
          if (obj[prop] === null) {
            data = "???";
          } else {
            data = obj[prop];
          }
        } else {
          data =
            "https://images.pexels.com/photos/623147/pexels-photo-623147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
        }
      }
    }
  } else {
    console.log("dont found", type, values, obj);
  }

  return data;
}
