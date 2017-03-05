/**  jquery document.ready functions */
var $ = jQuery;
var ajaxRequest;
/*** User Register Validation*/
/** save member profile form*/
jQuery(document).on("click", ".upload-file", function() {
    jQuery(".cropControlUpload").click();
});
// Package detail Click
$(document).on("click", ".wp-rem-dev-dash-detail-pkg", function() {
    "use strict";
    var _this_id = $(this).data("id"),
        package_detail_sec = $("#package-detail-" + _this_id);
    if (!package_detail_sec.is(":visible")) {
        $(".all-pckgs-sec").find(".package-info-sec").hide();
        package_detail_sec.slideDown();
    } else {
        package_detail_sec.slideUp();
    }
});
jQuery(document).on("click", ".cropControls .cropControlRemoveCroppedImage", function() {
    "use strict";
    jQuery("#cropContainerModal .cropControls").hide();
    var img_src = jQuery("#cropContainerModal").attr("data-def-img");
    var timesRun = 0;
    setInterval(function() {
        timesRun++;
        if (timesRun === 1) {
            jQuery("#cropContainerModal").find("figure a img").attr("src", img_src);
        }
    }, 50);
});
jQuery(document).on("click", ".wp-rem-dev-signup-box-btn", function() {
    "use strict";
    jQuery(this).parents("#user-register").removeClass("in active");
    jQuery(this).parents(".tab-content").find("#user-login-tab").addClass("in active");
});
jQuery(document).on("click", ".wp-rem-dev-login-box-btn", function(id) {
    "use strict";
    jQuery(this).parents("#user-login-tab").removeClass("in active");
    jQuery(this).parents(".tab-content").find("#user-register").addClass("in active");
});
jQuery(document).on("click", ".uploaded-img li img", function() {
    "use strict";
    var img_src = jQuery(this).attr("src");
    var attachment_id = jQuery(this).attr("data-attachment_id");
    jQuery("#cropContainerModal .croppedImg2").show();
    jQuery("#cropContainerModal figure a img, #cropContainerModal .croppedImg2").attr("src", img_src);
    jQuery("#wp_rem_member_profile_image").val(attachment_id);
    jQuery("#cropContainerModal").attr("data-img-type", "selective");
    jQuery("#cropContainerModal .cropControls").show();
});
jQuery(document).on("click", ".icon-circle-with-cross", function() {
    "use strict";
    jQuery(this).parents("li").remove();
    var attachment_id = jQuery(this).attr("data-attachment_id");
    var all_attachments = jQuery("#wp_rem_member_gallery_attathcments").val();
    var new_attachemnts = all_attachments.replace(attachment_id, "");
    jQuery("#wp_rem_member_gallery_attathcments").val(new_attachemnts);
});
jQuery(document).on("click", ".wp-rem-subscribe-pkg", function() {
    "use strict";
    var id = jQuery(this).data("id");
    jQuery("#response-" + id).slideDown();
});
/*** User Login Authentication*/
function wp_rem_user_authentication(admin_url, id, thisObjClass) {
    "use strict";
    var formDivClass = ".login-form-id-" + id;
    if (typeof thisObjClass == "undefined" || thisObjClass == "") {
        var thisObjClass = ".ajax-login-button";
    } else if (thisObjClass === ".shortcode-ajax-login-button") {
        formDivClass = "";
    }
    var thisObj = jQuery(thisObjClass);
    wp_rem_show_loader(thisObjClass, "", "button_loader", thisObj);

    function newValues(id) {
        var serializedValues = jQuery("#ControlForm_" + id).serialize();
        return serializedValues;
    }
    var serializedReturn = newValues(id);
    jQuery(".login-form-id-" + id + " .status-message").removeClass("success error");
    jQuery.ajax({
        type: "POST",
        url: admin_url,
        dataType: "json",
        data: serializedReturn,
        success: function(data) {
            if (data.type == "error") {
                wp_rem_show_response(data, formDivClass, thisObj);
            } else if (data.type == "success") {
                wp_rem_show_response(data, formDivClass, thisObj);
                document.location.href = data.redirecturl;
            }
        }
    });
}
jQuery(document).ajaxComplete(function() {
    if ($("body").hasClass("rtl") == true) {
        jQuery('[data-toggle="popover"]').popover({
            placement: 'right'
        });
    } else {
        jQuery('[data-toggle="popover"]').popover();
    }
});
jQuery(document).ready(function($) {
    "use strict";
    if ($("body").hasClass("rtl") == true) {
        jQuery('[data-toggle="popover"]').popover({
            placement: 'right'
        });
    } else {
        jQuery('[data-toggle="popover"]').popover();
    }
    /*

     

     

     

     * arrange viewing

     

     

     

     * 

     

     

     

     */
    jQuery(".booking-date").focus(function() {
        $(".booking-info-sec .reservaion-calendar.hasDatepicker").show();
        $(document).mouseup(function(e) {
            var container = $(".booking-info-sec .reservaion-calendar.hasDatepicker");
            if (!container.is(e.target) && container.has(e.target).length === 0 && !$(".booking-date").is(e.target)) // ... nor a descendant of the container
            {
                container.hide();
            }
        });
        $(".booking-info-sec .reservaion-calendar.hasDatepicker .undefined").click(function() {
            "use strict";
            if ($(this).hasClass("ui-state-disabled") == false) {
                $(".booking-info-sec .reservaion-calendar.hasDatepicker").hide();
            }
        });
    });
    /*Video Play Button*/
    function FluidIframeWidth() {
        "use strict";
        $("#play-video").click(function(event) {
            event.preventDefault();
            $(".video-fit-holder .img-holder .play-btn").parent().css({
                opacity: "0",
                visibility: "hidden",
                "z-index": "-1",
                position: "absolute"
            });
            var video = '<iframe frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen src="' + $(this).attr("data-video") + '"></iframe>';
            $(".video-fit-holder iframe").replaceWith(video);
        });
    }
    FluidIframeWidth();
    /*Video Play Button*/
    /*

     

     

     

     * single property view 3 sidebar map switch

     

     

     

     */
    jQuery(".map-switch").hide();
    /*Delivery Timing Dropdown Functions Start*/
    $(".field-select-holder .active").on("click", function() {
        "use strict";
        $(this).next("ul").slideToggle();
        $(this).parents("ul").toggleClass("open");
        $(".dropdown-select > li > a").on("click", function(e) {
            e.preventDefault();
            var anchorText = $(this).text();
            $(".field-select-holder .active small").text(anchorText);
            $(".field-select-holder .active").next("ul").slideUp();
            $(this).parents("ul").removeClass("open");
        });
    });
    $(document).mouseup(function(e) {
        var container = $(".field-select-holder > ul");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $(".field-select-holder .active").next("ul").slideUp();
            $(".field-select-holder > ul").removeClass("open");
        }
    });
    $(".field-select-holder ul li ul.delivery-dropdown li").click(function() {
        $(".field-select-holder .active").next("ul").slideUp();
        $(".field-select-holder > ul").removeClass("open");
    });
    /*Delivery Timing Dropdown Functions End*/
    /*Main Post Slider Start*/
    if (jQuery(".main-post.slider .gallery-top, .main-post.slider .gallery-thumbs").length != "") {
        "use strict";
        var galleryTop = new Swiper(".main-post.slider .gallery-top", {
            nextButton: ".main-post.slider .swiper-button-next",
            prevButton: ".main-post.slider .swiper-button-prev",
            spaceBetween: 0,
            loop: true,
            loopedSlides: 15
        });
        var galleryThumbs = new Swiper(".main-post.slider .gallery-thumbs", {
            spaceBetween: 5,
            slidesPerView: 7,
            touchRatio: .2,
            loop: true,
            loopedSlides: 15,
            //looped slides should be the same
            slideToClickedSlide: true,
            breakpoints: {
                1024: {
                    slidesPerView: 6,
                },
                600: {
                    slidesPerView: 4,
                }
            }
        });
        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;
    }
    jQuery(document).ready(function($) {
        if (jQuery(".property-grid-slider .swiper-container").length != "") {
            "use strict";
            var swiper = new Swiper(".property-grid-slider .swiper-container", {
                slidesPerView: 4,
                slidesPerColumn: 1,
                loop: true,
                paginationClickable: true,
                grabCursor: true,
                autoplay: 3500,
                spaceBetween: 30,
                nextButton: ".property-grid-slider .swiper-button-next",
                prevButton: ".property-grid-slider .swiper-button-prev",
                breakpoints: {
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 40
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    },
                    600: {
                        slidesPerView: 1,
                        spaceBetween: 15
                    }
                }
            });
        }
    });
    /*Main Post Slider End*/
    /*

     

     

     

     * 

     

     

     

     * frontend user hide/show

     

     

     

     */
    "use strict";
    jQuery(".login-box").hide();
    jQuery(".login-link").on("click", function(e) {
        e.preventDefault();
        jQuery(".nav-tabs, .nav-tabs~.tab-content, .forgot-box").fadeOut(function() {
            jQuery(".login-box").fadeIn();
        });
    });
    /*

     

     

     

     * 

     

     

     

     * frontend login tabs function

     

     

     

     */
    jQuery(".login-link-page").on("click", function(e) {
        e.preventDefault();
        jQuery(".nav-tabs-page, .nav-tabs-page~.tab-content-page, .forgot-box").fadeOut(function() {
            jQuery(".login-box").fadeIn();
            jQuery(".tab-content-page").fadeOut();
        });
    });
    /*

     

     

     

     * 

     

     

     

     * frontend register tabs function

     

     

     

     */
    jQuery(".register-link").on("click", function(e) {
        e.preventDefault();
        jQuery(".login-box, .forgot-box").fadeOut(function() {
            jQuery(".nav-tabs, .nav-tabs~.tab-content").fadeIn();
        });
    });
    /*

     

     

     

     * 

     

     

     

     * frontend register tabs function

     

     

     

     */
    jQuery(".register-link-page").on("click", function(e) {
        e.preventDefault();
        jQuery(".login-box, .forgot-box").fadeOut(function() {
            jQuery(".tab-content-page").fadeIn();
            jQuery(".nav-tabs-page").fadeIn();
        });
    });
    /*

     

     

     

     * 

     

     

     

     * frontend page element forgotpassword function

     

     

     

     */
    jQuery(".user-forgot-password-page").on("click", function(e) {
        e.preventDefault();
        jQuery(".login-box, .nav-tabs-page, .nav-tabs-page~.tab-content-page").fadeOut(function() {
            jQuery(".forgot-box").fadeIn();
        });
    });
    /*

     

     

     

     * 

     

     

     

     * frontend forgotpassword function

     

     

     

     */
    jQuery(".user-forgot-password").on("click", function(e) {
        e.preventDefault();
        jQuery(".login-box, .nav-tabs, .nav-tabs~.tab-content").fadeOut(function() {
            jQuery(".forgot-box").fadeIn();
        });
    });
    /*

     

     

     

     * 

     

     

     

     * Popup function

     

     

     

     */
    "use strict";
    $("#location_redius_popup_close").click(function(event) {
        event.preventDefault();
        jQuery("#popup").addClass("hide");
        return false;
    });
});
/* ---------------------------------------------------------------------------

 

 

 

 * get posts by alphabatial order

 

 

 

 * --------------------------------------------------------------------------- */
function wp_rem_member_content(counter, char, page_var, post_per_page, page_num) {
    "use strict";
    wp_rem_show_loader(".member-alphabatic");
    if (typeof ajaxRequest != "undefined") {
        ajaxRequest.abort();
    }
    jQuery.ajax({
        type: "POST",
        dataType: "HTML",
        url: wp_rem_globals.ajax_url,
        data: "page_num=" + page_num + "&post_per_page=" + post_per_page + "&counter=" + counter + "&page_var=" + page_var + "&char=" + char + "&action=wp_rem_member_content",
        success: function(response) {
            jQuery(".ajax-div").html(response);
            wp_rem_hide_loader();
        }
    });
}

function wp_rem_member_pagenation_ajax(page_var, page_num, counter, post_per_page) {
    "use strict";
    jQuery("#" + page_var + "-" + counter).val(page_num);
    wp_rem_member_content(counter, "", page_var, post_per_page, page_num);
}
jQuery(document).on("click", "#profile_form", function() {
    "use strict";
    var returnType = wp_rem_validation_process(jQuery("#member_profile"));
    if (returnType == false) {
        return false;
    }
    var thisObj = jQuery(this);
    wp_rem_show_loader("#profile_form", "", "button_loader", thisObj);
    // Get all the forms elements and their values in one ste
    var serializedValues = jQuery("#member_profile").serialize();
    var ajax_url = $("#member_profile").attr("data-action");
    jQuery.ajax({
        type: "POST",
        dataType: "json",
        url: wp_rem_globals.ajax_url,
        data: serializedValues + "&action=wp_rem_member_accounts_save",
        success: function(response) {
            if (jQuery("#member_profile").find("#wp_rem_member_display_name").length > 0) {
                var display_name = jQuery("#member_profile #wp_rem_member_display_name").val();
                wp_rems_update_display_name(display_name);
            }
            var default_image_url = jQuery("#cropContainerModal").attr("data-def-img");
            if (jQuery("#cropContainerModal").find("img.croppedImg2").length > 0) {
                var upload_image_src = jQuery("#cropContainerModal .croppedImg2").attr("src");
                wp_rems_appned_profile_image(upload_image_src, default_image_url, true);
            } else if (jQuery("#cropContainerModal").find("img").length > 0) {
                var image_src = jQuery("#cropContainerModal img").attr("src");
                wp_rems_appned_profile_image(image_src, default_image_url, false);
            }
            wp_rem_show_response(response, "", thisObj);
        }
    });
});

