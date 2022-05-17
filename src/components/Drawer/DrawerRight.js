import { react, Component } from 'react';

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  List,
  ListItem,
  Typography,
} from '@mui/material';
/* CSS */
import './style/drawerMenu.css';
//ICONS MUI
import ProfileIcon from '@mui/icons-material/Person';
import MylistIcon from '@mui/icons-material/FormatListBulleted';
import FavoritesIcon from '@mui/icons-material/Star';
import SeeLaterIcon from '@mui/icons-material/RemoveRedEye';
import DroppedIcon from '@mui/icons-material/Delete';
import HistoryIcon from '@mui/icons-material/AccessTimeFilledOutlined';
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
//FIREBASE
import { getAuth, signOut } from 'firebase/auth';

class DrawerRight extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  handleSignOut() {
    console.log('chamou');
    const outh = getAuth();
    signOut(outh)
      .then(() => {
        console.log('você saiu');
        window.location.reload()
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <>
        <Box className='drawerBgColor'>
          <Box
            className='drawerProfile'
            bgcolor={'darksalmon'}

            sx={{
              width: { xs: 250, sm: 300, md: 300, lg: 300, xl: 455 },
              backgroundImage: `url(${this.props.backgroundImage})`,
              backgroundSize: '310px 160px',
            }}
          >
            <Avatar
              className='avatar'
              src={this.props.profileImage}
              sx={{ width: 70, height: 70 }}
            />
            <Typography variant='h5'>{this.props.displayName}</Typography>
            <Typography variant='body2'>{this.props.email}</Typography>
          </Box>
          <List className='list' sx={{ padding: 0 }}>
            <a href='/anime-jox/#/profile'>
              <ListItem className='itemList'>
                <ProfileIcon sx={{ mr: 1 }} /> Profile
              </ListItem>
            </a>
            <Divider />
            <ListItem className='itemList'>
              <MylistIcon sx={{ mr: 1 }} />
              My Manga List
            </ListItem>
            <Divider />
            <ListItem className='itemList'>
              <FavoritesIcon sx={{ mr: 1 }} />
              Favorites Manga
            </ListItem>
            <Divider />
            <ListItem className='itemList'>
              <SeeLaterIcon sx={{ mr: 1 }} />
              See Later
            </ListItem>
            <Divider />
            <ListItem className='itemList'>
              <DroppedIcon sx={{ mr: 1 }} />
              Dropped
            </ListItem>
            <ListItem className='itemList'>
              <HistoryIcon sx={{ mr: 1 }} />
              History
            </ListItem>
            <Divider />
            <Box
              sx={{
                justifyContent: 'space-around',
                display: 'flex',
              }}
            >
              {this.props.signIn === true ?
                <Button
                  onClick={this.handleSignOut}
                  variant='contained'
                  color='secondary'
                  endIcon={<Logout />}
                  sx={{ mt: 2 }}
                >
                  SIGN OUT
                </Button>
                :
                <>
                  <ButtonGroup sx={{ mt: 2 }}>
                    <Button
                      href='/signin'
                      variant='contained'
                      color='primary'
                      endIcon={<LoginIcon />}
                    >
                      SIGN IN
                    </Button>
                    <Button
                      href='/signup'
                      variant='contained'
                      color='secondary'
                      endIcon={<PersonAddAltIcon />}
                    >
                      SIGN UP
                    </Button>
                  </ButtonGroup>
                </>}
            </Box>
          </List>
        </Box>
      </>
    );
  }
}

export default DrawerRight;
