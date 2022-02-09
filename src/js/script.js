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






/********** keydown esc **********/
const overlay = document.querySelector('.overlay');
document.addEventListener('keydown', function(event) {
	if (event.code == 'Escape' && overlay.style.display == 'block') {
		overlay.style.display = 'none';
		document.body.style.overflow = '';
	}
});

/********** validate *********/

function validaForms(form) {
	$(form).validate({
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			phone: 'required',
			email: {
				required: true,
				email: true
			}
		},
		messages: {
			name: {
				required: "Пожалуйста, введите ваше имя",
				minlength: `Введите не менее ${2} символов`
			},
			phone: 'Пожалуйста, введите ваш телефон',
			email: {
				required: "Пожалуйста, введите ваш email",
				email: "Неправильно указан адрес почты"
			}
		}
	});
}
validaForms('#consultation-form');
validaForms('#consultation form');
validaForms('#order form');




$('form').submit(function(e) {
	e.preventDefault();
	if (!$(this).valid()) {
		return;
	}
	$.ajax({
		type: "POST",
		url: "mailer/smart.php",
		data: $(this).serialize()
	}).done(function() {
		$(this).find("input").val("");
		$('#consultation, #order').fadeOut();
		$('.overlay, #thanks').fadeIn(300);
		$('form').trigger('reset');
	});
	return false;
});






$(document).ready(function(){

	/********** tabs **********/

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
	
	/********** modal **********/

	$('[data-modal=consultation]').on('click', function() {
		$('#thanks').fadeOut(0);
		document.body.style.overflow = 'hidden';     //switch off scrolling of the body
		
		$('.overlay, #consultation').fadeIn(300);
	});
	$('.modal__close').on('click', function() {
		$('#thanks').fadeOut(0);
		document.body.style.overflow = '';
		$('.overlay, #consultation, #order').fadeOut(300);
	});
	
	$('.button_catalogue-item').each(function(i) {
		$(this).on('click', function() {
			$('#thanks').fadeOut(0);
			$('#order .modal__subtitle').text($('.catalogue-item__subtitle').eq(i).text());
			document.body.style.overflow = 'hidden';     //switch off scrolling of the body
			$('.overlay, #order').fadeIn(300);
		});
	});

	$('input[name=phone]').mask("+7 (999) 999-9999");


	/********** smooth scroll & pageup *********/

	$(window).scroll(function() {
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		}
		else {
			$('.pageup').fadeOut();
		}
	});

	/* $("a[href^='#']").click(function(){
		const _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	}) */

	$("a").on('click', function(event) { // Add smooth scrolling to all links      
	  	if (this.hash !== "") { // Make sure this.hash has a value before overriding default behavior
			event.preventDefault();
			const hash = this.hash;        
			$('html, body').animate({// Using jQuery's animate() method to add smooth page scroll
				scrollTop: $(hash).offset().top
			}, 500, function(){	 		  
				window.location.hash = hash;// Add hash (#) to URL when done scrolling (default click behavior)
			});
		}
	});
  });