function wp_rems_update_display_name(display_name) {
    "use strict";
    if (typeof display_name !== "undefined" && display_name != "") {
        if (jQuery(".user-info-sidebar").find("h3.user-full-name").length > 0) {
            jQuery(".user-info-sidebar").find("h3.user-full-name").text(display_name);
        }
        if (jQuery(".user-dashboard-menu").find("span.user-full-name").length > 0) {
            jQuery(".user-dashboard-menu").find("span.user-full-name").text(display_name);
        }
    }
}

function wp_rems_appned_profile_image(image_url, default_image_url, appned_span) {
    "use strict";
    if (image_url != "") {
        jQuery(".user-dashboard-menu .profile-image").find("img").attr("src", image_url);
        if (jQuery(".user-info-sidebar .img-holder").find("img").length > 0) {
            jQuery(".user-info-sidebar .img-holder").find("img").attr("src", image_url);
        }
    } else if (default_image_url != "") {
        jQuery(".user-dashboard-menu .profile-image").find("img").attr("src", default_image_url);
        jQuery("#cropContainerModal").find("img").attr("src", default_image_url);
        jQuery("#cropContainerModal").find("img").show();
        if (jQuery(".user-info-sidebar .img-holder").find("img").length > 0) {
            jQuery(".user-info-sidebar .img-holder").find("img").attr("src", default_image_url);
        }
    }
}
jQuery(document).on("click", ".ad-submit", function() {
    "use strict";
    var thisObj = jQuery(this);
    wp_rem_show_loader(".ad-submit", "", "button_loader", thisObj);
});
/*

 

 

 

 * 

 

 

 

 * change password

 

 

 

 */
jQuery(document).on("click", "#member_change_password", function() {
    "use strict";
    var returnType = wp_rem_validation_process(jQuery("#change_password_form"));
    if (returnType == false) {
        return false;
    }
    var thisObj = jQuery("#member_change_password");
    // Get all the forms elements and their values in one ste
    wp_rem_show_loader("#member_change_password", "", "button_loader", thisObj);
    var serializedValues = jQuery("#change_password_form").serialize();
    var form = $("#change_password_form")[0];
    var form_data = new FormData(form);
    form_data.append('action', 'member_change_pass');
    jQuery.ajax({
        type: "POST",
        dataType: "json",
        contentType: false,
        processData: false,
        url: wp_rem_globals.ajax_url,
        data: form_data,
        success: function(response) {
            wp_rem_show_response(response, "", thisObj);
        }
    });
});
/*

 

 

 

 * 

 

 

 

 * change Location

 

 

 

 */
jQuery(document).on("click", "#member_change_address", function() {
    "use strict";
    // Get all the forms elements and their values in one ste
    var thisObj = jQuery(this);
    wp_rem_show_loader("#member_change_address", "", "button_loader", thisObj);
    var serializedValues = jQuery("#change_address_form").serialize();
    jQuery.ajax({
        type: "POST",
        dataType: "json",
        url: wp_rem_globals.ajax_url,
        data: serializedValues + "&action=member_change_address",
        success: function(response) {
            wp_rem_show_response(response, "", thisObj);
        }
    });
});
/*

 

 

 

 * 

 

 

 

 * Book Day OFF

 

 

 

 */
jQuery(document).on("click", "#member-book-day-off-btn", function() {
    "use strict";
    var thisObj = jQuery(this);
    wp_rem_show_loader("#member-book-day-off-btn", "", "button_loader", thisObj);
    var serializedValues = jQuery("#member-book-day-off-form").serialize();
    jQuery.ajax({
        type: "POST",
        dataType: "json",
        url: wp_rem_globals.ajax_url,
        data: serializedValues + "&action=wp_rem_member_book_day_off_submission",
        success: function(response) {
            wp_rem_show_response(response, "", thisObj);
        }
    });
});
/*

 

 

 

 * 

 

 

 

 * Opening Hours

 

 

 

 */
jQuery(document).on("click", "#member-opening-hours-btn", function() {
    "use strict";
    var thisObj = jQuery(this);
    wp_rem_show_loader("#member-opening-hours-btn", "", "button_loader", thisObj);
    var serializedValues = jQuery("#member-opening-hours-form").serialize();
    jQuery.ajax({
        type: "POST",
        dataType: "json",
        url: wp_rem_globals.ajax_url,
        data: serializedValues + "&action=wp_rem_member_opening_hours_submission",
        success: function(response) {
            wp_rem_show_response(response, "", thisObj);
        }
    });
});
var default_loader = jQuery(".wp_rem_loader").html();
var default_button_loader = jQuery(".wp-rem-button-loader").html();
/*

 

 

 

 * Loader Show Function

 

 

 

 */
function wp_rem_show_loader(loading_element, loader_data, loader_style, thisObj) {
    "use strict";
    var loader_div = ".wp_rem_loader";
    if (loader_style == "button_loader") {
        loader_div = ".wp-rem-button-loader";
        if (thisObj != "undefined" && thisObj != "") {
            thisObj.addClass("wp-rem-processing");
        }
    }
    if (typeof loader_data !== "undefined" && loader_data != "" && typeof jQuery(loader_div) !== "undefined") {
        jQuery(loader_div).html(loader_data);
    }
    if (typeof loading_element !== "undefined" && loading_element != "" && typeof jQuery(loader_div) !== "undefined") {
        jQuery(loader_div).appendTo(loading_element);
    }
    jQuery(loader_div).css({
        display: "flex",
        display: "-webkit-box",
        display: "-moz-box",
        display: "-ms-flexbox",
        display: "-webkit-flex"
    });
}
/*

 

 

 

 * Loader Show Response Function

 

 

 

 */
function wp_rem_show_response(loader_data, loading_element, thisObj, clickTriger) {
    if (thisObj != "undefined" && thisObj != "" && thisObj != undefined) {
        thisObj.removeClass("wp-rem-processing");
    }
    jQuery(".wp-rem-button-loader").appendTo("#footer");
    jQuery(".wp_rem_loader").hide();
    jQuery(".wp-rem-button-loader").hide();
    if (clickTriger != "undefined" && clickTriger != "" && clickTriger != undefined) {
        jQuery(clickTriger).click();
    }
    jQuery("#growls").removeClass("wp_rem_element_growl");
    jQuery("#growls").find(".growl").remove();
    if (loader_data != "undefined" && loader_data != "") {
        if (loader_data.type != "undefined" && loader_data.type == "error") {
            var error_message = jQuery.growl.error({
                message: loader_data.msg
            });
            if (loading_element != "undefined" && loading_element != undefined && loading_element != "") {
                jQuery("#growls").prependTo(loading_element);
                jQuery("#growls").addClass("wp_rem_element_growl");
                setTimeout(function() {
                    jQuery(".growl-close").trigger("click");
                }, 5e3);
            }
        } else if (loader_data.type != "undefined" && loader_data.type == "success") {
            var success_message = jQuery.growl.success({
                message: loader_data.msg
            });
            if (loading_element != "undefined" && loading_element != undefined && loading_element != "") {
                jQuery("#growls").prependTo(loading_element);
                jQuery("#growls").addClass("wp_rem_element_growl");
                setTimeout(function() {
                    jQuery(".growl-close").trigger("click");
                }, 5e3);
            }
        }
    }
}
/*

 

 

 

 * 

 

 

 

 * Loader Hide Function  

 

 

 

 */
function wp_rem_hide_loader() {
    jQuery(".wp_rem_loader").hide();
    jQuery(".wp_rem_loader").html(default_loader);
}
/*

 

 

 

 * 

 

 

 

 * Hide Button loader

 

 

 

 */
function wp_rem_hide_button_loader(processing_div) {
    "use strict";
    if (processing_div != "undefined" && processing_div != "" && processing_div != undefined) {
        jQuery(processing_div).removeClass("wp-rem-processing");
    }
    jQuery(".wp-rem-button-loader").hide();
    jQuery(".wp-rem-button-loader").html(default_button_loader);
}
jQuery(document).ready(function($) {
    if ($(".property-grid, .blog.blog-grid .blog-post, .member-grid .post-inner-member").length > 0) {
        $(".property-grid, .blog.blog-grid .blog-post, .member-grid .post-inner-member").matchHeight();
    }

    function Member_info_height() {
        if ($(".member-grid .member-info").length > 0) {
            $(".member-grid .member-info").matchHeight();
        }
    }
    Member_info_height();
    $(window).resize(function() {
        Member_info_height();
    });

    function grid_modern_post_title() {
        if ($(".property-grid.modern .post-title").length > 0) {
            $(".property-grid.modern .post-title").matchHeight();
        }
    }
    grid_modern_post_title();
    $(window).resize(function() {
        grid_modern_post_title();
    });
    // add class when image loaded
    $(".property-medium .img-holder img, .property-grid .img-holder img").one("load", function() {
        $(this).parents(".img-holder").addClass("image-loaded");
    }).each(function() {
        if (this.complete) $(this).load();
    });
    // add class when image loaded
    // home filters tabs
    $('#filters a[data-toggle ="tab"]').on("shown.bs.tab", function(e) {
        $.fn.matchHeight._update();
        e.target;
        // activated tab
        e.relatedTarget;
        // previous tab
        var target = $(e.target).attr("href");
        var prevTarget = $(e.relatedTarget).attr("href");
        $(target).find(".animated").addClass("slideInUp").removeClass("zoomOut");
        $(prevTarget).addClass("active-moment");
        $(target).addClass("hide-moment");
        $(prevTarget).find(".animated").removeClass("slideInUp").addClass("zoomOut");
        setTimeout(function() {
            $(prevTarget).removeClass("active-moment");
            $(prevTarget).find(".animated").removeClass("zoomOut");
        }, 400);
        setTimeout(function() {
            $(target).removeClass("hide-moment");
            $(prevTarget).find(".animated").removeClass("slideInUp");
        }, 400);
    });
    // home filters tabs
    /*                          

     

     * Load Dashboard Tabs  

     

     

     

     */
    jQuery(document).on("click", ".user_dashboard_ajax", function() {
        "use strict";
        var actionString = jQuery(this).attr("id");
        if (typeof actionString === "undefined") {
            actionString = jQuery(this).attr("data-id");
        }
        var pageNum = jQuery(this).attr("data-pagenum");
        var filter_parameters = "";
        if (typeof pageNum !== "undefined") {
            filter_parameters = wp_rem_get_filter_parameters();
        } else {
            filter_parameters = "";
        }
        var page_qry_append = "";
        if (typeof pageNum === "undefined") {
            if (typeof page_id_all !== "undefined" && page_id_all > 1) {
                pageNum = page_id_all;
                page_qry_append = "&page_id_all=" + page_id_all;
                page_id_all = 0;
            }
        }
        if (typeof pageNum === "undefined" || pageNum == "") {
            pageNum = "1";
        }
        var actionClass = jQuery(this).attr("class");
        var query_var = jQuery(this).data("queryvar");
        if (history.pushState) {
            if (query_var != undefined) {
                if (query_var != "") {
                    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + query_var + page_qry_append;
                } else {
                    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                }
                window.history.pushState({
                    path: newurl
                }, "", newurl);
            }
        }
        jQuery(".user_dashboard_ajax").removeClass("active");
        jQuery(".orders-inquiries").removeClass("active");
        wp_rem_show_loader(".loader-holder");
        jQuery("#" + actionString + "." + actionClass).addClass("active");
        if (actionString == "wp_rem_member_received_orders" || actionString == "wp_rem_member_received_inquiries") {
            jQuery(".dashboard-nav .orders-inquiries").addClass("active");
            jQuery(".dashboard-nav .orders-inquiries #" + actionString + "." + actionClass).addClass("active");
        } else if (actionString == "wp_rem_member_orders" || actionString == "wp_rem_member_inquiries") {
            jQuery(".dashboard-nav .orders-inquiries").addClass("active");
        }
        if (typeof ajaxRequest != "undefined") {
            ajaxRequest.abort();
        }
        ajaxRequest = jQuery.ajax({
            type: "POST",
            url: wp_rem_globals.ajax_url,
            data: "page_id_all=" + pageNum + "&action=" + actionString + filter_parameters,
            success: function(response) {
                wp_rem_hide_loader();
                var timesRun = 0;
                setInterval(function() {
                    timesRun++;
                    if (timesRun === 1) {
                        if (jQuery(document).find("#cropContainerModal").attr("data-img-type") == "default") {
                            jQuery("#cropContainerModal .cropControls").hide();
                        }
                    }
                }, 50);
                jQuery(".user-holder").html(response);
            }
        });
    });
    jQuery(document).on("click", ".team-option .add_team_member", function(e) {
        "use strict";
        e.preventDefault();
        jQuery(".add-member").addClass("active");
        jQuery("body").append('<div id="overlay" style="display:none"></div>');
        jQuery("#overlay").fadeIn(300);
    });
    jQuery(document).on("click", ".user-profile .add-member .cancel", function(e) {
        "use strict";
        e.preventDefault();
        jQuery(".add-member").removeClass("active");
        jQuery("#overlay").fadeOut(300);
        setTimeout(function() {
            jQuery("#overlay").remove();
        }, 400);
    });
    jQuery(document).on("click", ".restaurant-team-member-det", function(e) {
        "use strict";
        e.preventDefault();
        var dat_id = jQuery(this).attr("data-id");
        jQuery("#team-member-det-" + dat_id).addClass("active");
        jQuery("body").find("#overlay").remove();
        jQuery(this).parent().append('<div id="overlay" style="display:none"></div>');
        jQuery("#overlay").fadeIn(300);
        jQuery("#team-member-det-" + dat_id).show();
    });
    jQuery(document).on("click", ".team-member-det-box .cancel", function(e) {
        "use strict";
        e.preventDefault();
        jQuery(this).parents(".team-member-det-box").removeClass("active");
        jQuery(this).parents(".team-member-det-box").hide();
        jQuery("#overlay").fadeOut(300);
        setTimeout(function() {
            jQuery("#overlay").remove();
        }, 400);
    });
    jQuery(document).on("click", ".add_team_member, .restaurant-team-member-det", function() {
        if (jQuery("body").hasClass("invite-member-open") == false) {
            jQuery("body").addClass("invite-member-open");
        }
        jQuery(document).on("click", ".invite-member .cancel", function() {
            jQuery("body").removeClass("invite-member-open");
        });
    });
    /*

     

     

     

     * Adding Team Member

     

     

     

     */
    jQuery(document).on("click", "#add_member", function() {
        "use strict";
        var thisObj = jQuery(this);
        wp_rem_show_loader("#add_member", "", "button_loader", thisObj);
        var serializedValues = jQuery("#team_add_form").serialize();
        var form = $('#team_add_form')[0];
        var form_data = new FormData(form);
        form_data.append('action', 'wp_rem_add_team_member');
        jQuery.ajax({
            type: "POST",
            dataType: "json",
            contentType: false,
            processData: false,
            url: wp_rem_globals.ajax_url,
            data: form_data,
            success: function(response) {
                wp_rem_show_response(response, ".team-fields", thisObj);
            }
        });
    });
    /*

     

     

     

     * Update Team Member

     

     

     

     */
    jQuery(document).on("click", "#team_update_form", function() {
        "use strict";
        var user_id = jQuery(this).closest("form").data("id");
        var data_id = jQuery(this).data("id");
        var thisClass = ".team-update-button-" + data_id;
        var thisObj = jQuery(this);
        wp_rem_show_loader(thisClass, "", "button_loader", thisObj);
        var serializedValues = jQuery("#wp_rem_update_team_member" + user_id).serialize();
        var form = $("#wp_rem_update_team_member" + user_id)[0];
        var form_data = new FormData(form);
        form_data.append('wp_rem_user_id', user_id);
        form_data.append('action', 'wp_rem_update_team_member');
        jQuery.ajax({
            type: "POST",
            dataType: "json",
            contentType: false,
            processData: false,
            url: wp_rem_globals.ajax_url,
            data: form_data,
            success: function(response) {
                jQuery("#wp_rem_member_company").trigger("click");
                wp_rem_show_response(response, "", thisObj);
            }
        });
    });
    /*

     

     

     

     * Remove Team Member

     

     

     

     */
    jQuery(document).on("click", ".remove_member", function() {
        "use strict";
        var thisObj = jQuery(this);
        var user_id = thisObj.closest("form").data("id");
        var count_supper_admin = thisObj.closest("form").data("count_supper_admin");
        var selected_user_type = thisObj.closest("form").data("selected_user_type");
        wp_rem_show_loader();
        jQuery.ajax({
            type: "POST",
            dataType: "json",
            url: wp_rem_globals.ajax_url,
            data: "wp_rem_user_id=" + user_id + "&selected_user_type=" + selected_user_type + "&count_supper_admin=" + count_supper_admin + "&action=wp_rem_remove_team_member",
            success: function(response) {
                if (response.type == "success") {
                    jQuery("#wp_rem_member_company").trigger("click");
                    thisObj.closest("form").fadeOut("slow");
                }
                wp_rem_show_response(response);
            }
        });
    });
    /*

     

     

     

     * Saving Member Data

     

     

     

     */
    jQuery(document).on("click", "#company_profile_form", function() {
        "use strict";
        wp_rem_show_loader();
        var serializedValues = jQuery("#member_company_profile").serialize();
        jQuery.ajax({
            type: "POST",
            dataType: "json",
            url: wp_rem_globals.ajax_url,
            data: serializedValues + "&action=wp_rem_save_company_data",
            success: function(response) {
                wp_rem_show_response(response);
            }
        });
    });
    if (jQuery(".wp_rem_editor").length != "") {
        jQuery(".wp_rem_editor").jqte();
    }
});

