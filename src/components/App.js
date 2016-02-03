import React from 'react';
import { Component } from 'react'
import MyTheme from 'styles/MyTheme.js';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import SwipeableViews from 'react-swipeable-views';
import Paper from 'material-ui/lib/paper';
import Snackbar from 'material-ui/lib/snackbar';

import Search from 'components/Search';
import Playlist from 'components/Playlist';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleSnackBar } from 'actions/index';

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
    height: '100%',
    overflow: 'inherit'
};


@ThemeDecorator(ThemeManager.getMuiTheme(MyTheme))
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0
        };
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value
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
                    disabled={this.props.app.toggleSwipping}
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                    style={swipeableViewsStyle}
                    containerStyle={{ height: 'inherit' }}
                    >
                    <div className="tabContainer">
                        <Playlist></Playlist>
                    </div>
                    <div className="tabContainer">
                        <Search></Search>
                    </div>
                </SwipeableViews>
                <Snackbar
                    open={this.props.app.snackBarOpen}
                    message={this.props.app.snackBarMessage}
                    autoHideDuration={2000}
                    onRequestClose={ () => { this.props.toggleSnackBar(false); } }
                    />
            </div>
        );
    }

}

function mapStateToProps({ app }) {
    return { app };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleSnackBar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
