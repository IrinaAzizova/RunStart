"use strict";


/********** slider ********/

const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    navPosition: 'bottom'
});

document.querySelector('.prev').addEventListener('click', () => {
    slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', () => {
    slider.goTo('next');
});


/********** tabs **********/

$(function() {
  
    $('ul.catalogue__tabs').on('click', 'li:not(.catalogue__tab_active)', function() {
      $(this)
        .addClass('catalogue__tab_active').siblings().removeClass('catalogue__tab_active')
        .closest('div.container').find('div.catalogue__content').removeClass('active').eq($(this).index()).addClass('active');
        $('.catalogue-item__content').addClass('active');
        $('.catalogue-item__back-side').removeClass('active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalogue-item__back-side').eq(i).toggleClass('active');
                $('.catalogue-item__content').eq(i).toggleClass('active');
            });
        });
    };
    toggleSlide('.catalogue-item__link');
    toggleSlide('.catalogue-item__back-link');
});