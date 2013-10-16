## Example
An example of how to get the weather based on location.

```javascript
var weather = require('weather');

weather({location: 'Melbourne', appid: 'your-yahoo-app-id'}, function(data) {
  if (data.temp > 30) {
    console.log("Damn it's hot!");
  }
});
```

 Example JSON result:

```javascript
{ 
  date: 'Tue, 15 Oct 2013 4:50 pm BST',
  text: 'Partly Cloudy',
  code: '30',
  temp: '13', // Current temperature
  high: '12', // High for the day
  low: '8',   // Low for the day
  forecast:
    [ 
      { 
        day: 'Tue',
        date: '15 Oct 2013',
        low: '8',
        high: '12',
        text: 'Cloudy',
        code: '26' 
      },
      { 
        day: 'Wed',
        date: '16 Oct 2013',
        low: '12',
        high: '14',
        text: 'PM Rain',
        code: '12' 
      },
      { 
        day: 'Thu',
        date: '17 Oct 2013',
        low: '12',
        high: '18',
        text: 'Mostly Sunny',
        code: '34' 
      },
      { 
        day: 'Fri',
        date: '18 Oct 2013',
        low: '13',
        high: '16',
        text: 'Few Showers',
        code: '11' 
      },
      { 
        day: 'Sat',
        date: '19 Oct 2013',
        low: '13',
        high: '18',
        text: 'Showers',
        code: '11' 
      } 
    ] 
}
```

## Licence
Licensed under the MIT License
