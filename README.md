
You can get all informations available in the xml as explain in th Yahoo! doc here : [http://developer.yahoo.com/weather](http://developer.yahoo.com/weather).

## How to use ?

An example of how to get the weather based on location.

```javascript
var weather = require('weather');

var params = {
	location : 'Melbourne', 
	unit     : 'f', // Celcius(default, "c") or Fahrenheit ("f")
	appid    : "MyYahhoAppId",
	logging  : false //Debug info or not
}

weather(params, function(data) {
  if (data.condition.temp > 30) {
    console.log("Damn it's hot!");
  }
});
```

###Example JSON result:

```javascript
{ 
	date: 'Thu, 10 Oct 2013 5:29 am AEST',
	location: { 
		city: 'Melbourne',
		region: 'VIC',
		country: 'Australia',
		lat: '-37.87',
		long: '145.1' 
	},
	units: {
		temperature: 'F', 
		distance: 'mi', 
		pressure: 'in', 
		speed: 'mph' 
	},
	wind: { 
		chill: '57', 
		direction: '50', 
		speed: '8' 
	},
	atmosphere: { 
		humidity: '82',
		visibility: '6.21',
		pressure: '29.59',
		rising: '0' 
	},
	astronomy: { 
		sunrise: '5:42 am', 
		sunset: '6:30 pm' 
	},
	condition:  { 
		text: 'Showers in the Vicinity',
		code: '29',
		temp: '57',
		date: 'Thu, 10 Oct 2013 5:29 am AEST'
	},
	description: '\n<img src="http://l.yimg.com/a/i/us/we/52/29.gif"/><br />\n<b>Current Conditions:</b><br />\nShowers in the Vicinity, 57 F<BR />\n<BR /><b>Forecast:</b><BR />\nThu - PM Light Rain. High: 62 Low: 45<br />\nFri - Partly Cloudy. High: 70 Low: 48<br />\nSat - Mostly Sunny. High: 78 Low: 50<br />\nSun - Partly Cloudy. High: 57 Low: 42<br />\nMon - Partly Cloudy. High: 62 Low: 42<br />\n<br />\n<a href="http://us.rd.yahoo.com/dailynews/rss/weather/Melbourne__AU/*http://weather.yahoo.com/forecast/ASXX0075_f.html">Full Forecast at Yahoo! Weather</a><BR/><BR/>\n(provided by <a href="http://www.weather.com" >The Weather Channel</a>)<br/>\n',
	days: 
	[ { day: 'Thu',
	   date: '10 Oct 2013',
	   low: '45',
	   high: '62',
	   text: 'PM Light Rain',
	   code: '11' },
	 { day: 'Fri',
	   date: '11 Oct 2013',
	   low: '48',
	   high: '70',
	   text: 'Partly Cloudy',
	   code: '30' },
	 { day: 'Sat',
	   date: '12 Oct 2013',
	   low: '50',
	   high: '78',
	   text: 'Mostly Sunny',
	   code: '34' },
	 { day: 'Sun',
	   date: '13 Oct 2013',
	   low: '42',
	   high: '57',
	   text: 'Partly Cloudy',
	   code: '30' },
	 { day: 'Mon',
	   date: '14 Oct 2013',
	   low: '42',
	   high: '62',
	   text: 'Partly Cloudy',
	   code: '30' } 
	] 
}
```

## Licence
Licensed under the MIT License
