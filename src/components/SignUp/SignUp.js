import {
  Grid,
  Box,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Avatar,
  Typography,
  Button,
  Link,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { React, Component } from 'react';
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';

/* FIRE BASE  */
import { db } from '../../connections/firebase';
import { cretateUser } from '../../connections/firebase';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      validForm: true,
      helperText: '',
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passwordError: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.clearErro = this.clearErro.bind(this);
  }
  validateInput(name, value) {
    const inputName = name;
    const inputValue = value;
    inputValue === ''
      ? this.setState({
        [inputName]: true,
      })
      : this.setState({
        [inputName]: false,
      });
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
    this.validateInput(`${name}Error`, value);
  }

  usersCollectionRef = collection(db, 'users');
  /* async validateUser() {
    const data = await getDocs(this.usersCollectionRef);
    const usersData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    usersData.map((userData) => {
      this.state.emailError === true
        ? console.log('falseeee')
        : userData.email === this.state.email
          ? this.setState({
            emailError: true,
          })
          : console.log(userData.email, 'true');
    });
  } */
  handleError() { }
  /* async createUser() {
    this.validateUser().then((res) => {
     
      res === true
        ? addDoc(this.usersCollectionRef, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
          })
        : this.handleError();
    });
  } */

  async cretateUser(email, password) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredendial) => {
        const user = userCredendial.user;
        const uid = userCredendial.user.uid;
        setDoc(doc(db, "users", uid), {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          backgroundImage: '',
          profileImage: '',
          animesInfo: {
            dropped: 0,
            favorit: 0,
            seeLater: 0,
            watched: 0,
            watching: 0,
          },
          animeList: {
            /* seeLater: false,
            watching: false,
            favorit: false,
            watched: false,
            dropped: false, */
          }
        }
        ).then(() => {
          window.alert('Registration successful')
          window.location.replace('/')
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })
  }

  async clearErro() {

    if (this.state.validForm === false) {
      this.setState({
        helperText: '',
        emailError: false,
      });
    }
  }
  validateLogin() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        /* window.location.assign('http://localhost:3000/'); */
      }
    })
  }
  componentDidMount() {
    this.validateLogin()
  }
  render() {
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 9,
          }}
          component='form'
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: '#9c27b0',
              mb: 1,
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component={'h1'} variant='h5'>
            {'Sign up'}
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{
              maxWidth: { xs: 350, sm: 410, md: 410, lg: 410, xl: 410 },
              mt: 1,
              mb: 2,
            }}
          >
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                required={true}
                name='firstName'
                label='First Name'
                type={'name'}
                fullWidth
                value={this.state.firstName}
                error={this.state.firstNameError}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name='lastName'
                label='Last Name'
                type={'name'}
                fullWidth
                value={this.state.lastName}
                error={this.state.lastNameError}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='email'
                label='Email Address'
                type={'email'}
                fullWidth
                value={this.state.email}
                onChange={(e) =>
                  this.setState({
                    email: e.target.value,
                  })
                }
                onClick={this.clearErro}
                error={this.state.emailError}
                helperText={this.state.helperText}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='password'
                label='Password'
                type={'password'}
                fullWidth
                value={this.state.password}
                error={this.state.passwordError}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label='I want to receive inspiration, marketing promotions and updates via email.'
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                type='button'
                onClick={() =>
                  this.cretateUser(this.state.email, this.state.password)
                }
              >
                SIGN UP
              </Button>
            </Grid>
            <Grid item container justifyContent={'flex-end'}>
              <Typography variant='body2'>
                <Link href='http://localhost:3000/signin'>
                  Already have an account? Sign in
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}
export default SignUp;
