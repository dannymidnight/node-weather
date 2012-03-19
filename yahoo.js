var xml2js = require('xml2js'),
		request = require('request');

module.exports = function(geo, callback) {
	yahoo.logging = geo.logging;

	yahoo.where(geo, function(woeid) {
		yahoo.weather(woeid, callback);
	});
};

/**
 * Report error.
 */
var onError = function(msg) {
	if (module.exports.error) {
		module.exports.error(msg);
	}
};

var yahoo = {
	logging: false
};

/**
 * Get the Yahoo weather based on geolocation.
 */
yahoo.weather = function(woeid, callback) {
	var url = 'http://weather.yahooapis.com/forecastrss?w='+woeid+'&u=c';

	if (yahoo.logging)
		console.log('Requesting %s', url);

	request(url, function(error, res, body) {
		var parser = new xml2js.Parser();
		parser.parseString(body, function (err, result) {			
			try {
				var weather = result.channel.item['yweather:condition']['@'];
			} catch(e) {
				onError('Failed to find weather');
				return;
			}
			callback(weather);
		});
	});
};

/**
 * Get yahoo location base on geolocation.
 */
yahoo.where = function(geo, callback) {
	var url = 'http://where.yahooapis.com/geocode?location='+geo.lat+','+geo.long+'&flags=J&gflags=R';
	
	if (yahoo.logging)
		console.log('Requesting %s', url);

	request({url:url, json:true}, function(error, res, body) {
		var result = body.ResultSet;
		if (result.Found)
			callback(result.Results[0].woeid);
	});
};
