(function($, calc) {
    'use strict'
    $(document).ready(function() {

        var $cForm = $('#calculatorForm');
        var $mul = $cForm.find('.mul');
        var $add = $cForm.find('.add');
        var $result = $cForm.find('.result');

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

        function getValues() {
            return [parseInt($('#number1').val()),
                parseInt($('#number2').val())
            ]
        }

        function calculate(cMethod, values) {
            var result;
            if (values[0] && values[1]) {
                if (cMethod == 'add') {
                    result = calc.add(values[0], values[1]);
                } else {
                    result = calc.mul(values[0], values[1]);
                }
                $result.text('Result : ' + result);
            } else {
                showError();
            }
        }

        function showError() {
            $result.text('Gelieve alle inputs correct in te vullen.');
        }

    });

})(jQuery, calc);
