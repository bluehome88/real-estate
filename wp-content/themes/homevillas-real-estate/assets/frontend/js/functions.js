/* ------------------------------- All Functions Start ------------------------------- */

/* -------------------------------  Document Rready Functions Start ------------------------------- */

jQuery(document).ready(function () {
	function Classic_Blog_Post() {
		if ($(".blog.blog-medium.classic .blog-post").length > 0) {
			$(".blog.blog-medium.classic .blog-post").matchHeight();
		}	
	}
	Classic_Blog_Post();
	$(window).resize(function(){
		Classic_Blog_Post();
	});	
    /*Sticky Nav Bar Function Start*/
    var headerHeight=$("header").height();
    $("header").css('min-height',headerHeight);
    if (jQuery('.cs-blog-unit').length) {
        var maxItems = 5; // Change Number of Items here
        var totalItems = jQuery('.cs-blog-unit .main-navigation>ul').find('>li').length;
        if (totalItems > maxItems) {
            jQuery('.cs-blog-unit .main-navigation>ul>li:nth-child(' + maxItems + ') ~ li').wrapAll('<li></li>').wrapAll('<ul class="sub-dropdown"></ul>');
            jQuery('.cs-blog-unit .main-navigation>ul>li:last-child').prepend('<a href="#">More</a>');
        }
    }
    //=== sticky menu ===
    function StickyHeader (element) { 
        this.thisElement = element; 
        this.isSticky=false; 
        this.stickyCheck = function (stickVal) {
            this.isSticky=stickVal;
        }
        this.wpAdminBar = function () {
            this.wpAdminBarVar=$("#wpadminbar").height();
            return this.wpAdminBarVar;
        }
    }
    StickyHeader.prototype.stickyActive = function () {
        this.thisElement.css("top", this.wpAdminBar());
        this.thisElement.addClass("sticky-active");
        this.thisElement.parents('body').addClass('has-sticky');
        this.stickyCheck(true);
        
    }; 
    StickyHeader.prototype.stickyDisable = function () { 
        this.thisElement.css("top", '');
        this.thisElement.removeClass("sticky-active");
        this.thisElement.parents('body').removeClass('has-sticky');
        this.stickyCheck(false);
    };
    //=== sticky menu ===

    if($(".sticky-header").length > 0){
        //=== instance of sticky menu ===
        var stickyheader = new StickyHeader($(".sticky-header"));
        //=== End of instance of sticky menu =====
        //=== Run this on scroll events.
        var $window=$(window);
            var stickyEndPoint,
            detailNav;
            stickyEndPoint = stickyheader.thisElement.offset().top; //target element offset for the sticky instance
            console.log(stickyEndPoint);
            if ($(".detail-nav").length > 0) {
               detailNav=$(".detail-nav").offset().top;
            }

        if($("#wpadminbar").length > 0){
            stickyEndPoint=stickyEndPoint - $("#wpadminbar").height() + 5;
        }
        if($window.width() > 998){
            $window.scroll(function () {
                var window_top = $window.scrollTop();
                if ((window_top > stickyEndPoint) &&  (stickyheader.isSticky==false)) {
                    stickyheader.stickyActive();
                } else if( (window_top < stickyEndPoint) && (stickyheader.isSticky==true)) {
                    stickyheader.stickyDisable();
                }
                if ((window_top > detailNav) &&  (stickyheader.isSticky==true)) {
                    stickyheader.stickyDisable();
                }
                
            });
        }

    }
    //=== End Run this on scroll events =====


   //  function StickyHeader2() {
   //      "use strict";
   //      var $ = jQuery;
   //      var stickyTop2;
   //      if ($('#header.modern.sticky-header, #header.default.sticky-header').length) {
   //          var el2 = $('#header.modern.sticky-header, #header.default.sticky-header');
   //          var headerHeight2 = $("#header.sticky-header").outerHeight();
   //          stickyTop2 = $('#header.modern.sticky-header, #header.default.sticky-header').offset().top;
   //          var stickyHeight2 = $('#header.modern.sticky-header, #header.default.sticky-header').height();
   //          var AdminBarHeight2 = $("#wpadminbar").height();
   //          $("#header.sticky-header").height(headerHeight2);
   //          if ($("#wpadminbar").length > 0) {
   //              stickyTop2 = stickyTop2 - 32;
   //          }
   //          $(window).scroll(function() { // scroll event
   //              var limit2;
   //              if ($('.detail-nav').length) {
   //                  limit2 = $('.detail-nav').offset().top - stickyHeight2;
   //              }
   //              var windowTop2 = $(window).scrollTop();
   //              if (stickyTop2 < windowTop2) {
   //                  el2.css({
   //                      "position": "fixed",
   //                      "width": "100%",
   //                      "z-index": "999",
   //                      "top": "0",
			// 			"-webkit-box-shadow": '0 0 5px rgba(0, 0, 0, .2)',
			// 			"-moz-box-shadow": '0 0 5px rgba(0, 0, 0, .2)',
			// 			"box-shadow": '0 0 5px rgba(0, 0, 0, .2)',
   //                  });
   //                  $('#header.modern.sticky-header, #header.default.sticky-header').css("margin-top", AdminBarHeight2);
			// 		$('.wrapper').css("padding-top", stickyHeight2);
   //              } else {
   //                  el2.css({
   //                      "position": "relative",
   //                      "width": "100%",
   //                      "z-index": "999",
   //                      "top": "auto",
			// 			"-webkit-box-shadow": '0 0 5px rgba(0, 0, 0, 0)',
			// 			"-moz-box-shadow": '0 0 5px rgba(0, 0, 0, 0)',
			// 			"box-shadow": '0 0 5px rgba(0, 0, 0, 0)',
   //                  });
   //                  $('#header.modern.sticky-header, #header.default.sticky-header').css("margin-top", "0");
			// 		$('.wrapper').css("padding-top", "0");
   //              }
   //              if (limit2 < windowTop2) {
   //                  var diff2 = limit2 - windowTop2;
   //                  el2.css({
   //                      top: diff2
   //                  });
   //                  $('#header.modern.sticky-header, #header.default.sticky-header').css("margin-top", "0");
			// 		$('.wrapper').css("padding-top", "0");
   //              }
   //          });
   //      }
   //  }
   // // StickyHeader2();
   //  $(window).resize(function() {
   //      //StickyHeader2();
   //  });
   //  $(window).scroll(function() {
   //  });



    // function StickyHeader() {
    //     "use strict";
    //     var $ = jQuery;
    //     var stickyTop;
    //     if ($('.sticky-header .main-header .nav-area').length) {
    //         var el = $('#header.sticky-header .nav-area');
    //         var headerHeight=$("#header.sticky-header").outerHeight();
    //         stickyTop = $('.sticky-header .main-header .nav-area').offset().top;
    //         var stickyHeight = $('.sticky-header .main-header .nav-area').height();
    //         var AdminBarHeight = $("#wpadminbar").height();
    //         $("#header.sticky-header").height(headerHeight);
    //         if($("#wpadminbar").length > 0){
    //             stickyTop=stickyTop - 32;
    //         }
    //         $(window).scroll(function () { // scroll event
    //             var limit;
    //             if ($('.detail-nav').length) {
    //                 limit = $('.detail-nav').offset().top - stickyHeight;
    //             }
    //             var windowTop = $(window).scrollTop();
    //             if (stickyTop < windowTop) {
    //                 el.css({
    //                     "position": "fixed",
    //                     "width": "100%",
    //                     "z-index": "999",
    //                     "top": "0"
    //                 });
    //                 $('.sticky-header .main-header .nav-area').css("margin-top", AdminBarHeight);
				// 	if($("#header.classic.sticky-header").length > 0){
				// 		$('#header.classic.sticky-header .main-header .nav-area').addClass("pinned");
				// 	}
    //             } else {
    //                 el.css({
    //                     "position": "relative",
    //                     "width": "100%",
    //                     "z-index": "999",
    //                     "top": "auto"
    //                 });
    //                 $('.sticky-header .main-header .nav-area').css("margin-top", "0");
				// 	if($("#header.classic.sticky-header").length > 0){
				// 		$('#header.classic.sticky-header .main-header .nav-area').removeClass("pinned");
				// 	}					
    //             }
    //             if (limit < windowTop) {
    //                 var diff = limit - windowTop;
    //                 el.css({
    //                     top: diff
    //                 });
    //                 $('.sticky-header .main-header .nav-area').css("margin-top", "0");
    //             }
    //         });
    //     }
    // }
    //StickyHeader();
    // $(window).resize(function () {
    //    // StickyHeader();
    // });
    // $(window).scroll(function () {
    // });

    /* sticky header code end */



    /*Main Navigation Function Start*/



    if (jQuery(".main-navigation>ul").length != '') {



        jQuery('.main-navigation>ul').slicknav({

            prependTo: '.main-nav'



        });

    }



    /*Main Navigation Function EnD*/



    /*Fitvideo Script*/



    if (jQuery("body").length != '') {



        jQuery("body").fitVids();

    }



    /*	

     

     /*Flickr Gallery Slider Functions Start*/



    if (jQuery(".flickr-gallery-slider .swiper-container").length != '') {



        var swiper = new Swiper('.flickr-gallery-slider .swiper-container', {

            nextButton: '.flickr-gallery-slider .swiper-button-next',

            prevButton: '.flickr-gallery-slider .swiper-button-prev',

            paginationClickable: true,

            spaceBetween: 0,

            centeredSlides: true,

            autoplay: 2500,

            autoplayDisableOnInteraction: false,

            loop: false,

        });

    }



    /*Flickr Gallery Slider Functions End*/



    /* wordpres default pagination */



    if (jQuery(".default-pagination").lenght != "") {



        jQuery("ul.page-numbers").addClass("pagination");

        jQuery("ul.page-numbers").removeClass("page-numbers");

    } else {



        jQuery("ul.page-numbers").removeClass("pagination");

    }



    /*End wordpres default pagination*/



    /* Partner Logo Slider Start*/



    if (jQuery(".related-post .swiper-container").length != '') {



        var swiper = new Swiper('.related-post .swiper-container', {

            nextButton: '.related-post .swiper-button-next',

            prevButton: '.related-post .swiper-button-prev',

            paginationClickable: true,

            slidesPerView: 3,

            slidesPerColumn: 1,

            spaceBetween: 20,

            breakpoints: {

                1024: {

                    slidesPerView: 3,

                },

                768: {

                    slidesPerView: 2,

                },

                640: {

                    slidesPerView: 2,

                },

                480: {

                    slidesPerView: 1,

                }



            }



        });

    }



    /* Partner Logo Slider End*/







    /* PROGRESS BARS Function */



    jQuery('.skill-bar').each(function () {



        jQuery(this).waypoint(function (direction) {



            jQuery(this).find('.progress-bar').animate({

                width: jQuery(this).attr('data-percent')



            }, 2000);

        }, {

            offset: "100%",

            triggerOnce: true,

        });

    });

    /* PROGRESS BARS Function End */







    /*testimonial-holder slider*/



    var mySwiper = new Swiper('.testimonial-holder .text-holder .swiper-container', {

        autoplay: (5000),

        onSlideChangeStart: function () {



            $('.swiper-pagination-switch').removeClass('active');

            var activeSlide = mySwiper.activeIndex;

            $('.swiper-pagination-switch').eq(activeSlide).addClass('active')



        }



    });

    //navigation



    $(".testimonial-holder .swiper-pagination-switch").click(function (e) {



        e.preventDefault();

    });

    // console.log(mySwiper);



    $('.testimonial-holder .swiper-pagination-switch').click(function () {



// swiper.swipeTo($(this).index());



        mySwiper.slideTo($(this).index());

        $('.swiper-pagination-switch').removeClass('active');

        $(this).addClass('active');

    });

    /*testimonial-holder slider*/







    // tooltip

    if (typeof jQuery.ui !== 'undefined'){

        $('[data-toggle="tooltip"]').tooltip({

          position: {

            my: "center bottom",

            at: "center top",

            using: function( position, feedback ) {

              $( this ).css( position );

              $( "<div>" )

                .addClass( "arrow" )

                .addClass( feedback.vertical )

                .addClass( feedback.horizontal )

                .appendTo( this );

            }

          }

        });

    }

    else{

        $('[data-toggle="tooltip"]').tooltip();

    }

});