function wp_rem_post_likes_count(admin_url, id, views, obj) {
    "use strict";
    var dataString = "post_id=" + id + "&action=wp_rem_post_likes_count" + "&view=" + views;
    jQuery(obj).html(jQuery(obj).attr("data-loader"));
    jQuery.ajax({
        type: "POST",
        url: admin_url,
        data: dataString,
        success: function(response) {
            if (response != "error") {
                jQuery(obj).removeAttr("onclick");
                jQuery(obj).parent().addClass(jQuery(obj).attr("data-likedclass"));
                jQuery(obj).html(jQuery(obj).attr("data-aftersuccess") + " " + response);
            } else {
                jQuery(obj).html(" There is an error.");
            }
        }
    });
    return false;
}
/*

 

 

 

 * register pop up

 

 

 

 */
jQuery(document).on("click", ".no-logged-in", function() {
    $("#join-us").modal();
});

function wp_rem_load_location_ajax(postfix, allowed_location_types, location_levels, security) {
    //"use strict";
    //console.log(allowed_location_types);
    var $ = jQuery;
    $("#loc_country_" + postfix).change(function() {
        popuplate_data(this, "country");
    });
    $("#loc_state_" + postfix).change(function() {
        popuplate_data(this, "state");
    });
    $("#loc_city_" + postfix).change(function() {
        popuplate_data(this, "city");
    });
    $("#loc_town_" + postfix).change(function() {
        popuplate_data(this, "town");
    });

    function popuplate_data(elem, type) {
        "use strict";
        var plugin_url = $(elem).parents("#locations_wrap").data("plugin_url");
        var ajaxurl = $(elem).parents("#locations_wrap").data("ajaxurl");
        var index = allowed_location_types.indexOf(type);
        if (index + 1 >= allowed_location_types.length) {
            return;
        }
        var location_type = allowed_location_types[index + 1];
        $(".loader-" + location_type + "-" + postfix).html("<img src='" + plugin_url + "/assets/frontend/images/ajax-loader.gif' />").show();
        $.ajax({
            type: "POST",
            url: ajaxurl,
            data: {
                action: "get_locations_list",
                security: security,
                location_type: location_type,
                location_level: location_levels[location_type],
                selector: elem.value
            },
            dataType: "json",
            success: function(response) {
                if (response.error == true) {
                    return;
                }
                if (typeof response.loc_coords !== "undefined" && response.loc_coords != "" && $("#wp_rem__loc_bounds_rest").length !== 0) {
                    $("#wp_rem__loc_bounds_rest").val(response.loc_coords);
                    var polygonCoords = jQuery("#wp_rem__loc_bounds_rest").val();
                    if (typeof polygonCoords !== "undefined" && polygonCoords != "") {
                        var _this_map = new google.maps.Map($("#cs-map-location-fe-id").get(0), {
                            center: {
                                lat: 40.714224,
                                lng: -73.961452
                            },
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                            mapTypeControl: false,
                            disableDoubleClickZoom: true,
                            zoomControlOptions: true,
                            streetViewControl: false,
                            zoom: 8
                        });
                        var LatLngList = [];
                        var polygonCoordsJson = jQuery.parseJSON(polygonCoords);
                        if (polygonCoordsJson.length > 0) {
                            jQuery.each(polygonCoordsJson, function(index, element) {
                                LatLngList.push(new google.maps.LatLng(element.lat, element.lng));
                            });
                        }
                        var draw_color = "#333333";
                        var prePolygon = new google.maps.Polygon({
                            paths: polygonCoordsJson,
                            strokeWeight: 0,
                            fillOpacity: .25,
                            fillColor: draw_color,
                            strokeColor: draw_color,
                            editable: false
                        });
                        prePolygon.setMap(_this_map);
                        if (LatLngList.length > 0) {
                            var latlngbounds = new google.maps.LatLngBounds();
                            for (var i = 0; i < LatLngList.length; i++) {
                                latlngbounds.extend(LatLngList[i]);
                            }
                            _this_map.setCenter(latlngbounds.getCenter(), _this_map.fitBounds(latlngbounds));
                            _this_map.setZoom(_this_map.getZoom());
                            var marker = new google.maps.Marker({
                                position: latlngbounds.getCenter(),
                                center: latlngbounds.getCenter(),
                                map: _this_map,
                                draggable: true
                            });
                            var newLat = marker.getPosition().lat();
                            var newLng = marker.getPosition().lng();
                            document.getElementById("wp_rem_post_loc_latitude").value = newLat;
                            document.getElementById("wp_rem_post_loc_longitude").value = newLng;
                        }
                        marker.addListener("dragend", function() {
                            var newLat = marker.getPosition().lat();
                            var newLng = marker.getPosition().lng();
                            var polygon_area = new google.maps.Polygon({
                                paths: polygonCoordsJson
                            });
                            var nResultCord = google.maps.geometry.poly.containsLocation(new google.maps.LatLng(newLat, newLng), polygon_area) ? "true" : "false";
                            if (nResultCord == "false") {
                                alert("Warning! This address is out of the selected location boundries.");
                                return false;
                            } else {
                                document.getElementById("wp_rem_post_loc_latitude").value = newLat;
                                document.getElementById("wp_rem_post_loc_longitude").value = newLng;
                            }
                        });
                    }
                } else {
                    $("#wp_rem__loc_bounds_rest").val("");
                    var thisLatLng = new google.maps.LatLng(51.4, -.2);
                    var _this_map = new google.maps.Map($("#cs-map-location-fe-id").get(0), {
                        center: thisLatLng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        mapTypeControl: false,
                        disableDoubleClickZoom: true,
                        zoomControlOptions: true,
                        streetViewControl: false,
                        zoom: 9
                    });
                    var marker = new google.maps.Marker({
                        position: thisLatLng,
                        center: thisLatLng,
                        map: _this_map,
                        draggable: true
                    });
                    var newLat = marker.getPosition().lat();
                    var newLng = marker.getPosition().lng();
                    document.getElementById("wp_rem_post_loc_latitude").value = newLat;
                    document.getElementById("wp_rem_post_loc_longitude").value = newLng;
                    marker.addListener("dragend", function() {
                        var newLat = marker.getPosition().lat();
                        var newLng = marker.getPosition().lng();
                        document.getElementById("wp_rem_post_loc_latitude").value = newLat;
                        document.getElementById("wp_rem_post_loc_longitude").value = newLng;
                    });
                }
                var control_selector = "#loc_" + location_type + "_" + postfix;
                var data = response.data;
                $(control_selector + " option").remove();
                $(control_selector).append($("<option></option>").attr("value", "").text("Choose..."));
                $.each(data, function(key, term) {
                    $(control_selector).append($("<option></option>").attr("value", term.slug).text(term.name));
                });
                $(".loader-" + location_type + "-" + postfix).html("").hide();
                // Only for style implementation.
                $(".chosen-select").data("placeholder", "Select").trigger("chosen:updated");
            }
        });
    }
    jQuery(document).ready(function(e) {
        "use strict";
        jQuery("input#wp-rem-search-location").keypress(function(e) {
            if (e.which == "13") {
                e.preventDefault();
                cs_search_map(this.value);
                return false;
            }
        });
        jQuery("#loc_country_property").change(function(e) {
            setAutocompleteCountry("property");
        });
        jQuery("#loc_country_member").change(function(e) {
            setAutocompleteCountry("member");
        });
        jQuery("#loc_country_default").change(function(e) {
            setAutocompleteCountry("default");
        });
    });

    function setAutocompleteCountry(type) {
        "use strict";
        var country = jQuery("select#loc_country_" + type + " option:selected").attr("data-name");
        /*document.getElementById('country').value;*/
        if (country != "") {
            autocomplete.setComponentRestrictions({
                country: country
            });
        } else {
            autocomplete.setComponentRestrictions([]);
        }
    }
}
/**

 

 

 

 * Map

 

 

 

 */
