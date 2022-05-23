import { Box } from '@mui/system';
import { Component, React } from 'react';
import NavBar from '../NavBar/NavBar';
import Section from '../Section/Section';

class TheBest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Box>
          <NavBar />
          <Section title={'THE BEST'} sort={'popularityRank'} />
        </Box>
      </>
    );
  }
}
export default TheBest;
