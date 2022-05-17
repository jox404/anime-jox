import { React, Component } from 'react';

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
  Link,
  InputAdornment,
  IconButton,
  Alert,
  AlertTitle,
} from '@mui/material';

import { Class, Close, HomeRounded, LockOutlined, LogoutRounded, VisibilityOff } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';

/* FIRE BASE */
import {
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  inMemoryPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';

/* IMAGES */
import bgImage from './img/kazetachinu050.jpg'

/* COLORS */
import { blue } from '@mui/material/colors';

/* CSS */
import './style/style.css'

class Signin extends Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      rememberMe: false,
      renderAlert: 'none',
      alertText: {
        title: '',
        body: ''
      }, alertType: 'error'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleSignIn(email, password) {
    const auth = getAuth();

    setPersistence(auth, this.state.rememberMe == true ? browserLocalPersistence : browserSessionPersistence).then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user, ', você foi logado com sucesso');
          window.location.assign('/anime-jox/');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('errorCode', errorCode)
          console.log('errorMessage', errorMessage)
          this.setState({ error: 'flex' })
          this.printAlert('sign in was not successful', 'Invalid Email Address or Password', 'error')
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
    const value = e.target.checked
    this.setState({ rememberMe: value })
    console.log(this.state.rememberMe)
  }

  alreadySignIn() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        window.location.assign('/anime-jox/')
      }
    })
  }

  backHome() {
    window.location.assign('/anime-jox/')
  }

  showPassword() {
    this.setState({ showPassword: true })
  }

  hidePassword() {
    this.setState({ showPassword: false })
  }

  printAlert(title, body, type) {
    this.setState({
      renderAlert: 'flex',
      alertText: {
        title: title, body: body
      }, alertType: type
    })
  }

  handleEmpyInput() {
    const email = this.state.email
    const password = this.state.password
    if (email === '') {
      this.printAlert('Address Email Empty', 'Please, Fill In The Address Email Field.', 'error')
    } else if (password === '') {
      this.printAlert('Password Empty', 'Please, Fill In The Password Field.', 'error')
    } else {
      this.handleSignIn(email, password)
    }
  }

  closeAlertError() {
    this.setState({ renderAlert: 'none' })
  }

  componentDidMount() {
    this.alreadySignIn()
  }

  render() {
    return (
      <>
        <Box className='alertContainer' display={this.state.renderAlert}>
          <Alert severity={this.state.alertType} className='alert'>
            <AlertTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>{this.state.alertText.title}
              <IconButton size='small' onClick={() => this.closeAlertError()} sx={{ mt: '-6.5px' }} >
                <Close />
              </IconButton>
            </AlertTitle>
            {this.state.alertText.body}
          </Alert>
        </Box>
        <Grid
          container
          component='main'
          sx={{
            minHeight: '100vh',
            backgroundColor: '#212121',
            color: 'dark',
          }}
        >
          <Grid
            item
            lg={8}
            xl={8}
            sx={{
              display: {
                xs: 'none',
                sm: 'none',
                md: 'none',
                lg: 'flex',
                xl: 'flex',
              },
              backgroundImage:
                `url(${bgImage})`,
              backgroundSize: '100% 100vh',
              backgroundRepeat: 'no-repeat',
              minHeight: '100vh'
            }}
          />
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={4}
            xl={4}
            sx={{ mx: 0 }}
          >
            <Box sx={{ textAlign: 'right' }}>
              <IconButton variant='outlined' color='primary' onClick={() => this.backHome()}>
                <LogoutRounded color='primary' />
              </IconButton>
            </Box>
            <Box componet='form' sx={{ display: 'block', marginX: 'auto', paddingX: 1, marginTop: { xs: 5, sm: 15, md: 20, lg: 5, xl: 20 } }} id='formValidation' maxWidth={600}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  my: 2,
                  p: 1,
                }}
              >
                <Typography
                  variant='h5'
                  sx={{ color: blue[600] }}
                  alignContent={'center'}
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: blue[600],
                      m: 1,
                      ml: 2,
                      color: '#212121',
                    }}
                  >
                    <LockOutlined />
                  </Avatar>
                  Sign in
                </Typography>
              </Box>
              <Box>
                <Grid container item xs={12}>
                  <Grid item xs={12}>
                    <TextField
                      value={this.state.email}
                      onChange={this.handleChange}
                      type='email'
                      id='email'
                      name='email'
                      label='Email Address'
                      fullWidth
                      className=''
                    />
                  </Grid>
                  <Grid item xs={12} mt={1}>
                    <TextField
                      value={this.state.password}
                      onChange={this.handleChange}
                      type={this.state.showPassword === true ? 'text' : 'password'}
                      name='password'
                      label='Password'
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end' sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex' } }}>
                            <IconButton id='showPassword' onMouseUpCapture={() => this.hidePassword()} onMouseDownCapture={() => this.showPassword()}>
                              {this.state.showPassword === true ? <VisibilityOff color='milk' /> : <VisibilityIcon color='milk' />}
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
                        label='Remember me'
                        checked={this.state.rememberMe}
                        onChange={(e) => this.handleChangeRemenberMe(e)}
                      ></FormControlLabel>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} sx={{ mx: 0, px: 0 }} mt={1}>
                    <Button
                      variant='contained'
                      fullWidth
                      onClick={() =>
                        this.handleEmpyInput()
                        /* this.handleSignIn(this.state.email, this.state.password) */
                      }
                    >
                      Sign in
                    </Button>
                  </Grid>
                  <Grid item container >
                    <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                      <Typography textAlign={'left'}>
                        <Link href='/anime-jox/#/resetpassword'>Forgot password?</Link>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                      <Typography sx={{ textAlign: { xs: 'left', sm: 'right', md: 'right', lg: 'right', xl: 'right' } }}>
                        <Link href='/anime-jox/#/signup'>
                          Don't have an account? Sign Up!
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: { xs: 20, sm: 20, md: 20, lg: 20, xl: 20 } }}>
                      <Typography variant={'body2'} sx={{ color: '#606060' }} textAlign={'center'}>
                        Copyright ©
                        <Link href='/anime-jox/' color={'inherit'}>
                          Your Website
                        </Link>{' '}
                        2022.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Signin;