function wp_rem_map_location_load(field_postfix) {
    field_postfix = field_postfix || "";
    "use strict";
    jQuery.noConflict();
    (function(jQuery) {
        // for ie9 doesn't support debug console
        if (!window.console) window.console = {};
        if (!window.console.log) window.console.log = function() {};
        // ^^^
        //alert(field_postfix);
        var GMapsLatLonPicker = function() {
            var _self = this;
            // PARAMETERS (MODIFY THIS PART)
            _self.params = {
                defLat: 0,
                defLng: 0,
                defZoom: 1,
                queryLocationNameWhenLatLngChanges: true,
                queryElevationWhenLatLngChanges: true,
                mapOptions: {
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: false,
                    disableDoubleClickZoom: true,
                    zoomControlOptions: true,
                    streetViewControl: false,
                    scrollwheel: true
                },
                strings: {
                    markerText: "Drag this Marker",
                    error_empty_field: "Couldn't find coordinates for this place",
                    error_no_results: "Couldn't find coordinates for this place"
                }
            };
            // VARIABLES USED BY THE FUNCTION (DON'T MODIFY THIS PART)
            _self.vars = {
                ID: null,
                LATLNG: null,
                map: null,
                marker: null,
                geocoder: null
            };
            // PRIVATE FUNCTIONS FOR MANIPULATING DATA
            var setPosition = function(position) {
                _self.vars.marker.setPosition(position);
                _self.vars.map.panTo(position);
                jQuery(_self.vars.cssID + ".gllpZoom").val(_self.vars.map.getZoom());
                jQuery(_self.vars.cssID + ".gllpLongitude").val(position.lng());
                jQuery(_self.vars.cssID + ".gllpLatitude").val(position.lat());
                jQuery(_self.vars.cssID).trigger("location_changed", jQuery(_self.vars.cssID));
                if (_self.params.queryLocationNameWhenLatLngChanges) {
                    getLocationName(position);
                }
                if (_self.params.queryElevationWhenLatLngChanges) {
                    getElevation(position);
                }
            };
            // for reverse geocoding
            var getLocationName = function(position) {
                var latlng = new google.maps.LatLng(position.lat(), position.lng());
                _self.vars.geocoder.geocode({
                    latLng: latlng
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK && results[1]) {
                        jQuery(_self.vars.cssID + ".gllpLocationName").val(results[1].formatted_address);
                    } else {
                        jQuery(_self.vars.cssID + ".gllpLocationName").val("");
                    }
                    jQuery(_self.vars.cssID).trigger("location_name_changed", jQuery(_self.vars.cssID));
                });
            };
            // for getting the elevation value for a position
            var getElevation = function(position) {
                var latlng = new google.maps.LatLng(position.lat(), position.lng());
                var locations = [latlng];
                var positionalRequest = {
                    locations: locations
                };
                _self.vars.elevator.getElevationForLocations(positionalRequest, function(results, status) {
                    if (status == google.maps.ElevationStatus.OK) {
                        if (results[0]) {
                            jQuery(_self.vars.cssID + ".gllpElevation").val(results[0].elevation.toFixed(3));
                        } else {
                            jQuery(_self.vars.cssID + ".gllpElevation").val("");
                        }
                    } else {
                        jQuery(_self.vars.cssID + ".gllpElevation").val("");
                    }
                    jQuery(_self.vars.cssID).trigger("elevation_changed", jQuery(_self.vars.cssID));
                });
            };
            // search function
            var performSearch = function(string, silent) {
                if (string == "") {
                    if (!silent) {
                        displayError(_self.params.strings.error_empty_field);
                    }
                    return;
                }
                _self.vars.geocoder.geocode({
                    address: string
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        jQuery(_self.vars.cssID + ".gllpZoom").val(11);
                        _self.vars.map.setZoom(parseInt(jQuery(_self.vars.cssID + ".gllpZoom").val()));
                        setPosition(results[0].geometry.location);
                    } else {
                        if (!silent) {
                            displayError(_self.params.strings.error_no_results);
                        }
                    }
                });
            };
            // error function
            var displayError = function(message) {
                alert("Error: " + message);
            };
            // PUBLIC FUNCTIONS
            var publicfunc = {
                // INITIALIZE MAP ON DIV
                init: function(object) {
                    if (!jQuery(object).attr("id")) {
                        if (jQuery(object).attr("name")) {
                            jQuery(object).attr("id", jQuery(object).attr("name"));
                        } else {
                            jQuery(object).attr("id", "_MAP_" + Math.ceil(Math.random() * 1e4));
                        }
                    }
                    _self.vars.ID = jQuery(object).attr("id");
                    _self.vars.cssID = "#" + _self.vars.ID + " ";
                    _self.params.defLat = jQuery(_self.vars.cssID + ".gllpLatitude").val() ? jQuery(_self.vars.cssID + ".gllpLatitude").val() : _self.params.defLat;
                    _self.params.defLng = jQuery(_self.vars.cssID + ".gllpLongitude").val() ? jQuery(_self.vars.cssID + ".gllpLongitude").val() : _self.params.defLng;
                    // alert("longit ----" + jQuery(_self.vars.cssID + ".gllpLongitude").val());
                    _self.params.defZoom = jQuery(_self.vars.cssID + ".gllpZoom").val() ? parseInt(jQuery(_self.vars.cssID + ".gllpZoom").val()) : _self.params.defZoom;
                    _self.vars.LATLNG = new google.maps.LatLng(_self.params.defLat, _self.params.defLng);
                    _self.vars.MAPOPTIONS = _self.params.mapOptions;
                    _self.vars.MAPOPTIONS.zoom = _self.params.defZoom;
                    _self.vars.MAPOPTIONS.center = _self.vars.LATLNG;
                    _self.vars.map = new google.maps.Map(jQuery(_self.vars.cssID + ".gllpMap").get(0), _self.vars.MAPOPTIONS);
                    _self.vars.geocoder = new google.maps.Geocoder();
                    _self.vars.elevator = new google.maps.ElevationService();
                    _self.vars.marker = new google.maps.Marker({
                        position: _self.vars.LATLNG,
                        map: _self.vars.map,
                        title: _self.params.strings.markerText,
                        draggable: true
                    });
                    // Set position on doubleclick
                    google.maps.event.addListener(_self.vars.map, "dblclick", function(event) {
                        setPosition(event.latLng);
                    });
                    // Set position on marker move
                    google.maps.event.addListener(_self.vars.marker, "dragend", function(event) {
                        setPosition(_self.vars.marker.position);
                    });
                    // Set zoom feld's value when user changes zoom on the map
                    google.maps.event.addListener(_self.vars.map, "zoom_changed", function(event) {
                        jQuery(_self.vars.cssID + ".gllpZoom").val(_self.vars.map.getZoom());
                        jQuery(_self.vars.cssID).trigger("location_changed", jQuery(_self.vars.cssID));
                    });
                    // Update location and zoom values based on input field's value 
                    jQuery(_self.vars.cssID + ".gllpUpdateButton").bind("click", function() {
                        var lat = jQuery(_self.vars.cssID + ".gllpLatitude").val();
                        var lng = jQuery(_self.vars.cssID + ".gllpLongitude").val();
                        var latlng = new google.maps.LatLng(lat, lng);
                        _self.vars.map.setZoom(parseInt(jQuery(_self.vars.cssID + ".gllpZoom").val()));
                        setPosition(latlng);
                    });
                    // Search function by search button
                    jQuery(_self.vars.cssID + ".gllpSearchButton").bind("click", function() {
                        wp_rem_fe_search_map(jQuery("#post_loc_address").val());
                        performSearch(jQuery(_self.vars.cssID + ".gllpSearchField_fe").val(), false);
                    });
                    // Search function by gllp_perform_search listener
                    jQuery(document).bind("gllp_perform_search", function(event, object) {
                        performSearch(jQuery(object).attr("string"), true);
                    });
                    // Zoom function triggered by gllp_perform_zoom listener
                    jQuery(document).bind("gllp_update_fields", function(event) {
                        var lat = jQuery(_self.vars.cssID + ".gllpLatitude").val();
                        var lng = jQuery(_self.vars.cssID + ".gllpLongitude").val();
                        var latlng = new google.maps.LatLng(lat, lng);
                        _self.vars.map.setZoom(parseInt(jQuery(_self.vars.cssID + ".gllpZoom").val()));
                        setPosition(latlng);
                    });
                    // resize map after load
                    google.maps.event.addListenerOnce(_self.vars.map, "idle", function() {
                        var center = _self.vars.map.getCenter();
                        google.maps.event.trigger(_self.vars.map, "resize");
                        _self.vars.map.setCenter(center);
                    });
                }
            };
            return publicfunc;
        };
        jQuery(document).ready(function() {
            jQuery("#fe_map" + field_postfix).each(function() {
                new GMapsLatLonPicker().init(jQuery(this));
            });
        });
        jQuery(document).bind("location_changed", function(event, object) {
            console.log("changed: " + jQuery(object).attr("id"));
        });
    })(jQuery);
}
// Search Map.
function wp_rem_search_map(location) {
    "use strict";
    jQuery(".gllpSearchField").val(location);
    setTimeout(function() {
        jQuery(".gllpSearchButton").trigger("click");
    }, 10);
}
/* range slider */
jQuery(document).ready(function() {
    jQuery(".cs-drag-slider").each(function(index) {
        "use strict";
        if (jQuery(this).attr("data-slider-step") != "") {
            var data_min_max = jQuery(this).attr("data-min-max");
            var val_parameter = [parseInt(jQuery(this).attr("data-slider-min")), parseInt(jQuery(this).attr("data-slider-max"))];
            console.log(data_min_max);
            if (data_min_max != "yes") {
                console.log("hello");
                var val_parameter = parseInt(jQuery(this).attr("data-slider-min"));
            }
            jQuery(this).children("input").slider({
                min: parseInt(jQuery(this).attr("data-slider-min")),
                max: parseInt(jQuery(this).attr("data-slider-max")),
                value: val_parameter,
                focus: true
            });
        }
    });
	/*Featured Slider Start*/
	if ("" != jQuery(".featured-slider .swiper-container").length) {
		new Swiper(".featured-slider .swiper-container", {
			nextButton: ".swiper-button-next",
			prevButton: ".swiper-button-prev",
			paginationClickable: true,
			slidesPerView: 1,
			slidesPerColumn: 1,
			grabCursor: !0,
			loop: !0,
			spaceBetween: 30,
			arrow: false,
			pagination: ".swiper-pagination",
			breakpoints: {
				1024: {
					slidesPerView: 3
				},
				768: {
					slidesPerView: 2
				},
				640: {
					slidesPerView: 2
				},
				480: {
					slidesPerView: 1
				}
			}
		})
	}
	/*Featured Slider End*/
});

function wp_rem_type_cats(wp_rem_search_types) {
    "use strict";
    var wp_rem_types = "";
    $("input[name=wp_rem_search_types]:checked").each(function() {
        wp_rem_types += $(this).val() + ",";
    });
    data_vals = "wp_rem_types=" + wp_rem_types;
    jQuery.ajax({
        type: "POST",
        url: wp_rem_globals.ajax_url,
        data: data_vals + "&action=wp_rem_type_cats",
        success: function(response) {
            console.log(response);
            jQuery("#list_Cats").html(response);
        }
    });
}
jQuery(document).on("click", "a.wp-rem-dev-property-delete", function() {
    "use strict";
    jQuery("#id_confrmdiv").show();
    var deleting_property, _this_ = jQuery(this),
        _this_id = jQuery(this).data("id"),
        ajax_url = jQuery("#wp-rem-dev-user-property").data("ajax-url"),
        this_parent = jQuery("#user-property-" + _this_id);
    _this_.html('<i class="icon-spinner"></i>');
    jQuery("#id_truebtn").click(function() {
        jQuery("#id_confrmdiv").hide();
        deleting_property = jQuery.ajax({
            url: ajax_url,
            method: "POST",
            data: {
                property_id: _this_id,
                action: "wp_rem_member_property_delete"
            },
            dataType: "json"
        }).done(function(response) {
            if (typeof response.delete !== "undefined" && response.delete == "true") {
                this_parent.hide("slow");
            }
            _this_.html('<i class="icon-close2"></i>');
        }).fail(function() {
            _this_.html('<i class="icon-close2"></i>');
        });
    });
    jQuery("#id_falsebtn").click(function() {
        _this_.html('<i class="icon-close2"></i>');
        jQuery("#id_confrmdiv").hide();
        return false;
    });
});
/**

 

 

 

 * show alert message

 

 

 

 */
