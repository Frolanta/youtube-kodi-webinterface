
var YoutubeUtils = {

    apiCall: function(method, params, callback) {

        var url = 'https://www.googleapis.com/youtube/v3/' + method;
        var request = require('superagent');

        params.key = "AIzaSyAex_jkoIzt99SqMKXVCF7XRAQFDDDEwR4";

        request
            .get(url)
            .set('Accept', 'application/json')
            .query(params)
            .end(function(err, res) {
                if (!err) {
                    callback(res.body);
                }
            });
    }
};

module.exports = YoutubeUtils;