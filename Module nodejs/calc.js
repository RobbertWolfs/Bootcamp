

// 2. with ES6 classes


// 'use strict'

// class Calculator {

//     add(x, y) {
//         return x + y;
//     }

//     mul(x, y) {
//         return x * y;
//     }


// }

// module.exports = new Calculator();




// 1. commonjs modules with parameters

'use strict'

function add(x, y) {
    return x + y;
}

function mul(x, y) {
    return x * y;
}

module.exports.add = add;
module.exports.mul = mul;
