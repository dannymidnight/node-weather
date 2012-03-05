var xml2js = require('xml2js'),
	request = require('request');

module.exports = function(geo, callback) {
	yahoo.where(geo, function(woeid) {
		yahoo.weather(woeid, callback);
	});
};

var yahoo = {};

/**
 * Get the Yahoo weather based on geolocation.
 */
yahoo.weather = function(woeid, callback) {
	var url = 'http://weather.yahooapis.com/forecastrss?w='+woeid+'&u=c';

	request(url, function(error, res, body) {
		var parser = new xml2js.Parser();
		parser.parseString(body, function (err, result) {
			var temp = result.channel.item['yweather:condition']['@'].temp;
			callback(temp);
		});
	});
};

/**
 * Get yahoo location base on geolocation.
 */
yahoo.where = function(geo, callback) {
	var url = 'http://where.yahooapis.com/geocode?location='+geo.lat+','+geo.long+'&flags=J&gflags=R';

	request({url:url, json:true}, function(error, res, body) {
		var result = body.ResultSet;
		if (result.Found)
			callback(result.Results[0].woeid);
	});
};
