import { Drawer } from '@mui/material';
import { React, Component } from 'react';

class DrawerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Drawer
          className='drawer'
          anchor={this.props.side}
          open={this.props.open}
          onClose={() => this.props.onClose()}
        >
          {this.props.content}
        </Drawer>
      </>
    );
  }
}

export default DrawerMenu;
