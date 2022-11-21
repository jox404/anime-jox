import { Avatar, Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import styles from "../../../../styles/UserDrawer.module.scss";
import { AuthContext } from "../../../contexts/AuthContext";

export default function UserDrawer() {
  const { user, logout } = useContext(AuthContext);
  return (
    <Box className={styles.container}>
      {user === null ? (
        <></>
      ) : (
        <>
          {" "}
          <Avatar
            className={styles.avatar}
            alt={"user Profile Image"}
            src="https://studioghiblimovies.com/wp-content/uploads/2019/02/d78b1219f9991c69a7619d362548cb79f4d29e02_hq2.jpg"
          ></Avatar>
          <Typography variant="subtitle1">
            {user.displayName || "????"}
          </Typography>
          <Typography variant="caption">{user.email}</Typography>
          <Button variant="contained" onClick={() => logout()}>
            Logout
          </Button>
        </>
      )}
    </Box>
  );
}
