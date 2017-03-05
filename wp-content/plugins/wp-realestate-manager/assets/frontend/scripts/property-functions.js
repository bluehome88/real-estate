var propertyFilterAjax;

function wp_rem_property_map_setter(counter, properties) {
    "use strict";
    var name = "wp_rem_property_map_" + counter;
    var func = new Function(
            "return " + name + "(" + properties + ");"
            )();
}

function top_map_change_cords(counter) {
    "use strict";
    var top_map = jQuery('.wp-rem-ontop-gmap');
    if (top_map.length !== 0) {
        var ajax_url = wp_rem_globals.ajax_url;
        var data_vals = 'ajax_filter=true&map=top_map&action=wp_rem_top_map_search&' + jQuery(jQuery("#frm_property_arg" + counter)[0].elements).not(":input[name='alerts-email'], :input[name='alert-frequency']").serialize();
        if (jQuery('form[name="wp-rem-top-map-form"]').length > 0) {
            data_vals += "&" + jQuery('form[name="wp-rem-top-map-form"]').serialize() + '&atts=' + jQuery('#atts').html();
        }
        data_vals = stripUrlParams(data_vals);
        var loading_top_map = $.ajax({
            url: ajax_url,
            method: "POST",
            data: data_vals,
            dataType: "json"
        }).done(function (response) {
            if (typeof response.html !== 'undefined') {
                jQuery('.top-map-action-scr').html(response.html);
            }
        }).fail(function () {
        });
    }
}

jQuery(document).ready(function () {
    jQuery(function () {
        var $checkboxes = jQuery("input[type=checkbox]");
        $checkboxes.on('change', function () {
            var ids = $checkboxes.filter(':checked').map(function () {
                return this.id;
            }).get().join(',');
            jQuery('#hidden_input').val(ids);
        });
    });
});
function wp_rem_property_content(counter) {
    //"use strict";
    counter = counter || '';     
    // move to top when search filter apply
    jQuery('html, body').animate({
        scrollTop: jQuery("#wp-rem-property-content-" + counter).offset().top - 120
    }, 700);
    var property_arg = jQuery("#property_arg" + counter).html();
    var this_frm = jQuery("#frm_property_arg" + counter);

    var ads_list_count = jQuery("#ads_list_count_" + counter).val();
    var ads_list_flag = jQuery("#ads_list_flag_" + counter).val();
    var list_flag_count = jQuery("#ads_list_flag_count_" + counter).val();

    if (jQuery("#frm_property_arg" + counter).length > 0) {
        var data_vals = jQuery(jQuery("#frm_property_arg" + counter)[0].elements).not(":input[name='alerts-email'], :input[name='alert-frequency']").serialize();
        if (jQuery('form[name="wp-rem-top-map-form"]').length > 0) {
            data_vals += "&" + jQuery('form[name="wp-rem-top-map-form"]').serialize();
        }
        data_vals = data_vals.replace(/[^&]+=\.?(?:&|$)/g, ''); // remove extra and empty variables
        data_vals = data_vals.replace('undefined', ''); // remove extra and empty variables
        data_vals = data_vals + '&ajax_filter=true';
        data_vals = stripUrlParams(data_vals);
        if (!jQuery('body').hasClass('wp-rem-changing-view')) {
            // top map
            top_map_change_cords(counter);
        }
       
        jQuery('#Property-content-' + counter + ' .property').addClass('slide-loader');
        jQuery('#wp-rem-data-property-content-' + counter + ' .slide-loader-holder').addClass('slide-loader');
        if (typeof (propertyFilterAjax) != 'undefined') {
            propertyFilterAjax.abort();
        }
        propertyFilterAjax = jQuery.ajax({
            type: 'POST',
            dataType: 'HTML',
            url: wp_rem_globals.ajax_url,
            data: data_vals + '&action=wp_rem_properties_content&property_arg=' + property_arg,
            success: function (response) {
                jQuery('body').removeClass('wp-rem-changing-view');
                jQuery('#Property-content-' + counter).html(response);
                // Replace double & from string.
                data_vals = data_vals.replace("&&", "&");
                var current_url = location.protocol + "//" + location.host + location.pathname + "?" + data_vals; //window.location.href;
                current_url = current_url.replace('&=undefined', ''); // remove extra and empty variables
                window.history.pushState(null, null, decodeURIComponent(current_url));
                jQuery(".chosen-select").chosen();
                jQuery('#wp-rem-data-property-content-' + counter + ' .slide-loader-holder').removeClass('slide-loader');
                wp_rem_hide_loader();
                // add class when image loaded
                jQuery(".property-medium .img-holder img, .property-grid .img-holder img").one("load", function () {
                    jQuery(this).parents(".img-holder").addClass("image-loaded");
                }).each(function () {
                    if (this.complete)
                        $(this).load();
                });
                // add class when image loaded
            }
        });
    }
}

