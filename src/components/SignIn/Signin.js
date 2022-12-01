import { Component, useContext, useEffect, useState } from "react";

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
  Class,
  Close,
  HomeRounded,
  LockOutlined,
  LogoutRounded,
  VisibilityOff,
} from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";

/* FIRE BASE */
import {
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  inMemoryPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../../connections/firebase";

/* IMAGES */
import bgImage from "./img/kazetachinu050.jpg";

/* COLORS */
import { blue } from "@mui/material/colors";

/* CSS */
import styles from "../../../styles/SignIn.module.scss";

import { AuthContext } from "../../../src/contexts/AuthContext";

export default function Signin() {
  const { signin, user } = useContext(AuthContext);

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    showPassword: false,
    rememberMe: false,
    renderAlert: false,
    alertText: {
      title: "",
      body: "",
    },
    alertType: "error",
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
  };

  const showPassword = () => {
    setFormState((current) => ({ ...current, showPassword: true }));
  };

  const hidePassword = () => {
    setFormState((current) => ({ ...current, showPassword: false }));
  };

  const printAlert = (title, body, type) => {
    setFormState((current) => ({
      ...current,
      renderAlert: true,
      alertText: {
        title: title,
        body: body,
      },
      alertType: type,
    }));
  };

  const handleEmpyInput = () => {
    const { email, password, rememberMe } = formState;

    if (email === "") {
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
      signin(email, password, rememberMe);
    }
  };

  const closeAlertError = () => {
    setFormState((current) => ({ ...current, renderAlert: false }));
  };

  useEffect(() => {
    if (user) {
      window.location.replace("/");
    }
  }, []);

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
            sx={{ display: formState.renderAlert ? "flex" : "none" }}
          >
            <Alert severity={formState.alertType} className={styles.alert}>
              <AlertTitle
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                {formState.alertText.title}
                <IconButton
                  size="small"
                  onClick={() => closeAlertError()}
                  sx={{ mt: "-6.5px" }}
                >
                  <Close />
                </IconButton>
              </AlertTitle>
              {formState.alertText.body}
            </Alert>
          </Box>
        </Box>
        <Box>
          <Box className={styles.containerSignIn}>
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
                  <Typography
                    variant="h5"
                    sx={{ color: blue[600] }}
                    alignContent={"center"}
                  >
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: blue[600],
                        m: 1,
                        ml: 2,
                        color: "#212121",
                      }}
                    >
                      <LockOutlined />
                    </Avatar>
                    Sign in
                  </Typography>
                </Box>
                <Box>
                  <Grid container>
                    <Grid item xs={12}>
                      <TextField
                        value={formState.email}
                        onChange={handleChange}
                        type="email"
                        id="email"
                        name="email"
                        label="Email Address"
                        fullWidth
                        className=""
                      />
                    </Grid>
                    <Grid item xs={12} mt={1}>
                      <TextField
                        value={formState.password}
                        onChange={handleChange}
                        type={
                          formState.showPassword === true ? "text" : "password"
                        }
                        name="password"
                        label="Password"
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{
                                display: {
                                  xs: "none",
                                  sm: "none",
                                  md: "none",
                                  lg: "flex",
                                  xl: "flex",
                                },
                              }}
                            >
                              <IconButton
                                id="showPassword"
                                onMouseUpCapture={() => hidePassword()}
                                onMouseDownCapture={() => showPassword()}
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
                    </Grid>

                    <Grid item xs={12} mt={1}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Remember me"
                          checked={formState.rememberMe}
                          onChange={(e) => handleChangeRemenberMe(e)}
                        ></FormControlLabel>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} sx={{ mx: 0, px: 0 }} mt={1}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={
                          () => handleEmpyInput()
                          /* handleSignIn(formState.email, formState.password) */
                        }
                      >
                        Sign in
                      </Button>
                    </Grid>
                    <Grid item container>
                      <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                        <Typography textAlign={"left"}>
                          <Link href="auth/resetpassword">
                            Forgot password?
                          </Link>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                        <Typography
                          sx={{
                            textAlign: {
                              xs: "left",
                              sm: "right",
                              md: "right",
                              lg: "right",
                              xl: "right",
                            },
                          }}
                        >
                          <Link href="auth/signup">
                            Don't have an account? Sign Up!
                          </Link>
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          marginTop: {
                            xs: 20,
                            sm: 20,
                            md: 20,
                            lg: 20,
                            xl: 20,
                          },
                        }}
                      >
                        <Typography
                          variant={"body2"}
                          sx={{ color: "#606060" }}
                          textAlign={"center"}
                        >
                          Copyright ©
                          <Link href="/anime-jox/" color={"inherit"}>
                            Your Website
                          </Link>{" "}
                          2022.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
