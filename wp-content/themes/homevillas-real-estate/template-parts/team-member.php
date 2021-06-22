<?php 

global $post, $wp_rem_plugin_options, $wp_rem_theme_options, $Wp_rem_Captcha, $wp_rem_form_fields_frontend, $wp_rem_post_property_types;
$realtor_phone_number = REALTOR_CONTACT . REALTOR_WORKINGTIME;
$realtor_email = REALTOR_EMAIL;

$user_login = $_GET['member'];
$user = get_user_by('login', $user_login);
if(!$user) {
    $user = get_user_by('email', $user_login);
    if(!$user) {
        ?> 
    <div class=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="member-inactive">
            <i class="icon-warning"></i>
            <span> <?php echo wp_rem_plugin_text_srt('wp_rem_user_profile_not_active'); ?></span>
        </div>
    </div>
    <?php
        return;
    }
}
$member_id = $user->ID;

$wp_rem_user_status = true; // get_post_meta($post_id, 'wp_rem_user_status', true);
$wp_rem_sitekey = isset($wp_rem_plugin_options['wp_rem_sitekey']) ? $wp_rem_plugin_options['wp_rem_sitekey'] : '';
$wp_rem_secretkey = isset($wp_rem_plugin_options['wp_rem_secretkey']) ? $wp_rem_plugin_options['wp_rem_secretkey'] : '';
$default_property_no_custom_fields = isset($wp_rem_plugin_options['wp_rem_property_no_custom_fields']) ? $wp_rem_plugin_options['wp_rem_property_no_custom_fields'] : '';

$member_name = $user->display_name;
$phone_number = get_user_meta($member_id, 'member_phone_number', true);
$member_bio = get_user_meta($member_id, 'member_bio', true);
$wp_rem_member_thumb_id = get_user_meta($member_id, 'member_thumb', true);

wp_enqueue_script('wp-rem-prettyPhoto');
wp_enqueue_style('wp-rem-prettyPhoto');
$wp_rem_cs_inline_script = '
                jQuery(document).ready(function () {
                     jQuery("a.property-video-btn[rel^=\'prettyPhoto\']").prettyPhoto({animation_speed:"fast",slideshow:10000, hideflash: true,autoplay:true,autoplay_slideshow:false});
                });';
wp_rem_cs_inline_enqueue_script($wp_rem_cs_inline_script, 'wp-rem-custom-inline');

