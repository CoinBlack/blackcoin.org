(function ($) {
	'use strict';

	/* --------------------------------------------------
		Initialization
	-------------------------------------------------- */

	// Initialize all functions when the document is ready.
	$(document).ready(function () {

		initNavbar();

	});

	// Initialize functions after elements are loaded.
	$(window).load(function () {

		// Preloader
		$('.preloader img').fadeOut(); // will first fade out the loading animation
		$('.preloader').delay(350).fadeOut('slow', function () {

		});

		initParallax();
		initSliders();

	});


	/* --------------------------------------------------
		Navigation | Navbar
	-------------------------------------------------- */

	function initNavbar() {

		// Sticky Nav & Transparent Background
		$(window).scroll(function () {

			if ($(window).scrollTop() > 20) {
				$('nav').removeClass('navbar-trans', 300);
				$('nav').removeClass('navbar-trans-dark');
				$('nav').addClass('navbar-small', 300);
			} else {
				$('nav:not(.mobile-nav)').addClass('navbar-trans', 300);
				$('nav').removeClass('navbar-small', 300);

				if ($('nav').hasClass('trans-helper')) {
					$('nav:not(.mobile-nav)').addClass('navbar-trans-dark');
				}
			}

			$('nav:not(.navbar-fixed-top)').removeClass('navbar-trans navbar-small navbar-trans-dark');

		});


		// Nav on mobile screens
		$(window).resize(function () {
			if ($(window).width() <= 1259) {
				$('nav').addClass('mobile-nav');
			} else {
				$('nav').removeClass('mobile-nav');
			}

			if ($('nav').hasClass('mobile-nav')) {
				$('nav').removeClass('navbar-trans');
				$('nav').removeClass('navbar-trans-dark');
			} else {
				if ($(window).width() >= 1259 && $(window).top) {
					$('nav').addClass('navbar-trans');
				}
			}

			// Remove dropdown open on hover for small screens
				$('.dropdown-toggle').on('mouseover', function (e) {
					e.preventDefault();

					$('.dropdown').removeClass('open');

					e.stopPropagation();
				});

			// Close mobile menu when clicked link
			// var isNotDropdown = $('nav:not(.mobile-nav)');

			if (!$('.nav a').hasClass('dropdown-toggle')) {

				$('.nav a').on('click', function () {
					if ($('.navbar-toggle').css('display') != 'none') {
						$(".navbar-toggle").trigger("click");
					}
				});

			}

		}).resize();

		// Bugfix for iOS not scrolling on open menu
		$(".navbar-collapse").css({
			maxHeight: $(window).height() - $(".navbar-header").height() + "px"
		});


	} // initNavbar



	/* --------------------------------------------------
		Parallax
	-------------------------------------------------- */


	function initParallax() {
		if (typeof $.fn.parallax !== 'function') return;


		var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

		if (!isSafari) {
			$(".testimonials-parallax").parallax("50%", 0.4);
		}
	}



	/* --------------------------------------------------
		Sliders
	-------------------------------------------------- */

	function initSliders() {
		if (typeof $.fn.slick !== 'function') return;

		// Brands/Clients Slider (USED on index.html)
		$('.clients-slider').slick({
			autoplay: true,
			autoplaySpeed: 500,
			slidesToShow: 5,
			slidesToScroll: 1,
			dots: false,
			arrows: false,
			responsive: [{
					breakpoint: 999,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 1,
						infinite: true,
					}
				},
				{
					breakpoint: 770,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 599,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				}
			]
		});

	} // initSliders


	/* --------------------------------------------------
		Contact Form JS Validation & AJAX call
	-------------------------------------------------- */

	$(function () {

	//	Regular Expressions
	var expEmail = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[_a-z0-9-]+(\.[_a-z0-9-]+)*(\.[a-z]{2,4})$/;
	var expLettersOnly = /^[A-Za-z ]+$/;

	//	Checks if a field has the correct length
	function validateLength(fieldValue, minLength) {
		return ($.trim(fieldValue).length > minLength);
	}

	//	Validate form on typing
	$('.form-ajax').on('keyup', 'input.validate-locally', function () {
		validateField($(this));
	});

	//	AJAX call
	$('.form-ajax').submit(function (e) {
		e.preventDefault();
		var $this = $(this),
			action = $this.attr('action');

		// The AJAX requrest
		$.post(
			action,
			$this.serialize(),
			function (data) {
				$('.ajax-message').html(data);
			}
		);
	});

	//	Validates the fileds
	function validateField(field) {
		var errorText = "",
			error = false,
			value = field.val(),
			siblings = field.siblings(".alert-error");

		// Test the name field
		if (field.attr("name") === "name") {
			if (!validateLength(value, 2)) {
				error = true;
				errorText += '<i class="fa fa-info-circle"></i> The name is too short!<br>';
				$('input[name="name"]').addClass('input-error');
			} else {
				$('input[name="name"]').removeClass('input-error');
			}

			if (!expLettersOnly.test(value)) {
				error = true;
				errorText += '<i class="fa fa-info-circle"></i> The name can contain only letters and spaces!<br>';
				$('input[name="name"]').addClass('input-error-2');
			} else {
				$('input[name="name"]').removeClass('input-error-2');
			}
		}

		// Test the email field
		if (field.attr("name") === "email") {
			if (!expEmail.test(value)) {
				error = true;
				errorText += '<i class="fa fa-info-circle"></i> Enter correct email address!<br>';
				$('input[name="email"]').addClass('input-error');
			} else {
				$('input[name="email"]').removeClass('input-error');
			}
		}

		// Display the errors
		siblings.html(errorText);

		}

	});

})(jQuery);