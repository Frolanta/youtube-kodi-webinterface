/**
 * Created by Frolanta on 27/01/16.
 */
import React, { Component } from 'react'
import AutoComplete from 'material-ui/lib/auto-complete';

const style = {
    width: '100%'
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
            var request = require('superagent');
            let jsonp = require('superagent-jsonp');

            var self = this;

            request
                .get('http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q=' + input + '&format=5&alt=json&callback=?')
                .use(jsonp)
                .end(function(err, res){

                    var dataSource = [];

                    res.body[1].forEach(function (array) {
                        dataSource.push(array[0]);
                    });

                    self.setState({dataSource: dataSource});

                });
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



//http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q="+query+"&key="+apiKey+"&format=5&alt=json&callback=?
