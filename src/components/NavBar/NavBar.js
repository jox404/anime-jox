import reactDom, { Component } from 'react';
/* MUI COMPONENTS */

import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  ThemeProvider,
  IconButton,
  Avatar,
  Container,
  Grid,
  Link,
  InputBase,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';

import './Style/style.css';
/* DRAWER */
import DrawerMenu from '../Drawer/Drawer';
import DrawerRight from './DrawerRight';
import DrawerLeft from './DrawerLeft';
/* IMAGES */
import logo from '../../img/logo-dark.png'
/* ICONS */
import MenuOpenDrawerIcon from '@mui/icons-material/Menu';
import { Login, Menu, Search } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

/* FIRE BASE */
import { db } from '../../connections/firebase';
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'
import DefaultTheme from '../Themes/DefaultTheme';


const theme = createTheme({
  palette: {
    primary: {
      main: '#11468F',
    },
    secondary: {
      main: '#FB3640',
    },
    error: {
      main: '#FF0000',
    },
    info: {
      main: '#FFC600',
    },
    main: {
      main: '#393E46',
    },
    milk: {
      main: '#F7F5F2',
    },
  },
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validateUser: false,
      user: {},
      signIn: true,
      subscribe: true,
      displayName: '',
      email: '',
      userProfilePhoto:
        'https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      showDrawerRight: false,
      showDrawerLeft: false,
      backgroundImage: '',
      profileImage: ''
    };
  }

  async handleShowDrawer(side, status) {
    side === 'right'
      ? this.setState({
        showDrawerRight: status,
      })
      : this.setState({
        showDrawerLeft: status,
      });
  };

  async handleAuth() {
    const auth = getAuth()
    await onAuthStateChanged(auth, (user) => {
      if (user) {

        const uid = user.uid
        const docRef = doc(db, "users", uid)
        const docSnap = getDoc(docRef).then((res) => {
          const data = res._document.data.value.mapValue.fields

          this.setState({
            email: data.email.stringValue,
            displayName: data.firstName.stringValue,
            firstName: data.firstName.stringValue,
            lastName: data.lastName.stringValue,
            signIn: true,
            backgroundImage: data.backgroundImage.stringValue,
            profileImage: data.profileImage.stringValue,
          })
        })
        console.log("User is sign In")
      } else {
        this.setState({
          signIn: false,
        })
        console.log("User is signed out")
      }
    })

  }
  componentDidMount() {
    this.handleAuth()
  }
  render() {

    /* const logo = ['A', 'N', 'I', 'M', 'E']; */
    const colors = ['#e83a14', '#ff6c09', '#fd922d', '#ff6c09', '#e83a14'];
    return (
      <>
        <Box >
          <AppBar elevation={1} position='relative' sx={{ backgroundColor: '#212121' }}>
            <Container maxWidth='xl' sx={{ padding: 0 }}>
              <Toolbar sx={{ padding: 0, margin: 0 }}>
                <Grid container>
                  <Grid
                    item
                    lx={5}
                    lg={5}
                    md={5}
                    sm={2}
                    xs={2}
                    sx={{
                      height: 60,
                      paddingTop: {
                        xs: 0,
                        sm: 0,
                        md: 0,
                        lg: `${19.5}px`,
                        xl: `${19.5}px`,
                      },
                    }}
                  >
                    <Box
                      align='left'
                      flexGrow={1}
                      sx={{}}
                      component='div'
                    >
                      <IconButton
                        color='warning'
                        size='large'
                        onClick={() => this.handleShowDrawer('left', true)}
                        sx={{
                          display: {
                            xs: 'inline-flex',
                            sm: 'inline-flex',
                            md: 'inline-flex',
                            lg: 'none',
                          },
                        }}
                      >
                        <MenuOpenDrawerIcon fontSize='large' />
                      </IconButton>
                      <Typography
                        className='navItensContainer'
                        display={{
                          xs: 'none',
                          sm: 'none',
                          md: 'none',
                          lg: 'flex',
                          xl: 'flex',
                        }}
                        component='div'
                      >
                        <a className='navItem' href='###' id='releases'>
                          Releases
                        </a>
                        <a className='navItem' href='###' id='mostViewed'>
                          Most Viewed
                        </a>
                        <a
                          className='navItem'
                          href='/anime-jox/#/customizedSearch'
                          id='customizedSearch'
                        >
                          Customized Search
                        </a>
                        <a className='navItem' href='###' id='theBest'>
                          The Best
                        </a>
                      </Typography>
                    </Box>
                  </Grid>
                  {/* CENTER */}
                  <Grid
                    item
                    lx={2}
                    lg={2}
                    md={2}
                    sm={8}
                    xs={8}
                  >
                    <Box
                      flexGrow={1}
                      className={'logoNav'}
                    >
                      <a
                        href='/anime-jox/'
                      >
                        <img src={`${logo}`} width={'90px'} height={'20px'}></img>
                      </a>
                    </Box>
                  </Grid>
                  {/*RIGHT SIDE*/}
                  <Grid item lx={5} lg={5} md={5} sm={2} xs={2} sx={{
                    paddingTop: {
                      xs: 0,
                      sm: 0,
                      md: 0,
                      lg: `${10}px`,
                      xl: `${10}px`,
                    },
                  }}>
                    <Typography align='right' flexGrow={1} component='div'>
                      <Box
                        display={{
                          xs: 'none',
                          sm: 'none',
                          md: 'none',
                          lg: 'inline-flex',
                          xl: 'inline-flex',
                        }}
                      >
                        <InputBase placeholder='Search Anime' />
                        <IconButton>
                          <Search />
                        </IconButton>
                      </Box>
                      {this.state.signIn === true ? (
                        <>
                          <IconButton
                            color='main'
                            onClick={() =>
                              this.handleShowDrawer('right', true)
                            }
                            sx={{ display: 'inline-flex' }}
                          >
                            <Avatar
                              className='avatar'
                              src={this.state.profileImage}
                              sx={{
                                width: 45,
                                height: 45,
                              }}
                            ></Avatar>
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <Button
                            sx={{
                              mr: { xs: 0, sm: 1 },
                              display: {
                                xs: 'none',
                                sm: 'none',
                                md: 'none',
                                lg: 'inline-flex',
                                xl: 'inline-flex',
                              },
                            }}
                            variant='contained'
                            color='primary'
                            href='/anime-jox/#/signin'
                          >
                            Sing in
                          </Button>
                          <Button
                            sx={{
                              mr: { xs: 0, sm: 1 },
                              display: {
                                xs: 'none',
                                sm: 'none',
                                md: 'none',
                                lg: 'inline-flex',
                                xl: 'inline-flex',
                              },
                            }}
                            variant='contained'
                            color='secondary'
                            href='/anime-jox/#/signup'
                          >
                            Sign up
                          </Button>


                          <IconButton
                            sx={{
                              display: {
                                xs: 'inline-flex',
                                sm: 'inline-flexe',
                                md: 'inline-flexe',
                                lg: 'none',
                                xl: 'none',
                              },
                            }}
                            color='milk'
                            size='large'
                            href='/anime-jox/#/signin'
                          >
                            <AccountCircleIcon fontSize='large' />
                          </IconButton>
                        </>
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </Toolbar>
            </Container>
          </AppBar>
        </Box>

        <DrawerMenu
          open={this.state.showDrawerLeft}
          side={'left'}
          onClose={() => this.handleShowDrawer('left', false)}
          content={<DrawerLeft subscribe={this.state.user.subscribe} />}
        />
        <DrawerMenu
          open={this.state.showDrawerRight}
          side={'right'}
          onClose={() => this.handleShowDrawer('right', false)}
          content={
            <DrawerRight
              signIn={this.state.signIn}
              displayName={this.state.displayName}
              email={this.state.email}
              profileImage={this.state.profileImage}
              backgroundImage={this.state.backgroundImage}
            />
          }
        />
      </>
    );
  }
}

export default NavBar