if ( isset($wp_rem_user_status) && $wp_rem_user_status == 'active' ) {
    ?>
    <div class="page-content col-lg-12 col-md-12 col-sm-12 col-xs-12 team-member-detail">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="member-info">
                    <div class="img-holder">
                        <figure>
                             <?php if ( isset($wp_rem_member_thumb_id) && $wp_rem_member_thumb_id != '' ) { ?>
                                <div class="member-image">
                                    <?php echo wp_get_attachment_image($wp_rem_member_thumb_id, 'thumbnail'); ?>
                                </div>
                            <?php } ?>
                        </figure>
                    </div>
                    <div class="text-holder">
                        <div class="title-area">
                            <h3><?php echo esc_html($member_name); ?></h3> 
                        </div> 
                        <ul class="info-list">
                            <li><span class="member-email"><i class="icon-envelope-o"></i><a href="mailto:<?php echo esc_html($user->user_email); ?>"><?php echo $user->user_email; ?></a> </span></li>
                            <?php if ( isset($phone_number) && $phone_number != '' ) { ?>
                                <li><span class="member-phone"><i class="icon-phone2"></i><a href="tel:<?php echo esc_html($phone_number); ?>"><?php echo esc_html($phone_number); ?> </a></span> </li>
                                <?php
                            }  ?> 
                            
                        </ul>
                    </div>
                </div>
            </div>
            <?php if ( isset($member_bio) && $member_bio != '' ) { ?>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 member-bio">
                    <h3>About Me</h3>
                    <?php echo htmlspecialchars_decode($member_bio); ?> 
                </div>
            <?php } ?>
            <div id="properties"></div>
            <?php
            if ( $post_count > 0 ) {
                ?>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="element-title">
                        <h3><?php echo $member_name; ?> Properties</h3>
                    </div>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="real-estate-property">
                        <div class="row">
                            <?php
                            while ( $custom_query->have_posts() ) : $custom_query->the_post();
                                global $post;
                                $property_id = $post->ID;
                                $wp_rem_property_member = get_post_meta($property_id, 'wp_rem_property_member', true);
                                $wp_rem_property_username = get_post_meta($property_id, 'wp_rem_property_username', true);
                                $wp_rem_cover_image_id = get_post_meta($property_id, 'wp_rem_cover_image', true);
                                $wp_rem_cover_image = wp_get_attachment_url($wp_rem_cover_image_id);
                                $wp_rem_post_loc_address_property = get_post_meta($property_id, 'wp_rem_post_loc_address_property', true);
                                $wp_rem_property_price_options = get_post_meta($property_id, 'wp_rem_property_price_options', true);
                                $wp_rem_property_price = get_post_meta($property_id, 'wp_rem_property_price', true);
                                $wp_rem_property_type = get_post_meta($property_id, 'wp_rem_property_type', true);
                                $wp_rem_property_type_cus_fields = $wp_rem_post_property_types->wp_rem_types_custom_fields_array($wp_rem_property_type);
                                $wp_rem_property_is_featured = get_post_meta($property_id, 'wp_rem_property_is_featured', true);
                                $wp_rem_property_gallery_ids = get_post_meta($property_id, 'wp_rem_detail_page_gallery_ids', true);
                                $gallery_pics_allowed = get_post_meta($property_id, 'wp_rem_transaction_property_pic_num', true);
                                $count_all = ( isset($wp_rem_property_gallery_ids) && is_array($wp_rem_property_gallery_ids) && sizeof($wp_rem_property_gallery_ids) > 0 ) ? count($wp_rem_property_gallery_ids) : 0;
                                if ( $count_all > $gallery_pics_allowed ) {
                                    $count_all = $gallery_pics_allowed;
                                }
                                $gallery_image_count = $count_all;
                                // checking review in on in property type
                                $wp_rem_property_type = isset($wp_rem_property_type) ? $wp_rem_property_type : '';
                                if ( $property_type_post = get_page_by_path($wp_rem_property_type, OBJECT, 'property-type') )
                                    $property_type_id = $property_type_post->ID;
                                $property_type_id = isset($property_type_id) ? $property_type_id : '';
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
                                ?>
                                <div class="property-row col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                    <div class="property-grid">
                                        <div class="img-holder">
                                            <figure>
                                                <a href="<?php the_permalink(); ?>">
                                                    <?php
                                                    if ( function_exists('property_gallery_first_image') ) {

                                                        $gallery_image_args = array(
                                                            'property_id' => $property_id,
                                                            'size' => 'wp_rem_cs_media_5',
                                                            'class' => '',
                                                            'default_image_src' => esc_url(wp_rem::plugin_url() . 'assets/frontend/images/no-image9x6.jpg')
                                                        );
                                                        echo $property_gallery_first_image = property_gallery_first_image($gallery_image_args);
                                                    }
                                                    ?>
                                                </a>
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
                                            <div class="post-title">
                                                <h4><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
                                            </div>
                                            <?php
                                            if ( isset($wp_rem_property_price_options) && $wp_rem_property_price_options == 'price' ) {
                                                $wp_rem_property_price = wp_rem_property_price($property_id, $wp_rem_property_price, '<span class="guid-price">', '</span>');
                                                ?>
                                                <span class="property-price"><?php echo force_balance_tags($wp_rem_property_price); ?></span>
                                            <?php } ?>
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
                                            do_action('wp_rem_favourites_frontend_button', $property_id, $book_mark_args, $figcaption_div);
                                            if ( isset($wp_rem_post_loc_address_property) && ! empty($wp_rem_post_loc_address_property) ) {
                                                ?>
                                                <ul class="property-location">
                                                    <li><i class="icon-location-pin2"></i><span><?php echo esc_html($wp_rem_post_loc_address_property); ?></span></li>
                                                </ul>
                                                <?php
                                            } ?>
                                            <p class="post-category-list-property">
                                                <?php echo $wp_rem_cate_str; ?>
                                            </p>
                                            <?php
                                            // All custom fields with value
                                            $cus_fields = array( 'content' => '' );
                                            $cus_fields = apply_filters('wp_rem_custom_fields', $property_id, $cus_fields, $default_property_no_custom_fields);
                                            if ( isset($cus_fields['content']) && $cus_fields['content'] != '' ) {
                                                ?>
                                                <div class="post-category-list">
                                                    <ul>
                                                        <?php echo wp_rem_allow_special_char($cus_fields['content']); ?>
                                                    </ul>
                                                </div>
                                                <?php
                                            } ?>
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
                                </div>
                                <?php
                                wp_reset_postdata();
                            endwhile;
                            ?>
                        </div>
                        <?php
                            $property_short_counter = rand(123, 9999);

                            $paging_args = array(
                                'total_posts' => $post_count,
                                'posts_per_page' => $paging_var_perpage,
                                'paging_var' => $paging_var,
                                'show_pagination' => 'yes',
                                'property_short_counter' => $property_short_counter,
                            );
                            do_action('wp_rem_pagination', $paging_args);
                        ?>
                    </div>
                </div>
                <?php
            }
            ?> 
        </div>
    </div>
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
