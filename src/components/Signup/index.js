import { useContext, useState } from "react";

import {
  Avatar,
  Grid,
  Typography,
  Box,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  AlertTitle,
} from "@mui/material";
import Link from "next/link";

import {
  Close,
  LockOutlined,
  LogoutRounded,
  VisibilityOff,
} from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";

/* CSS */
import styles from "../../../styles/Signup.module.scss";

/* Context */
import { AuthContext } from "../../contexts/AuthContext";

export default function Signup(props) {
  const { signup } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    userName: "",
    email: "",
    password: "",
    showPassword: false,
    rememberMe: false,
  });
  const [alert, setAlert] = useState({
    title: "",
    body: "",
    alertType: "error",
    renderAlert: false,
  });

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleChangeRemenberMe = (e) => {
    const value = e.target.checked;
    setFormState((current) => ({ ...current, rememberMe: value }));
    console.log(formState.rememberMe);
  };

  const printAlert = (title, body, type) => {
    setAlert({
      renderAlert: true,
      title: title,
      body: body,
      alertType: type,
    });
  };

  const handleSignup = (userName, email, password) => {
    if (userName === "") {
      printAlert(
        "User Name Empty",
        "Please, Fill In The User Name Field.",
        "error"
      );
    } else if (email === "") {
      printAlert(
        "Address Email Empty",
        "Please, Fill In The Address Email Field.",
        "error"
      );
    } else if (password === "") {
      printAlert(
        "Password Empty",
        "Please, Fill In The Password Field.",
        "error"
      );
    } else {
      signup(email, password, userName);
    }
  };

  return (
    <>
      <Box className={styles.container}>
        <Box
          className={styles.sideImage}
          sx={{
            backgroundImage: `url(https://studioghiblimovies.com/wp-content/uploads/2019/02/d540rv6-5725a401-30b4-496e-b5e3-e0aba5080f061.jpg)`,
          }}
        >
          <Box
            className={styles.alertContainer}
            sx={{ display: alert.renderAlert ? "flex" : "none" }}
          >
            <Alert severity={alert.alertType} className={styles.alert}>
              <AlertTitle
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                {alert.title}
                <IconButton
                  size="small"
                  onClick={() => {
                    setAlert((current) => ({ ...current, renderAlert: false }));
                  }}
                  sx={{ mt: "-6.5px" }}
                >
                  <Close />
                </IconButton>
              </AlertTitle>
              {alert.body}
            </Alert>
          </Box>
        </Box>
        <Box>
          <Box className={styles.containerSignup}>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4} sx={{ mx: 0 }}>
              <Box sx={{ textAlign: "right" }}>
                <Link href={"../"} replace={true}>
                  <IconButton variant="outlined" color="primary">
                    <LogoutRounded color="primary" />
                  </IconButton>
                </Link>
              </Box>
              <Box componet="form" id="formValidation">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    my: 2,
                    p: 1,
                  }}
                >
                  <Typography variant="h5" alignContent={"center"}>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,

                        m: 1,
                        ml: 2,
                        color: "#212121",
                      }}
                    >
                      <LockOutlined />
                    </Avatar>
                    Sign up
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexDirection: "column",
                    height: "60vh",
                  }}
                >
                  <TextField
                    value={formState.userName}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    name="userName"
                    label="User Name"
                    fullWidth
                  />
                  <TextField
                    value={formState.email}
                    onChange={(e) => handleChange(e)}
                    type="email"
                    name="email"
                    label="Email Address"
                    fullWidth
                  />

                  <TextField
                    value={formState.password}
                    onChange={(e) => handleChange(e)}
                    type={formState.showPassword === true ? "text" : "password"}
                    name="password"
                    label="Password"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onMouseUpCapture={() =>
                              setFormState((current) => ({
                                ...current,
                                showPassword: true,
                              }))
                            }
                            onMouseDownCapture={() =>
                              setFormState((current) => ({
                                ...current,
                                showPassword: false,
                              }))
                            }
                          >
                            {formState.showPassword === true ? (
                              <VisibilityOff color="primary" />
                            ) : (
                              <VisibilityIcon color="primary" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <FormGroup>
                    <Typography variant="body2">
                      <Link href="#" replace={true}>
                        Terms and conditions
                      </Link>
                    </Typography>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="I agree with the terms"
                      checked={formState.rememberMe}
                      onChange={(e) => handleChangeRemenberMe(e)}
                    ></FormControlLabel>
                  </FormGroup>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={
                      () =>
                        handleSignup(
                          formState.userName,
                          formState.email,
                          formState.password
                        )
                      /* handleSignIn(formState.email, formState.password) */
                    }
                  >
                    Sign up
                  </Button>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "left",
                      flexDirection: "row",
                    }}
                  >
                    <Typography variant="body2">
                      <Link href="/auth/signin" replace={true}>
                        Already have an account? Sign in!
                      </Link>
                    </Typography>
                  </Box>

                  <Typography
                    variant={"body2"}
                    sx={{ color: "#606060" }}
                    textAlign={"center"}
                  >
                    Copyright ©<Link href="/anime-jox/">anijox</Link> 2022.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
