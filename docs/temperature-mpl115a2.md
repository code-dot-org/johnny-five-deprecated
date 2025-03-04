<!--remove-start-->

# Thermometer - MPL115A2

<!--remove-end-->






##### MPL115A2



![docs/breadboard/multi-mpl115a2.png](breadboard/multi-mpl115a2.png)<br>

Fritzing diagram: [docs/breadboard/multi-mpl115a2.fzz](breadboard/multi-mpl115a2.fzz)

&nbsp;




Run this example from the command line with:
```bash
node eg/temperature-mpl115a2.js
```


```javascript
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var thermometer = new five.Thermometer({
    controller: "MPL115A2"
  });

  thermometer.on("change", function() {
    console.log("Thermometer");
    console.log("  celsius      : ", this.celsius);
    console.log("  fahrenheit   : ", this.fahrenheit);
    console.log("  kelvin       : ", this.kelvin);
    console.log("--------------------------------------");
  });
});


```








## Additional Notes
- [MPL115A2 - I2C Barometric Pressure/Temperature Sensor](https://www.adafruit.com/product/992)


## Learn More

- [MPL115A2 - I2C Barometric Pressure/Temperature Sensor](https://www.adafruit.com/product/992)

&nbsp;

<!--remove-start-->

## License
Copyright (c) 2012, 2013, 2014 Rick Waldron <waldron.rick@gmail.com>
Licensed under the MIT license.
Copyright (c) 2023 The Johnny-Five Contributors
Licensed under the MIT license.

<!--remove-end-->
