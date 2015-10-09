// commonJS

// module.exports = 'aaaa'
// module.exports.foo = function(){}

// ES6

class Calc {

    add(x,y) {
        return x + y;
    }

    mul(x,y) {
        return x * y;
    }
}

class Car {

    start() {
        console.log('start car');
    }

    stop() {
        console.log('stop car');
    }

}

var calc = new Calc(); // hebben dit maar 1x nodig dus kunnen hier al een nieuwe aanmaken
export { Car, calc }; // hebben meerdere cars nodig dus best hier gewoon de functie Car returenen

