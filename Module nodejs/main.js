// 2. with ES6 classes

// 'use strict'

// var argv = require('yargs').argv;
// var calc = require('./calc');

// console.log(calc.add(argv.x,argv.y));











// 1. modules with parameters

'use strict'

var argvs = require('yargs').argv;
var calc = require('./calc');

var actionName = argvs.action;

console.log(calc[actionName](argvs.x, argvs.y));
