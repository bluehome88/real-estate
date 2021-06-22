<?php 
 
  
  
 /**
 * The template for displaying single member
 *
 */
global $post, $wp_rem_plugin_options, $wp_rem_theme_options, $Wp_rem_Captcha, $wp_rem_form_fields_frontend, $wp_rem_post_property_types;
$realtor_phone_number = REALTOR_CONTACT . REALTOR_WORKINGTIME;
$realtor_email = REALTOR_EMAIL;
$post_id = 7770; // 1on1 realtor member ID
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
    <div class="page-content col-lg-8 col-md-8 col-sm-12 col-xs-12 meet-team">
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
                            <h3><?php echo $member_title; ?></h3>
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
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 team-description">
                    <h2>Our Agent</h2>
                    <p>Description about our agent</p>
                </div>
                <!--Tabs Start-->
                <div class="member-tabs horizontal">
                    <div id="member_tab">
                        <div class="wp-rem-members-list">
                            <div class="tabs-property col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <?php
                                foreach ( $team_members as $member_data ) {
                                    $selected_user_type = get_user_meta($member_data->ID, 'wp_rem_user_type', true);
                                    $selected_user_type = isset($selected_user_type) && $selected_user_type != '' ? $selected_user_type : 'team-member';
                                    $member_permissions = get_user_meta($member_data->ID, 'wp_rem_permissions', true);
                                    $member_name = get_user_meta($member_data->ID, 'display_name', true);
                                    $phone_number = get_user_meta($member_data->ID, 'member_phone_number', true);
                                    $member_bio = get_user_meta($member_data->ID, 'member_bio', true);
                                    $wp_rem_member_thumb_id = get_user_meta($member_data->ID, 'member_thumb', true);
                                    $member_name = ( isset($member_name) && $member_name != '' ) ? $member_name : $member_data->display_name;
                                    $wp_rem_public_profile = get_user_meta($member_data->ID, 'wp_rem_public_profile', true);
                                    $wp_rem_public_profile = isset($wp_rem_public_profile) ? $wp_rem_public_profile : '';
                                    if ( isset($wp_rem_public_profile) && $wp_rem_public_profile == 'yes' ) {
                                        ?>
                                        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                                            <?php if ( isset($wp_rem_member_thumb_id) && $wp_rem_member_thumb_id != '' ) { ?>
                                                <div class="member-image">
                                                    <a href="<?php echo $current_url."/?member=".$member_data->user_login;?>">
                                                        <?php echo wp_get_attachment_image($wp_rem_member_thumb_id, 'large'); ?>
                                                    </a>
                                                </div>
                                            <?php } ?>
                                            <div class="member-data">
                                                <h6><?php echo esc_html($member_name); ?></h6> 
                                                <a href="tel:<?php echo esc_html($phone_number);?>"><?php echo esc_html($phone_number); ?></a> 
                                                <a href="mailto:<?php echo esc_html($member_data->user_email); ?>"><?php echo esc_html($member_data->user_email); ?></a> 
                                                <a href="<?php echo $current_url."/?member=".$member_data->user_login;?>" class="btn view-team-member">View more</a>
                                            </div>
                                        </div>
                                        <?php
                                    }
                                }
                                ?>
                            </div>
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
        ?>
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
