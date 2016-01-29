/**
 * Created by Frolanta on 28/01/16.
 */
import React, { Component } from 'react'
import SearchItem from 'components/SearchItem'
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';

const style = {
   paddingTop: 0,
   paddingBottom: 0
};

class SearchItemsList extends Component {
    render () {
        var content = this.props.items.map(function(item, key){

            return (
                <div key={key}>
                    <SearchItem item={item}></SearchItem>
                    <Divider />
                </div>
            )
        });

        return (
            <List style={style}>
                {content}
            </List>
        )

    }
}

export default SearchItemsList