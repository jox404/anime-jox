import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import styles from "../../../styles/UserDrawer.module.scss";
import { AuthContext } from "../../contexts/AuthContext";
import {
  BsEmojiWinkFill,
  BsFillEmojiLaughingFill,
  BsImages,
  BsStack,
} from "react-icons/bs";
import profile from "../../../public/assets/images/profile.jpeg";
import Image from "next/image";

export default function UserDrawer() {
  const { user, logout } = useContext(AuthContext);
  const [currentEdit, setCurrentEdit] = useState("auth");
  return (
    <Box className={styles.container}>
      {user === null ? (
        <></>
      ) : (
        <>
          <Box>
            <Box className={styles.userBg}>
              <img
                src={
                  "https://images.pexels.com/photos/5493270/pexels-photo-5493270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
              />
            </Box>{" "}
            <Box className={styles.userInfo}>
              <Avatar className={[styles.avatar]}>
                <Image
                  src={profile}
                  alt={"user Profile Image"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Avatar>
              <IconButton
                className={[styles.avatar, styles.avatarBtn]}
                component="label"
              >
                <input hidden type={"file"} />
                <BsImages />
              </IconButton>
              <Typography variant="subtitle1">
                {user.displayName || "????"}
              </Typography>
              <Typography variant="caption" fontSize={14}>
                {user.email}
              </Typography>
              {/* <Button variant="contained" onClick={() => logout()}>
                Logout
              </Button> */}
            </Box>
            <Box sx={{ p: "10px 20px 0px 20px" }}>
              <ButtonGroup fullWidth>
                <Button
                  onClick={() => setCurrentEdit("myList")}
                  variant={currentEdit === "myList" ? "contained" : "outlined"}
                  endIcon={<BsStack />}
                >
                  My Lists
                </Button>
                <Button
                  onClick={() => setCurrentEdit("auth")}
                  variant={currentEdit === "auth" ? "contained" : "outlined"}
                >
                  Security/Auth
                </Button>
              </ButtonGroup>
              <Box mt={2}>
                {currentEdit === "myList" ? (
                  <Typography textAlign={"center"}>
                    Coming Soon!{"  "}
                    <BsFillEmojiLaughingFill />
                  </Typography>
                ) : (
                  <Typography>Security/Auth Edit</Typography>
                )}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
