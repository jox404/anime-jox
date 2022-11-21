import styles from "../../../styles/SideBar.module.scss";
import { Box } from "@mui/system";
import { LogoDev } from "@mui/icons-material";

import {
  Avatar,
  Button,
  createTheme,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { BsStack, BsTrash2Fill } from "react-icons/bs";
import {
  MdFavorite,
  MdOutlineAccessTimeFilled,
  MdRemoveRedEye,
} from "react-icons/md";
import { IoSettingsSharp, IoSearchOutline, IoHomeSharp } from "react-icons/io5";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { AnimeListDrawer, UserDrawer } from "./Drawers";
import { DocContext, AuthContext } from "../../contexts";
/* import logo from "./assets/icons/logo.svg"; */

const listColors = {
  light: "#f8f8f2",
  dark: "#fff",
};
const listCustomized = createTheme({
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          width: "90%",
          padding: "0px 10px",
          margin: 1,
          color: listColors.light,
          borderRadius: 10,
          transition: "0.5s",
          border: "solid 1px #44475a00",
          ":hover": {
            color: listColors.dark,
            transition: "0.5s",
            border: "solid 1px #303030",
            backgroundColor: "#606060",
            cursor: "pointer",
          },
          "&.Mui-selected": {
            backgroundColor: "#202020",
            border: "solid 1px #303030",
            ":hover": {
              color: listColors.dark,
              transition: "0.5s",
              border: "solid 1px #303030",
              backgroundColor: "#909090",
              cursor: "pointer",
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 0,
          marginRight: 10,
          color: listColors.light,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          "&.MuiListItemText-secondary": {
            fontSize: 20,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Quicksand",
          fontWeight: 500,
        },
      },
    },
  },
});
const mainOptions = [
  {
    title: "Home",
    link: "",
    icon: <IoHomeSharp />,
  },
  {
    title: "Search",
    link: "",
    icon: <IoSearchOutline />,
  },
];
const itens = [
  /* {
    title: "My List",
    name: "myList",
    link: "",
    icon: <BsStack />,
  }, */
  {
    title: "Favorites",
    name: "favorites",
    link: "",
    icon: <MdFavorite />,
  },
  {
    title: "Watching",
    name: "watching",
    link: "",
    icon: <MdRemoveRedEye />,
  },
  {
    title: "See Later",
    name: "seeLater",
    link: "",
    icon: <MdOutlineAccessTimeFilled />,
  },
  {
    title: "Dropped",
    name: "dropped",
    link: "",
    icon: <BsTrash2Fill />,
  },
];
const clickOutside = (ref, closeFunc, btnRef) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !btnRef.current.contains(event.target)
      ) {
        if (!ref.current.classList.contains(styles.hideDrawer)) {
          if (ref.current.classList.contains(styles.showDrawer)) {
            closeFunc();
          }
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
  }, [ref]);
};

const SideBar = () => {
  const { user } = useContext(AuthContext);
  const [currentDrawer, setCurrentDrawer] = useState(null);
  const drawerRef = useRef(null);
  const buttomsOpenRef = useRef(null);

  const closeDrawer = () => {
    const drawerContainer = drawerRef.current;
    drawerContainer.classList.remove(styles.showDrawer);
    drawerContainer.classList.add(styles.hideDrawer);
    setCurrentDrawer(null);
  };
  const openDrawer = (drawerName) => {
    const drawerContainer = drawerRef.current;
    if (drawerContainer.classList.contains(styles.showDrawer)) {
      if (drawerName == currentDrawer) {
        closeDrawer();
      } else {
        closeDrawer();
        setTimeout(() => {
          drawerContainer.classList.remove(styles.hideDrawer);
          drawerContainer.classList.add(styles.showDrawer);
        }, 500);
        clearTimeout();
      }
    } else {
      drawerContainer.classList.remove(styles.hideDrawer);
      drawerContainer.classList.add(styles.showDrawer);
    }
    setCurrentDrawer(drawerName);
  };

  clickOutside(drawerRef, closeDrawer, buttomsOpenRef);

  return (
    <Box className={styles.container}>
      <Box
        className={[styles.drawer /* , styles.showDrawer remover depois */]}
        ref={drawerRef}
      >
        <AnimeListDrawer currentDrawer={currentDrawer} />
      </Box>
      <Box className={styles.menu}>
        <Box>
          <Box
            style={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              height: 50,
            }}
          >
            <Link href={"../../"}>
              <LogoDev />
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: 0,
                alignItems: "center",
              }}
            >
              <ThemeProvider theme={listCustomized}>
                {mainOptions.map((item, index) => {
                  return (
                    <Link href={item.link} key={index}>
                      <ListItem>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItem>
                    </Link>
                  );
                })}
              </ThemeProvider>
            </List>
          </Box>
          <Divider
            variant="middle"
            sx={{ borderColor: "#303030", mb: 2, mt: 5 }}
          />
          <Box
            sx={{
              /*  bgcolor: "#fff", */
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: 0,
                alignItems: "center",
              }}
              ref={buttomsOpenRef}
            >
              <ThemeProvider theme={listCustomized}>
                <Typography
                  variant="h2"
                  sx={{
                    pl: "25px",
                    mb: 1,
                    width: "100%",
                    textAlign: "left",
                    fontSize: 19,
                    color: "#909090",
                  }}
                >
                  Anime List
                </Typography>

                {itens.map((item, index) => {
                  return (
                    <ListItem
                      key={index}
                      selected={currentDrawer === item.name}
                      onClick={() => openDrawer(item.name)}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItem>
                  );
                })}
              </ThemeProvider>
            </List>
          </Box>
        </Box>
        <Box className={styles.bottom}>
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 0,
              alignItems: "center",
              mt: 5,
            }}
          >
            <ThemeProvider theme={listCustomized}>
              <Link href={"/config"}>
                <ListItem selected={false}>
                  <ListItemIcon>
                    <IoSettingsSharp />
                  </ListItemIcon>
                  <ListItemText primary={"Settings"} />
                </ListItem>
              </Link>

              <Divider
                variant="middle"
                sx={{ borderColor: "#303030", width: "97%", mt: 2 }}
              />

              {user === null ? (
                <Link href={"/auth/signin"}>
                  <ListItem
                    selected={false}
                    sx={{
                      marginTop: 1,
                    }}
                  >
                    <ListItemIcon>
                      <IoSettingsSharp />
                    </ListItemIcon>
                    <ListItemText primary={"Signin/Signup"} />
                  </ListItem>
                </Link>
              ) : (
                <ListItem
                  selected={false}
                  sx={{ marginTop: 1 }}
                  onClick={() => drawerUpdateDrawer("user")}
                >
                  <ListItemAvatar sx={{ minWidth: 0 }}>
                    <Avatar
                      src={
                        "https://images.pexels.com/photos/906052/pexels-photo-906052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      }
                      variant="rounded"
                      sx={{ width: 34, height: 34, mr: 1 }}
                    />
                  </ListItemAvatar>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="body1">
                      {user.displayName || "?????"}
                    </Typography>
                    <Typography variant="caption">{user.email}</Typography>
                  </Box>
                </ListItem>
              )}
            </ThemeProvider>
          </List>
        </Box>
      </Box>
    </Box>
  );
};
export default SideBar;
