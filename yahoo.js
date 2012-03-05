var http = require('http'),
	xml2js = require('xml2js'),
	request = require('weather');

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
	var options = {
		host: 'weather.yahooapis.com',
		path: '/forecastrss?w='+woeid+'&u=c'
	};

	var url = 'http://weather.yahooapis.com/forecastrss?w='+woeid+'&u=c';
	request(url, function(error, res, body) {
		var parser = new xml2js.Parser();
		parser.parseString(data, function (err, result) {
			var temp = result.channel.item['yweather:condition']['@'].temp;
			callback(temp);
		});
	});
};

/**
 * Get yahoo location base on geolocation.
 */
yahoo.where = function(geo, callback) {
	var options = {
		host: 'where.yahooapis.com',
		path: '/geocode?location='+geo.lat+','+geo.long+'&flags=J&gflags=R'
	};

	http.get(options, function(res) {
		var data = '';
		res.on("data", function(chunk) {
			data += chunk;
		});

		res.on('end', function() {
			data = JSON.parse(data);
			if (data.ResultSet.Found)
				callback(data.ResultSet.Results[0].woeid);
		});
	});
};