function wp_rem_property_content_without_filters(counter, page_var, page_num, ajax_filter, view_type) {
    "use strict";
    counter = counter || '';
    var property_arg = jQuery("#property_arg" + counter).html();
    var data_vals = page_var + '=' + page_num;
    jQuery('#wp-rem-data-property-content-' + counter + ' .slide-loader-holder').addClass('slide-loader');
    if (typeof (propertyFilterAjax) != 'undefined') {
        propertyFilterAjax.abort();
    }
    propertyFilterAjax = jQuery.ajax({
        type: 'POST',
        dataType: 'HTML',
        url: wp_rem_globals.ajax_url,
        data: data_vals + '&action=wp_rem_properties_content&view_type='+view_type+'&property_arg=' + property_arg,
        success: function (response) {
            jQuery('#Property-content-' + counter).html(response);
            // Replace double & from string.
            data_vals = data_vals.replace("&&", "&");
            var current_url = location.protocol + "//" + location.host + location.pathname + "?" + data_vals; //window.location.href;
            window.history.pushState(null, null, decodeURIComponent(current_url));
            jQuery(".chosen-select").chosen();
            jQuery('#wp-rem-data-property-content-' + counter + ' .slide-loader-holder').removeClass('slide-loader');
            wp_rem_hide_loader();
            // add class when image loaded
            jQuery(".property-medium .img-holder img, .property-grid .img-holder img").one("load", function () {
                jQuery(this).parents(".img-holder").addClass("image-loaded");
            }).each(function () {
                if (this.complete)
                    $(this).load();
            });
            // add class when image loaded
        }
    });
}

function stripUrlParams(args) {
    "use strict";
    var parts = args.split("&");
    var comps = {};
    for (var i = parts.length - 1; i >= 0; i--) {
        var spl = parts[i].split("=");
        // Overwrite only if existing is empty.
        if (typeof comps[ spl[0] ] == "undefined" || (typeof comps[ spl[0] ] != "undefined" && comps[ spl[0] ] == '')) {
            comps[ spl[0] ] = spl[1];
        }
    }
    parts = [];
    for (var a in comps) {
        parts.push(a + "=" + comps[a]);
    }

    return parts.join('&');
}

