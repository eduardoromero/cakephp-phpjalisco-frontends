var backend = 'http://cakephp-phpjalisco-foxteck.c9users.io';
$(document).ready(function () {
    /* fetch rentals on change */

    /* UI magic */
    $('.rating.widget')
        .rating({
            initialRating: $('#RatingRating').val(),
            maxRating: 5,
            onRate: function (rating) {
                $('#RatingRating').val(rating);
            }
        })
    ;

    get_rental();

    console.log('App has started.');
});

function get_rental() {
    $('#maincontent').addClass('loading');

    $.ajax({
            method: "GET",
            dataType: 'json',
            url: backend + '/rentals/index/',
            beforeSend: function () {
                /* clear content */
                $('#rentals').children().remove();
            }
        })
        .done(function (response) {
            console.log('done', response);
            var rentals = response.rentals;
            jQuery.each(rentals, function (i, rental) {
                /* add */
                var header =
                    $('<div>', {
                        class: 'header',
                        html: rental.Rental.title
                    });

                var content =
                    "<div class='header'>" + rental.Rental.title + "</div>" +
                    "<div class='meta'>" +
                        "<span class='right floated time'>" + rental.Rental.fee + "</span>" +
                        "<span class='category'>"+ rental.City.city + "</span>" +
                    "</div>" +
                    "<div class='description'><p>"+ rental.Rental.domicilio +"</p></div>" +

                    ""
                ;

                var card = $('<a>',
                    {
                        id: rental.Rental.id,
                        href: './rental.html#' + rental.Rental.id,
                        class: 'ui card',
                        'data-title': rental.Rental.title,
                        html:
                            $('<div>', {
                                class: 'content',
                                html: content
                            })
                    }).append("<div class='extra content'>"+ rental.Rental.rating +"</div>")
                ;


                $('#rentals').append(card);
            });
        })
        .fail(function (jqHXR, status) {
            console.log('fail', status);
        })
        .always(function () {
            $('#maincontent').removeClass("loading");

            $('.rating.review')
                .rating('disable')
            ;
        })
    ;

}
