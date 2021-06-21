<?php 
 
  
  
 /**
 * The template for displaying single member
 *
 */
global $post, $wp_rem_plugin_options, $wp_rem_theme_options, $Wp_rem_Captcha, $wp_rem_form_fields_frontend, $wp_rem_post_property_types;
$realtor_phone_number = REALTOR_CONTACT . REALTOR_WORKINGTIME;
$realtor_email = REALTOR_EMAIL;
$post_id = 7770;
$wp_rem_user_status = get_post_meta($post_id, 'wp_rem_user_status', true);
$wp_rem_captcha_switch = '';
$wp_rem_captcha_switch = isset($wp_rem_plugin_options['wp_rem_captcha_switch']) ? $wp_rem_plugin_options['wp_rem_captcha_switch'] : '';
$wp_rem_sitekey = isset($wp_rem_plugin_options['wp_rem_sitekey']) ? $wp_rem_plugin_options['wp_rem_sitekey'] : '';
$wp_rem_secretkey = isset($wp_rem_plugin_options['wp_rem_secretkey']) ? $wp_rem_plugin_options['wp_rem_secretkey'] : '';
$default_property_no_custom_fields = isset($wp_rem_plugin_options['wp_rem_property_no_custom_fields']) ? $wp_rem_plugin_options['wp_rem_property_no_custom_fields'] : '';
$wp_rem_phone_number = get_post_meta($post_id, 'wp_rem_phone_number', true);
$wp_rem_email_address = get_post_meta($post_id, 'wp_rem_email_address', true);
$wp_rem_email_address = isset($wp_rem_email_address) ? $wp_rem_email_address : '';
$wp_rem_biography = get_post_meta($post_id, 'wp_rem_biography', true);
$wp_rem_post_loc_address_member = get_post_meta($post_id, 'wp_rem_post_loc_address_member', true);
$wp_rem_website = get_post_meta($post_id, 'wp_rem_website', true);
$wp_rem_post_loc_latitude_member = get_post_meta($post_id, 'wp_rem_post_loc_latitude_member', true);
$wp_rem_post_loc_longitude_member = get_post_meta($post_id, 'wp_rem_post_loc_longitude_member', true);
$default_zoom_level = ( isset($wp_rem_plugin_options['wp_rem_map_zoom_level']) && $wp_rem_plugin_options['wp_rem_map_zoom_level'] != '' ) ? $wp_rem_plugin_options['wp_rem_map_zoom_level'] : 10;
$wp_rem_property_zoom = get_post_meta($post_id, 'wp_rem_post_loc_zoom_member', true);
if ( $wp_rem_property_zoom == '' || $wp_rem_property_zoom == 0 ) {
    $wp_rem_property_zoom = $default_zoom_level;
}
$member_image_id = get_post_meta($post_id, 'wp_rem_profile_image', true);
$member_image = wp_get_attachment_url($member_image_id);
if ( $member_image == '' ) {
    $member_image = esc_url(wp_rem::plugin_url() . 'assets/frontend/images/member-no-image.jpg');
}
$member_title = '';
$member_title = get_the_title($post_id);
$member_link = '';
$member_link = get_the_permalink($post_id);
wp_enqueue_script('wp-rem-prettyPhoto');
wp_enqueue_style('wp-rem-prettyPhoto');
$wp_rem_cs_inline_script = '
                jQuery(document).ready(function () {
                     jQuery("a.property-video-btn[rel^=\'prettyPhoto\']").prettyPhoto({animation_speed:"fast",slideshow:10000, hideflash: true,autoplay:true,autoplay_slideshow:false});
                });';
wp_rem_cs_inline_enqueue_script($wp_rem_cs_inline_script, 'wp-rem-custom-inline');
// Handle Member url
global $wp;
$current_url = home_url( $wp->request );
if( isset($_GET) && isset( $_GET['member'] )){
    echo $_GET['member'];
    print_r( $wp );
}

