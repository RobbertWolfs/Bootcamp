// commonJS
// var mod = require('./mod');

// ES6
import {calc, CarClass} from './mod';

console.log(calc.mul(1,2));

var car = new CarClass();
car.start();

var car2 = new CarClass();
car2.stop();
