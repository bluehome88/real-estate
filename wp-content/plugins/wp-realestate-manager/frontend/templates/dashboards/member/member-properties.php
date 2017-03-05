<?php
/**
 * Member Properties
 *
 */
if (!class_exists('Wp_rem_Member_Properties')) {

    class Wp_rem_Member_Properties {

        /**
         * Start construct Functions
         */
        public function __construct() {
            add_action('wp_enqueue_scripts', array($this, 'wp_rem_filters_element_scripts'), 11);
            add_action('wp_ajax_wp_rem_member_properties', array($this, 'wp_rem_member_properties_callback'), 11, 1);
            add_action('wp_ajax_nopriv_wp_rem_member_properties', array($this, 'wp_rem_member_properties_callback'), 11, 1);
            add_action('wp_ajax_wp_rem_member_property_delete', array($this, 'delete_user_property'));
        }

        public function wp_rem_filters_element_scripts() {
            wp_enqueue_style('daterangepicker');
            wp_enqueue_script('daterangepicker-moment');
            wp_enqueue_script('daterangepicker');
            wp_enqueue_script('wp-rem-filters-functions');
        }

        /**
         * Member Properties
         * @ filter the properties based on member id
         */
        public function wp_rem_member_properties_callback($member_id = '') {
            global $current_user, $wp_rem_plugin_options;

            $pagi_per_page = isset($wp_rem_plugin_options['wp_rem_member_dashboard_pagination']) ? $wp_rem_plugin_options['wp_rem_member_dashboard_pagination'] : '';

            $member_id = wp_rem_company_id_form_user_id($current_user->ID);
            $posts_per_page = $pagi_per_page > 0 ? $pagi_per_page : 1;
            $posts_paged = isset($_REQUEST['page_id_all']) ? $_REQUEST['page_id_all'] : '';

            $args = array(
                'post_type' => 'properties',
                'posts_per_page' => $posts_per_page,
                'paged' => $posts_paged,
                'post_status' => 'publish',
                'meta_query' => array(
                    'relation' => 'AND',
                    array(
                        'key' => 'wp_rem_property_member',
                        'value' => $member_id,
                        'compare' => '=',
                    ),
                    array(
                        'key' => 'wp_rem_property_status',
                        'value' => 'delete',
                        'compare' => '!=',
                    ),
                ),
            );

            $args = wp_rem_filters_query_args($args);
            $custom_query = new WP_Query($args);
            $total_posts = $custom_query->found_posts;
            $all_properties = $custom_query->posts;

            echo force_balance_tags($this->render_view($all_properties));
            wp_reset_postdata();

            $total_pages = 1;
            if ($total_posts > 0 && $posts_per_page > 0 && $total_posts > $posts_per_page) {
                $total_pages = ceil($total_posts / $posts_per_page);
                $wp_rem_dashboard_page = isset($wp_rem_plugin_options['wp_rem_member_dashboard']) ? $wp_rem_plugin_options['wp_rem_member_dashboard'] : '';
                $wp_rem_dashboard_link = $wp_rem_dashboard_page != '' ? get_permalink($wp_rem_dashboard_page) : '';
                $this_url = $wp_rem_dashboard_link != '' ? add_query_arg(array('dashboard' => 'properties'), $wp_rem_dashboard_link) : '';
                wp_rem_dashboard_pagination($total_pages, $posts_paged, $this_url, 'properties');
            }

            wp_die();
        }

        /**
         * Member Properties HTML render
         * @ HTML before and after the property items
         */
        public function render_view($all_properties) {
            global $wp_rem_plugin_options, $wp_rem_form_fields_frontend;
            $wp_rem_dashboard_page = isset($wp_rem_plugin_options['wp_rem_create_property_page']) ? $wp_rem_plugin_options['wp_rem_create_property_page'] : '';
            $wp_rem_dashboard_link = $wp_rem_dashboard_page != '' ? get_permalink($wp_rem_dashboard_page) : '';
            if (isset($_GET['lang'])) {
                $wp_rem_property_add_url = $wp_rem_dashboard_link != '' ? add_query_arg(array('lang' => $_GET['lang']), $wp_rem_dashboard_link) : '#';
            } else if (wp_rem_wpml_lang_url() != '') {
                $cs_lang_string = wp_rem_wpml_lang_url();
                $wp_rem_property_add_url = $wp_rem_dashboard_link != '' ? add_query_arg(array(), wp_rem_wpml_parse_url($cs_lang_string, $wp_rem_dashboard_link)) : '#';
            } else {
                $wp_rem_property_add_url = $wp_rem_dashboard_link != '' ? add_query_arg(array(), $wp_rem_dashboard_link) : '#';
            }

            $date_range = isset($_POST['date_range']) ? $_POST['date_range'] : '';
            ?>
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
                    <div class="user-property">
                        <div class="element-title right-filters-row">
                            <h4><?php echo wp_rem_plugin_text_srt( 'wp_rem_properties_properties' ); ?></h4>
                            <div class="right-filters row pull-right">
                                <div class="col-lg-8 col-md-8 col-xs-8">
                                    <?php if ((empty($all_properties) && $date_range != '') || (isset($all_properties) && !empty($all_properties))) { ?>
                                        <div class="input-field">
                                            <i class="icon-angle-down"></i> 
                                            <?php
                                            $wp_rem_form_fields_frontend->wp_rem_form_text_render(
                                                    array(
                                                        'cust_name' => '',
                                                        'cust_id' => 'date_range',
                                                        'std' => esc_html($date_range),
                                                        'extra_atr' => 'placeholder="' . wp_rem_plugin_text_srt( 'wp_rem_properties_date_range' ) . '"',
                                                    )
                                            );
											if (is_rtl()) { 
												$date_picker_position = 'right'; 
											}else{
												$date_picker_position = 'left';
											}
                                            ?>  
                                            <script type="text/javascript">
                                                jQuery(document).ready(function () {
													wp_rem_date_range_filter('date_range', 'wp_rem_member_properties', '<?php echo $date_picker_position; ?>');
                                                });
                                            </script>
                                        </div>
                                    <?php } ?>
                                    <div class="team-option">
                                        <a class="ad-submit" href="<?php echo esc_url_raw($wp_rem_property_add_url) ?>" class="add-more"><?php echo wp_rem_plugin_text_srt( 'wp_rem_properties_submit_ad' ); ?></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div id="wp-rem-dev-user-property" class="user-list" data-ajax-url="<?php echo esc_url(admin_url('admin-ajax.php')); ?>"> 
                                    <ul class="panel-group">

                                        <?php
                                        if (isset($all_properties) && !empty($all_properties)) {
                                            ?>
                                            <li> <span><?php echo wp_rem_plugin_text_srt( 'wp_rem_properties_ads' ); ?></span>
                                                <span><?php echo wp_rem_plugin_text_srt( 'wp_rem_properties_posted' ); ?></span>
                                                <span><?php echo wp_rem_plugin_text_srt( 'wp_rem_properties_expires' ); ?></span> </li><?php
                                            foreach ($all_properties as $property_data) {
                                                echo force_balance_tags($this->render_list_item_view($property_data));
                                            }
                                        } else {
                                            ?>
                                            <li class="no-property-found">
                                                <i class="icon-caution"></i>
                                                <?php echo wp_rem_plugin_text_srt('wp_rem_memberlist_dont_have'); ?>
                                            </li>
                                            <?php
                                        }
                                        ?>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <?php
        }

        /**
         * Member Properties Items HTML render
         * @ HTML for property items
         */
        public function render_list_item_view($property_data) {
            global $post, $wp_rem_plugin_options;
            $post = $property_data;
            setup_postdata($post);

            $property_post_on = get_post_meta(get_the_ID(), 'wp_rem_property_posted', true);
            $property_post_expiry = get_post_meta(get_the_ID(), 'wp_rem_property_expired', true);
            $property_status = get_post_meta(get_the_ID(), 'wp_rem_property_status', true);
            $wp_rem_dashboard_page = isset($wp_rem_plugin_options['wp_rem_create_property_page']) ? $wp_rem_plugin_options['wp_rem_create_property_page'] : '';
            $wp_rem_dashboard_link = $wp_rem_dashboard_page != '' ? get_permalink($wp_rem_dashboard_page) : '';
            $wp_rem_property_update_url = $wp_rem_dashboard_link != '' ? add_query_arg(array('property_id' => get_the_ID()), $wp_rem_dashboard_link) : '#';

            $wp_rem_property_type = get_post_meta(get_the_ID(), 'wp_rem_property_type', true);
            if ($property_type_post = get_page_by_path($wp_rem_property_type, OBJECT, 'property-type'))
                $property_type_id = $property_type_post->ID;
            $wp_rem_cate_str = '';
            $wp_rem_property_category = get_post_meta(get_the_ID(), 'wp_rem_property_category', true);
            $wp_rem_post_loc_address_property = get_post_meta(get_the_ID(), 'wp_rem_post_loc_address_property', true);

            if (!empty($wp_rem_property_category) && is_array($wp_rem_property_category)) {
                $comma_flag = 0;
                foreach ($wp_rem_property_category as $cate_slug => $cat_val) {
                    $wp_rem_cate = get_term_by('slug', $cat_val, 'property-category');

                    if (!empty($wp_rem_cate)) {
                        $cate_link = wp_rem_property_category_link($property_type_id, $cat_val);
                        if ($comma_flag != 0) {
                            $wp_rem_cate_str .= ', ';
                        }
                        $wp_rem_cate_str = '<a href="' . $cate_link . '">' . $wp_rem_cate->name . '</a>';
                        $comma_flag ++;
                    }
                }
            }
            ?>
            <li id="user-property-<?php echo absint(get_the_ID()); ?>" class="alert" data-id="<?php echo esc_attr(get_the_ID()); ?>">
                <div class="panel panel-default">
                    <a href="javascript:void(0);" data-id="<?php echo absint(get_the_ID()); ?>" class="close-member wp-rem-dev-property-delete"><i class="icon-close"></i></a>
                    <div class="panel-heading"> 
                        <div class="img-holder">
                            <figure>
                                <?php
                                if (function_exists('property_gallery_first_image')) {
                                    $gallery_image_args = array(
                                        'property_id' => get_the_ID(),
                                        'size' => 'thumbnail',
                                        'class' => '',
                                        'default_image_src' => esc_url(wp_rem::plugin_url() . 'assets/frontend/images/no-image4x3.jpg')
                                    );
                                    echo $property_gallery_first_image = property_gallery_first_image($gallery_image_args);
                                }
                                ?>
                            </figure>
                            <strong><a href="<?php echo esc_url(get_the_permalink()); ?>"><?php echo esc_html(get_the_title()); ?></a></strong>
                            <?php if ($wp_rem_cate_str != '') { ?>
                                <span class="rent-label"><?php echo wp_rem_allow_special_char($wp_rem_cate_str); ?></span>
                            <?php } ?>
                        </div>
                        <span class="post-date"><?php echo esc_html($property_post_on != '' ? date_i18n(get_option('date_format'), $property_post_on) : '-' ) ?></span>
                        <?php
                        if ($property_status == 'active' || $property_status == 'awaiting-activation') {
                            ?>
                            <span class="expire-date"><?php echo esc_html($property_post_expiry != '' ? date_i18n(get_option('date_format'), $property_post_expiry) : '-' ) ?></span>
                            <?php
                        } else {
                            ?>
                            <span class="expire-date">-</span>
                            <?php
                        }
                        ?>
                        <span class="edit"><a href="<?php echo esc_url_raw($wp_rem_property_update_url) ?>"><?php echo wp_rem_plugin_text_srt('wp_rem_memberlist_edit'); ?></a></span>
                    </div>
                </div>
            </li>
            <?php
            wp_reset_postdata();
        }

        /**
         * Deleting user property from dashboard
         * @Delete Property
         */
        public function delete_user_property() {
            global $current_user;
            $property_id = isset($_POST['property_id']) ? $_POST['property_id'] : '';
            $wp_rem_member_id = get_post_meta($property_id, 'wp_rem_property_member', true);
            $member_id = wp_rem_company_id_form_user_id($current_user->ID);

            if (is_user_logged_in() && $member_id == $wp_rem_member_id) {
                update_post_meta($property_id, 'wp_rem_property_status', 'delete');
				$property_member_id = get_post_meta( $property_id, 'wp_rem_property_member', true );
				if( $property_member_id != '' ){
					do_action('wp_rem_plublisher_properties_decrement', $property_member_id);
				}
				echo json_encode(array('delete' => 'true'));
            } else {
                echo json_encode(array('delete' => 'false'));
            }
            die;
        }

    }

    global $wp_rem_member_properties;
    $wp_rem_member_properties = new Wp_rem_Member_Properties();
}
