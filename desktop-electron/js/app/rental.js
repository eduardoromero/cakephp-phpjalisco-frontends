var backend     = 'http://cakephp-phpjalisco-foxteck.c9users.io';
var rental_id   = null;

$(document).ready(function () {
    /* fetch rentals on change */
    rental_id = window.location.hash.replace('#', '');
    console.log(rental_id);

    $('.star.review')
        .rating({
            initialRating: 0,
            maxRating: 5,
            onRate: function(rating) {
                var user = 'awesome-user';
                if(rating) {
                    /* do something cool */
                }
            }
        })
    ;

    get_rental(rental_id);

    console.log('Rental has started.');
});

function get_rental(rental_id) {


    $.ajax({
            method: "GET",
            dataType: 'json',
            url: backend + '/rentals/view/' + rental_id + '.json',
            beforeSend: function () {
                /* loading content */
                $('#maincontent').addClass('loading');
            }
        })
        .done(function (response) {
            console.log('done', response);
            if(typeof response.success !== 'undefined' && response.success) {
                var rental = response.rental;

                $('#title').html(rental.Rental.title);
                $('#domicilio').html(rental.Rental.domicilio);
                $('#estate_city').html(rental.City.city + ', ' + rental.City.state);

                $('.large.rating').rating('set rating', rental.Rental.average_rating);
            }
        })
        .fail(function (jqHXR, status) {
            console.log('fail', status);
        })
        .always(function () {
            $('#maincontent').removeClass("loading");

            $('.large.rating')
                .rating('disable')
            ;
        })
    ;

}
