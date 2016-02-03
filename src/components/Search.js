/**
 * Created by Frolanta on 27/01/16.
 */
import React, { Component } from 'react'
import SearchInput from 'components/SearchInput';
import SearchItemsList from 'components/SearchItemsList';
import YoutubeUtils from 'utils/YoutubeUtils';
import Paper from 'material-ui/lib/paper';
import CircularProgress from 'material-ui/lib/circular-progress';
import RaisedButton from 'material-ui/lib/raised-button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchNextVideos } from 'actions/index';

const style = {
    padding: '10px'
};

const loadMoreStyle = {
    width: '100%',
    textAlign: 'center'
};

const loadMoreButton = {
    marginTop: '10px',
    marginBottom: '10px'
};

class Search extends Component {

    constructor(props) {
        super(props);
    }

    nextPage = () => {
        //this.handleNewRequest(this.state.search, true);
        this.props.fetchNextVideos(this.props.search.search, this.props.search.nextPageToken);
    };

    render () {
        return (
            <div className="search">
                <Paper zDepth={1}>
                    <div style={style}>
                        <SearchInput></SearchInput>
                    </div>
                    <SearchItemsList items={this.props.search.items}></SearchItemsList>
                    { this.props.search.loading && <div style={loadMoreButton}><CircularProgress /></div> }
                    { this.props.search.nextPageToken && <div style={loadMoreStyle}><RaisedButton style={loadMoreButton} label="Load more" secondary={true} onClick={this.nextPage}/></div>}
                </Paper>
            </div>
        );
    }
}

function mapStateToProps({ search }) {
    return { search };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchNextVideos }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);