$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1000,
        slidesToShow: 1,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icon/carousel_section/left_arrow.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icon/carousel_section/right_arrow.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                  dots: true,
                  arrows: false
                }
            }
        ]
    });
});