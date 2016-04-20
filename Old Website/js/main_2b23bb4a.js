(function($) {

$(document).ready(function(){

    // Response plugin
    initResponse();

    // Sidebar
    initSidebar();

    // Share menu
    initShareMenu();

    // Smooth Scroll
    initSmoothScroll();

    // Modals
    initModals();

    // Waypoints
    initWaypoints();

    // Parallax
    initParallax();

    // Statistics
    initStatisics();

    // Testimonial swiper
    initTestimonialSwiper();

    // Profile swiper
    initProfileSwiper();

    // Pricing swiper
    initPricingSwiper();

    // Forms
    initForms();

    // Custom checkboxes
    initCheckboxes();

    // Membership form
    initMembershipForm();

    // Space booking form
    initSpaceBookingForm();

});


// Response plugin
var initResponse = function(){
    Response.create({
        mode: "markup",
        prop: "width",
        prefix: "r",
        breakpoints: [0, 350, 750, 1000, 1200, 1400, 1600]
    });

    Response.create({
        mode: "src",
        prop: "width",
        prefix: "src",
        breakpoints: [0, 350, 750, 1000, 1200, 1400, 1600]
    });
};


// Sidebar (menu)
var initSidebar = function(){

	// Toggle sidebar open class on menu trigger click
	$(document).on('tap.sidebar', '.pageHeader .menu-trigger', function(event) {

		$('body').toggleClass('pushed');
		
		event.preventDefault();
	});

	// close sidebar on click off
    $(document).on('tap.sidebar', function() {
        $('body').removeClass('pushed');
    });
    $(document).on('tap.sidebar', '.sidebar, .pageHeader .menu-trigger', function(event){
        event.stopPropagation();
    });

    // Widen menu on hover (desktop)
    $(document).on('mouseover.sidebar', '.sidebar a, .pageHeader', function(event) {

        $('body').addClass('hover-pushed');
    });

    $(document).on('mouseleave.sidebar', '.sidebar, .pageHeader', function(event) {

        $('body').removeClass('hover-pushed');
    });
};


// Share Menu
var initShareMenu = function(){

    // Toggle sidebar open class on menu trigger click
    $(document).on('tap.shareMenu', '.share-menu-trigger', function(event) {

        $('.shareMenu').toggleClass('open');
        
        event.preventDefault();
    });

    // close shareMenu on click off
    $(document).on('tap.shareMenu', function() {
        $('.shareMenu').removeClass('open');
    });
    $(document).on('tap.shareMenu', '.shareMenu, .share-menu-trigger', function(event){
        event.stopPropagation();
    });
};


// Smooth Scroll
var initSmoothScroll = function(){

    // Smooth Scroll
    var scrollOff = 0;
    $(window).on('throttledresize', function(){
        // Adjust scroll offset for hover links
        if(Response.band(0, 1199)){
            scrollOff = $('.pageHeader').height();
        } else {
            scrollOff = 0;
        }
    }).trigger('throttledresize');

    $(document).on('tap.smoothScroll', '.smoothScroll', function(event) {
        var linkto = $(this).attr('href');
        
        $('html, body').animate({
            scrollTop: $(linkto).offset().top - scrollOff
        }, 500);
        
        event.preventDefault();
    });
};


// Modals
var initModals = function(){

    // Open correct modal on click
    $(document).on('tap.modal', '.modal-trigger', function(event){

        $($(this).attr('href')).addClass('gc-modal-show');
        $('html').addClass('modal-show');

        event.preventDefault();
    });

    // Close on button and click off
    $(document).on('tap.modal', '.modal-close', function(event){

        closeModal();

        event.preventDefault();
    });
    $(document).on('tap.modal', function() {
        closeModal();
    });
    $(document).on('tap.modal', '.modal-trigger, .gc-modal-container', function(event){
        event.stopPropagation();
    });

    // Function to close modal
    function closeModal(){

        // Fade out
        $('.gc-modal-show').addClass('gc-modal-fadeOut').parents('html').addClass('modal-fadeOut');

        // When faded out, hide and then re-bind
        if(!Modernizr.csstransitions){
            $('.gc-modal-show').removeClass('gc-modal-fadeOut gc-modal-show');
            $('html').removeClass('modal-show modal-fadeOut');
            $('.gc-modal-fadeOut').off('.modalClose');

            // Reset form
            $('.wpcf7 *').removeClass('wpcf7-not-valid invalid spam failed sent beforeSend');
            $('.wpcf7-validation-errors').empty();
            $('.wpcf7-not-valid-tip').remove();
        } else {
            $('.gc-modal-fadeOut').one('transitionend.modalClose webkitTransitionEnd.modalClose oTransitionEnd.modalClose MSTransitionEnd.modalClose', function(){
                if($('.gc-modal-show').hasClass('gc-modal-fadeOut')){
                    $('.gc-modal-show').removeClass('gc-modal-fadeOut gc-modal-show');
                    $('html').removeClass('modal-show modal-fadeOut');
                    $('.gc-modal-fadeOut').off('.modalClose');

                    // Reset form
                    $('.wpcf7 *').removeClass('wpcf7-not-valid invalid spam failed sent beforeSend');
                    $('.wpcf7-validation-errors').empty();
                    $('.wpcf7-not-valid-tip').remove();
                }
            });
        }
    }
};


// Waypoints
var initWaypoints = function(){

    // Add waypoint animations on desktop only
    if( Response.band(1200) ){

        var sectionName = '';

        // Seperators
        $('.seperator').waypoint(function() {
            $(this).addClass('in-view');
        }, { offset: '70%' });

        // Timeline
        $('.timeline li').waypoint(function() {
            $(this).addClass('in-view');
        }, { offset: '95%' });

        // Icon stats
        $('.iconStats').waypoint(function() {
            $(this).addClass('in-view');
        }, { offset: '50%' });

        // Audience (B2B - B2C)
        $('.section-audience .contentContainer').waypoint(function() {
            $(this).addClass('in-view');
        }, { offset: '80%' });

        // Centered Titles
        $('.section-intro h1, hgroup h2').waypoint(function() {
            $(this).addClass('in-view');
        }, { offset: '85%' });

        // Keep side navigation up to date
        $('section').waypoint(function(direction) {
            sectionName = $(this).attr('id');
            $('.mainMenu a[href="#'+ sectionName +'"]').toggleClass('selected', direction === 'down');
        }, { offset: '70%' })
        .waypoint(function(direction) {
            sectionName = $(this).attr('id');
            $('.mainMenu a[href="#'+ sectionName +'"]').toggleClass('selected', direction === 'up');
        }, {
            offset: function() { return -$(this).height()*0.8; }
        });

    } else {
        $('.section-intro h1, hgroup h2, .seperator, .timeline li, .iconStats, .section-audience .contentContainer').addClass('in-view');
    }
};


// Parallax
var initParallax = function(){

    $.stellar({
        horizontalOffset: 90,
        responsive: true,
    });

    // Turn off (prevent bg position change) on mobile
    $(window).on('throttledresize.parallax', function(event){

        if(! Response.band(1200) ){
            $('.section-membership-seperator, .section-intro').addClass('dont-scroll');
        } else {
            $('.section-membership-seperator, .section-intro').removeClass('dont-scroll');
        }

    }).trigger('throttledresize');
};


// Statistics
var initStatisics = function(){

    // Bar Chart - waypoint on desktop only
    if( Response.band(1200) ){
        $('.barChart').waypoint(function(direction) {
            setBarChart();
        }, 
        { 
            offset: '60%',
            triggerOnce: true
        });
    } else {
        setBarChart();
    }    

    function setBarChart(){
        $('.barChart').find('.bar').each(function(){
            var height = $(this).data('percentage')-2;
            $(this).height( height+'%');
        });
    }


    // Pie Chart - waypoint on desktop only
    var pieChartSection_count = $('.pieChart .pie-section').length,
        startPoint = 0,
        degrees = 0,
        coord_x = 0,
        coord_y = 0,
        chartRadius = 0;

    // Initial setup (correct start points)
    $('.pieChart .pie-section').each(function(){

        startPoint = $(this).data('start');

        $(this).css({
                    '-webkit-transform' : 'rotate('+ startPoint +'deg)',
                    '-moz-transform' : 'rotate('+ startPoint +'deg)',
                    '-ms-transform' : 'rotate('+ startPoint +'deg)',
                    'transform' : 'rotate('+ startPoint +'deg)',
                    });
    });

    // Labels
    $(window).on('throttledresize.pieChart', function(event){

        chartRadius = $('.pieChart').width()/2;

        // Position Labels
        $('.pieChart .pie-section-label').each(function(){

            // Calculate position of tip (uses trig in php)
            coord_x = $(this).data('x') * (chartRadius+20);
            coord_y = $(this).data('y') * (chartRadius+20);

            // Left or right tip
            if( coord_x < 0 ){
                $(this).addClass('tooltip-left');
                $(this).css({
                        'right' : coord_x*-1,
                        'top' : coord_y
                        });
            } else {
                $(this).addClass('tooltip-right');
                $(this).css({
                        'left' : coord_x,
                        'top' : coord_y
                        });
            }
        });

    }).trigger('throttledresize');

    // Rotate and fade when into view
    if( Response.band(1200) ){
        $('.pieChart').waypoint(function(direction) {
            setPieChart();        
        }, 
        { 
            offset: '60%',
            triggerOnce: true
        });
    } else {
        setPieChart();
    } 

    function setPieChart(){
        $('.pieChart').addClass('in-view');

        $('.pieChart .pie-section').each(function(){

            startPoint = $(this).data('start');
            degrees = $(this).data('degrees')+1;

            $(this).css({
                        '-webkit-transform' : 'rotate('+ startPoint +'deg)',
                        '-moz-transform' : 'rotate('+ startPoint +'deg)',
                        '-ms-transform' : 'rotate('+ startPoint +'deg)',
                        'transform' : 'rotate('+ startPoint +'deg)'
                        });

            $(this).find('.pie-section-before').css({
                        '-webkit-transform' : 'rotate('+ degrees +'deg)',
                        '-moz-transform' : 'rotate('+ degrees +'deg)',
                        '-ms-transform' : 'rotate('+ degrees +'deg)',
                        'transform' : 'rotate('+ degrees +'deg)',
                        'opacity' : '1'
                        });
        });
    }
};


// Testimonial swiper
var initTestimonialSwiper = function(){
    var testimonialSwiper = new Swiper('.testimonials-container',{
        loop: true,
        simulateTouch: false,
        autoplay: 5000,
        paginationElement: 'div',
        pagination: '.testimonials-pagination',
        paginationClickable: true,
        wrapperClass: 'testimonials-wrapper',
        slideClass: 'testimonials-slide',
        slideElement: 'li',
        calculateHeight: true,
        resizeReInit: true,
    });

    if(testimonialSwiper.browser.ie8){
        testimonialSwiper.destroy(true);
        $('.testimonials-container *').removeAttr('style');
    }
};


// Profile swiper
var initProfileSwiper = function(){
    var profileSwiperOptions = {
            loop: true,
            simulateTouch: false,
            paginationElement: 'div',
            pagination: '.profile-pagination',
            paginationClickable: true,
            wrapperClass: 'profile-wrapper',
            slideClass: 'profile-slide',
            slideElement: 'div',
            resizeReInit: true,
            calculateHeight: true,
            roundLengths: true,
        },
        profileSwiper,
        profileSwiperInit = false;

    // Enable only at 750px+
    $(window).on('throttledresize.profileSwiper', function(event) {

        if(Response.band(750)){
            if(! profileSwiperInit){
                profileSwiper = $('.profile-container').swiper(profileSwiperOptions);
                profileSwiperInit = true;

                if(profileSwiper.browser.ie8){
                    profileSwiper.destroy(true);
                    $('.profile-container *').removeAttr('style');
                }
            }
        } else {
            if(profileSwiperInit){
                $('.profile-container *').removeAttr('style');
                profileSwiper.destroy(true);
                profileSwiperInit = false;
            }
        }
    }).trigger('throttledresize');

    // Attach L/R navigation
    $(document).on('tap.profileSwiper', '.profile-nav', function(event){

        if($(this).hasClass('profile-nav-next')){
            profileSwiper.swipeNext();
        } else if($(this).hasClass('profile-nav-prev')){
            profileSwiper.swipePrev();
        }

        event.preventDefault();
    });
};


// Pricing swiper
var initPricingSwiper = function(){

    var pricingSwiperOptions = {
            loop: true,
            simulateTouch: false,
            wrapperClass: 'pricing-wrapper',
            slideClass: 'pricing-slide',
            slideElement: 'div',
            calculateHeight: true,

            onSlideChangeStart: function(swiper){
                // Update nav
                currentSlide = swiper.activeLoopIndex;
                $('.pricing-menu li:eq('+ currentSlide +')').addClass('selected').siblings().removeClass('selected');
            },
        },
        pricingSwiper,
        pricingSwiperInit = false;


    // Enable only at 750px+
    $(window).on('throttledresize.pricing', function(event) {

        if(Response.band(750)){
            if(! pricingSwiperInit){
                pricingSwiper = $('.pricing-container').swiper(pricingSwiperOptions);
                pricingSwiperInit = true;

                if(pricingSwiper.browser.ie8){
                    pricingSwiper.destroy(true);
                    $('.pricing-container *').removeAttr('style');
                }
            }
        } else {
            if(pricingSwiperInit){
                $('.pricing-container *').removeAttr('style');
                pricingSwiper.destroy(true);
                pricingSwiperInit = false;
            }
        }
    }).trigger('throttledresize');

    // On nav click
    $(document).on('tap.pricing', '.pricing-menu li', function(event){

        var slideIndex = $(this).index();

        pricingSwiper.swipeTo(slideIndex);

        event.preventDefault();
    });

    // Attach L/R navigation
    $(document).on('tap.pricing', '.pricing-nav', function(event){

        if($(this).hasClass('pricing-nav-next')){
            pricingSwiper.swipeNext();
        } else if($(this).hasClass('pricing-nav-prev')){
            pricingSwiper.swipePrev();
        }

        event.preventDefault();
    });
};


// Forms
var initForms = function(){

    // Bind ajax form handling
    $(document).on('submit.initForms', '.wpcf7-form', function() { 

        $('.wpcf7-form').ajaxSubmit({
            beforeSubmit: function() {  // Show loading spinner in button

                $('.wpcf7-form').addClass('beforeSend').removeClass('invalid spam failed sent');

                return false;
            }
        }); 
 
        return false; 
    });

    // T&C's
    $(document).on('tap.initForms', '.form-field-terms label', function(event){
        $('.form-field-terms').toggleClass('open');

        event.preventDefault();
    });

    // Insert date
    var today = new Date(),
        dd = today.getDate(),
        mm = today.getMonth()+1,
        yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    today = dd+'/'+mm+'/'+yyyy;

    $('.text-faux-date').html(today);
};


// Custom checkboxes
var initCheckboxes = function(){

    // Replace checkboxes and update state on loag
    $('.form-field-checkbox input').each(function(){

        updateCheckbox($(this));
        
        $(this).after('<div class="custom-checkbox"><i class="icon-checkmark"></i></div>').parents('.wpcf7-list-item').addClass('custom-checkbox-replaced');
    });

    // On checkbox click update all in group
    $(document).on('change.checkboxes', '.form-field-checkbox input', function(event){

        $(this).parents('.wpcf7-checkbox').find('input').each(function(){
            updateCheckbox($(this));
        });
    });
    
    // Function to update checkboxes depending on state
    function updateCheckbox(item){
        setTimeout(function() {
            if( $(item).prop('checked') ){
                $(item).parents('.wpcf7-list-item').addClass('checked');
            } else {
                $(item).parents('.wpcf7-list-item').removeClass('checked');
            }
        }, 25); // Delay due to contact form 7
    }
};


// Membership form
var initMembershipForm = function(){

    var membership_value = 0,
        membership_regExp = /\(([^)]+)\)/;

    // Caclulate price
    $(document).on('change.membershipForm', '.membershipForm-membershipTier input', function(event){

        var item = $(this);

        setTimeout(function() {

            if( item.prop('checked') ){
                
                membership_value = item.val(),
                membership_regExp = /\(([^)]+)\)/,
                membership_value = membership_regExp.exec(membership_value)[1];

            } else {

                membership_value = 0;
            }

            // Update title
            $('.membershipForm-amountPayable').find('h2 .value').text(membership_value);

        }, 25); // Delay due to contact form 7
    });
};