function wp_rem_property_filters_content(counter, page_var, page_num, tab) {
    "use strict";
    counter = counter || '';
    var property_arg = jQuery("#property_arg" + counter).html();
    var this_frm = jQuery("#frm_property_arg" + counter);

    var ads_list_count = jQuery("#ads_list_count_" + counter).val();
    var ads_list_flag = jQuery("#ads_list_flag_" + counter).val();
    var list_flag_count = jQuery("#ads_list_flag_count_" + counter).val();
    var data_vals = 'tab=' + tab + '&' + page_var + '=' + page_num + '&ajax_filter=true';
    jQuery('#wp-rem-data-property-content-' + counter + ' .all-results').addClass('slide-loader');
    if (typeof (propertyFilterAjax) != 'undefined') {
        propertyFilterAjax.abort();
    }
    propertyFilterAjax = jQuery.ajax({
        type: 'POST',
        dataType: 'HTML',
        url: wp_rem_globals.ajax_url,
        data: data_vals + '&action=wp_rem_properties_filters_content&property_arg=' + property_arg,
        success: function (response) {
            console.log(response);
            jQuery('#property-tab-content-' + counter).html(response);
            jQuery("#property-tab-content-" + counter + ' .row').mixItUp({
                selectors: {
                    target: ".portfolio",
                }
            });
            //replace double & from string
            data_vals = data_vals.replace("&&", "&");
            var current_url = location.protocol + "//" + location.host + location.pathname + "?" + data_vals; //window.location.href;
            window.history.pushState(null, null, decodeURIComponent(current_url));
            jQuery(".chosen-select").chosen();
            jQuery('#wp-rem-data-property-content-' + counter + ' .all-results').removeClass('slide-loader');
            // add class when image loaded
            jQuery(".property-medium .img-holder img, .property-grid .img-holder img").one("load", function () {
                jQuery(this).parents(".img-holder").addClass("image-loaded");
            }).each(function () {
                if (this.complete)
                    $(this).load();
            });
            // add class when image loaded
        }
    });

}



function wp_rem_property_by_categories_filters_content(counter, page_var, page_num, tab) {
    "use strict";
    counter = counter || '';
    var property_arg = jQuery("#property_arg" + counter).html();
    var this_frm = jQuery("#frm_property_arg" + counter);

    var ads_list_count = jQuery("#ads_list_count_" + counter).val();
    var ads_list_flag = jQuery("#ads_list_flag_" + counter).val();
    var list_flag_count = jQuery("#ads_list_flag_count_" + counter).val();
    var data_vals = 'tab=' + tab + '&' + page_var + '=' + page_num + '&ajax_filter=true';
    jQuery('#wp-rem-data-property-content-' + counter + ' .all-results').addClass('slide-loader');
    if (typeof (propertyFilterAjax) != 'undefined') {
        propertyFilterAjax.abort();
    }
    propertyFilterAjax = jQuery.ajax({
        type: 'POST',
        dataType: 'HTML',
        url: wp_rem_globals.ajax_url,
        data: data_vals + '&action=wp_rem_property_by_categories_filters_content&property_arg=' + property_arg,
        success: function (response) {
            jQuery('#property-tab-content-' + counter).html(response);
            jQuery("#property-tab-content-" + counter + ' .row').mixItUp({
                selectors: {
                    target: ".portfolio",
                }
            });
            //replace double & from string
            data_vals = data_vals.replace("&&", "&");
            var current_url = location.protocol + "//" + location.host + location.pathname + "?" + data_vals; //window.location.href;
            window.history.pushState(null, null, decodeURIComponent(current_url));
            jQuery(".chosen-select").chosen();
            jQuery('#wp-rem-data-property-content-' + counter + ' .all-results').removeClass('slide-loader');
            // add class when image loaded
            jQuery(".property-medium .img-holder img, .property-grid .img-holder img").one("load", function () {
                jQuery(this).parents(".img-holder").addClass("image-loaded");
            }).each(function () {
                if (this.complete)
                    $(this).load();
            });
            // add class when image loaded
        }
    });

}

function convertHTML(html) {
    "use strict";
    var newHtml = $.trim(html),
            $html = $(newHtml),
            $empty = $();

    $html.each(function (index, value) {
        if (value.nodeType === 1) {
            $empty = $empty.add(this);
        }
    });

    return $empty;
}
;

function wp_rem_property_type_search_fields(thisObj, counter, price_switch) {
    "use strict";
    jQuery.ajax({
        type: 'POST',
        dataType: 'json',
        url: wp_rem_globals.ajax_url,
        data: '&action=wp_rem_property_type_search_fields&property_short_counter=' + counter + '&property_type_slug=' + thisObj.value + '&price_switch=' + price_switch,
        success: function (response) {
            jQuery('#property_type_fields_' + counter).html('');
            jQuery('#property_type_fields_' + counter).html(response.html);
        }
    });
}

