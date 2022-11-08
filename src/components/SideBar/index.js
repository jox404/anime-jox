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
import {
  AuthContext,
  AuthContextProvider,
  useAuth,
} from "../../contexts/AuthContext";
import UserDrawer from "./UserDrawer";
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
    selected: true,
  },
  {
    title: "Search",
    link: "",
    icon: <IoSearchOutline />,
    selected: false,
  },
];
const itens = [
  {
    title: "My List",
    link: "",
    icon: <BsStack />,
    selected: false,
  },
  {
    title: "Favorites",
    link: "",
    icon: <MdFavorite />,
    selected: false,
  },
  {
    title: "Watching",
    link: "",
    icon: <MdRemoveRedEye />,
    selected: false,
  },
  {
    title: "See Later",
    link: "",
    icon: <MdOutlineAccessTimeFilled />,
    selected: false,
  },
  {
    title: "Dropped",
    link: "",
    icon: <BsTrash2Fill />,
    selected: false,
  },
];

const SideBar = (props) => {
  const { user } = useContext(AuthContext);
  const [drawer, setDrawer] = useState(<></>);
  const drawerRef = useRef();
  const drawerOfSidebar = (drawer) => {
    const drawerContainer = drawerRef.current;
    if (drawerContainer.classList.contains(styles.showDrawer)) {
      drawerContainer.classList.remove(styles.showDrawer);
      drawerContainer.classList.add(styles.hideDrawer);
    } else {
      drawerContainer.classList.add(styles.showDrawer);
      drawerContainer.classList.remove(styles.hideDrawer);
    }
    switch (drawer) {
      case "user":
        return setDrawer(<UserDrawer />);
        break;
    }
  };

  useEffect(() => {
    console.log(user, "AuthContextProvider");
  }, []);

  return (
    <Box className={styles.container}>
      <Box className={styles.drawer} ref={drawerRef}>
        {drawer}
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
                      <ListItem selected={item.selected}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItem>
                    </Link>
                  );
                })}
              </ThemeProvider>
            </List>
          </Box>
        </Box>
        <Box className={styles.bottom}>
          <Divider variant="middle" sx={{ borderColor: "#303030", mb: 2 }} />
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
                    <Link href={item.link} key={index}>
                      <ListItem selected={item.selected}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItem>
                    </Link>
                  );
                })}
              </ThemeProvider>
            </List>
          </Box>

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
                  onClick={() => drawerOfSidebar("user")}
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
