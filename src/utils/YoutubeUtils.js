import Config from 'utils/Config';
import superagent from 'superagent';
import superagentjsonp from 'superagent-jsonp';

var YoutubeUtils = {

    apiCall: function(method, params, callback) {


        var url = 'https://www.googleapis.com/youtube/v3/' + method;

        params.key = Config.youtube.apiKey;

        superagent
            .get(url)
            .set('Accept', 'application/json')
            .query(params)
            .end(function(err, res) {
                if (!err) {
                    callback(res.body);
                }
            });

    },

    fetchVideos: function (search, pageToken = null) {

       return new Promise(
            function(resolve, reject) {
                YoutubeUtils.apiCall('search', {
                    q: search,
                    part: 'snippet',
                    maxResults: 10,
                    type: 'video, playlist',
                    pageToken: pageToken
                }, function (data) {
                    resolve(data);
                });
            }
        );

    },

    getSuggestions: function (input, callback) {


        superagent
            .get('http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q=' + input + '&format=5&alt=json&callback=?')
            .use(superagentjsonp)
            .end(function(err, res){
                if (!err) {
                    callback(res.body[1]);
                }
            });
    }
};

module.exports = YoutubeUtils;