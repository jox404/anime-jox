import { react, Component } from 'react';

/* MUI COMPONENTS */
import {
  Button,
  Divider,
  InputBase,
  List,
  ListItem,
  Typography,
  Box
} from '@mui/material';
/* CSS */
import './style/drawerLeft.css';
/* ICONS */
import { Search } from '@mui/icons-material';

class DrawerLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleRedirect(rote) {
    window.location.replace(rote)
  }
  render() {
    return (
      <>
        <Box className='drawerBgColor'>
          <Box>
            <Typography variant='subtitle2' align='center' className='menu'>
              MENU
            </Typography>
          </Box>
          <List className='list' sx={{ width: 280 }}>
            <Box sx={{ marginLeft: 2, marginBottom: 1 }}>
              <InputBase placeholder='Search Manga' />
              <Button color='warning' variant='contained'>
                <Search className='searchBtn' sx={{ width: 20, height: 20 }} />
              </Button>
            </Box>
            <Divider />
            <ListItem className='itemList'>Releases</ListItem>
            <Divider />
            <ListItem className='itemList'>Most Viewed</ListItem>
            <Divider />
            <ListItem className='itemList' onClick={() => { this.handleRedirect("/anime-jox/#/customizedSearch") }}>Customized search</ListItem>
            <Divider />
            <ListItem className='itemList'>Best of The Day</ListItem>
            <Divider />
            <ListItem className='itemList'>Best of The Week</ListItem>
            <Divider />
            {this.props.subscribe === true ? (
              `${''}`
            ) : (
              <Box
                sx={{ justifyContent: 'space-around', display: 'flex', mt: 3 }}
              >
                <Button variant='outlined' color='secondary'>
                  SUBSCRIBE
                </Button>
              </Box>
            )}
          </List>
        </Box>
      </>
    );
  }
}
export default DrawerLeft;
