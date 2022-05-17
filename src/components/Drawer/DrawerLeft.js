import { Search } from '@mui/icons-material';
import {
  Button,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { react, Component } from 'react';
/* CSS */
import './style/drawerLeft.css';

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
