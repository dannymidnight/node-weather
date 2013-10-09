
/**
 *
 * Yahoo! Weather - NodeJS Module
 * 
 */


var xml2js  = require('xml2js'),
	request = require('request'),
	printf  = require('util').format;

/*
	Init
 */
var yahoo = {
	logging: false
};




module.exports = function(options, callback) {

	yahoo.logging = options.logging;

	yahoo.where(options, function(woeid) {
		//Default unit is celcius
		if(!options.unit) {
			options.unit = 'c';
		}

		yahoo.weather(woeid, options.unit, callback);
	});
};





/**
 * Report error.
 */
var onError = function(msg) {
	if (yahoo.logging) {
		console.log('ERROR: ' + msg);
	}

	if (module.exports.error) {
		module.exports.error(msg);
	}
};






/**
 * Get the Yahoo weather based on geolocation.
 */
yahoo.weather = function(woeid, unit, callback) {

	var url = 'http://weather.yahooapis.com/forecastrss?w='+woeid+'&u='+unit;

	if (yahoo.logging) {
		console.log('Requesting %s', url);
	}

	request(url, function(error, res, body) {
		
		var parser = new xml2js.Parser();

		parser.parseString(body, function (err, result) {


			try {
			
				var weather = {

					//The date
					date        : result.rss.channel[0].item[0].pubDate[0],

					//Some general informations
					//@see http://developer.yahoo.com/weather/#channel
					location    : result.rss.channel[0]['yweather:location'][0]['$'],
					units       : result.rss.channel[0]['yweather:units'][0]['$'],
					wind        : result.rss.channel[0]['yweather:wind'][0]['$'],
					atmosphere  : result.rss.channel[0]['yweather:atmosphere'][0]['$'],
					astronomy   : result.rss.channel[0]['yweather:astronomy'][0]['$'],

					//Item elements
					//@see http://developer.yahoo.com/weather/#item
					condition   : result.rss.channel[0].item[0]['yweather:condition'][0]['$'], //Current conditions
					description : result.rss.channel[0].item[0].description[0], //HTML widget

					days        : []
				};

				//We add latitude and longitude info to the location object
				weather.location.lat  = result.rss.channel[0].item[0]['geo:lat'][0];
				weather.location.long = result.rss.channel[0].item[0]['geo:long'][0];


				//Extract forecasts for nexts days
				var forecasts = result.rss.channel[0].item[0]['yweather:forecast'];
				for(var i=0; i<forecasts.length; i++) {

					var forecast = forecasts[i]['$'];
					weather.days.push({
						day  : forecast.day, //Day of the week (english, 3 letters, ex: Wed)
						date : forecast.date, //Date, (english, dd Mmm yyyy)
						low  : forecast.low,
						high : forecast.high,
						text : forecast.text, //Description of conditions (ex: Partly Cloudy)
						code : forecast.code, //@see http://developer.yahoo.com/weather/#codes
					});
					
				}

				callback(weather);
				
			} catch(e) {
				onError('Failed to find weather');
				return;
			}

		});
	});
};






/**
 * Get yahoo location base on geolocation.
 */
yahoo.where = function(options, callback) {

	var url = printf(
		"http://where.yahooapis.com/v1/places.q(\"%s\")?appid=%s",
		options.location,
		options.appid
	);

	if (yahoo.logging) {
		console.log('Requesting %s', url);
	}

	request(url, function(error, res, body) {

		var parser = new xml2js.Parser();

		if (body) {
			parser.parseString(body, function (err, result) {
				try {
					var woeid = result.places.place[0].woeid[0];
					callback(woeid);
				} catch(e) {
					onError('Failed to fetch woeid');
				}
			});
		} else {
			onError(error);
		}
	});
};