/* -------------------------------  Document Rready Functions End ------------------------------- */



/* ------------------------------- All Functions End ------------------------------- */









/* 

 * Post like Counter 

 */



function wp_rem_post_likes_count(admin_url, id, views, obj) {



    "use strict";

    var dataString = 'post_id=' + id + '&action=wp_rem_post_likes_count' + '&view=' + views;

    jQuery(obj).html('<i class="icon-spinner fa-spin"></i>');

    jQuery.ajax({

        type: "POST",

        url: admin_url,

        data: dataString,

        success: function (response) {



            if (response != 'error') {



                jQuery(obj).removeAttr("onclick");

                jQuery(obj).parent('.post-like').addClass('liked');

                jQuery(obj).html(response);

            } else {



                jQuery(obj).html(' There is an error.');

            }



        }



    });

    return false;

}



if (jQuery('.quantity').length != '') {

    $(document).on("click", ".qtyminus", function () {

        var _text_val = $(this).next("input.input-text");

        if (parseInt(_text_val.val()) !== 0) {

            _text_val.val(parseInt(_text_val.val()) - 1);

            jQuery('input[name="update_cart"]').removeAttr('disabled');

        }

    });

    $(document).on("click", ".qtyplus", function () {

        var _text_val = $(this).prev("input.input-text");

        _text_val.val(parseInt(_text_val.val()) + 1);

        jQuery('input[name="update_cart"]').removeAttr('disabled');

    });

}