if ( isset($wp_rem_user_status) && $wp_rem_user_status == 'active' ) {
    ?>
    <div class="page-content col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="member-info">
                    <div class="img-holder">
                        <figure>
                            <?php
                            if ( isset($member_image) && $member_image != '' ) {
                                ?>
                                <img src="<?php echo esc_url($member_image); ?>" alt="" />
                                <?php
                            }
                            ?>
                        </figure>
                    </div>
                    <div class="text-holder">
                        <div class="title-area">
                            <h3><?php the_title(); ?></h3>
                        </div> 
                        <ul class="info-list">
                            <?php if ( isset($wp_rem_post_loc_address_member) && $wp_rem_post_loc_address_member != '' ) { ?>
                                <li>
                                    <a href="#" class="branch-address-link" data-lat="<?php echo $wp_rem_post_loc_latitude_member; ?>" data-lng="<?php echo $wp_rem_post_loc_longitude_member; ?>"><i class="icon-location-pin2"></i><?php echo esc_html($wp_rem_post_loc_address_member); ?></a>
                                </li>
                            <?php } ?>
                            <?php
                            if ( isset($wp_rem_phone_number) && $wp_rem_phone_number != '' ) {
                                $wp_rem_phone_number = str_replace(" ", "-", $wp_rem_phone_number);
                                ?>
                                <li><i class="icon-mobile2"></i><a href="tel:<?php echo esc_html($wp_rem_phone_number); ?>"><?php echo esc_html($wp_rem_phone_number); ?></a> </li>
                            <?php } ?> 
                            <?php if ( isset($wp_rem_website) && $wp_rem_website != '' ) { ?>
                                <li><i class="icon-earth-globe"></i><a target="_blank"  href="<?php echo esc_url($wp_rem_website); ?>"><?php echo esc_html($wp_rem_website); ?></a></li>
                            <?php } ?>
                            <?php if ( isset($wp_rem_biography) && $wp_rem_biography != '' ) { ?>
                                <li>
                                    <p><?php echo force_balance_tags(str_replace("<br/>", '</p><p>', str_replace("<br />", '</p><p>', nl2br($wp_rem_biography)))); ?></p>
                                </li>
                            <?php } ?>
                        </ul>
                    </div>

                </div>
                <!--Tabs Start-->
                <div class="member-tabs horizontal">
                    <div id="member_tab">
                        <div class="wp-rem-members-list">
                            <ul class="tabs-property">
                                <?php
                                foreach ( $team_members as $member_data ) {
                                    $selected_user_type = get_user_meta($member_data->ID, 'wp_rem_user_type', true);
                                    $selected_user_type = isset($selected_user_type) && $selected_user_type != '' ? $selected_user_type : 'team-member';
                                    $member_permissions = get_user_meta($member_data->ID, 'wp_rem_permissions', true);
                                    $member_name = get_user_meta($member_data->ID, 'member_name', true);
                                    $phone_number = get_user_meta($member_data->ID, 'member_phone_number', true);
                                    $member_bio = get_user_meta($member_data->ID, 'member_bio', true);
                                    $wp_rem_member_thumb_id = get_user_meta($member_data->ID, 'member_thumb', true);
                                    $member_name = ( isset($member_name) && $member_name != '' ) ? $member_name : $member_data->user_login;
                                    $wp_rem_public_profile = get_user_meta($member_data->ID, 'wp_rem_public_profile', true);
                                    $wp_rem_public_profile = isset($wp_rem_public_profile) ? $wp_rem_public_profile : '';
                                    if ( isset($wp_rem_public_profile) && $wp_rem_public_profile == 'yes' ) {
                                        ?>
                                        <li>
                                            <?php if ( isset($wp_rem_member_thumb_id) && $wp_rem_member_thumb_id != '' ) { ?>
                                                <div class="member-image">
                                                    <?php echo wp_get_attachment_image($wp_rem_member_thumb_id, 'thumbnail'); ?>
                                                </div>
                                            <?php } ?>
                                            <div class="member-data">
                                                <h3><a href="<?php echo $current_url."/?member=".$member_data->user_login;?>"><?php echo esc_html($member_name); ?></a></h3> 
                                                <span class="member-email"><i class="icon-envelope-o"></i><a href="mailto:<?php echo esc_html($member_data->user_email); ?>"><?php echo wp_rem_plugin_text_srt('wp_rem_member_contact_email'); ?></a> </span>
                                                <?php if ( isset($phone_number) && $phone_number != '' ) { ?>
                                                    <span class="member-phone"><i class="icon-phone2"></i><a href="tel:<?php echo esc_html($phone_number); ?>"><?php echo esc_html($phone_number); ?> </a></span> 
                                                    <?php
                                                }

                                                if ( isset($member_bio) && $member_bio != '' ) { ?>
                                                    <div class="member-bio"><?php echo htmlspecialchars_decode($member_bio); ?> </div> 
                                                    <?php
                                                }
                                                
                                                ?>
                                            </div>
                                        </li>
                                        <?php
                                    }
                                }
                                ?>
                            </ul>
                        </div>
                    </div>
                </div>
                <!--Tabs End-->
            </div>
        </div>
    </div>
    <aside class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <form class="contactform_name" id="contactfrm<?php echo absint($wp_rem_cs_email_counter); ?>" name="contactform_name" action="javascript:wp_rem_contact_send_message(<?php echo absint($wp_rem_cs_email_counter); ?>)">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h5><?php echo wp_rem_plugin_text_srt('wp_rem_contact_heading'); ?> <?php echo get_the_title($post_id); ?></h5>
                    <div id="message22" class="response-message"></div>
                    <div class="field-holder">
                        <i class="icon- icon-user4"></i>
                        <?php
                        $wp_rem_opt_array = array(
                            'cust_name' => 'contact_full_name',
                            'return' => false,
                            'classes' => 'input-field',
                            'extra_atr' => ' placeholder=" ' . wp_rem_plugin_text_srt('wp_rem_member_contact_your_name') . '"',
                        );
                        $wp_rem_form_fields_frontend->wp_rem_form_text_render($wp_rem_opt_array);
                        ?>
                    </div>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="field-holder">
                        <i class="icon- icon-envelope3"></i>
                        <?php
                        $wp_rem_opt_array = array(
                            'cust_name' => 'contact_email_add',
                            'return' => false,
                            'classes' => 'input-field',
                            'extra_atr' => ' placeholder=" ' . wp_rem_plugin_text_srt('wp_rem_member_contact_your_email') . '"',
                        );
                        $wp_rem_form_fields_frontend->wp_rem_form_text_render($wp_rem_opt_array);
                        ?>
                    </div>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="field-holder">
                        <i class="icon-message"></i>
                        <?php
                        $wp_rem_opt_array = array(
                            'std' => '',
                            'id'=>'',
                            'name'=>'',
                            'cust_name' => 'contact_message_field',
                            'return' => false,
                            'extra_atr' => ' placeholder=" ' . wp_rem_plugin_text_srt('wp_rem_member_contact_your_message') . '"',
                        );
                        $wp_rem_form_fields_frontend->wp_rem_form_textarea_render($wp_rem_opt_array);
                        ?>
                    </div>
                </div>
                <?php
                if ( $wp_rem_captcha_switch == 'on' ) {
                    if ( $wp_rem_sitekey <> '' and $wp_rem_secretkey <> '' ) {
                        wp_rem_google_recaptcha_scripts();
                        ?>
                        <script>
                            var recaptcha_member;
                            var wp_rem_multicap = function () {
                                //Render the recaptcha1 on the element with ID "recaptcha1"
                                recaptcha_member = grecaptcha.render('recaptcha_member_sidebar', {
                                    'sitekey': '<?php echo ($wp_rem_sitekey); ?>', //Replace this with your Site key
                                    'theme': 'light'
                                });

                            };
                        </script>
                        <?php
                    }
                    if ( class_exists('Wp_rem_Captcha') ) {
                        $output = '<div class="col-md-12 recaptcha-reload" id="member_sidebar_div">';
                        $output .= $Wp_rem_Captcha->wp_rem_generate_captcha_form_callback('member_sidebar', 'true');
                        $output .='</div>';
                        echo force_balance_tags($output);
                    }
                }
                ?>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <?php wp_rem_term_condition_form_field('member_detail_term_policy', 'member_detail_term_policy'); ?>
                    <div class="field-holder">
                        <div class="contact-message-submit input-button-loader">
                            <?php
                            $wp_rem_form_fields_frontend->wp_rem_form_text_render(
                                    array(
                                        'cust_id' => 'message_submit',
                                        'cust_name' => 'contact_message_submit',
                                        'classes' => 'bgcolor',
                                        'std' => wp_rem_plugin_text_srt('wp_rem_contact_send_message') . '',
                                        'cust_type' => "submit",
                                    )
                            );
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <?php
        echo do_action('wp_rem_opening_hours_element_opened_html', $post_id);
        if ( isset($featured_count) && $featured_count > 0 ) {
            ?>
            <div class="property-featured-widget">
                <div class="widget-title">
                    <h5><?php echo wp_rem_plugin_text_srt('wp_rem_member_featured_property'); ?></h5>
                </div>
                <div class="real-estate-property">
                    <?php
                    while ( $custom_query_featured->have_posts() ) : $custom_query_featured->the_post();
                        global $post, $wp_rem_member_profile;
                        $property_id = $post->ID;
                        $wp_rem_property_username = get_post_meta($property_id, 'wp_rem_property_username', true);
                        $wp_rem_property_is_featured = get_post_meta($property_id, 'wp_rem_property_is_featured', true);
                        $wp_rem_property_price_options = get_post_meta($property_id, 'wp_rem_property_price_options', true);
                        $wp_rem_property_type = get_post_meta($property_id, 'wp_rem_property_type', true);
                        $wp_rem_phone_number = get_post_meta($post_id, 'wp_rem_phone_number', true);
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
                            $wp_rem_property_price = wp_rem_plugin_text_srt('wp_rem_nearby_properties_price_on_request');
                        }
                        // get all categories
                        $wp_rem_cate = '';
                        $wp_rem_cate_str = '';
                        $wp_rem_property_category = get_post_meta($property_id, 'wp_rem_property_category', true);

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
                        $nearby_property_id = $post->ID;
                        $wp_rem_property_nearby_price_options = get_post_meta($nearby_property_id, 'wp_rem_property_price_options', true);
                        $wp_rem_property_nearby_price = '';
                        $wp_rem_property_price = '';
                        if ( $wp_rem_property_nearby_price_options == 'price' ) {
                            $wp_rem_property_nearby_price = get_post_meta($nearby_property_id, 'wp_rem_property_price', true);
                        } else if ( $wp_rem_property_nearby_price_options == 'on-call' ) {
                            $wp_rem_property_nearby_price = wp_rem_plugin_text_srt('wp_rem_nearby_properties_price_on_request');
                        }
                        $wp_rem_property_gallery_ids = get_post_meta($nearby_property_id, 'wp_rem_detail_page_gallery_ids', true);
                        $gallery_image_count = count($wp_rem_property_gallery_ids);
                        $wp_rem_property_type = get_post_meta($nearby_property_id, 'wp_rem_property_type', true);
                        $wp_rem_property_type = isset($wp_rem_property_type) ? $wp_rem_property_type : '';
                        if ( $property_type_post = get_page_by_path($wp_rem_property_type, OBJECT, 'property-type') )
                            $property_type_nearby_id = $property_type_post->ID;
                        $wp_rem_property_type_price_nearby_switch = get_post_meta($property_type_nearby_id, 'wp_rem_property_type_price', true);
                        $wp_rem_property_price = get_post_meta($property_id, 'wp_rem_property_price', true);
                        ?>
                        <div class="property-grid">
                            <div class="img-holder">
                                <figure>
                                    <a href="<?php the_permalink(); ?>">
                                        <?php
                                        if ( function_exists('property_gallery_first_image') ) {
                                            $gallery_image_args = array(
                                                'property_id' => $property_id,
                                                'size' => 'wp_rem_cs_media_5',
                                                'class' => 'img-grid',
                                                'default_image_src' => esc_url(wp_rem::plugin_url() . 'assets/frontend/images/no-image9x6.jpg')
                                            );
                                            echo $property_gallery_first_image = property_gallery_first_image($gallery_image_args);
                                        }
                                        ?></a>
                                    <figcaption>
                                        <?php if ( isset($wp_rem_property_is_featured) && $wp_rem_property_is_featured == 'on' ) { ?>
                                            <span class="featured"><?php echo wp_rem_plugin_text_srt('wp_rem_property_featured'); ?></span>
                                        <?php } ?>
                                        <div class="caption-inner">
                                            <?php if ( $wp_rem_cate_str != '' ) { ?>
                                                <span class="rent-label"><?php echo wp_rem_allow_special_char($wp_rem_cate_str); ?></span>
                                            <?php } ?>

                                            <?php if ( isset($gallery_image_count) && $gallery_image_count > 0 ) { ?>
                                                <ul id="galley-img<?php echo absint($property_id) ?>" class="galley-img">
                                                    <li><a  href="javascript:void(0)" class="rem-pretty-photos" data-id="<?php echo absint($property_id) ?>" ><span class="capture-count"><i class="icon-camera6"></i><?php echo absint($gallery_image_count); ?></span><div class="info-content"><span><?php echo wp_rem_plugin_text_srt('wp_rem_element_tooltip_icon_camera'); ?></span></div></a> </li>   
                                                </ul>
                                            <?php
                                            }

                                            $property_video_url = get_post_meta($property_id, 'wp_rem_property_video', true);
                                            $property_video_url = isset($property_video_url) ? $property_video_url : '';
                                            if ( $property_video_url != '' ) {
                                                $property_video_url = str_replace("player.vimeo.com/video", "vimeo.com", $property_video_url)
                                                ?>
                                                <a class="property-video-btn" rel="prettyPhoto" href="<?php echo esc_url($property_video_url); ?>"><i class="icon-film2"></i><div class="info-content"><span><?php echo wp_rem_plugin_text_srt('wp_rem_subnav_item_3'); ?></span></div></a>
                                                <?php
                                            }
                                            ?>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                            <div class="text-holder">
                                <?php
                                $favourite_label = '';
                                $favourite_label = '';
                                $figcaption_div = true;
                                $book_mark_args = array(
                                    'before_label' => $favourite_label,
                                    'after_label' => $favourite_label,
                                    'before_icon' => '<i class="icon-heart-o"></i>',
                                    'after_icon' => '<i class="icon-heart5"></i>',
                                );
                                do_action('wp_rem_favourites_frontend_button', $nearby_property_id, $book_mark_args, $figcaption_div);
                                ?>

                                <?php if ( get_the_title($nearby_property_id) != '' ) { ?>
                                    <div class="post-title">
                                        <h4><a href="<?php echo esc_url(get_permalink($property_id)); ?>"><?php echo esc_html(get_the_title($property_id)); ?></a></h4>
                                    </div>
                                <?php } ?>
                                <?php if ( $wp_rem_property_type_price_nearby_switch == 'on' && $wp_rem_property_nearby_price_options != 'none' ) { ?>
                                    <span class="property-price">
                                        <?Php
                                        if ( $wp_rem_property_nearby_price_options == 'on-call' ) {
                                            echo '<span class="property-price">' . force_balance_tags($wp_rem_property_nearby_price) . '</span>';
                                        } else {
                                            $property_info_price = wp_rem_property_price($nearby_property_id, $wp_rem_property_nearby_price, '<span class="guid-price">', '</span>');
                                            echo '<span class="property-price">' . force_balance_tags($property_info_price) . '</span>';
                                        }
                                        ?>
                                    </span>
                                <?php } ?>
                                <p class="post-category-list-property">
                                    <?php echo $wp_rem_cate_str; ?>
                                </p>
                                <?php
                                // property custom fields.
                                $cus_fields = array( 'content' => '' );
                                $cus_fields = apply_filters('wp_rem_custom_fields', $nearby_property_id, $cus_fields, $default_property_no_custom_fields);
                                if ( isset($cus_fields['content']) && $cus_fields['content'] != '' ) {
                                    ?>
                                    <ul class="post-category-list">
                                        <?php echo wp_rem_allow_special_char($cus_fields['content']); ?>
                                    </ul>
                                    <?php
                                }
                                ?>
                            <?php
                                $wp_rem_phone_number = get_post_meta($wp_rem_property_member, 'wp_rem_phone_number', true);
                                $wp_rem_property_name = get_the_title($wp_rem_property_member);
                                $wp_rem_selected_team_member = get_userdata( $wp_rem_property_username );                                                            ?>
                                <div class="post-category-list resident"><?php
                                    if ( strcmp($wp_rem_property_name, '1on1realtor') == 0 ) {
                                        if ( isset($team_members) && ! empty($team_members) && $wp_rem_property_username ) {
                                            $wp_rem_team_member_name = $wp_rem_selected_team_member->display_name;
                                            $wp_rem_team_member_phone = get_user_meta( $wp_rem_property_username, 'member_phone_number', true);
                                        ?>
                                            <div class="member-info">
                                                <ul class="list-resident">
                                                    <li><i class="icon-user3"></i>
                                                        <a href="<?php echo get_the_permalink($wp_rem_property_member); ?>"><span><?php echo esc_html($wp_rem_team_member_name); ?></span></a>
                                                    </li>
                                                    <li><i class="icon-phone2"></i><a href="tel:<?php echo esc_html($wp_rem_team_member_phone); ?>"><?php echo esc_html($wp_rem_team_member_phone);?></a></li>
                                                </ul>
                                            </div>
                                        <?php 
                                        }
                                        else
                                        {
                                        ?>
                                            <div class="member-info">
                                                <ul class="list-resident">
                                                    <li><i class="icon-user3"></i>
                                                        <a href="<?php echo get_the_permalink($wp_rem_property_member); ?>"><span><?php echo esc_html($wp_rem_property_name); ?></span></a>
                                                    </li>
                                                    <li><i class="icon-phone2"></i><a href="tel:<?php echo esc_html($wp_rem_phone_number); ?>"><?php echo esc_html($wp_rem_phone_number);?></a></li>
                                                </ul>
                                            </div>
                                        <?php
                                        }
                                    } 
                                    else { ?>
                                        <div class="member-info">
                                            <ul class="list-resident">
                                                <li><i class="icon- icon-envelope2"></i><span><?php echo esc_html($realtor_email); ?></span></li>
                                                <li><i class="icon-phone2"></i><a href="tel:<?php echo esc_html($realtor_phone_number); ?>"><?php echo esc_html($realtor_phone_number)?></a></li>
                                            </ul>
                                        </div>
                                    <?php } ?>
                                </div>
                                <div class="post-category-list resident">
                                    <?php
                                    $member_image = array();
                                    if( $wp_rem_property_username ){

                                        $wp_rem_property_id = $wp_rem_selected_team_member->ID;
                                        $wp_rem_member_thumb_id = get_user_meta($wp_rem_property_id, 'member_thumb', true);
                                        // $wp_rem_property_member = get_post_meta($property_id, 'wp_rem_property_member', true);
                                        if ( isset($wp_rem_member_thumb_id) && $wp_rem_member_thumb_id != '' )
                                            $member_image = wp_get_attachment_image_src($wp_rem_member_thumb_id, 'thumbnail');
                                        else
                                            $member_image[0] = esc_url(wp_rem::plugin_url() . 'assets/frontend/images/member-no-image.jpg');
                                        ?>
                                        <div class="thumb-resident">
                                            <figure>
                                                <a href="<?php echo get_the_permalink($wp_rem_property_member); ?>">
                                                   <img src="<?php echo esc_url($member_image[0]); ?>" alt="test" >
                                               </a>
                                            </figure>
                                        </div>
                                    <?php
                                    }
                                    else{
                                        $member_image = array();
                                        $member_image_id = get_post_meta($wp_rem_property_member, 'wp_rem_profile_image', true);
                                        $member_image = wp_get_attachment_image_src($member_image_id, 'thumbnail');

                                        if ($member_image == '' || FALSE == get_post_status($wp_rem_property_member)) {
                                            $member_image[0] = esc_url(wp_rem::plugin_url() . 'assets/frontend/images/member-no-image.jpg');
                                        }

                                        if ($member_image != '' && get_post_status($wp_rem_property_member)) { ?>
                                            <div class="thumb-resident">
                                                <figure>
                                                    <a href="<?php echo get_the_permalink($wp_rem_property_member); ?>">
                                                        <img src="<?php echo esc_url($member_image[0]); ?>" alt="" >
                                                    </a>
                                                </figure>
                                            </div>
                                        <?php 
                                        } 
                                    }
                                    ?>
                                </div>
                            </div>
                        </div>
                        <?php
                    endwhile;
                    ?>

                </div>
            </div>
        <?php } ?>
    </aside>
<?php } else {
    ?> 
    <div class=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="member-inactive">
            <i class="icon-warning"></i>
            <span> <?php echo wp_rem_plugin_text_srt('wp_rem_user_profile_not_active'); ?></span>
        </div>
    </div>
<?php }
?>
