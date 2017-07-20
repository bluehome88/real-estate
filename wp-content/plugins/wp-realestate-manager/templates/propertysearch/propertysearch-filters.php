<?php
/**
 * Property search box
 * default variable which is getting from ajax request or shotcode
 * $property_short_counter, $property_arg
 */
global $wp_rem_plugin_options, $wp_rem_form_fields_frontend, $wp_rem_post_property_types, $wp_rem_shortcode_properties_frontend, $wp_rem_search_fields;
$propertysearch_title_switch = isset($atts['propertysearch_title_field_switch']) ? $atts['propertysearch_title_field_switch'] : '';
$propertysearch_property_type_switch = isset($atts['propertysearch_property_type_field_switch']) ? $atts['propertysearch_property_type_field_switch'] : '';
$propertysearch_location_switch = isset($atts['propertysearch_location_field_switch']) ? $atts['propertysearch_location_field_switch'] : '';
$propertysearch_categories_switch = isset($atts['propertysearch_categories_field_switch']) ? $atts['propertysearch_categories_field_switch'] : '';
$propertysearch_price_switch = isset($atts['propertysearch_price_field_switch']) ? $atts['propertysearch_price_field_switch'] : '';
$propertysearch_advance_filter_switch = isset($atts['propertysearch_advance_filter_switch']) ? $atts['propertysearch_advance_filter_switch'] : '';
$property_types_array = array();
wp_enqueue_script('bootstrap-datepicker');
wp_enqueue_style('datetimepicker');
wp_enqueue_style('datepicker');
wp_enqueue_script('datetimepicker');
$property_type_slug = '';
$wp_rem_form_fields_frontend->wp_rem_form_hidden_render(
        array(
            'simple' => true,
            'cust_id' => '',
            'cust_name' => '',
            'classes' => "property-counter",
            'std' => absint($property_short_counter),
        )
);
?> 
<div style="display:none" id='property_arg<?php echo absint($property_short_counter); ?>'><?php
    echo json_encode($property_arg);
    ?>
