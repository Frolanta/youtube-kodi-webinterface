/**
 * Created by Frolanta on 28/01/16.
 */
import React, { Component } from 'react'
import SearchItem from 'components/SearchItem'
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import Paper from 'material-ui/lib/paper';

const style = {
   paddingTop: 0,
   paddingBottom: 0
};

class SearchItemsList extends Component {
    render () {
        var content = this.props.items.map(function(item){

            return (
                <div>
                    <SearchItem item={item}></SearchItem>
                    <Divider />
                </div>
            )
        });

        return (
            <Paper zDepth={1}>
                <List style={style}>
                    {content}
                </List>
            </Paper>
        )

    }
}

export default SearchItemsList