function show_alert_msg(msg) {
    "use strict";
    jQuery("#member-dashboard .main-cs-loader").html("");
    jQuery(".cs_alerts").html('<div class="cs-remove-msg"><i class="icon-check-circle"></i>' + msg + "</div>");
    var classes = jQuery(".cs_alerts").attr("class");
    classes = classes + " active";
    jQuery(".cs_alerts").addClass(classes);
    setTimeout(function() {
        jQuery(".cs_alerts").removeClass("active");
    }, 4e3);
}
/*HTML Functions Start*/
jQuery(document).ready(function() {
    /*
     * detail page nav property feature toggler
    */
    $(".detail-nav-toggler").click(function() {
        $(this).next(".detail-nav").slideToggle().toggleClass("open");
    });
    /*Detail Nav Sticky*/
    function stickyDetailNavBar() {
        "use strict";
        var $window = $(window);
        if ($window.width() > 980) {
            if ($(".detail-nav").length) {
                var el = $(".detail-nav");
                var stickyTop = $(".detail-nav").offset().top;
                var stickyHeight = $(".detail-nav").height();
                var AdminBarHeight_ = $("#wpadminbar").height();
                if ($("#wpadminbar").length > 0) {
                    stickyTop = stickyTop - AdminBarHeight_;
                }
                $(window).scroll(function() {
                    var windowTop = $(window).scrollTop();
                    if (stickyTop < windowTop) {
                        el.css({
                            position: "fixed",
                            width: "100%",
                            "z-index": "996",
                            top: "0"
                        });
                        $(".detail-nav").css("margin-top", AdminBarHeight_);
                        $(".property-detail").css("padding-top", stickyHeight);
                    } else {
                        el.css({
                            position: "relative",
                            width: "100%",
                            "z-index": "996",
                            top: "auto"
                        });
                        $(".detail-nav").css("margin-top", "0");
                        $(".property-detail").css("padding-top", "0");
                    }
                });
            }
        }
    }
    stickyDetailNavBar();
    $(window).resize(function() {
        stickyDetailNavBar();
    });
    /*Scroll Nav and Active li Start*/
    if (jQuery(".detail-nav-map").length != "") {
        var wpadminbarHeight = 0;
        if ($("#wpadminbar").length) {
            wpadminbarHeight = $("#wpadminbar").height();
        }
        var lastId, topMenu = $(".detail-nav-map"),
            topMenuHeight = topMenu.outerHeight() + 15 + wpadminbarHeight,
            menuItems = topMenu.find("a"),
            scrollItems = menuItems.map(function() {
                var item = $($(this).attr("href"));
                if (item.length) {
                    return item;
                }
            });
        menuItems.click(function(e) {
            var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
            $("html, body").stop().animate({
                scrollTop: offsetTop
            }, 650);
            e.preventDefault();
        });
        $(window).scroll(function() {
            var fromTop = $(this).scrollTop() + topMenuHeight;
            var cur = scrollItems.map(function() {
                if ($(this).offset().top < fromTop) return this;
            });
            cur = cur[cur.length - 1];
            var id = cur && cur.length ? cur[0].id : "";
            if (lastId !== id) {
                lastId = id;
                menuItems.parent().removeClass("active").end().filter("[href='#" + id + "']").parent().addClass("active");
            }
        });
    }
    /*Scroll Nav and Active li End*/
    /*Detail Nav Sticky*/
    /*Modal Backdrop Start*/
    jQuery(".main-search .search-popup-btn").click(function() {
        setTimeout(function() {
            jQuery(".modal-backdrop").appendTo(".main-search.fancy");
        }, 4);
    });
    /*Modal Backdrop End*/
    /*               

     

     * property banner slider start

     

     */
    if (jQuery(".banner .property-banner-slider .swiper-container").length != "") {
        var mySwiper = new Swiper(".banner .property-banner-slider .swiper-container", {
            pagination: ".swiper-pagination",
            paginationClickable: true,
            loop: false,
            grabCursor: true,
            nextButton: ".banner .property-banner-slider .swiper-button-next",
            prevButton: ".banner .property-banner-slider .swiper-button-prev",
            spaceBetween: 30,
            autoplay: 3e3,
            effect: "fade",
            onInit: function(swiper) {
                stickyDetailNavBar();
            }
        });
    }
    /*

     

     

     

     * property banner slider end

     

     

     

     */
    /*Range Slider Start*/
    $("#ex2,#ex3,#ex4,#ex5").bootstrapSlider();
    $("#ex2,#ex3,#ex4,#ex5").on("slide", function(slideEvt) {
        var valueChange = $(this).parent().find(".slider-value");
        $(valueChange).text(slideEvt.value);
    });
    /*Range Slider End*/
    /* Property Slider Start */
    if (jQuery(".swiper-container.property-slider").length != "") {
        var swiper = new Swiper(".swiper-container.property-slider", {
            loop: true,
            autoplay: 3500,
            nextButton: ".property-slider .swiper-button-next",
            prevButton: ".property-slider .swiper-button-prev",
            pagination: ".property-slider .swiper-pagination",
            paginationClickable: true,
            slidesPerView: 4,
            breakpoints: {
                1024: {
                    slidesPerView: 3
                },
                768: {
                    slidesPerView: 3
                },
                700: {
                    slidesPerView: 2
                },
                480: {
                    slidesPerView: 1
                }
            }
        });
    }
    /*Main Categories List Show Hide*/
    if (jQuery(".categories-holder .text-holder ul").length != "" && jQuery(".categories-holder .text-holder ul").data("showmore") == "yes") {
        jQuery(".categories-holder .text-holder ul").each(function() {
            var $ul = $(this),
                $lis = $ul.find("li:gt(3)"),
                isExpanded = $ul.hasClass("expanded");
            $lis[isExpanded ? "show" : "hide"]();
            if ($lis.length > 0) {
                $ul.append($('<li class="expand">' + (isExpanded ? "Less" : "view More") + "</li>").click(function(event) {
                    var isExpanded = $ul.hasClass("expanded");
                    event.preventDefault();
                    $(this).text(isExpanded ? "view More" : "Less");
                    $ul.toggleClass("expanded");
                    $lis.toggle(350);
                }));
            }
        });
    }
    /*Main Categories List Show Hide End*/
    /*Modal Tab Link Start*/
    if (jQuery(".login-popup-btn").length != "") {
        jQuery(".login-popup-btn").click(function(e) {
            jQuery(".cs-login-switch").click();
            var tab = e.target.hash;
            var data_id = jQuery(this).data("id");
            jQuery(".tab-content .popupdiv" + data_id).removeClass("in active");
            jQuery('a[href="' + tab + '"]').tab("show");
            jQuery(tab).addClass("in active");
        });
    }
    /*Modal Tab Link End*/
    $(document).on("click", ".reviews-sortby li.reviews-sortby-active", function() {
        setTimeout(function() {
            jQuery("#reviews-overlay").remove();
        }, 4);
    });
    jQuery(".reviews-sortby > li").on("click", function() {
        jQuery("#reviews-overlay").remove();
        setTimeout(function() {
            jQuery(".reviews-sortby > li").toggleClass("reviews-sortby-active");
        }, 3);
        jQuery(".reviews-sortby > li").siblings();
        jQuery(".reviews-sortby > li").siblings().removeClass("reviews-sortby-active");
        jQuery("body").append("<div id='reviews-overlay' class='reviews-overlay'></div>");
    });
    jQuery(".input-reviews > .radio-field label").on("click", function() {
        jQuery(this).parent().toggleClass("active");
        jQuery(this).parent().siblings();
        jQuery(this).parent().siblings().removeClass("active");
        /*replace inner Html*/
        var radio_field_active = jQuery(this).html();
        jQuery(".active-sort").html(radio_field_active);
        jQuery(".reviews-sortby > li").removeClass("reviews-sortby-active");
        setTimeout(function() {
            jQuery("#reviews-overlay").remove();
        }, 400);
    });
    $(document).on("click", "#reviews-overlay", function() {
        "use strict";
        jQuery(this).closest(".reviews-overlay").remove();
        jQuery(".reviews-sortby > li").removeClass("reviews-sortby-active");
    });
    jQuery(document).on("click", ".team-option .send-invitation", function(e) {
        e.preventDefault();
        jQuery(".invited_team_member").addClass("active");
        jQuery("body").append('<div id="overlay" style="display:none"></div>');
        jQuery("#overlay").fadeIn(300);
    });
    jQuery(document).on("click", ".user-profile .invited_team_member .cancel", function(e) {
        e.preventDefault();
        jQuery(".invited_team_member").removeClass("active");
        jQuery("#overlay").fadeOut(300);
        setTimeout(function() {
            jQuery("#overlay").remove();
        }, 400);
    });
    $(document).on("click", "#overlay", function() {
        $(this).closest("#overlay").remove();
        $(".invite-member").removeClass("active");
    });
    /* Spinner Btn Start*/
    $(".spinner .btn:last-of-type").on("click", function() {
        $(".spinner input").val(parseInt($(".spinner input").val(), 10) + 1);
    });
    $(".spinner .btn:first-of-type").on("click", function() {
        var val = parseInt($(".spinner input").val(), 10);
        if (val < 1) {
            return;
        }
        $(".spinner input").val(val - 1);
    });
    $(".spinner2 .btn:last-of-type").on("click", function() {
        $(".spinner2 input").val(parseInt($(".spinner2 input").val(), 10) + 1);
    });
    $(".spinner2 .btn:first-of-type").on("click", function() {
        $(".spinner2 input").val(parseInt($(".spinner2 input").val(), 10) - 1);
    });
    $(".spinner3 .btn:last-of-type").on("click", function() {
        $(".spinner3 input").val(parseInt($(".spinner3 input").val(), 10) + 1);
    });
    $(".spinner3 .btn:first-of-type").on("click", function() {
        $(".spinner3 input").val(parseInt($(".spinner3 input").val(), 10) - 1);
    });
    /* Spinner Btn End*/
    /* locations dropdown */
    $(".main-location > ul > li.location-has-children > a").on("click", function(e) {
        e.preventDefault();
        $(this).parent().toggleClass("menu-open");
        $(this).parent().siblings().removeClass("menu-open");
        setTimeout(function() {
            $(".main-location > ul > li.location-has-children > a").addClass("open-overlay");
        }, 2);
        $("body").append("<div class='location-overlay'></div>");
        $(".main-location > ul > li > ul").append("<i class='icon-cross close-menu-location'></i>");
    });
    $(document).on("click", ".main-location > ul > li.location-has-children > a.open-overlay", function() {
        $(".location-overlay").remove();
        $(".close-menu-location").remove();
        setTimeout(function() {
            $(".main-location > ul > li.location-has-children > a").removeClass("open-overlay");
        }, 2);
    });
    $(document).on("click", ".location-overlay", function() {
        $(this).closest(".location-overlay").remove();
        $(".close-menu-location").remove();
        $(".main-location > ul > li.location-has-children").removeClass("menu-open");
        $(".main-location > ul > li.location-has-children > a").removeClass("open-overlay");
    });
    $(document).on("click", ".close-menu-location", function() {
        $(this).closest(".close-menu-location").remove();
        $(".location-overlay").remove();
        $(".main-location > ul > li.location-has-children").removeClass("menu-open");
        $(".main-location > ul > li.location-has-children > a").removeClass("open-overlay");
    });
    /*Location Menu Function End*/
    /*Location Menu Function Start*/
    jQuery(".user-dashboard-menu > ul > li.user-dashboard-menu-children > a").on("click", function(e) {
        e.preventDefault();
        jQuery(this).parent().toggleClass("menu-open");
        jQuery(this).parent().siblings().removeClass("menu-open");
        setTimeout(function() {
            jQuery(".user-dashboard-menu > ul > li.user-dashboard-menu-children > a").addClass("open-overlay");
        }, 2);
        jQuery(".main-header .login-option,.main-header .login-area").append("<div class='location-overlay'></div>");
        jQuery(".user-dashboard-menu > ul > li > ul").append("<i class='icon-cross close-menu-location'></i>");
    });
    jQuery(document).on("click", ".user-dashboard-menu > ul > li.user-dashboard-menu-children > a.open-overlay", function() {
        jQuery(".location-overlay").remove();
        jQuery(".close-menu-location").remove();
        setTimeout(function() {
            jQuery(".user-dashboard-menu > ul > li.user-dashboard-menu-children > a").removeClass("open-overlay");
        }, 2);
    });
    $(".main-header .user-dashboard-menu li.user-dashboard-menu-children ul").bind("clickoutside", function(event) {
        $(this).hide();
    });
    jQuery(document).on("click", ".location-overlay", function() {
        "use strict";
        jQuery(this).closest(".location-overlay").remove();
        jQuery(".close-menu-location").remove();
        jQuery(".user-dashboard-menu > ul > li.user-dashboard-menu-children").removeClass("menu-open");
        jQuery(".user-dashboard-menu > ul > li.user-dashboard-menu-children > a").removeClass("open-overlay");
    });
    jQuery(document).on("click", ".close-menu-location", function() {
        jQuery(this).closest(".close-menu-location").remove();
        jQuery(".location-overlay").remove();
        jQuery(".user-dashboard-menu > ul > li.user-dashboard-menu-children").removeClass("menu-open");
        jQuery(".user-dashboard-menu > ul > li.user-dashboard-menu-children > a").removeClass("open-overlay");
    });
    /*Location Menu Function End*/
    /*Range Slider Start*/
    if (jQuery("#ex6").length != "") {
        $("#ex6").slider();
        $("#ex6").on("slide", function(slideEvt) {
            $("#ex6SliderVal").text(slideEvt.value);
        });
    }
    if (jQuery("#ex7").length != "") {
        $("#ex7").slider();
        $("#ex7").on("slide", function(slideEvt) {
            $("#ex7SliderVal").text(slideEvt.value);
        });
    }
    if (jQuery("#ex16b").length != "") {
        $("#ex16b").slider({
            min: 0,
            max: 4e3,
            value: [0, 4e3],
            focus: true
        });
    }
    /*Range Slider End*/
    /*cs-calendar-combo input Start*/
    jQuery(document).ready(function() {
        if (jQuery(".cs-calendar-from input").length != "") {
            jQuery(".cs-calendar-from input").datetimepicker({
                timepicker: false,
                format: "Y/m/d",
            });
        }
        if (jQuery(".cs-calendar-to input").length != "") {
            jQuery(".cs-calendar-to input").datetimepicker({
                timepicker: false,
                format: "Y/m/d",
            });
        }
    });
    /*cs-calendar-combo input End*/
    /*Upload Gallery Start*/
    if (jQuery(".upload-gallery").length != "") {
        function dragStart(ev) {
            ev.dataTransfer.effectAllowed = "move";
            ev.dataTransfer.setData("Text", ev.target.getAttribute("id"));
            ev.dataTransfer.setDragImage(ev.target, 100, 100);
            return true;
        }
    }
    if (jQuery(".upload-gallery").length != "") {
        function dragEnter(ev) {
            event.preventDefault();
            ev.css({
                margin: "0 0 0 15px"
            });
            return true;
        }
    }
    if (jQuery(".upload-gallery").length != "") {
        function dragOver(ev) {
            event.preventDefault();
            ev.css({
                margin: "0 0 0 15px"
            });
        }
    }
    if (jQuery(".upload-gallery").length != "") {
        function dragDrop(ev) {
            var data = ev.dataTransfer.getData("Text");
            ev.target.appendChild(document.getElementById(data));
            ev.stopPropagation();
            return false;
        }
    }
    if (jQuery(".files").length != "") {
        $(".files").sortable({
            revert: true
        });
    }
    if (jQuery(".fil-cat").length != "") {
        var selectedClass = "";
        $(".fil-cat").click(function() {
            selectedClass = $(this).attr("data-rel");
            $("#portfolio").fadeTo(100, .1);
            $("#portfolio li").not("." + selectedClass).fadeOut().removeClass("scale-anm");
            setTimeout(function() {
                $("." + selectedClass).fadeIn().addClass("scale-anm");
                $("#portfolio").fadeTo(300, 1);
            }, 300);
        });
    }
    /*Upload Gallery End*/
    /*Back To Top Start*/
    jQuery(document).on("click", ".back-to-top", function(e) {
        e.preventDefault();
        jQuery("html, body").animate({
            scrollTop: 0
        }, 800);
    });
    /*Back To Top End*/
    /*prettyPhoto Start*/
    if (jQuery(".photo-gallery.gallery").length != "") {
        jQuery("area[rel^='prettyPhoto']").prettyPhoto();
        jQuery(".gallery:first a[rel^='prettyPhoto']").prettyPhoto({
            animation_speed: "normal",
            theme: "light_square",
            slideshow: 5e3,
            deeplinking: true,
            autoplay_slideshow: true
        });
        jQuery(".gallery:gt(0) a[rel^='prettyPhoto']").prettyPhoto({
            animation_speed: "fast",
            slideshow: 5e4,
            deeplinking: false,
            hideflash: true
        });
        jQuery("#custom_content a[rel^='prettyPhoto']:first").prettyPhoto({
            custom_markup: '<div id="map_canvas"></div>',
            changepicturecallback: function() {
                initialize();
            }
        });
        jQuery("#custom_content a[rel^='prettyPhoto']:last").prettyPhoto({
            custom_markup: '<div id="bsap_1259344" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6"></div><div id="bsap_1237859" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6"></div><div id="bsap_1251710" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6"></div>',
            changepicturecallback: function() {
                _bsap.exec();
            }
        });
    }
    /*prettyPhoto End*/
    /* Gallery Counter Start*/
    if (jQuery(".photo-gallery .gallery-counter li").length != "") {
        count = jQuery(".photo-gallery .gallery-counter li").size();
        if (count > 7) {
            jQuery(".photo-gallery .gallery-counter  li:gt(6) .img-holder figure").append("<figcaption><span></span></figcaption>");
            jQuery(".photo-gallery .gallery-counter  li figure figcaption span").append('<em class="counter"></em>');
            jQuery(".photo-gallery .gallery-counter  li figure figcaption span .counter").html("<i class='icon-plus'></i>" + count);
        } else {
            jQuery('<em class="counter"></em>').remove();
        }
        jQuery(".photo-gallery .gallery-counter  li:gt(7)").hide();
    }
    /* Gallery Counter End*/
    /* Widget Slider Start */
    if (jQuery(".widget .swiper-container").length != "") {
        var swiper = new Swiper(".widget .swiper-container", {
            slidesPerView: "auto",
            loop: true,
            autoplay: false,
            autoplayDisableOnInteraction: false,
            paginationClickable: true,
            nextButton: ".widget  .swiper-button-next",
            prevButton: ".widget  .swiper-button-prev"
        });
        setTimeout(function() {
            jQuery("li.swiper-loader").fadeOut(200, function() {
                jQuery(this).remove();
            });
        }, 5e3);
    }
    /* Widget Slider End */
    /* blog Slider Start */
    if (jQuery(".blog .swiper-container").length != "") {
        var swiper = new Swiper(".blog .swiper-container", {
            slidesPerView: "auto",
            loop: true,
            autoplay: 3500,
            autoplayDisableOnInteraction: false,
            paginationClickable: true,
            nextButton: ".swiper-button-next",
            prevButton: ".swiper-button-prev"
        });
        setTimeout(function() {
            jQuery("li.swiper-loader").fadeOut(200, function() {
                jQuery(this).remove();
            });
        }, 5e3);
    }
    /* blog Slider End */
    /* Related Post Start */
    if (jQuery(".swiper-container.related-post-slider").length != "") {
        var swiper = new Swiper(".swiper-container.related-post-slider", {
            loop: true,
            autoplay: 3500,
            nextButton: ".related-post-slider .swiper-button-next",
            prevButton: ".related-post-slider .swiper-button-prev",
            pagination: ".related-post-slider .swiper-pagination",
            paginationClickable: true,
            slidesPerView: 3,
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                700: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                480: {
                    slidesPerView: 1,
                    spaceBetween: 30
                }
            }
        });
    }
    /* Related Post End */
    /*More Less Text Start*/
    var showChar = 490;
    // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "Read more >>";
    var lesstext = "Read Less >>";
    /* counter more Start */
    jQuery(".more").each(function() {
        var content = jQuery(this).text();
        var showcharnew = $(this).attr("data-count");
        if (showcharnew != undefined && showcharnew != "") {
            showChar = showcharnew;
        }
        alert(showChar);
        if (content.length > showChar) {
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
            var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="readmore-text">' + moretext + "</a></span>";
            jQuery(this).html(html);
        }
    });
    /*Read More Text Start*/
    jQuery(".readmore-text").click(function() {
        "use strict";
        if (jQuery(this).hasClass("less")) {
            jQuery(this).removeClass("less");
            jQuery(this).html(moretext);
        } else {
            jQuery(this).addClass("less");
            jQuery(this).html(lesstext);
        }
        jQuery(this).parent().prev().toggle();
        jQuery(this).prev().toggle();
        return false;
    });
    /*Read More Text End*/
    /*More Less Text End*/
    /*LoadMore Function for filters Start*/
    var size_li = jQuery("#collapseseven .cs-checkbox-list li").size();
    x = 5;
    jQuery("#collapseseven .cs-checkbox-list li:lt(" + x + ")").show(200);
    jQuery("#loadMore").click(function() {
        x = x + 100 <= size_li ? x + 100 : size_li;
        jQuery("#collapseseven .cs-checkbox-list li:lt(" + x + ")").show(200);
        jQuery("#showLess").show(200);
        if (x == size_li) {
            jQuery("#loadMore").hide(200);
        }
    });
    jQuery("#showLess").click(function() {
        x = x - 100 < 0 ? 5 : x - 100;
        jQuery("#collapseseven .cs-checkbox-list li").not(":lt(" + x + ")").hide(200);
        jQuery("#loadMore").show(200);
        jQuery("#showLess").show(200);
        if (x == 5) {
            jQuery("#showLess").hide(200);
        }
    });
    /*LoadMore Function for filters End*/
    /* Responsove Calendar Start*/
    if (jQuery(".responsive-calendar").length != "") {
        jQuery(".responsive-calendar").responsiveCalendar({
            time: "2016-09",
            monthChangeAnimation: false,
            events: {
                "2016-09-30": {
                    number: 5,
                    url: "https://themeforest.net/user/chimpstudio/portfolio"
                }
            }
        });
    }
    /* Responsove Calendar End*/
    /*Reset Filters Results Start*/
    jQuery(document).on("click", ".reset-results", function() {
        "use strict";
        jQuery(".search-results").fadeOut(200);
    });
    /*Reset Filters Results End*/
    /*Location Popup Function Start*/
    jQuery(document).on("click", "#pop-close1", function() {
        "use strict";
        jQuery("#popup1").addClass("popup-open");
    });
    jQuery(document).on("click", "#close1", function() {
        "use strict";
        jQuery("#popup1").removeClass("popup-open");
    });
    jQuery(document).on("click", "#pop-close", function() {
        "use strict";
        jQuery("#popup").addClass("popup-open");
    });
    jQuery(document).on("click", "#close", function() {
        "use strict";
        jQuery("#popup").removeClass("popup-open");
    });
    /*Location Popup Function End*/
    /*Selectpicker Start*/
    if (jQuery(".selectpicker").length != "") {
        jQuery(".selectpicker").selectpicker({
            size: 5
        });
    }
    /*Selectpicker End*/
    /* Time Open Close Function Start */
    jQuery(".time-list #close-btn2").click(function() {
        "use strict";
        jQuery(".time-list .open-close-time").addClass("opening-time");
    });
    jQuery(".time-list #close-btn1").click(function() {
        "use strict";
        jQuery(".time-list .open-close-time").removeClass("opening-time");
    });
    jQuery(".book-list #close-btn4").click(function() {
        "use strict";
        jQuery(".book-list .open-close-time").addClass("opening-time");
    });
    jQuery(".book-list #close-btn3").click(function() {
        "use strict";
        jQuery(".book-list .open-close-time").removeClass("opening-time");
    });
    /*Drag Function End*/
    /*Accordians Expand button Start*/
    jQuery(".closeall").click(function() {
        jQuery(".openall").addClass("show");
        jQuery(".filters-options .panel-collapse.in").collapse("hide");
    });
    jQuery(".openall").click(function() {
        jQuery(".openall").removeClass("show");
        jQuery('.filters-options .panel-collapse:not(".in")').collapse("show");
    });
    /*Accordians Expand button End*/
    /* Order List Function Start */
    jQuery(".orders-list li a.orders-detail").on("click", function(e) {
        "use strict";
        e.preventDefault();
        jQuery(this).parent().addClass("open").find(".orders-list .info-holder");
        jQuery(this).parent().siblings().find(".orders-list .info-holder");
    });
    jQuery(".orders-list li a.close").on("click", function(e) {
        e.preventDefault();
        jQuery(".orders-list > li.open").removeClass("open");
    });
    /* Order List Function End */
    /* Order List Function Start */
    jQuery(".service-list ul li a.edit").on("click", function(e) {
        "use strict";
        e.preventDefault();
        jQuery(this).parent().toggleClass("open").find(".service-list ul li .info-holder");
        jQuery(this).parent().siblings().find(".service-list ul li .info-holder");
        jQuery(this).parent().siblings().removeClass("open");
    });
    /* Order List Function End */
    /* On Scroll Fixed Map Start*/
    if (jQuery(".property-map-holder.map-right .detail-map").length != "") {
        "use strict";
        var Header_height = jQuery("header#header").height();
        if (jQuery(".property-map-holder.map-right .detail-map").length != "") {
            jQuery("header#header").addClass("fixed-header");
            jQuery(".property-map-holder.map-right .detail-map").addClass("fixed-item").css("padding-top", Header_height);
        } else {
            jQuery(".property-map-holder.map-right .detail-map").removeClass("fixed-item").css("padding-top", "auto");
            jQuery("header#header").removeClass("fixed-header");
        }
    }
    /* On Scroll Fixed Map End */
    /* Close Effects Start */
    jQuery(".clickable").on("click", function() {
        "use strict";
        var effect = jQuery(this).data("effect");
        jQuery(this).closest(".page-sidebar")[effect]();
    });
    jQuery(".filter-show").on("click", function() {
        jQuery(".page-sidebar").fadeIn();
    });
    /* Close Effects End */
    /*Map Click Start*/
    $(".widget-map, .map-sec-holder").click(function() {
        $(".widget-map #googleMap1, #contactMap1, #contactMap2, #contactMap3, #contactMap4 ").css("pointer-events", "auto");
    });
    $(".widget-map, .map-sec-holder").mouseleave(function() {
        $(".widget-map #googleMap1, #contactMap1, #contactMap2, #contactMap3, #contactMap4").css("pointer-events", "none");
    });
});
/*HTML Functions End*/
/*

 

 

 

 * captcha reload

 

 

 

 * 

 

 

 

 */
