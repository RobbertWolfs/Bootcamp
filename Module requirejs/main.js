// requireJS



require.config({
    paths: {
        'jquery': './bower_components/jquery/dist/jquery',
        'domready': './bower_components/requirejs-domready/domready',
    }
});

require(['jquery', 'domready', './calc'], function($, domready, calc) {

    var $result, $num1, $num2;

    domready(function() {
        var $cForm = $('#calculatorForm');
        var $mul = $cForm.find('.mul');
        var $add = $cForm.find('.add');
        $result = $cForm.find('.result');
        $num1 = $cForm.find('#number1');
        $num2 = $cForm.find('#number2');

        $mul.on('click', function(e) {
            e.preventDefault();
            var values = getValues();
            calculate('mul', values);
        });

        $add.on('click', function(e) {
            e.preventDefault();
            var values = getValues();
            calculate('add', values);
        });
    });

    function getValues() {
        return [parseInt($num1.val()),
            parseInt($num2.val())
        ]
    }

    function calculate(cMethod, values) {
        var result;
        if (values[0] && values[1]) {
            result = calc[cMethod](values[0], values[1]);
            $result.text('Result : ' + result);
        } else {
            showError();
        }
    }

    function showError() {
        $result.text('Gelieve alle inputs correct in te vullen.');
    }

});



// commonJS

// var mod = reauire('./mod');
// mod.action();
