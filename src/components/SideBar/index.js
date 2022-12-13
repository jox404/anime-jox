import styles from "../../../styles/SideBar.module.scss";
import { Box } from "@mui/system";

import {
  Avatar,
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
import { IoSearchOutline, IoHomeSharp } from "react-icons/io5";

import { RiLoginBoxFill } from "react-icons/ri";
import logo from "../../../public/assets/icons/logo.svg";
import profile from "../../../public/assets/images/profile.jpeg";
import { useContext, useEffect, useRef, useState } from "react";
import { AnimeListDrawer, UserDrawer } from "../index";
import { AuthContext } from "../../contexts";
import Image from "next/image";

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
          fontFamily: "Ubuntu",
          fontWeight: 400,
        },
      },
    },
  },
});

const animeList = [
  {
    title: "Favorites",
    name: "favorites",
    icon: <MdFavorite />,
  },
  {
    title: "Watching",
    name: "watching",
    icon: <MdRemoveRedEye />,
  },
  {
    title: "See Later",
    name: "seeLater",
    icon: <MdOutlineAccessTimeFilled />,
  },
  {
    title: "Dropped",
    name: "dropped",
    icon: <BsTrash2Fill />,
  },
];

/* const yourList = [
  {
    title: "Doramas",
    name: "doramas",
    icon: <BsStack />,
  },
  {
    title: "Shounen",
    name: "shounen",
    icon: <BsStack />,
  },
  {
    title: "Nostalgia",
    name: "nostalgia",
    icon: <BsStack />,
  },
  {
    title: "90's Animes",
    name: "90's animes",
    icon: <BsStack />,
  },
];
 */
const ClickOutside = (ref, closeFunc, containerRef) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !containerRef.current.contains(event.target)
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

const SideBar = (props) => {
  const { user } = useContext(AuthContext);
  const [currentDrawer, setCurrentDrawer] = useState(null);
  const drawerRef = useRef(null);
  const containerRef = useRef(null);

  const { setVisible } = props;

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
  ClickOutside(drawerRef, closeDrawer, containerRef);

  return (
    <Box className={styles.container}>
      <Box className={[styles.drawer]} ref={drawerRef}>
        {currentDrawer === "userDrawer" ? (
          <UserDrawer />
        ) : (
          <AnimeListDrawer currentDrawer={currentDrawer} />
        )}
      </Box>
      <Box className={styles.menu}>
        <Box className={styles.top}>
          <Box className={styles.logo}>
            <Box href={"/"} component={"a"}>
              <Image src={logo} width={80} height={80} alt={"logo"} />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <List className={styles.list}>
              <ThemeProvider theme={listCustomized}>
                <ListItem
                  sx={{
                    minHeight: "35px",
                    justifyContent: {
                      xs: "center",
                      md: "flex-start",
                    },
                  }}
                  onClick={() => window.location.replace("/")}
                >
                  <ListItemIcon sx={{ m: { xs: "auto auto", md: 1 } }}>
                    <IoHomeSharp />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Home"}
                    sx={{
                      display: { xs: "none", md: "block" },
                    }}
                  />
                </ListItem>
                <ListItem
                  onClick={() => {
                    setVisible(true);
                  }}
                  sx={{
                    minHeight: "35px",
                    justifyContent: {
                      xs: "center",
                      md: "flex-start",
                    },
                  }}
                >
                  <ListItemIcon sx={{ m: { xs: "auto auto", md: 1 } }}>
                    <IoSearchOutline />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Search"}
                    sx={{
                      display: { xs: "none", md: "block" },
                    }}
                  />
                </ListItem>
              </ThemeProvider>
            </List>
          </Box>

          <Box
            sx={{
              display: "flex",
              height: "100%",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <List className={styles.list} ref={containerRef}>
              <ThemeProvider theme={listCustomized}>
                <Typography
                  variant="h2"
                  sx={{
                    pl: "35px",
                    mb: 1,
                    mt: 2,
                    width: "100%",
                    textAlign: "left",
                    fontSize: 19,
                    color: "#909090",
                    display: { xs: "none", md: "block" },
                  }}
                >
                  Anime List
                </Typography>

                {animeList.map((item, index) => {
                  return (
                    <ListItem
                      key={index}
                      selected={currentDrawer === item.name}
                      onClick={() => {
                        if (user) {
                          openDrawer(item.name);
                        } else {
                          window.location.replace("/auth/signin");
                        }
                      }}
                      sx={{
                        minHeight: "35px",
                        justifyContent: {
                          xs: "center",
                          md: "flex-start",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ m: { xs: "auto auto", md: 1 } }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        sx={{
                          display: {
                            xs: "none",
                            md: "block",
                          },
                        }}
                      />
                    </ListItem>
                  );
                })}
                <Divider
                  variant="middle"
                  sx={{ borderColor: "#303030", width: "97%" }}
                  className={styles.userDrawerInBottom}
                />
                {user === null ? (
                  <ListItem
                    selected={false}
                    sx={{
                      marginTop: 1,
                      minHeight: "35px",
                      justifyContent: {
                        xs: "center",
                        md: "flex-start",
                      },
                    }}
                    onClick={() => window.location.replace("/auth/signin")}
                  >
                    <ListItemIcon sx={{ m: { xs: "auto auto", md: 1 } }}>
                      <RiLoginBoxFill />
                    </ListItemIcon>
                    <ListItemText primary={"Sign in/Sign up"} />
                  </ListItem>
                ) : (
                  <>
                    <ListItem
                      selected={false}
                      sx={{
                        marginTop: 1,
                        justifyContent: {
                          xs: "center",
                          md: "flex-start",
                        },
                      }}
                      onClick={() => openDrawer("userDrawer")}
                    >
                      <ListItemAvatar sx={{ minWidth: 0, p: "0px" }}>
                        <Avatar
                          /* src={"../../../public/assets/images/profile.jpeg"} */
                          variant="rounded"
                          sx={{
                            width: 34,
                            height: 34,
                            m: { xs: "auto auto", md: 1 },
                          }}
                          alt={"user avatar"}
                        >
                          <Image
                            src={profile}
                            style={{
                              width: 34,
                              height: 34,
                              objectFit: "cover",
                            }}
                          />
                        </Avatar>
                      </ListItemAvatar>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "left",
                          justifyContent: "center",
                          flexDirection: "column",
                          display: { xs: "none", md: "block" },
                        }}
                      >
                        <Typography variant="body1">
                          {user.displayName || "?????"}
                        </Typography>
                        <Typography variant="caption">{user.email}</Typography>
                      </Box>
                    </ListItem>
                  </>
                )}
              </ThemeProvider>
            </List>
          </Box>
          {/* lista dois teste */}
          {/* <Box
            sx={{
              bgcolor: "#fff",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <List
              className={[styles.list, styles.yourList]}
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
                  #Your Lists
                </Typography>

                {yourList.map((item, index) => {
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
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
};
export default SideBar;
