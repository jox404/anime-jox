export default async function handleDontExists(type, obj, values) {
  let data = "???";

  if (typeof obj !== "undefined") {
    if (type === "text" || type === "link" || "thumbnail") {
      if (obj === null) {
        switch (type) {
          case "text":
            data = "Unknown";
            break;
          case "link":
            data = null;
            break;
          case "thumbnail":
            data = "/assets/images/notFound.jpeg";
        }
      } else {
        const prop = values.find((value) => {
          return obj.hasOwnProperty(value);
        });

        if (prop) {
          data = obj[prop];
        } else {
          switch (type) {
            case "text":
              data = "Unknown";
              break;
            case "link":
              data = null;
              break;
            case "thumbnail":
              data =
                "https://images.pexels.com/photos/3658809/pexels-photo-3658809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
          }
        }
      }
    } /*  else if (type === "thumbnail") {
      if (obj === null) {
        return (data =
          "https://images.pexels.com/photos/623147/pexels-photo-623147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
      } else {
        const prop = values.find((value) => {
          return obj.hasOwnProperty(value);
        });

        if (prop) {
          if (obj[prop] === null) {
            switch (obj[prop]) {
              case "text":
                data = "???";
                break;
              case "link":
                data = null;
                break;
            }
          } else {
            data = obj[prop];
          }
        } else {
          data =
            "https://images.pexels.com/photos/623147/pexels-photo-623147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
        }
      }
    } */
  } else {
    console.log("dont found", type, values, obj);
  }

  return data;
}