/* Gallery Filters End*/



/*Testimonail Slider Functions Start*/



if (jQuery(".testimonial-slider .swiper-container").length != '') {



    var swiper = new Swiper('.testimonial-slider .swiper-container', {

        nextButton: '.testimonial-slider .swiper-button-next',

        prevButton: '.testimonial-slider .swiper-button-prev',

        slidesPerView: 'auto',

        autoplay: 2500,

        centeredSlides: true,

        paginationClickable: true,

        spaceBetween: 30,

        loop: true,

        breakpoints: {

            1024: {

                slidesPerView: 2,

            },

            768: {

                slidesPerView: 1,

            },

            640: {

                slidesPerView: 1,

            },

            480: {

                slidesPerView: 1,

            }



        }



    });

}



/*Testimonail Slider Functions End*/



function wp_rem_cs_show_response_theme(loader_data, loading_element, thisObj, clickTriger) {



    "use strict";

    if (thisObj != 'undefined' && thisObj != '' && thisObj != undefined) {



        thisObj.removeClass('wp-rem-processing');

    }



    jQuery('.wp-rem-button-loader').appendTo('#footer');

    jQuery(".wp_rem_loader").hide();

    jQuery(".wp-rem-button-loader").hide();

    if (clickTriger != 'undefined' && clickTriger != '' && clickTriger != undefined) {



        jQuery(clickTriger).click();

    }



    jQuery("#growls").removeClass('wp_rem_cs_element_growl');

    jQuery("#growls").find('.growl').remove();

    if (loader_data != 'undefined' && loader_data != '') {



        if (loader_data.type != 'undefined' && loader_data.type == 'error') {







            var error_message = jQuery.growl.error({

                message: loader_data.msg



            });

            if (loading_element != 'undefined' && loading_element != undefined && loading_element != '') {



                jQuery("#growls").prependTo(loading_element);

                jQuery("#growls").addClass('wp_rem_cs_element_growl');

            }



        } else if (loader_data.type != 'undefined' && loader_data.type == 'success') {



            var success_message = jQuery.growl.success({

                message: loader_data.msg



            });

            if (loading_element != 'undefined' && loading_element != undefined && loading_element != '') {



                jQuery("#growls").prependTo(loading_element);

                jQuery("#growls").addClass('wp_rem_cs_element_growl');

            }



        }



    }



    //



}







