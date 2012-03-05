 ## Example ##
 An example of how to get the weather based on geolocation.
 
```javascript
 var weather = require('weather');
 
 weather({lat: -50.212, long: 10.829}, function(temp) {
  if (temp > 30)
    console.log("Damn it's hot!");
 });
 ```