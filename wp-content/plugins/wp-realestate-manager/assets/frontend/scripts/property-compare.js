var $ = jQuery;

$(document).on('click', '.wp_rem_compare_check_add, .wp-rem-btn-compare', function () {
    var _this = $(this);
    var this_id = _this.data('id');
    var this_rand = _this.data('random');
    var this_ajaxurl = wp_rem_property_compare.ajax_url;

    var _action = 'check';
    if (_this.hasClass('wp_rem_compare_check_add')) {
        if (_this.is(":checked")) {
            _action = 'check';
        } else {
            _action = 'uncheck';
        }
    } else {
        _action = _this.attr("data-check");
    }

    var dataString = 'wp_rem_property_id=' + this_id + '&_action=' + _action + '&action=wp_rem_compare_add';
    if (_this.hasClass('wp_rem_compare_check_add')) {
        $('.wp-rem-compare-loader-' + this_rand).html('<span class="compare-loader"><i class="icon-spinner icon-spin"></i></span> ');
    } else {
        _this.find('span').append('<span><i class="icon-spinner icon-spin"></i></span>');
    }

    $.ajax({
        type: "POST",
        url: this_ajaxurl,
        data: dataString,
        dataType: 'json',
        success: function (response) {

            if (response.mark !== 'undefined') {
                if (_this.hasClass('wp_rem_compare_check_add')) {
                    $('.wp-rem-compare-loader-' + this_rand).html('');
                    var compare_responsee = {
                        type: 'success',
                        msg: response.mark
                    };
                    wp_rem_show_response(compare_responsee);
                } else {
                    var compare_responsee = {
                        type: 'success',
                        msg: response.mark
                    };
                    wp_rem_show_response(compare_responsee);
                    _this.find('span').html(response.compare);
                    var check_val = _this.attr("data-check");
                    if (check_val == 'uncheck') {
                        check_val = 'check';
                    } else {
                        check_val = 'uncheck';
                    }
                    _this.attr('data-check', check_val);
                }
            } else {
                if (_this.hasClass('wp_rem_compare_check_add')) {
                    var compare_responsee = {
                        type: 'error',
                        msg: wp_rem_property_compare.error
                    };
                    wp_rem_show_response(compare_responsee);
                } else {
                    var compare_responsee = {
                        type: 'error',
                        msg: wp_rem_property_compare.error
                    };
                    wp_rem_show_response(compare_responsee);
                    _this.find('span').html(wp_rem_property_compare.error);
                    _this.removeAttr('data-check');
                    _this.removeClass('wp-rem-btn-compare');
                }
            }
        }
    });
});

$(document).on('click', '.wp-rem-remove-compare-item', function () {
    var this_id = $(this).data('id');
    var this_type_id = $(this).data('type-id');
    var this_ajaxurl = wp_rem_property_compare.ajax_url;
    var wp_rem_prop_ids = $('.wp-rem-compare').data('ids');
    var wp_rem_page_id = $('.wp-rem-compare').data('id');
    var dataString = 'property_id=' + this_id + '&type_id=' + this_type_id + '&prop_ids=' + wp_rem_prop_ids + '&page_id=' + wp_rem_page_id + '&action=wp_rem_removing_compare';
    $(this).html('<i class="icon-spinner icon-spin"></i>');
    $.ajax({
        type: "POST",
        url: this_ajaxurl,
        data: dataString,
        dataType: 'json',
        success: function (response) {
            if (response.url !== 'undefined' && response.url != '') {
                $('.dev-rem-' + this_id).remove();
                window.location.href = response.url;
            }
        }
    });
});