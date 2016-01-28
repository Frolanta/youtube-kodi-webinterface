/**
 * Created by Frolanta on 27/01/16.
 */
import React, { Component } from 'react'
import SearchInput from 'components/SearchInput';
import SearchItemsList from 'components/SearchItemsList';
import YoutubeUtils from 'utils/YoutubeUtils';


class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            nextPageToken: null
        };
    }

    handleNewRequest = (search) => {

        if (search.length > 0) {

            this.setState({items: []});
            var self = this;

            YoutubeUtils.apiCall("search", {
                q: search,
                part: 'snippet',
                maxResults: 10,
                type: 'video, playlist'
            }, function (data) {
                self.setState({items: data.items});
                if (data.nextPageToken) {
                    self.setState({nextPageToken: data.nextPageToken});
                }
            });
        } else {
            this.setState({items: []});
        }

    };

    render () {
        return (
            <div className="search">
                <SearchInput handleNewRequest={this.handleNewRequest}></SearchInput>
                <SearchItemsList items={this.state.items}></SearchItemsList>
            </div>
        );
    }
}

export default Search