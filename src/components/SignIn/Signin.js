import { Component } from "react";

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

import { useAuth } from "../../../src/contexts/AuthContext";

export default class Signin extends Component {
  constructor(props) {
    super();
    this.state = {
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
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSignIn(email, password) {
    setPersistence(
      auth,
      this.state.rememberMe == true
        ? browserLocalPersistence
        : browserSessionPersistence
    ).then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          console.log(user);
          /*  window.location.assign("/anime-jox/"); */
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.setState({ error: "flex" });
          this.printAlert(
            "sign in was not successful",
            "Invalid Email Address or Password",
            "error"
          );
        });
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleChangeRemenberMe(e) {
    const value = e.target.checked;
    this.setState({ rememberMe: value });
    console.log(this.state.rememberMe);
  }

  alreadySignIn() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        window.location.assign("/anime-jox/");
      }
    });
  }

  backHome() {
    window.location.assign("/anime-jox/");
  }

  showPassword() {
    this.setState({ showPassword: true });
  }

  hidePassword() {
    this.setState({ showPassword: false });
  }

  printAlert(title, body, type) {
    this.setState({
      renderAlert: true,
      alertText: {
        title: title,
        body: body,
      },
      alertType: type,
    });
  }

  handleEmpyInput() {
    const email = this.state.email;
    const password = this.state.password;
    if (email === "") {
      this.printAlert(
        "Address Email Empty",
        "Please, Fill In The Address Email Field.",
        "error"
      );
    } else if (password === "") {
      this.printAlert(
        "Password Empty",
        "Please, Fill In The Password Field.",
        "error"
      );
    } else {
      this.handleSignIn(email, password);
    }
  }

  closeAlertError() {
    this.setState({ renderAlert: false });
  }

  componentDidMount() {
    /* this.alreadySignIn(); */
  }

  render() {
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
              sx={{ display: this.state.renderAlert ? "flex" : "none" }}
            >
              <Alert severity={this.state.alertType} className={styles.alert}>
                <AlertTitle
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  {this.state.alertText.title}
                  <IconButton
                    size="small"
                    onClick={() => this.closeAlertError()}
                    sx={{ mt: "-6.5px" }}
                  >
                    <Close />
                  </IconButton>
                </AlertTitle>
                {this.state.alertText.body}
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
                          value={this.state.email}
                          onChange={this.handleChange}
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
                          value={this.state.password}
                          onChange={this.handleChange}
                          type={
                            this.state.showPassword === true
                              ? "text"
                              : "password"
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
                                  onMouseUpCapture={() => this.hidePassword()}
                                  onMouseDownCapture={() => this.showPassword()}
                                >
                                  {this.state.showPassword === true ? (
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
                            checked={this.state.rememberMe}
                            onChange={(e) => this.handleChangeRemenberMe(e)}
                          ></FormControlLabel>
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12} sx={{ mx: 0, px: 0 }} mt={1}>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={
                            () => this.handleEmpyInput()
                            /* this.handleSignIn(this.state.email, this.state.password) */
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
}
