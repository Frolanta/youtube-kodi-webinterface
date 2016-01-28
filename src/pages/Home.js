import React, { Component } from 'react'
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Slider from 'material-ui/lib/slider';

import Playlist from 'components/Playlist';
import Search from 'components/Search';

class Home extends Component {

  render () {
    return (
        <Tabs>
          <Tab label="Playlist">
              <div className="tabContainer">
                  <Playlist></Playlist>
              </div>
          </Tab>
          <Tab label="Search">
              <div className="tabContainer">
                  <Search></Search>
              </div>
          </Tab>
        </Tabs>
    )
  }

}

export default Home
