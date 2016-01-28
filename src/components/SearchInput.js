/**
 * Created by Frolanta on 27/01/16.
 */
import React, { Component } from 'react'
import AutoComplete from 'material-ui/lib/auto-complete';
import YoutubeUtils from 'utils/YoutubeUtils';

const style = {
    width: '100%',
    marginBottom: '0'
};

class SearchInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: []
        };
    }

    handleUpdateInput = (input) => {

        if (input.length >= 3) {
            var self = this;
            YoutubeUtils.getSuggestions(input, function (data) {
                var dataSource = [];

                data.forEach(function (array) {
                    dataSource.push(array[0]);
                });

                self.setState({dataSource: dataSource});
            });

        } else {
            this.setState({dataSource: []});
        }
    };

    render () {
        return (
            <AutoComplete
                hintText="Search"
                dataSource={this.state.dataSource}
                onUpdateInput={this.handleUpdateInput}
                onNewRequest={this.props.handleNewRequest}
                filter={AutoComplete.fuzzyFilter}
                style={style}
                />
        );
    }
}

export default SearchInput