function captcha_reload(admin_url, captcha_id) {
    "use strict";
    var dataString = "&action=wp_rem_reload_captcha_form&captcha_id=" + captcha_id;
    jQuery.ajax({
        type: "POST",
        url: admin_url,
        data: dataString,
        dataType: "html",
        success: function(data) {
            console.log(data);
            jQuery("#" + captcha_id + "_div").html(data);
        }
    });
}

function wp_rem_multicap_all_functions() {
    "use strict";
    var all_elements = jQuery(".g-recaptcha");
    for (var i = 0; i < all_elements.length; i++) {
        var id = all_elements[i].getAttribute("id");
        var site_key = all_elements[i].getAttribute("data-sitekey");
        if (null != id) {
            grecaptcha.render(id, {
                sitekey: site_key,
                callback: function(resp) {
                    jQuery.data(document.body, "recaptcha", resp);
                }
            });
        }
    }
}
/*

 

 

 

 * 

 

 

 

 * show login if user is not signed in

 

 

 

 */
jQuery(document).on("click", "#single_package_no", function() {
    wp_rem_show_popup("#sign-in");
});
/*

 

 

 

 * show login popup

 

 

 

 */
function wp_rem_show_popup(popup_id) {
    "use strict";
    $(popup_id).modal("show");
}
jQuery(document).on("click", ".cropControlRemoveCroppedImage", function() {
    "use strict";
    jQuery("#cropContainerModal img").attr("src", "");
    jQuery("#wp_rem_member_profile_image").val("");
});
/*

 

 

 

 * Company Name based on Profile Type

 

 

 

 */
jQuery(document).on("change", ".wp_rem_profile_type", function() {
    "use strict";
    var current_val = jQuery(this).val();
    if (current_val == "company") {
        jQuery(".wp-rem-company-name").show();
        jQuery(".display-name-field").hide();
        jQuery(".member-type-field").show();
    } else {
        jQuery(".wp-rem-company-name").hide();
        jQuery(".display-name-field").show();
        jQuery(".member-type-field").hide();
    }
});
jQuery(document).on("change", ".wp_rem_member_user_type", function() {
    "use strict";
    var current_val = jQuery(this).val();
    if (current_val == "reseller") {
        jQuery(".wp-rem-profile-type-display").show();
        var profile_type = jQuery(".wp_rem_profile_type").val();
        if (profile_type == 'company') {
            jQuery(".member-type-field").show();
            jQuery(".wp-rem-company-name").show();
            jQuery(".display-name-field").hide();
        }
    } else {
        jQuery(".member-type-field").hide();
        jQuery(".wp-rem-profile-type-display").hide();
        jQuery(".wp-rem-company-name").hide();
        jQuery(".display-name-field").show();
    }
    var serializedValues = 'member_user_type=' + current_val;
    jQuery.ajax({
        type: "POST",
        url: wp_rem_globals.ajax_url,
        data: serializedValues + "&action=wp_rem_set_user_type_cookie",
        success: function(response) {}
    });
});

