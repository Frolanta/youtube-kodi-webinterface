/**
 * Created by Frolanta on 28/01/16.
 */
import React, { Component } from 'react'
import PlaylistItem from 'components/PlaylistItem'
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';

const style = {
    paddingTop: 0,
    paddingBottom: 0
};

class PlaylistItemsList extends Component {

    render () {
        var content = this.props.items.map(function(item, key) {

            return (
                <div key={key}>
                    <PlaylistItem ref={key} pos={key} item={item}></PlaylistItem>
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

export default PlaylistItemsList
