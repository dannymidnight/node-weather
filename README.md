## Example
An example of how to get the weather based on location.

```javascript
 var weather = require('weather');

 weather({location: 'Melbourne'}, function(data) {
   if (data.temp > 30) {
     console.log("Damn it's hot!");
   }
 });
 ```

 Example JSON result:

```javascript
 {
  temp: 18, // Current temperature
  high: 20, // High for the day
  low: 9,   // Low for the day
 }
```

## Licence
Licensed under the MIT License