</div>
<form method="GET" id="top-search-form-<?php echo wp_rem_allow_special_char($property_short_counter); ?>" action="<?php echo esc_html($wp_rem_search_result_page); ?>" onsubmit="wp_rem_top_search('<?php echo wp_rem_allow_special_char($property_short_counter); ?>');">
    <?php if ($popup_link_text != '') { ?>
        <div class="field-holder search-popup-holder">
            <a href="#" class="search-popup-btn" data-toggle="modal" data-target="#mysearchModal"><?php echo esc_html($popup_link_text); ?></a>

        </div>
    <?php } ?>
    <div role="tabpanel" class="tab-pane" id="home">
        <div class="search-default-fields">
            <?php if ($propertysearch_title_switch == 'yes') { ?>
                <div class="field-holder search-input">
                    <label>
                        <i class="icon-search4"></i>
                        <?php
                        $wp_rem_form_fields_frontend->wp_rem_form_text_render(
                                array(
                                    'cust_name' => 'search_title',
                                    'classes' => 'input-field',
                                    'extra_atr' => 'placeholder="' . wp_rem_plugin_text_srt('wp_rem_property_search_flter_wt_looking_for') . '"',
                                )
                        );
                        ?>  
                    </label>
                </div>
                <?php
            }
            if ($propertysearch_property_type_switch == 'yes') {
                ?>
                <div class="field-holder select-dropdown property-type checkbox"> 
                    <?php
                    $wp_rem_post_property_types = new Wp_rem_Post_Property_Types();
                    $property_types_array = $wp_rem_post_property_types->wp_rem_types_array_callback('NULL');
                    if (is_array($property_types_array) && !empty($property_types_array)) {
                        foreach ($property_types_array as $key => $value) {
                            $property_type_slug = $key;
                            break;
                        }
                    }
                    ?>
                    <ul>
                        <?php
                        $number_option_flag = 1;
                        foreach ($property_types_array as $key => $value) {
                            ?>
                            <li>
                                <?php
                                $checked = '';
                                if (( (isset($_REQUEST['property_type']) && $_REQUEST['property_type'] != '') && $_REQUEST['property_type'] == $key ) || $property_type_slug == $key) {
                                    $checked = 'checked="checked"';
                                }
                                $wp_rem_form_fields_frontend->wp_rem_form_radio_render(
                                        array(
                                            'simple' => true,
                                            'cust_id' => 'search_form_property_type' . $number_option_flag,
                                            'cust_name' => 'property_type',
                                            'std' => $key,
                                            'force_std' => true,
                                            'extra_atr' => $checked . ' onchange="wp_rem_property_type_search_fields(this,\'' . $property_short_counter . '\',\'' . $propertysearch_price_switch . '\'); wp_rem_property_type_cate_fields(this,\'' . $property_short_counter . '\',\'' . $propertysearch_categories_switch . '\'); "',
                                        )
                                );
                                ?>
                                <label for="<?php echo force_balance_tags('search_form_property_type' . $number_option_flag) ?>"><?php echo force_balance_tags($value); ?></label>
                                <?php ?>
                            </li>
                            <?php
                            $number_option_flag ++;
                        }
                        ?>
                    </ul> 
                </div>
            <?php } ?>
            <?php if ($propertysearch_location_switch == 'yes') { ?>
                <div class="field-holder search-input">
                    <?php
                    $wp_rem_select_display = 1;
                    wp_rem_get_custom_locations_property_filter('<div id="wp-rem-top-select-holder" class="search-country" style="display:' . wp_rem_allow_special_char($wp_rem_select_display) . '"><div class="select-holder">', '</div></div>', false, $property_short_counter);
                    ?>
                </div>
                <?php
            }
            $property_cats_array = $wp_rem_search_fields->wp_rem_property_type_categories_options($property_type_slug);

            if ($propertysearch_categories_switch == 'yes' && !empty($property_cats_array)) {
                ?>
                <div id="property_type_cate_fields_<?php echo wp_rem_allow_special_char($property_short_counter); ?>" class="property-category-fields field-holder select-dropdown has-icon">
                    <label>
                        <i class="icon-home"></i>
                        <?php
                        $wp_rem_opt_array = array(
                            'std' => '',
                            'id' => 'property_category',
                            'classes' => 'chosen-select',
                            'cust_name' => 'property_category',
                            'options' => $property_cats_array,
                        );
                        if (count($property_cats_array) <= 6) {
                            $wp_rem_opt_array['classes'] = 'chosen-select-no-single';
                        }
                        $wp_rem_form_fields_frontend->wp_rem_form_select_render($wp_rem_opt_array);
                        ?>
                    </label>
                </div>
            <?php } ?>
            <div class="field-holder search-btn">
                <div class="search-btn-loader-<?php echo wp_rem_allow_special_char($property_short_counter); ?> input-button-loader">
                    <?php
                    $wp_rem_form_fields_frontend->wp_rem_form_text_render(
                            array(
                                'cust_name' => '',
                                'classes' => 'bgcolor',
                                'std' => wp_rem_plugin_text_srt('wp_rem_property_search_flter_saerch'),
                                'cust_type' => "submit",
                            )
                    );
                    ?> 
                </div>
            </div>
        </div>
        <?php
        if ($property_type_slug != '' && $propertysearch_advance_filter_switch == 'yes') { 
            $args = array(
                'name' => $property_type_slug,
                'post_type' => 'property-type',
                'post_status' => 'publish',
                'numberposts' => 1,
            );
            $my_posts = get_posts($args);
            if ($my_posts) {
                $property_type_id = $my_posts[0]->ID;
            }

            // $wp_rem_price_minimum_options = get_post_meta($property_type_id, 'wp_rem_price_minimum_options', true);
            // $wp_rem_price_minimum_options = (!empty($wp_rem_price_minimum_options) ) ? $wp_rem_price_minimum_options : 1;
            // $wp_rem_price_max_options = get_post_meta($property_type_id, 'wp_rem_price_max_options', true);
            // $wp_rem_price_max_options = (!empty($wp_rem_price_max_options) ) ? $wp_rem_price_max_options : 50; //50000;
            // $wp_rem_price_interval = get_post_meta($property_type_id, 'wp_rem_price_interval', true);
            // $wp_rem_price_interval = (!empty($wp_rem_price_interval) ) ? $wp_rem_price_interval : 50;
            $price_type_options = array();
            // $wp_rem_price_interval = (int) $wp_rem_price_interval;
            // $price_counter = $wp_rem_price_minimum_options;
            // $property_price_array = array();
            // $property_price_array[''] = wp_rem_plugin_text_srt('wp_rem_search_filter_min_price');
            // while ($price_counter <= $wp_rem_price_max_options) {
            //     $property_price_array[$price_counter] = $price_counter;
            //     $price_counter = $price_counter + $wp_rem_price_interval;
            // }
            // $property_price_array = kk_get_price_filter_values( wp_rem_plugin_text_srt('wp_rem_search_filter_min_price') );
            $price_min = kk_get_price_filter_values( wp_rem_plugin_text_srt('wp_rem_search_filter_min_price') );
            $price_max = kk_get_price_filter_values( wp_rem_plugin_text_srt('wp_rem_search_filter_max_price') );
            ?>
            <?php if (($propertysearch_categories_switch == 'yes' ) || ($propertysearch_price_switch == 'yes' && !empty($property_price_array)) || $propertysearch_advance_filter_switch == 'yes') { ?>
                <div id="property_type_fields_<?php echo wp_rem_allow_special_char($property_short_counter); ?>" class="search-advanced-fields" style="display:none;">

                         <div class="field-holder select-dropdown has-icon">
                            <div class="wp-rem-min-max-price">
                                <div class="select-categories"> 
                                    <ul>
                                        <li>
                                            <?php
                                            $price_min_checked = ( isset($_REQUEST['price_minimum']) && $_REQUEST['price_minimum'] ) ? $_REQUEST['price_minimum'] : '';
                                            $wp_rem_form_fields_frontend->wp_rem_form_select_render(
                                                    array(
                                                        'simple' => true,
                                                        'cust_name' => 'price_minimum',
                                                        'std' => $price_min_checked,
                                                        'classes' => 'chosen-select-no-single',
                                                        'options' => $price_min,
                                                        'extra_atr' => 'onchange="wp_rem_property_content(\'' . $property_short_counter . '\');"',
                                                        'price' => true
                                                    )
                                            );
                                            ?>
                                        </li>
                                    </ul>
                                </div>
                                <div class="select-categories"> 
                                    <ul>
                                        <li>
                                            <?php
                                            $price_max_checked = ( isset($_REQUEST['price_maximum']) && $_REQUEST['price_maximum'] ) ? $_REQUEST['price_maximum'] : '';
                                            $wp_rem_form_fields_frontend->wp_rem_form_select_render(
                                                    array(
                                                        'simple' => true,
                                                        'cust_name' => 'price_maximum',
                                                        'std' => $price_max_checked,
                                                        'classes' => 'chosen-select-no-single',
                                                        'options' => $price_max,
                                                        'extra_atr' => 'onchange="wp_rem_property_content(\'' . $property_short_counter . '\');"',
                                                        'price' => true
                                                    )
                                            );
                                            ?>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    <?php do_action('wp_rem_property_type_fields', $property_type_slug); ?>
                    <?php do_action('wp_rem_property_type_features', $property_type_slug, $property_short_counter); ?>
                    <?php
                    $wp_rem_form_fields_frontend->wp_rem_form_hidden_render(
                            array(
                                'simple' => true,
                                'cust_id' => 'advanced_search',
                                'cust_name' => 'advanced_search',
                                'std' => 'true',
                                'classes' => '',
                            )
                    );
                    ?>
                </div>
                <?php
            }
        }
        ?>
    </div>
</form>
            