/**
 * Created by Frolanta on 27/01/16.
 */
import React, { Component } from 'react'
import RaisedButton from 'material-ui/lib/raised-button';

const style = {
    marginRight: 10
};

class Playlist extends Component {
    render () {
        return (
            <div className="playlist">
                <div className="controls">
                    <RaisedButton label="Play/Pause" style={style}/>
                    <RaisedButton label="Clear" style={style}/>
                    <RaisedButton label="Refresh" style={style}/>
                </div>
                <div className="items">
                </div>

            </div>
        );
    }
}

export default Playlist