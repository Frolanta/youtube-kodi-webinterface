import Config from 'utils/Config';

var YoutubeUtils = {

    apiCall: function(method, params, callback) {

        var url = 'https://www.googleapis.com/youtube/v3/' + method;
        var request = require('superagent');

        params.key = Config.youtube.apiKey;

        request
            .get(url)
            .set('Accept', 'application/json')
            .query(params)
            .end(function(err, res) {
                if (!err) {
                    callback(res.body);
                }
            });
    },

    getSuggestions: function (input, callback) {

        var request = require('superagent');
        let jsonp = require('superagent-jsonp');

        request
            .get('http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q=' + input + '&format=5&alt=json&callback=?')
            .use(jsonp)
            .end(function(err, res){
                if (!err) {
                    callback(res.body[1]);
                }
            });
    }
};

module.exports = YoutubeUtils;