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

const style = {
    padding: '10px'
};

const loadMoreStyle = {
  marginTop: '10px'
};

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            nextPageToken: null,
            search: null,
            newSearchCallback: props.newSearchCallback,
            loading: false
        };
    }

    handleNewRequest = (search, nextPage = false) => {

        if (search.length > 0) {

            if (!nextPage) {
                this.setState({items: []});
            }
            this.setState({loading: true});
            var self = this;

            YoutubeUtils.apiCall("search", {
                q: search,
                part: 'snippet',
                maxResults: 10,
                type: 'video, playlist',
                pageToken: nextPage ? this.state.nextPageToken : null
            }, function (data) {
                self.setState({items: nextPage ? self.state.items.concat(data.items) : data.items, search: search, loading: false});
                if (data.nextPageToken) {
                    self.setState({nextPageToken: data.nextPageToken});
                }
                self.state.newSearchCallback();
            });
        } else {
            this.setState({items: [], search: null});
        }

    };

    nextPage = () => {
        this.handleNewRequest(this.state.search, true);
    };

    render () {
        return (
            <div className="search">
                <Paper zDepth={1}>
                    <div style={style}>
                        <SearchInput handleNewRequest={this.handleNewRequest}></SearchInput>
                    </div>
                    <SearchItemsList items={this.state.items}></SearchItemsList>
                    { this.state.loading && <div><CircularProgress /></div> }
                    { this.state.nextPageToken && <div><RaisedButton style={loadMoreStyle} label="Load more" secondary={true} onClick={this.nextPage}/></div>}
                </Paper>
            </div>
        );
    }
}

export default Search