function wp_rem_show_theme_loader(loading_element, loader_data, loader_style, thisObj) {

    "use strict";

    var loader_div = '.wp_rem_loader';

    if (loader_style == 'button_loader') {

        loader_div = '.wp-rem-button-loader';

        if (thisObj != 'undefined' && thisObj != '') {

            thisObj.addClass('wp-rem-processing');

        }

    }

    if (typeof loader_data !== 'undefined' && loader_data != '' && typeof jQuery(loader_div) !== 'undefined') {

        jQuery(loader_div).html(loader_data);

    }



    if (typeof loading_element !== 'undefined' && loading_element != '' && typeof jQuery(loader_div) !== 'undefined') {

        jQuery(loader_div).appendTo(loading_element);

    }

    jQuery(loader_div).css({

        'display': 'flex',

                'display': '-webkit-box',

                'display': '-moz-box',

                'display': '-ms-flexbox',

                'display': '-webkit-flex'



    });

}









jQuery(document).on("submit", ".wp-rem-search-form", function () {



    var thisObj = jQuery('.search-form-btn-loader');

    wp_rem_show_theme_loader('.search-form-btn-loader', '', 'button_loader', thisObj);

});

jQuery(document).on("click", ".wp-rem-comment-form", function () {



    var thisObj = jQuery('.comment-form-btn-loader');

    wp_rem_show_theme_loader('.comment-form-btn-loader', '', 'button_loader', thisObj);

});

jQuery(document).on('click', '.wp-rem-fancy-menu li.menu-item-has-children > a', function (event) {



    event.preventDefault();

    var thisObj = jQuery(this).parent('li');

    if (thisObj.children('ul.sub-menu').is(':visible')) {



        thisObj.removeClass('active');

    } else {



        jQuery('.wp-rem-fancy-menu li.active ul.sub-menu').slideToggle();

        jQuery('.wp-rem-fancy-menu li').removeClass('active');

        thisObj.addClass('active');

    }



    thisObj.children('ul.sub-menu').slideToggle();

});

jQuery(document).ready(function ($) {



    if (jQuery(".wp-rem-fancy-menu li.current-menu-parent a").length > 0) {



        jQuery(".wp-rem-fancy-menu li.current-menu-parent a").click();

    } else if (jQuery(".wp-rem-fancy-menu li").first().children('ul.sub-menu').length > 0) {



        jQuery(".wp-rem-fancy-menu li").first().children('ul.sub-menu').slideDown();

        jQuery(".wp-rem-fancy-menu li").first().addClass('active');

    }



});