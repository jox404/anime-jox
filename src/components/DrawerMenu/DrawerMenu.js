import { react, Component } from "react";

import { Drawer, Link, List, ListItem, ListSubheader } from "@mui/material";

class DrawerMenu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const list = this.props.list;
    console.log(list);
    return (
      <Drawer anchor={this.props.anchor} open={this.props.open}>
        <List
          subheader={
            <ListSubheader sx={{ fontSize: 30 }}>
              dados da conta....
            </ListSubheader>
          }
        >
          {list.map((item, index) => {
            return (
              <ListItem>
                <Link href="##">{item}</Link>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    );
  }
}

export default DrawerMenu;
