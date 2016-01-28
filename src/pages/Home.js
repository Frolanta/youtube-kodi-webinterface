import React, { Component } from 'react'
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Slider from 'material-ui/lib/slider';
import SwipeableViews from 'react-swipeable-views';

import Playlist from 'components/Playlist';
import Search from 'components/Search';
import Config from 'utils/Config';

const style = {
    textTransform: 'uppercase',
    fontWeight: 600
};

const inkStyle = {
    height: '4px',
    marginTop: '-4px'
};

const containerStyle = {
    height: '100%'
};

const tabsStyle = {
    position: 'absolute',
    width: '100%'
};

const swipeableViewsStyle = {
    paddingTop: '45px',
    height: '100%'
};

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };

        var sock =  new WebSocket('ws://' + Config.kodi.ip + ':' + Config.kodi.wsPort + '/jsonrpc');
        sock.onopen = function() {
            console.log('ws connection opened');
        };
        sock.onmessage = function(e) {
            console.log('message', e.data);
        };

    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    updateSearchHeight = () => {
      this.forceUpdate();
    };

    render () {
        return (
            <div style={containerStyle}>
                <Tabs style={tabsStyle} inkBarStyle={inkStyle} onChange={this.handleChange} value={this.state.slideIndex}>
                    <Tab label="Playlist" style={style} value={0}></Tab>
                    <Tab label="Search" style={style} value={1}></Tab>
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                    style={swipeableViewsStyle}
                    >
                    <div className="tabContainer">
                        <Playlist></Playlist>
                    </div>
                    <div className="tabContainer">
                        <Search newSearchCallback={this.updateSearchHeight}></Search>
                    </div>
                </SwipeableViews>
            </div>
        );
    }

}

export default Home