function wp_rem_property_type_cate_fields(thisObj, counter, cats_switch) {
    "use strict";
    var cate_loader = '<b class="spinner-label">' + wp_rem_property_functions_string.property_type + '</b><span class="cate-spinning"><i class="icon-spinner"></i></span>';
    jQuery('#property_type_cate_fields_' + counter).html(cate_loader);
    jQuery.ajax({
        type: 'POST',
        dataType: 'json',
        url: wp_rem_globals.ajax_url,
        data: '&action=wp_rem_property_type_cate_fields&property_short_counter=' + counter + '&property_type_slug=' + thisObj.value + '&cats_switch=' + cats_switch,
        success: function (response) {
            jQuery('#property_type_cate_fields_' + counter).html('');
            jQuery('#property_type_cate_fields_' + counter).html(response.html);
        }
    });
} 
function wp_rem_empty_loc_polygon(counter) {
    if (jQuery("#frm_property_arg" + counter + " input[name=loc_polygon_path]").length) {
        jQuery("#frm_property_arg" + counter + " input[name=loc_polygon_path]").val('');
    }
}
function wp_rem_property_view_switch(view, counter, property_short_counter) {
    "use strict";
    jQuery.ajax({
        type: 'POST',
        dataType: 'HTML',
        url: wp_rem_globals.ajax_url,
        data: '&action=wp_rem_property_view_switch&view=' + view + '&property_short_counter=' + property_short_counter,
        success: function () {
            jQuery('[data-toggle="popover"]').popover();
            jQuery('body').addClass('wp-rem-changing-view');
            wp_rem_property_content(counter);
        }
    });
}
function wp_rem_property_pagenation_ajax(page_var, page_num, counter, ajax_filter, view_type) {
    "use strict";
    var view_type = view_type || '';
    jQuery('html, body').animate({
        scrollTop: jQuery("#wp-rem-property-content-" + counter).offset().top - 120
    }, 1000);
    jQuery('#' + page_var + '-' + counter).val(page_num);
    if (ajax_filter == 'false') {
        wp_rem_property_content_without_filters(counter, page_var, page_num, ajax_filter, view_type);
    } else {
        wp_rem_property_content(counter);
    }
}

function wp_rem_property_filters_pagenation_ajax(page_var, page_num, counter, tab) {
    "use strict";
    jQuery('#' + page_var + '-' + counter).val(page_num);
    wp_rem_property_filters_content(counter, page_var, page_num, tab);
}

function wp_rem_property_by_category_filters_pagenation_ajax(page_var, page_num, counter, tab) {
    "use strict";
    jQuery('#' + page_var + '-' + counter).val(page_num);
    wp_rem_property_by_categories_filters_content(counter, page_var, page_num, tab);
}

function wp_rem_advanced_search_field(counter, tab, element) {
    "use strict";
    if (tab == 'simple') {
        jQuery('#property_type_fields_' + counter).slideUp();
        jQuery('#nav-tabs-' + counter + ' li').removeClass('active');
        jQuery(element).parent().addClass('active');
    } else if (tab == 'advance') {
        jQuery('#property_type_fields_' + counter).slideDown();
        jQuery('#nav-tabs-' + counter + ' li').removeClass('active');
        jQuery(element).parent().addClass('active');
    } else {
        jQuery('#property_type_fields_' + counter).slideToggle();
    }
}

function wp_rem_search_features(element, counter) {
    "use strict";
    jQuery('#property_type_fields_' + counter + ' .features-field-expand').slideToggle();
    var expand_class = jQuery('#property_type_fields_' + counter + ' .features-list .advance-trigger').find('i').attr('class');
    if (expand_class == 'icon-plus') {
        console.log(expand_class);
        jQuery('#property_type_fields_' + counter + ' .features-list .advance-trigger').find('i').removeClass(expand_class).addClass('icon-minus')
    } else {
        jQuery('#property_type_fields_' + counter + ' .features-list .advance-trigger').find('i').removeClass(expand_class).addClass('icon-plus')
    }
}