// Space booking form
var initSpaceBookingForm = function(){

    var space_value = 0,
        space_regExp = /\(([^)]+)\)/,
        space_index = 0,
        total_characters = 0,
        subHeading_value = '',
        subHeading_characters = 0,
        companyDescription_value = '',
        companyDescription_characters = 0,
        character_limit = 750;
        //character_limit = 10;

        // Start hidden
        $('.spaceBookingForm-entryDetails').slideUp();


    // Caclulate price
    $(document).on('change.spaceBookingForm', '.spaceBookingForm-entryType input, .spaceBookingForm-currentMembership input', function(event){

        var item = $(this);

        setTimeout(function() {

            if( $('.spaceBookingForm-entryType input:checked').length > 0 ){
                
                space_value = $('.spaceBookingForm-entryType input:checked').val(),
                space_regExp = /\(([^)]+)\)/,
                space_value = space_regExp.exec(space_value)[1],
                halfPage_price = $('.spaceBookingForm-entryType input:first').val(),
                halfPage_price = space_regExp.exec(halfPage_price)[1],
                halfPage_price = halfPage_price.replace('Â£', '').replace(',', '');

                // Check value isn't POA and update price depending on membership tier
                if( space_value.indexOf("POA") == -1 ){
                    if( $('.spaceBookingForm-currentMembership input:checked').length > 0 ){

                        var halfPage = $('.spaceBookingForm-currentMembership input:checked').val();
                        halfPage = halfPage.indexOf("half-page");

                        // Remove half page price depending on membership tier
                        if( halfPage != -1 ){

                            // Calculate new value and put back into correct format
                            space_value = space_value.replace('Â£', '').replace(',', '');
                            space_value = space_value - halfPage_price;
                            space_value = 'Â£' + space_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        }
                    }
                }

            } else {

                space_value = 0;
            }

            // Update title
            $('.spaceBookingForm-amountPayable').find('h2 .value').text(space_value);

        }, 25); // Delay due to contact form 7
    });

    // Limit number of characters in company description
    $(document).on('keyup.spaceBookingForm keypress.spaceBookingForm blur.spaceBookingForm paste.spaceBookingForm', 'input.spaceBookingForm-subHeading, textarea.spaceBookingForm-companyDescription', function(event){

        var item = this;

        setTimeout(function() {

            // Get character count and store values
            subHeading_value = $('input.spaceBookingForm-subHeading').val();
            subHeading_characters = subHeading_value.length;
            companyDescription_value = $('textarea.spaceBookingForm-companyDescription').val();
            companyDescription_characters = companyDescription_value.length;

            total_characters = subHeading_characters + companyDescription_characters;

            // Stop input if over limit
            if (total_characters == character_limit) {
                // Stop Entry
                event.preventDefault();

                // Update message
                $('.characersRemaining .value').text(character_limit - total_characters);

            } else if (total_characters > character_limit) {
                // Trim
                var length = $(item).val().length,
                    excess = total_characters - character_limit;

                item.value = item.value.substring(0, (length-excess));

                // Update message
                $('.characersRemaining .value').text('0');

            } else {
                
                // Update message
                $('.characersRemaining .value').text(character_limit - total_characters);
            }

        }, 25); // Delay due to paste bug
    });

    // Show/hide entry fields depending if repeat or not
    $(document).on('change.spaceBookingForm', '.spaceBookingForm-repeatEntry input', function(event){
        if( $(this).val() == 'No' ){
            $('.spaceBookingForm-entryDetails').slideDown();
        } else {
            $('.spaceBookingForm-entryDetails').slideUp();
        }
    });
};

})( jQuery );