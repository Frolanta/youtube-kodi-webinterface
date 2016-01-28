/**
 * Created by Frolanta on 27/01/16.
 */
import React, { Component } from 'react'
import SearchInput from 'components/SearchInput';
import YoutubeUtils from 'utils/YoutubeUtils';


class Search extends Component {

    handleNewRequest = (search) => {

        YoutubeUtils.apiCall("search", {
            q: search,
            part: 'snippet',
            maxResults: 10,
            type: 'video, playlist'
        }, function (data) {
            console.log(data);
        });

    };

    render () {
        return (
            <div className="search">
                <SearchInput handleNewRequest={this.handleNewRequest}></SearchInput>
            </div>
        );
    }
}

export default Search