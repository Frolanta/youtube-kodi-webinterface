/**
 * Created by Frolanta on 28/01/16.
 */
import Config from 'utils/Config';

var KodiUtils = {
    apiCall: function (method, params, callback) {
        var url = 'http://' + Config.kodi.ip + ':' + Config.kodi.port + '/jsonrpc';
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
                    callback(res.body.result);
                }
            });
    }
};

module.exports = KodiUtils;