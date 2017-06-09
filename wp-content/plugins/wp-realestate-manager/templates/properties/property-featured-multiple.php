<?php
/**
 * Property search box
 *
 */
?>
<!--Element Section Start-->
<!--Wp-rem Element Start-->
<?php
global $wp_rem_post_property_types, $wp_rem_plugin_options;
$default_property_no_custom_fields = isset($wp_rem_plugin_options['wp_rem_property_no_custom_fields']) ? $wp_rem_plugin_options['wp_rem_property_no_custom_fields'] : '';
$compare_property_switch = isset($atts['compare_property_switch']) ? $atts['compare_property_switch'] : 'no';
if ( false === ( $property_view = wp_rem_get_transient_obj('wp_rem_property_view' . $property_short_counter) ) ) {
    $property_view = isset($atts['property_view']) ? $atts['property_view'] : '';
}
$property_no_custom_fields = isset($atts['property_no_custom_fields']) ? $atts['property_no_custom_fields'] : $default_property_no_custom_fields;
if ( $property_no_custom_fields == '' || ! is_numeric($property_no_custom_fields) ) {
    $property_no_custom_fields = 3;
}
wp_enqueue_script('wp-rem-prettyPhoto');
wp_enqueue_style('wp-rem-prettyPhoto');
$wp_rem_cs_inline_script = '
        jQuery(document).ready(function () {
             jQuery("a.property-video-btn[rel^=\'prettyPhoto\']").prettyPhoto({animation_speed:"fast",slideshow:10000, hideflash: true,autoplay:true,autoplay_slideshow:false});
        });';
wp_rem_cs_inline_enqueue_script($wp_rem_cs_inline_script, 'wp-rem-custom-inline');


$search_box = isset($atts['search_box']) ? $atts['search_box'] : '';
$main_class = 'property-medium';
$wp_rem_properties_title_limit = isset($atts['properties_title_limit']) ? $atts['properties_title_limit'] : '20';
// start ads script
$property_ads_switch = isset($atts['property_ads_switch']) ? $atts['property_ads_switch'] : 'no';
if ( $property_ads_switch == 'yes' ) {
    $property_ads_after_list_series = isset($atts['property_ads_after_list_count']) ? $atts['property_ads_after_list_count'] : '5';
    if ( $property_ads_after_list_series != '' ) {
        $property_ads_list_array = explode(",", $property_ads_after_list_series);
    }
    $property_ads_after_list_array_count = sizeof($property_ads_list_array);
    $property_ads_after_list_flag = 0;
    $i = 0;
    $array_i = 0;
    $property_ads_after_list_array_final = '';
    while ( $property_ads_after_list_array_count > $array_i ) {
        if ( isset($property_ads_list_array[$array_i]) && $property_ads_list_array[$array_i] != '' ) {
            $property_ads_after_list_array[$i] = $property_ads_list_array[$array_i];
            $i ++;
        }
        $array_i ++;
    }
    // new count 
    $property_ads_after_list_array_count = sizeof($property_ads_after_list_array);
}
$properties_ads_array = array();
if ( $property_ads_switch == 'yes' && $property_ads_after_list_array_count > 0 ) {
    $list_count = 0;
    for ( $i = 0; $i <= $property_loop_obj->found_posts; $i ++ ) {
        if ( $list_count == $property_ads_after_list_array[$property_ads_after_list_flag] ) {
            $list_count = 1;
            $properties_ads_array[] = $i;
            $property_ads_after_list_flag ++;
            if ( $property_ads_after_list_flag >= $property_ads_after_list_array_count ) {
                $property_ads_after_list_flag = $property_ads_after_list_array_count - 1;
            }
        } else {
            $list_count ++;
        }
    }
}
$property_page = isset($_REQUEST['property_page']) && $_REQUEST['property_page'] != '' ? $_REQUEST['property_page'] : 1;
$posts_per_page = isset($atts['posts_per_page']) ? $atts['posts_per_page'] : '';
$counter = 1;
if ( $property_page >= 2 ) {
    $counter = ( ($property_page - 1) * $posts_per_page ) + 1;
}
// end ads script
$main_class = 'property-grid default';
// $property_location_options = isset($atts['property_location']) ? $atts['property_location'] : '';
$property_location_options = 'state,country';
if ( $property_location_options != '' ) {
    $property_location_options = explode(',', $property_location_options);
}

