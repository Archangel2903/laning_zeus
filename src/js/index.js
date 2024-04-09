import '../scss/main.scss';
import $ from 'jquery';
import 'jquery-ui'
import 'jquery-ui/ui/effect';
import 'jquery-ui/ui/widgets/tabs';
import 'bootstrap';
import 'popper.js';
import select2 from 'select2/dist/js/select2.min';
import intlTelInput from 'intl-tel-input';

$(window).on('load', function () {
    let b = $('body');
    let pw = $('.preload-wrapper');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        b.addClass('ios');
    } else {
        b.addClass('web');
    }

    pw.fadeOut(300);
});

$(function () {
    // Password switch
    const passBtn = document.querySelector('.form-button-pass');
    let inputs = document.querySelectorAll('input[type="password"]');
    passBtn.addEventListener('click', function () {
        if (inputs[0].type === 'password') {
            inputs.forEach(function(input) {
                input.type = 'text';
            });
            this.innerHTML = '<svg><use xlink:href="img/spritemap.svg#sprite-pass-hidden"></use></svg>';
        }
        else {
            inputs.forEach(function(input) {
                input.type = 'password';
            });
            this.innerHTML = '<svg><use xlink:href="img/spritemap.svg#sprite-pass-visible"></use></svg>';
        }
    });

    // Tabs
    if ($('#tabs').length) {
        $('#tabs').tabs({
            show: {
                effect: 'fadeIn',
                duration: 300,
            },
            hide: {
                effect: 'fadeOut',
                duration: 300,
            },
        });
    }

    // intl-tel-input
    if ($('#phone').length) {
        let input = document.querySelector("#phone");
        let iti = intlTelInput(input, {
            separateDialCode: true,
            showSelectedDialCode: true,
            utilsScript: "../../node_modules/intl-tel-input/build/js/utils.js",
            initialCountry: "in",
        });

        // Обработчик события изменения страны
        iti.promise.then(function () {
            $("#countryCode").val(iti.getSelectedCountryData().dialCode);
        });

        // Обработчик события изменения телефонного номера
        input.addEventListener("change", function () {
            $("#countryCode").val(iti.getSelectedCountryData().dialCode);
        });
    }

    // Select2
    (function () {
        let selectStyled = $('.select2');

        selectStyled.select2({
            minimumResultsForSearch: Infinity,
            // dropdownParent: $('.dropdown-wrapper'),
        });
    })();
});