<?php
/**
 * File Type: Property Posted By
 */
if (!class_exists('wp_rem_posted_by')) {

    class wp_rem_posted_by {

        /**
         * Start construct Functions
         */
        public function __construct() {
            add_action('wp_rem_posted_by_admin_fields', array($this, 'wp_rem_posted_by_admin_fields_callback'), 11);
            add_action('save_post', array($this, 'wp_rem_insert_posted_by'), 16);
			add_action('wp_ajax_wp_rem_property_back_members', array($this, 'wp_rem_property_back_members'));
        }
        
        public function wp_rem_posted_by_admin_fields_callback(){
            global $wp_rem_html_fields, $post;
            
			$get_dir_member = get_post_meta($post->ID, 'wp_rem_property_member', true);
			$get_dir_user = get_post_meta($post->ID, 'wp_rem_property_username', true);
			
            $wp_rem_users_list = array('' => wp_rem_plugin_text_srt( 'wp_rem_property_select_member' ));
            $wp_rem_users = get_users('orderby=nicename&role=wp_rem_member');

            foreach ($wp_rem_users as $user) {
                $wp_rem_users_list[$user->ID] = $user->display_name;
			}
			
			$wp_rem_members_list = array( '' => wp_rem_plugin_text_srt( 'wp_rem_property_select_member' ) );
			$args = array( 'posts_per_page' => '-1', 'post_type' => 'members', 'orderby' => 'title', 'post_status' => 'publish', 'order' => 'ASC' );
			$cust_query = get_posts($args);
			if ( is_array($cust_query) && sizeof($cust_query) > 0 ) {
				foreach ( $cust_query as $package_post ) {
					if ( isset($package_post->ID) ) {
						$package_id = $package_post->ID;
						$package_title = $package_post->post_title;
						$wp_rem_members_list[$package_id] = $package_title;
					}
				}
			}
			

			$wp_rem_opt_array = array(
                'name' => wp_rem_plugin_text_srt( 'wp_rem_property_select_member' ),
                'desc' => '',
                'hint_text' => '',
                'echo' => true,
                'field_params' => array(
                    'std' => $get_dir_member,
					'force_std' => true,
                    'id' => 'property_member',
                     'extra_atr' => 'onchange="wp_rem_show_company_users(this.value, \''.admin_url('admin-ajax.php').'\', \''.wp_rem::plugin_url().'\');"',
                    'classes' => 'chosen-select-no-single',
                    'options' => $wp_rem_members_list,
                    'return' => true,
                ),
            );
            
            $wp_rem_html_fields->wp_rem_select_field($wp_rem_opt_array);


            $wp_rem_opt_array = array(
                'name' => wp_rem_plugin_text_srt( 'wp_rem_property_select_user' ),
                'desc' => '',
                'hint_text' => '',
				'col_id' => 'property_user_member_col',
                'echo' => true,
                'field_params' => array(
                    'std' => $get_dir_user,
					'force_std' => true,
                    'id' => 'property_username',
                    'classes' => 'chosen-select-no-single',
                    'options' => $wp_rem_users_list,
                    'return' => true,
                ),
            );
            
            $wp_rem_html_fields->wp_rem_select_field($wp_rem_opt_array);
			
			
            
        }
		
		public function wp_rem_property_back_members(){
			global $wp_rem_form_fields;
			
            $company = isset($_POST['company']) ? $_POST['company'] : '';
			$wp_rem_users_list = array('' => wp_rem_plugin_text_srt( 'wp_rem_property_select_user' ));
            $wp_rem_users = get_users(
				array(
					'role' => 'wp_rem_member',
					'meta_query' => array(
						array(
							'key' => 'wp_rem_company',
							'value' => $company,
							'compare' => '='
						),
					),
					'orderby' => 'display_name',
				)
			);
						
            foreach ($wp_rem_users as $user) {
                $wp_rem_users_list[$user->ID] = $user->display_name;
			}
			
			$wp_rem_opt_array = array(
				'std' => '',
				'id' => 'property_username',
				'extra_atr' => '',
				'classes' => 'chosen-select-no-single',
				'options' => $wp_rem_users_list,
				'return' => true,
            );
            
            $html = $wp_rem_form_fields->wp_rem_form_select_render($wp_rem_opt_array);
			
			echo json_encode(array('html' => $html));
			die;
        }
        
        public function wp_rem_insert_posted_by( $post_id ){
            if( isset( $_POST['user_profile_data'] ) ){
                update_post_meta( $post_id, 'wp_rem_user_profile_data', $_POST['user_profile_data'] );
            }
        }
        
    }
    global $wp_rem_posted_by;
    $wp_rem_posted_by    = new wp_rem_posted_by();
}