if ( $property_loop_obj->have_posts() ) {
    $flag = 1;
    ?>

    <?php if ( sizeof($properties_ads_array) > 0 && in_array(0, $properties_ads_array) && ($property_page == 1 || $property_page == '') ) { ?>
        <div class="swiper-slide col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <?php do_action('wp_rem_random_ads', 'property_banner'); ?>
        </div>
        <?php
    }
    while ( $property_loop_obj->have_posts() ) : $property_loop_obj->the_post();
        global $post, $wp_rem_member_profile;
        $property_id = $post;
        $pro_is_compare = apply_filters('wp_rem_is_compare', $property_id, $compare_property_switch);
        $Wp_rem_Locations = new Wp_rem_Locations();

        $get_property_location = $Wp_rem_Locations->get_element_property_location($property_id, $property_location_options);
        $wp_rem_property_username = get_post_meta($property_id, 'wp_rem_property_username', true);
        $wp_rem_property_member = get_post_meta($property_id, 'wp_rem_property_member', true);
        $wp_rem_property_is_featured = get_post_meta($property_id, 'wp_rem_property_is_featured', true);
        $wp_rem_property_is_top_cat = get_post_meta($property_id, 'wp_rem_property_is_top_cat', true);

        $wp_rem_profile_image = $wp_rem_member_profile->member_get_profile_image($wp_rem_property_username);
        $wp_rem_property_price_options = get_post_meta($property_id, 'wp_rem_property_price_options', true);
        $wp_rem_property_type = get_post_meta($property_id, 'wp_rem_property_type', true);
        $wp_rem_property_posted = get_post_meta($property_id, 'wp_rem_property_posted', true);
        $wp_rem_property_posted = wp_rem_time_elapsed_string($wp_rem_property_posted);
        $number_of_gallery_items = get_post_meta($property_id, 'wp_rem_detail_page_gallery_ids', true);

        $gallery_pics_allowed = get_post_meta($property_id, 'wp_rem_transaction_property_pic_num', true);
        $count_all = ( isset($number_of_gallery_items) && is_array($number_of_gallery_items) && sizeof($number_of_gallery_items) > 0 ) ? count($number_of_gallery_items) : 0;
        if ( $count_all > $gallery_pics_allowed ) {
            $count_all = $gallery_pics_allowed;
        }

        // get property type name by slug
        $property_type_name = '';
        if ( isset($wp_rem_property_type) && ! empty($wp_rem_property_type) ) {
            $post_type_data = get_page_by_path($wp_rem_property_type, OBJECT, 'property-type');
            $post_type_id = $post_type_data->ID;
            $property_type_name = get_the_title($post_type_id);
        }



        // checking review in on in property type
        $wp_rem_property_type = isset($wp_rem_property_type) ? $wp_rem_property_type : '';
        if ( $property_type_post = get_page_by_path($wp_rem_property_type, OBJECT, 'property-type') )
            $property_type_id = $property_type_post->ID;
        $property_type_id = isset($property_type_id) ? $property_type_id : '';
        $wp_rem_user_reviews = get_post_meta($property_type_id, 'wp_rem_user_reviews', true);

        $wp_rem_property_type_price_switch = get_post_meta($property_type_id, 'wp_rem_property_type_price', true);

        // end checking review on in property type

        $wp_rem_property_price = '';
        if ( $wp_rem_property_price_options == 'price' ) {
            $wp_rem_property_price = get_post_meta($property_id, 'wp_rem_property_price', true);
        } else if ( $wp_rem_property_price_options == 'on-call' ) {
            $wp_rem_property_price = wp_rem_plugin_text_srt('wp_rem_properties_price_on_request');
        }
        $wp_rem_price_type = get_post_meta($property_id, 'wp_rem_price_type', true);
        // get all categories
        $wp_rem_cate = '';
        $wp_rem_cate_str = '';
        $wp_rem_property_category = get_post_meta($property_id, 'wp_rem_property_category', true);
        $wp_rem_post_loc_address_property = get_post_meta($property_id, 'wp_rem_post_loc_address_property', true);

        if ( ! empty($wp_rem_property_category) && is_array($wp_rem_property_category) ) {
            $comma_flag = 0;
            foreach ( $wp_rem_property_category as $cate_slug => $cat_val ) {
                $wp_rem_cate = get_term_by('slug', $cat_val, 'property-category');

                if ( ! empty($wp_rem_cate) ) {
                    $cate_link = wp_rem_property_category_link($property_type_id, $cat_val);
                    if ( $comma_flag != 0 ) {
                        $wp_rem_cate_str .= ', ';
                    }
                    $wp_rem_cate_str = '<a href="' . $cate_link . '">' . $wp_rem_cate->name . '</a>';
                    $comma_flag ++;
                }
            }
        }

        $featured = $urgent = '';
        if ( $wp_rem_property_is_featured == 'on' ) {
            $featured = 'featured';
        } if ( $wp_rem_property_is_top_cat == 'on' ) {
            $urgent = 'urgent';
        }
        ?>
        <div class="swiper-slide">
            <div class="<?php echo esc_html($main_class); ?> <?php echo esc_html($pro_is_compare); ?>">
                <div class="img-holder">
                    <figure>
                        <?php
                        if ( function_exists('property_gallery_first_image') ) {
                            if ( $property_view == 'grid-medern' ) {
                                $size = 'wp_rem_cs_media_5';
                            } else if ( $property_view == 'grid-classic' ) {
                                $size = 'wp_rem_cs_media_5';
                            } else {
                                $size = 'wp_rem_cs_media_6';
                            }
                            $size = 'wp_rem_cs_media_8';
                            $gallery_image_args = array(
                                'property_id' => $property_id,
                                'size' => $size,
                                'class' => 'img-grid',
                                'default_image_src' => esc_url(wp_rem::plugin_url() . 'assets/frontend/images/no-image9x6.jpg')
                            );
                            echo $property_gallery_first_image = property_gallery_first_image($gallery_image_args);
                        }
                        ?>
                        <a class="external-link" href="<?php the_permalink(); ?>"></a>
                        <figcaption>
                            <?php if ( ! empty($property_type_name) ) { ?>
                                <span class="cs-categories"><?php echo esc_html($property_type_name); ?></span>
                            <?php } ?>
                            <?php if ( $wp_rem_property_is_featured == 'on' ) { ?>
                                <span class="featured"><?php echo wp_rem_plugin_text_srt('wp_rem_property_featrd'); ?></span>
                            <?php } ?>
                            <?php echo fetch_property_open_house_grid_view_callback($property_id); ?>
                            <div class="caption-inner">

                                <?php
                                $property_video_url = get_post_meta($property_id, 'wp_rem_property_video', true);
                                $property_video_url = isset($property_video_url) ? $property_video_url : '';
                                if ( $property_video_url != '' ) {
                                    $property_video_url = str_replace("player.vimeo.com/video", "vimeo.com", $property_video_url)
                                    ?>
                                    <a class="property-video-btn" rel="prettyPhoto" href="<?php echo esc_url($property_video_url); ?>"><i class="icon-film2"></i><div class="info-content"><span><?php echo wp_rem_plugin_text_srt('wp_rem_subnav_item_3'); ?></span></div></a>
                                    <?php
                                }
                                $rand_idd = rand(111, 786545);
                                if ( $count_all > 0 ) {
                                    ?>
                                    <ul id="galley-img<?php echo absint($property_id) ?>" class="galley-img">
                                        <li><a  href="javascript:void(0)" class="rem-pretty-photos" data-id="<?php echo absint($property_id) ?>" ><span class="capture-count"><i class="icon-camera6"></i><?php echo absint($count_all); ?></span><div class="info-content"><span><?php echo wp_rem_plugin_text_srt('wp_rem_element_tooltip_icon_camera'); ?></span></div></a> </li>   
                                    </ul>
                                <?php } ?>
                                <?php do_action('wp_rem_compare_btn', $property_id, $compare_property_switch); ?>    
                            </div>
                        </figcaption>
                    </figure>
                </div>
                <div class="text-holder">

                    <div class="price-holder">
                        <?php if ( $wp_rem_property_type_price_switch == 'on' && $wp_rem_property_price != '' ) { ?>
                            <span class="property-price">
                                <?php
                                if ( $wp_rem_property_price_options == 'on-call' ) {
                                    echo '<em>' . force_balance_tags($wp_rem_property_price) . '</em>';
                                } else {
                                    $property_info_price = wp_rem_property_price($property_id, $wp_rem_property_price, '<span class="guid-price">', '</span>', '<em>', '</em>');
                                    echo force_balance_tags($property_info_price);
                                }
                                ?>
                            </span>
                        <?php } ?>
                    </div>
                    <div class="post-title">
                        <h4><a href="<?php echo esc_url(get_permalink($property_id)); ?>"><?php echo esc_html(wp_trim_words(get_the_title($property_id), $wp_rem_properties_title_limit)) ?></a></h4>
                    </div>
                    <?php
                    // All custom fields with value
                    $cus_fields = array( 'content' => '' );
                    $cus_fields = apply_filters('wp_rem_custom_fields', $property_id, $cus_fields, $property_no_custom_fields, false);
                    if ( isset($cus_fields['content']) && $cus_fields['content'] != '' ) {
                        ?>
                        <ul class="post-category-list">
                            <?php echo wp_rem_allow_special_char($cus_fields['content']); ?>
                        </ul>
                    <?php } ?>
                </div>
                <div class="loation-list-holder">
                    <?php if ( ! empty($get_property_location) ) { ?>
                        <ul class="location-list">
                            <li><?php echo esc_html(implode(', ', $get_property_location)); ?></li>
                        </ul>
                        <?php
                    }
                    $favourite_label = '';
                    $favourite_label = '';
                    $figcaption_div = true;
                    $book_mark_args = array(
                        'before_label' => $favourite_label,
                        'after_label' => $favourite_label,
                        'before_icon' => '<i class="icon-heart-o"></i>',
                        'after_icon' => '<i class="icon-heart5"></i>',
                    );
                    do_action('wp_rem_favourites_frontend_button', $property_id, $book_mark_args, $figcaption_div);
                    ?> 
                </div>
            </div>
        </div>
        <?php if ( sizeof($properties_ads_array) > 0 && in_array($counter, $properties_ads_array) ) { ?>
            <div class="swiper-slide col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <?php do_action('wp_rem_random_ads', 'property_banner'); ?>
            </div>
            <?php
        }
        $counter ++;
    endwhile;
    ?>

    <?php
} else {
    echo '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-property-match-error"><h6><i class="icon-warning"></i><strong> ' . wp_rem_plugin_text_srt('wp_rem_property_slider_sorry') . '</strong>&nbsp; ' . wp_rem_plugin_text_srt('wp_rem_property_slider_doesn_match') . ' </h6></div>';
}
?>