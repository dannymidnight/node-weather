var xml2js = require('xml2js'),
    request = require('request'),
    printf = require('util').format;

module.exports = function(options, callback) {
  yahoo.logging = options.logging;
  yahoo.where(options, function(woeid) {
    yahoo.weather(woeid, callback);
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

var yahoo = {
  logging: false
};

/**
 * Get the Yahoo weather based on geolocation.
 */
yahoo.weather = function(woeid, callback) {
  var url = 'http://weather.yahooapis.com/forecastrss?w='+woeid+'&u=c';

  if (yahoo.logging) {
    console.log('Requesting %s', url);
  }

  request(url, function(error, res, body) {
    var parser = new xml2js.Parser();
    parser.parseString(body, function (err, result) {
      var weather = {},
          high = /(?:High:\s)(-?\d+)/g,
          low = /(?:Low:\s)(-?\d+)/g;

      try {
        // Get the current temp
        var condition = result.channel.item['yweather:condition']['@'];
        weather = condition;

        // Get the high/low currently stored in Yahoo widget.
        var description = result.channel.item['description'];
        weather.high = high.exec(description)[1];
        weather.low = low.exec(description)[1];
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
          var woeid = result.place.woeid;
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
