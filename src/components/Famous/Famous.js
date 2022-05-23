import { Box } from '@mui/system';
import { Component, React } from 'react';
import NavBar from '../NavBar/NavBar';
import Section from '../Section/Section';

class Famous extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Box>
          <NavBar />
          <Section title={'THE MONST FAMOUS'} sort={'popularityRank'} />
        </Box>
      </>
    );
  }
}
export default Famous;