function wp_rem_user_permission($this, add_member_permission, condition) {
    "use strict";
    if (jQuery($this).val() == condition) {
        jQuery("." + add_member_permission).hide("slow");
    } else {
        jQuery("." + add_member_permission).show("slow");
    }
}

function wp_rem_page_load($this, redirecturl) {
    "use strict";
    var selected_location = jQuery($this).val();
    document.location.href = redirecturl + "?location=" + selected_location;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
/*

 

 

 

 * Validation Process by Form

 

 

 

 */
function wp_rem_validation_process(form_name) {
    var has_empty = new Array();
    var alert_messages = new Array();
    var radio_fields = new Array();
    var checkbox_fields = new Array();
    var array_length;
    jQuery(form_name).find(".wp-rem-dev-req-field,.wp-rem-number-field,.wp-rem-email-field,.wp-rem-url-field,.wp-rem-date-field,.wp-rem-range-field").each(function(index_no) {
        var is_visible = true;
        var thisObj = jQuery(this);
        var visible_id = thisObj.data("visible");
        has_empty[index_no] = false;
        if (wp_rem_is_field(visible_id) == true) {
            is_visible = jQuery("#" + visible_id).is(":hidden");
            if (jQuery("#" + visible_id).css("display") !== "none") {
                is_visible = true;
            } else {
                is_visible = false;
            }
        }
        if (thisObj.attr("type") == "checkbox") {
            var thisObj = jQuery("#" + thisObj.attr("name"));
            if (thisObj.val() == "off") {
                thisObj.val("");
            }
        }
        if (thisObj.attr("type") == "radio") {
            var field_name = thisObj.attr("name");
            var is_field_checked = jQuery('input[name="' + field_name + '"]').is(":checked");
            if (is_field_checked == false) {
                radio_fields[index_no] = thisObj;
            }
            is_visible = false;
        }
        if (thisObj.attr("type") == "checkbox") {
            var field_name = thisObj.attr("name");
            var is_field_checked = jQuery('input[name="' + field_name + '"]').is(":checked");
            if (is_field_checked == false) {
                checkbox_fields[index_no] = thisObj;
            }
            is_visible = false;
        }
        if (!thisObj.val() && is_visible == true) {
            if (thisObj.hasClass("wp-rem-dev-req-field")) {
                var array_length = alert_messages.length;
                alert_messages[array_length] = wp_rem_insert_error_message(thisObj, alert_messages, "");
                has_empty[index_no] = true;
            }
        } else {
            if (is_visible == true) {
                has_empty[index_no] = wp_rem_check_field_type(thisObj, alert_messages, has_empty[index_no]);
            }
        }
        if (has_empty[index_no] == false) {
            thisObj.next(".chosen-container").removeClass("frontend-field-error");
            thisObj.next(".wp-rem-dev-req-field").next(".pbwp-box").removeClass("frontend-field-error");
            thisObj.removeClass("frontend-field-error");
            thisObj.closest(".jqte").removeClass("frontend-field-error");
        }
    });
    if (radio_fields.length > 0) {
        for (i = 0; i < radio_fields.length; i++) {
            var thisnewObj = radio_fields[i];
            var array_length = alert_messages.length;
            if (typeof thisnewObj == "undefined") {
                continue;
            }
            alert_messages[array_length] = wp_rem_insert_error_message(thisnewObj, alert_messages, "");
        }
    }
    if (checkbox_fields.length > 0) {
        for (i = 0; i < checkbox_fields.length; i++) {
            var thisnewObj = checkbox_fields[i];
            var array_length = alert_messages.length;
            alert_messages[array_length] = wp_rem_insert_error_message(thisnewObj, alert_messages, "");
        }
    }
    alert_messages = alert_messages.filter(onlyUnique);
    var error_messages = "Required Fields <br />";
    if (has_empty.length > 0 && jQuery.inArray(true, has_empty) != -1) {
        var array_length = alert_messages.length;
        for (i = 0; i < array_length; i++) {
            if (i > 0) {
                error_messages = error_messages + "<br>";
            }
            error_messages = error_messages + alert_messages[i];
        }
        //jQuery.growl.remove();
        var error_message = jQuery.growl.error({
            message: error_messages,
            duration: 1e4
        });
        return false;
    }
}
/*

 

 

 

 * Check if field exists and not empty

 

 

 

 */
function wp_rem_is_field(field_value) {
    "use strict";
    if (field_value != "undefined" && field_value != undefined && field_value != "") {
        return true;
    } else {
        return false;
    }
}
/*

 

 

 

 * Check if Provided data for field is valid

 

 

 

 */
function wp_rem_check_field_type(thisObj, alert_messages, has_empty) {
    "use strict";
    /*

     

     

     

     * Check for Email Field

     

     

     

     */
    if (thisObj.hasClass("wp-rem-email-field")) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        if (!pattern.test(thisObj.val())) {
            var array_length = alert_messages.length;
            alert_messages[array_length] = wp_rem_insert_error_message(thisObj, alert_messages, "is not valid Email!");
            has_empty = true;
        }
    }
    /*

     

     

     

     * Check for Number Field

     

     

     

     */
    if (thisObj.hasClass("wp-rem-number-field")) {
        "use strict";
        var pattern = /[0-9 -()+]+$/;
        if (!pattern.test(thisObj.val())) {
            var array_length = alert_messages.length;
            alert_messages[array_length] = wp_rem_insert_error_message(thisObj, alert_messages, "is not valid Number!");
            has_empty = true;
        }
    }
    /*

     

     

     

     * Check for URL Field

     

     

     

     */
    if (thisObj.hasClass("wp-rem-url-field")) {
        "use strict";
        var pattern = /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;
        if (!pattern.test(thisObj.val())) {
            var array_length = alert_messages.length;
            alert_messages[array_length] = wp_rem_insert_error_message(thisObj, alert_messages, "is not valid URL!");
            has_empty = true;
        }
    }
    /*

     

     

     

     * Check for Date Field

     

     

     

     */
    if (thisObj.hasClass("wp-rem-date-field")) {
        "use strict";
        var pattern = /^\d{2}.\d{2}.\d{4}$/;
        if (!pattern.test(thisObj.val())) {
            var array_length = alert_messages.length;
            alert_messages[array_length] = wp_rem_insert_error_message(thisObj, alert_messages, "is not valid Date!");
            has_empty = true;
        }
    }
    /*

     

     

     

     * Check for Range Field

     

     

     

     */
    if (thisObj.hasClass("wp-rem-range-field")) {
        "use strict";
        var min_val = thisObj.data("min");
        var max_val = thisObj.data("max");
        if (!(thisObj.val() >= min_val) || !(thisObj.val() <= max_val)) {
            var array_length = alert_messages.length;
            alert_messages[array_length] = wp_rem_insert_error_message(thisObj, alert_messages, "is not in Range! ( " + min_val + " - " + max_val + " )");
            has_empty = true;
        }
    }
    return has_empty;
}
/*

 

 

 

 * Making list of errors

 

 

 

 */
function wp_rem_insert_error_message(thisObj, alert_messages, error_msg) {
    "use strict";
    thisObj.addClass("frontend-field-error");
    if (thisObj.is("select")) {
        thisObj.next(".chosen-container").addClass("frontend-field-error");
        var field_label = thisObj.closest(".field-holder").children("label").html();
        if (wp_rem_is_field(field_label) == false) {
            var field_label = thisObj.closest(".wp-rem-dev-appended-cats").children().children().children("label").html();
        }
        if (wp_rem_is_field(field_label) == false) {
            var field_label = thisObj.find(":selected").text();
        }
    } else {
        var field_label = thisObj.closest(".field-holder").children("label").html();
        if (typeof field_label === "undefined") {
            var field_label = thisObj.attr("placeholder");
        }
    }
    if (thisObj.is(":hidden")) {
        thisObj.next(".wp-rem-dev-req-field").next(".pbwp-box").addClass("frontend-field-error");
    }
    if (thisObj.hasClass("wp_rem_editor")) {
        thisObj.closest(".jqte").addClass("frontend-field-error");
    }
    if (thisObj.hasClass("ad-wp-rem-editor")) {
        thisObj.closest(".jqte").addClass("frontend-field-error");
    }
    var res = "";
    if (typeof field_label !== "undefined") {
        res = field_label.replace("*", " ");
    } else {
        res = "Label / Placeholder is missing";
    }
    return "* " + res + error_msg;
}
$(function() {
    $("#searchfiled").keyup(function() {
        "use strict";
        var current_query = $("#searchfiled").val();
        current_query = current_query.toLowerCase();
        if (current_query !== "" && current_query.length > 1) {
            $(".list-group li").hide();
            $(".list-group li.select-location").show();
            $(".list-group li").each(function() {
                var current_keyword = $(this).text();
                current_keyword = current_keyword.toLowerCase();
                if (current_keyword.indexOf(current_query) >= 0) {
                    $(this).show();
                }
            });
        } else {
            $(".list-group li").hide();
        }
    });
});
jQuery(document).on("click", ".loc-icon-holder", function() {
    "use strict";
    var thisObj = jQuery(this);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var dataString = "lat=" + pos.lat + "&lng=" + pos.lng + "&action=wp_rem_get_geolocation";
            jQuery.ajax({
                type: "POST",
                url: wp_rem_globals.ajax_url,
                data: dataString,
                dataType: "json",
                success: function(response) {
                    thisObj.next("input").val(response.address);
                }
            });
        });
    }
});
jQuery(document).on("change", "#wp_rem_currency-id", function() {
    "use strict";
    var field_value = jQuery(this).val();
    jQuery.ajax({
        type: "POST",
        url: wp_rem_globals.ajax_url,
        data: "currency_id=" + field_value + "&action=wp_rem_change_user_currency",
        dataType: "html",
        success: function(response) {
            location.reload(true);
        }
    });
});
jQuery(document).on("click", ".map-holder .map-actions li", function() {
    "use strict";
    var this_id = jQuery(this).attr("id");
    if (this_id == "slider-view" || this_id == "slider-view1") {
        jQuery(".dominant-places").hide();
        jQuery(".wp-rem-property-banner").removeClass("hidden");
        jQuery(".wp-rem-property-map").addClass("hidden");
        jQuery(".map-switch").show();
        if (jQuery(".banner .property-banner-slider .swiper-container").length != "") {
            var mySwiper = new Swiper(".banner .property-banner-slider .swiper-container", {
                pagination: ".swiper-pagination",
                paginationClickable: true,
                loop: true,
                grabCursor: true,
                nextButton: ".banner .property-banner-slider .swiper-button-next",
                prevButton: ".banner .property-banner-slider .swiper-button-prev",
                spaceBetween: 30,
                autoplay: 3e3,
                effect: "fade"
            });
        }
    }
    if (this_id == "map-view" || this_id == "map-view1") {
        if (map != undefined && map != 'undefined' && map != '') {
            panorama = map.getStreetView();
            panorama.setVisible(false);
            jQuery(".slider-view").removeClass("active");
            jQuery(".map-view-street").removeClass("active");
            jQuery(".map-view").addClass("active");
            jQuery(".wp-rem-property-map").removeClass("hidden");
            jQuery(".wp-rem-property-banner").addClass("hidden");
            jQuery(".map-switch").hide();
            jQuery(".dominant-places").show();
            google.maps.event.trigger(map, 'resize');
            var NewMapCenter = map.getCenter();
            var new_latitude = NewMapCenter.lat();
            var new_longitude = NewMapCenter.lng();
            var mapResizeTimes = 0;
            setTimeout(function() {
                if (mapResizeTimes === 0) {
                    map.setCenter(new google.maps.LatLng(new_latitude, new_longitude));
                    mapResizeTimes++;
                }
            }, 500);
        }
    } else if (this_id == "map-view-street" || this_id == "map-view-street1") {
        jQuery(".slider-view").removeClass("active");
        jQuery(".map-view").removeClass("active");
        jQuery(".map-view-street").addClass("active");
        jQuery(".dominant-places").hide();
        jQuery(".wp-rem-property-map").removeClass("hidden");
        jQuery(".wp-rem-property-banner").addClass("hidden");
        var panorama = map.getStreetView();
        panorama.setVisible(true);
    } else {
        jQuery(".map-view").removeClass("active");
        jQuery(".map-view-street").removeClass("active");
        jQuery(".slider-view").addClass("active");
    }
});
/*

 

 

 

 * chosen selection box

 

 

 

 */
function chosen_selectionbox() {
    "use strict";
    if (jQuery(".chosen-select, .chosen-select-deselect, .chosen-select-no-single, .chosen-select-no-results, .chosen-select-width").length != "") {
        var config = {
            ".chosen-select": {
                width: "100%"
            },
            ".chosen-select-deselect": {
                allow_single_deselect: true
            },
            ".chosen-select-no-single": {
                disable_search_threshold: 10,
                width: "100%"
            },
            ".chosen-select-no-results": {
                no_results_text: "Oops, nothing found!"
            },
            ".chosen-select-width": {
                width: "95%"
            }
        };
        for (var selector in config) {
            jQuery(selector).chosen(config[selector]);
        }
    }
}

function wp_rem_enquire_arrange_send_message(form_id, type) {
    "use strict";
    var thisObj = jQuery(".enquiry-request-holder");
    wp_rem_show_loader(".enquiry-request-holder", "", "button_loader", thisObj);
    var datastring = jQuery("#frm_property" + form_id + "").serialize() + "&action=wp_rem_send_enquire_arrange_submit";
    jQuery.ajax({
        type: "POST",
        url: wp_rem_globals.ajax_url,
        data: datastring,
        dataType: "json",
        success: function(response) {
            wp_rem_show_response(response, ".enquiry-request-form", thisObj);
            if (response.type == "success") {
                jQuery("#frm_property" + form_id + "").trigger("reset");
            }
        }
    });
}

