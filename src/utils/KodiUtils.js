/**
 * Created by Frolanta on 28/01/16.
 */


var KodiUtils = {
    apiCall: function (method, params, callback) {
        var url = 'http://192.168.0.16:8080/jsonrpc';
        var request = require('superagent');
        let jsonp = require('superagent-jsonp');

        var data = {
            request: JSON.stringify ({
                jsonrpc: "2.0",
                method: method,
                params: params,
                id: method
            })
        };

        request
            .get(url)
            .query(data)
            .use(jsonp)
            .end(function(err, res) {
                if (!err) {
                    callback(res.result);
                }
            });
    }
};

module.exports = KodiUtils;



//data: {
//    request: JSON.stringify ({
//        jsonrpc: "2.0",
//        method: "Playlist.Add",
//        params: {
//            playlistid: 1,
//            item: {
//                file: "plugin://plugin.video.youtube/?action=play_video&videoid=" + id
//            }
//        },
//        id: 0
//    })
//}