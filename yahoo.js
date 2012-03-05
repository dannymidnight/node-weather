var http = require('http'),
	xml2js = require('xml2js');


/**
 * Get the the weather based on WOEID.
 */
var weather = function(woeid, callback) {
	var options = {
		host: 'weather.yahooapis.com',
		path: '/forecastrss?w='+woeid+'&u=c'
	};

	http.get(options, function(res) {
		var data = '';
		res.on("data", function(chunk) {
			data += chunk;
		});

		res.on('end', function() {
			var parser = new xml2js.Parser();
			parser.parseString(data, function (err, result) {
				var temp = result.channel.item['yweather:condition']['@'].temp;
				callback(temp);
			});
		});
	});
};

/**
 * Get yahoo location base on geolocation.
 */
var where = function(geo, callback) {
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