function wp_rem_arrange_view_send_message(form_id, type) {
    "use strict";
    var thisObj = jQuery(".viewing-request-holder");
    wp_rem_show_loader(".viewing-request-holder", "", "button_loader", thisObj);
    var datastring = jQuery("#frm_arrange" + form_id + "").serialize() + "&action=wp_rem_send_arrange_submit";
    jQuery.ajax({
        type: "POST",
        url: wp_rem_globals.ajax_url,
        data: datastring,
        dataType: "json",
        success: function(response) {
            wp_rem_show_response(response, ".viewing-request-form", thisObj);
            if (response.type == "success") {
                jQuery("#frm_arrange" + form_id + "").trigger("reset");
            }
        }
    });
}
jQuery(document).on("click", ".property-detail .enquire-holder .enquire-btn", function() {
    "use strict";
    jQuery("#enquiry-modal").find("form")[0].reset();
    jQuery("#arrange-modal").find("form")[0].reset();
    jQuery("#enquiry-modal .response-message").html("");
    jQuery("#arrange-modal .response-message").html("");
});

function wp_rem_top_search(counter) {
    "use strict";
    var thisObj = jQuery(".search-btn-loader-" + counter);
    wp_rem_show_loader(".search-btn-loader-" + counter, "", "button_loader", thisObj);
    jQuery("#top-search-form-" + counter).find("input, textarea, select").each(function(_, inp) {
        if (jQuery(inp).val() === "" || jQuery(inp).val() === null) inp.disabled = true;
    });
}

function wp_rem_get_filter_parameters() {
    "use strict";
    var date_range = jQuery(".user-holder").find("#date_range").val();
    var filter_var = "";
    if (typeof date_range != "undefined" && date_range !== "") {
        filter_var += "&date_range=" + date_range;
    }
    return filter_var;
}
jQuery(document).on("click", ".wp-rem-subscribe-pkg-btn .buy-btn", function() {
    "use strict";
    var pkg_id = jQuery(this).parent().attr("data-id");
    var thisObj = jQuery(".buy-btn-" + pkg_id);
    wp_rem_show_loader(".buy-btn-" + pkg_id, "", "button_loader", thisObj);
});
jQuery(document).ready(function() {
    /*Fitvideo Script*/
    if (jQuery(".video-holder").length != "") {
        jQuery(".video-holder").fitVids();
    }
});
/* Time Open Close Function Start */
jQuery(".time-list #close-btn2").click(function() {
    jQuery(".time-list .open-close-time").addClass("opening-time");
});
jQuery(".time-list #close-btn1").click(function() {
    jQuery(".time-list .open-close-time").removeClass("opening-time");
});
jQuery(document).on("click", 'a[id^="wp-rem-dev-open-time"]', function() {
    "use strict";
    var _this_id = jQuery(this).data("id"),
        _this_day = jQuery(this).data("day"),
        _this_con = jQuery("#open-close-con-" + _this_day + "-" + _this_id),
        _this_status = jQuery("#wp-rem-dev-open-day-" + _this_day + "-" + _this_id);
    if (typeof _this_id !== "undefined" && typeof _this_day !== "undefined") {
        _this_status.val("on");
        _this_con.addClass("opening-time");
    }
});
jQuery(document).on("click", 'a[id^="wp-rem-dev-close-time"]', function() {
    "use strict";
    var _this_id = jQuery(this).data("id"),
        _this_day = jQuery(this).data("day"),
        _this_con = jQuery("#open-close-con-" + _this_day + "-" + _this_id),
        _this_status = jQuery("#wp-rem-dev-open-day-" + _this_day + "-" + _this_id);
    if (typeof _this_id !== "undefined" && typeof _this_day !== "undefined") {
        _this_status.val("");
        _this_con.removeClass("opening-time");
    }
});
$(document).on("click", ".book-btn", function() {
    "use strict";
    $(this).next(".calendar-holder").slideToggle("fast");
});
$(document).on("click", 'a[id^="wp-rem-dev-day-off-rem-"]', function() {
    "use strict";
    var _this_id = $(this).data("id");
    $("#day-remove-" + _this_id).remove();
});
$(document).on("click", ".wp-rem-dev-insert-off-days .wp-rem-dev-calendar-days .day a", function() {
    "use strict";
    var adding_off_day, _this_ = $(this),
        _this_id = $(this).parents(".wp-rem-dev-insert-off-days").data("id"),
        _day = $(this).data("day"),
        _month = $(this).data("month"),
        _year = $(this).data("year"),
        _adding_date = _year + "-" + _month + "-" + _day,
        _add_date = true,
        _this_append = $("#wp-rem-dev-add-off-day-app-" + _this_id),
        no_off_day_msg = _this_append.find("#no-book-day-" + _this_id),
        this_loader = $("#dev-off-day-loader-" + _this_id),
        this_act_msg = $("#wp-rem-dev-act-msg-" + _this_id);
    _this_append.find("li").each(function() {
        var date_field = $(this).find('input[name^="wp_rem_property_off_days"]');
        if (_adding_date == date_field.val()) {
            var response = {
                type: "success",
                msg: wp_rem_property_strings.off_day_already_added
            };
            wp_rem_show_response(response);
            _add_date = false;
        }
    });
    if (typeof _day !== "undefined" && typeof _month !== "undefined" && typeof _year !== "undefined" && _add_date === true) {
        var thisObj = jQuery(".book-btn");
        wp_rem_show_loader(".book-btn", "", "button_loader", thisObj);
        adding_off_day = $.ajax({
            url: wp_rem_globals.ajax_url,
            method: "POST",
            data: {
                off_day_day: _day,
                off_day_month: _month,
                off_day_year: _year,
                property_add_counter: _this_id,
                action: "wp_rem_property_off_day_to_list"
            },
            dataType: "json"
        }).done(function(response) {
            if (typeof response.html !== "undefined") {
                no_off_day_msg.remove();
                _this_append.append(response.html);
                this_act_msg.html(wp_rem_property_strings.off_day_added);
            }
            var response = {
                type: "success",
                msg: wp_rem_property_strings.off_day_added
            };
            wp_rem_show_response(response, "", thisObj);
            $("#wp-rem-dev-cal-holder-" + _this_id).slideUp("fast");
        }).fail(function() {
            wp_rem_show_response("", "", thisObj);
        });
    }
});
jQuery(document).on("click", ".pretty-photo-slider", function() {
    "use strict";
    jQuery(".gallery-first-img").click();
});

function wp_rem_registration_validation(admin_url, id, thisObjClas) {
    "use strict";
    $(".status-message").removeClass("text-danger").hide();
    var formDivID = "#user-register-" + id + " .modal-body";
    if (typeof thisObjClas == "undefined" || thisObjClas == "") {
        thisObjClas = ".ajax-signup-button";
    } else if (thisObjClas === ".shortcode-ajax-signup-button") {
        formDivID = "";
    }
    var thisObj = jQuery(thisObjClas);
    wp_rem_show_loader(thisObjClas, "", "button_loader", thisObj);

    function newValues(id) {
        jQuery("#user_profile").val();
        var serializedValues = jQuery("#wp_signup_form_" + id).serialize() + "&id=" + id;
        return serializedValues;
    }
    var serializedReturn = newValues(id);
    jQuery("div#result_" + id).removeClass("success error");
    jQuery.ajax({
        type: "POST",
        url: admin_url,
        dataType: "json",
        data: serializedReturn,
        success: function(response) {
            wp_rem_show_response(response, formDivID, thisObj);
        }
    });
}
$(".login-form .nav-tabs > li").on("click", function(e) {
    "use strict";
    if (!$(this).hasClass("active")) {
        jQuery(this).closest(".modal-body .loader").show();
        //$(".login-form .modal-body .loader").show();
        if ($(".login-form .modal-body .loader").length == 0) {
            $(".login-form .modal-body").append('<span class="loader"></span>');
        }
        setTimeout(function() {
            $(".login-form .modal-body .loader").fadeOut();
        }, 400);
    }
});
/*

 

 * sorting gallery images

 

 */
function wp_rem_gallery_sorting_list(id, random_id) {
    var gallery = [];
    // more efficient than new Array()
    jQuery("#gallery_sortable_" + random_id + " li").each(function() {
        var data_value = jQuery.trim(jQuery(this).data("attachment_id"));
        gallery.push(jQuery(this).data("attachment_id"));
    });
    jQuery("#" + id).val(gallery.toString());
}
/*

 

 * Remove Team Member 

 

 */
jQuery(document).on("click", ".remove_branche", function() {
    "use strict";
    var branch_id = jQuery(this).parent().data("id");
    wp_rem_show_loader();
    jQuery.ajax({
        type: "POST",
        dataType: "json",
        url: wp_rem_globals.ajax_url,
        data: "wp_rem_branch_id=" + branch_id + "&action=wp_rem_remove_member_branch",
        success: function(response) {
            if (response.type == "success") {
                jQuery("#wp_rem_member_change_locations").trigger("click");
            }
            wp_rem_show_response(response);
        }
    });
});
jQuery(document).on("click", ".branch-option .add_branch", function(e) {
    "use strict";
    e.preventDefault();
    var thisObj = jQuery(this);
    wp_rem_show_loader(".add_branch", "", "button_loader", thisObj);
    jQuery.ajax({
        type: "POST",
        dataType: "html",
        url: wp_rem_globals.ajax_url,
        data: "action=wp_rem_member_branch_add",
        success: function(response) {
            jQuery("#add_update_branch").html(response);
            wp_rem_show_response('');
            jQuery(".add-update-branch").addClass("active");
            jQuery("body").append('<div id="overlay" style="display:none"></div>');
            jQuery("#overlay").fadeIn(300);
        }
    });
});
jQuery(document).on("click", ".member-branch-det", function(e) {
    "use strict";
    e.preventDefault();
    var branch_id = jQuery(this).data("id");
    jQuery.ajax({
        type: "POST",
        dataType: "html",
        url: wp_rem_globals.ajax_url,
        data: "wp_rem_branch_id=" + branch_id + "&action=wp_rem_member_branch_add",
        success: function(response) {
            jQuery("#add_update_branch").html(response);
            jQuery(".add-update-branch").addClass("active");
            jQuery("body").append('<div id="overlay" style="display:none"></div>');
            jQuery("#overlay").fadeIn(300);
        }
    });
});
jQuery(document).on("click", ".user-profile .add-update-branch .cancel", function(e) {
    "use strict";
    e.preventDefault();
    jQuery(".add-update-branch").removeClass("active");
    jQuery("#overlay").fadeOut(300);
    setTimeout(function() {
        jQuery("#overlay").remove();
    }, 400);
});
/*

 

 * Add/Update Branch

 

 */
jQuery(document).on("click", "#save_branch", function() {
    "use strict";
    var thisObj = jQuery(this);
    wp_rem_show_loader("#save_branch", "", "button_loader", thisObj);
    var serializedValues = jQuery("#branch_add_form").serialize();
    jQuery.ajax({
        type: "POST",
        dataType: "json",
        url: wp_rem_globals.ajax_url,
        data: serializedValues + "&action=wp_rem_add_update_branch",
        success: function(response) {
            wp_rem_show_response(response, ".branch-fields", thisObj);
            setTimeout(function() {
                if (response.type == "success") {
                    jQuery(".add-update-branch").removeClass("active");
                    jQuery("#overlay").fadeOut(300);
                    setTimeout(function() {
                        jQuery("#overlay").remove();
                    }, 400);
                    jQuery("#wp_rem_member_change_locations").trigger("click");
                }
            }, 2000);
        }
    });
});
jQuery(document).on("click", ".member-thumbnail-upload", function() {
    var data_id = jQuery(this).data('id');
    jQuery("#wp_rem_member_thumb_" + data_id).click();
});
jQuery(document).on("change", ".wp-rem-member-thumb", function(event) {
    var data_id = jQuery(this).data('id');
    var tmppath = URL.createObjectURL(event.target.files[0]);
    jQuery(".member-thumbnail-" + data_id).html('<img src="' + tmppath + '" width="124" height="124"><div class="remove-member-thumb" data-id="' + data_id + '"><i class="icon-close"></i></div>');
});
jQuery(document).on("click", ".remove-member-thumb", function() {
    var data_id = jQuery(this).data('id');
    jQuery(".member-thumbnail-" + data_id).html('');
    jQuery("#wp_rem_member_thumb_id_" + data_id).val('');
});
jQuery(document).on("click", ".wp-rem-open-register-tab", function(e) {
    e.stopImmediatePropagation();
    jQuery(".wp-rem-open-register-button").click();
});
jQuery(document).on("click", ".wp-rem-open-signin-tab", function(e) {
    e.stopImmediatePropagation();
    jQuery(".wp-rem-open-signin-button").click();
});
jQuery(document).on("click", ".user-tab-register, .user-tab-login", function() {
    "use strict";
    var thisObj = jQuery(this);
    if (thisObj.hasClass("user-tab-register")) {
        var tab_name = 'register';
    } else {
        var tab_name = 'login';
    }
    var serializedValues = 'member_user_tab=' + tab_name;
    jQuery.ajax({
        type: "POST",
        url: wp_rem_globals.ajax_url,
        data: serializedValues + "&action=wp_rem_set_user_tab_cookie",
        success: function(response) {}
    });
});
jQuery(document).on("click", ".header-contact-holder .property-btn", function() {
    var thisObj = jQuery('.header-add-property');
    wp_rem_show_loader('.header-add-property', '', 'button_loader', thisObj);
});