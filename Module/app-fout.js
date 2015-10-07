(function($, calc) {
    'use strict'
    $(document).ready(function() {
        var input1 = 0,
            input2 = 0,
            result = 0;

        $('.mul').on('click', function(e) {
            e.preventDefault();
            calculate('mul');
        });

        $('.add').on('click', function(e) {
            e.preventDefault();
            calculate('add');
        });

        function getValues() {
            input1 = parseInt($('#number1').val());
            input2 = parseInt($('#number2').val());
        }

        function calculate(cMethod) {
            getValues();
            if (input1 && input2) {
                if (cMethod == 'add') {
                    result = calc.add(input1, input2);
                } else {
                    result = calc.mul(input1, input2);
                }
                $('.result').text('Result : ' + result);
            } else {
                showError();
            }
        }

        function showError() {
            $('.result').text('Gelieve alle inputs correct in te vullen.');
        }
    });
})(jQuery, calc);
