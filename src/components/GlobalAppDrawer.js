import React, { Component } from 'react';

class GlobalAppDrawer extends Component {
  state = { 

   }
  
  toggleDrawer = (open) => () => {
    this.setState({
      drawerOpen: open,
    });
  }

  render() { 
    console.log("re-rendered (I think)");
    return (<div>Hi</div>);
  }
}
 
export default GlobalAppDrawer;