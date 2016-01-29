import React, { Component } from 'react'
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Slider from 'material-ui/lib/slider';
import SwipeableViews from 'react-swipeable-views';
import Paper from 'material-ui/lib/paper';
import Snackbar from 'material-ui/lib/snackbar';

import Playlist from 'components/Playlist';
import Search from 'components/Search';

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
    width: '100%',
    zIndex: '1'
};

const swipeableViewsStyle = {
    paddingTop: '50px',
    height: '100%'
};

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disableSwiping: false,
            slideIndex: 0,
            snackBarOpen: false,
            snackBarMessage: ''
        };
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value
        });
    };

    updateSearchHeight = () => {
      this.forceUpdate();
    };

    toggleSwiping = (bool) => {
      this.setState({disableSwiping: bool});
    };

    openSnackBar = (message) => {
        if (!this.state.snackBarOpen) {
            this.setState({snackBarOpen: true, snackBarMessage: message});
        } else {
            this.setState({snackBarOpen: false});

            var self = this;

            setTimeout(function () {
                self.setState({snackBarOpen: true, snackBarMessage: message});
            }, 100);
        }
    };

    handleRequestClose = () => {
        this.setState({
            snackBarOpen: false
        });
    };

    render () {
        return (
            <div style={containerStyle}>
                <Paper zDepth={2} style={tabsStyle} >
                    <Tabs inkBarStyle={inkStyle} onChange={this.handleChange} value={this.state.slideIndex}>
                        <Tab label="Playlist" style={style} value={0}>
                        </Tab>
                        <Tab label="Search" style={style} value={1}>
                        </Tab>
                    </Tabs>
                </Paper>
                <SwipeableViews
                    disabled={this.state.disableSwiping}
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                    style={swipeableViewsStyle}
                    >
                    <div className="tabContainer">
                        <Playlist toggleSwiping={this.toggleSwiping} openSnackBar={this.openSnackBar}></Playlist>
                    </div>
                    <div className="tabContainer">
                        <Search newSearchCallback={this.updateSearchHeight}></Search>
                    </div>
                </SwipeableViews>
                <Snackbar
                    open={this.state.snackBarOpen}
                    message={this.state.snackBarMessage}
                    autoHideDuration={1500}
                    onRequestClose={this.handleRequestClose}
                    />
            </div>
        );
    }

}

export default Home
