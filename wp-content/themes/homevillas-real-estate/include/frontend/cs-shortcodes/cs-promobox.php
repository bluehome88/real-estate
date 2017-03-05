<?php

/*
 *
 * @Shortcode Name : Image Frame
 * @retrun
 *
 */
if ( ! function_exists('wp_rem_cs_var_promobox') ) {

	function wp_rem_cs_var_promobox($atts, $content = "") {

		global $header_map, $post;
		$defaults = array(
			'wp_rem_cs_var_column_size' => '',
			'wp_rem_cs_var_image_section_title' => '',
                        'wp_rem_cs_var_image_section_subtitle' => '',
			'wp_rem_var_promobox_align' => '',
			'wp_rem_cs_var_frame_image_url_array' => '',
			'wp_rem_cs_promobox_bg_color' => '',
			'wp_rem_cs_var_promobox_title' => '',
			'wp_rem_cs_var_frame_promo_image_url_array' => '',
			'wp_rem_cs_var_app_store_image_url_array' => '',
			'wp_rem_cs_promobox_button_bg_color' => '',
			'wp_rem_cs_var_promobox_button_title' => '',
			'wp_rem_cs_var_promobox_button_url' => '',
			'wp_rem_cs_promobox_title_color' => '',
			'wp_rem_cs_var_promo_box_view' => '',
			'wp_rem_cs_var_app_store_url' => '',
			'wp_rem_cs_var_google_store_image_url_array' => '',
			'wp_rem_cs_var_google_store_url' => '',
		);
		extract(shortcode_atts($defaults, $atts));
		if ( isset($wp_rem_cs_var_column_size) && $wp_rem_cs_var_column_size != '' ) {
			if ( function_exists('wp_rem_cs_var_custom_column_class') ) {
				$column_class = wp_rem_cs_var_custom_column_class($wp_rem_cs_var_column_size);
			}
		}

		$wp_rem_cs_var_image_section_title = isset($wp_rem_cs_var_image_section_title) ? $wp_rem_cs_var_image_section_title : '';
		$wp_rem_cs_var_frame_image_url = isset($wp_rem_cs_var_frame_image_url_array) ? $wp_rem_cs_var_frame_image_url_array : '';
		$wp_rem_cs_var_frame_promo_image_url_array = isset($wp_rem_cs_var_frame_promo_image_url_array) ? $wp_rem_cs_var_frame_promo_image_url_array : '';
		$wp_rem_cs_var_promobox_button_title = isset($wp_rem_cs_var_promobox_button_title) ? $wp_rem_cs_var_promobox_button_title : '';
		$wp_rem_cs_var_promobox_button_url = isset($wp_rem_cs_var_promobox_button_url) ? $wp_rem_cs_var_promobox_button_url : '';
		$wp_rem_cs_promobox_button_bg_color = isset($wp_rem_cs_promobox_button_bg_color) ? $wp_rem_cs_promobox_button_bg_color : '';
		$wp_rem_cs_promobox_bg_color = isset($wp_rem_cs_promobox_bg_color) ? $wp_rem_cs_promobox_bg_color : '';
		$wp_rem_cs_var_promobox_title = isset($wp_rem_cs_var_promobox_title) ? $wp_rem_cs_var_promobox_title : '';
		$wp_rem_cs_promobox_title_color = isset($wp_rem_cs_promobox_title_color) ? $wp_rem_cs_promobox_title_color : '';
		$wp_rem_cs_var_promo_box_view = isset($wp_rem_cs_var_promo_box_view) ? $wp_rem_cs_var_promo_box_view : '';
		$wp_rem_cs_var_app_store_image_url_array = isset($wp_rem_cs_var_app_store_image_url_array) ? $wp_rem_cs_var_app_store_image_url_array : '';
		$wp_rem_cs_var_app_store_url = isset($wp_rem_cs_var_app_store_url) ? $wp_rem_cs_var_app_store_url : '';
		$wp_rem_cs_var_google_store_image_url_array = isset($wp_rem_cs_var_google_store_image_url_array) ? $wp_rem_cs_var_google_store_image_url_array : '';
		$wp_rem_cs_var_google_store_url = isset($wp_rem_cs_var_google_store_url) ? $wp_rem_cs_var_google_store_url : '';


		$wp_rem_cs_var_promobox = '';
		$page_element_size = isset($atts['promobox_element_size']) ? $atts['promobox_element_size'] : 100;
		if ( function_exists('wp_rem_cs_var_page_builder_element_sizes') ) {
			$wp_rem_cs_var_promobox .= '<div class="' . wp_rem_cs_var_page_builder_element_sizes($page_element_size) . ' ">';
		}
		if ( isset($column_class) && $column_class <> '' ) {
			$wp_rem_cs_var_promobox .= '<div class="' . esc_html($column_class) . '">';
		}
                $wp_rem_cs_var_promobox .= wp_rem_title_sub_align($wp_rem_cs_var_image_section_title, $wp_rem_cs_var_image_section_subtitle, $wp_rem_var_promobox_align);
		$image_url = '';
		$promobox_bg_color = '';
		if ( isset($wp_rem_cs_promobox_bg_color) && $wp_rem_cs_promobox_bg_color <> '' ) {
			$promobox_bg_color = '' . $wp_rem_cs_promobox_bg_color;
		}

		if ( isset($image_url) && $image_url <> '' || isset($promobox_bg_color) && $promobox_bg_color <> '' ) {
			$wp_rem_cs_var_frame_image_url = 'style="background:' . $image_url . ' ' . $promobox_bg_color . ';"';
		}
		$title_color = '';
		if ( isset($wp_rem_cs_promobox_title_color) && $wp_rem_cs_promobox_title_color <> '' ) {
			$title_color = 'style="color:' . esc_html($wp_rem_cs_promobox_title_color) . ' !important;"';
		}
		if ( isset($wp_rem_cs_var_frame_image_url) && $wp_rem_cs_var_frame_image_url <> '' ) {
			$image_url = 'url(' . $wp_rem_cs_var_frame_image_url . ') right bottom no-repeat';
		}
		$wp_rem_cs_var_promobox .= '<div class="fancy-bg">';
		$wp_rem_cs_var_promobox .= '<div class="container">';
		$wp_rem_cs_var_promobox .= '<div class="row">';
		$wp_rem_cs_var_promobox .= '<div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">';
		$wp_rem_cs_var_promobox .= '<div class="column-text">';
		if ( $wp_rem_cs_var_promobox_title && trim($wp_rem_cs_var_promobox_title) != '' ) {
			$wp_rem_cs_var_promobox .= '<h2 ' . esc_html($title_color) . '>' . esc_html($wp_rem_cs_var_promobox_title) . '</h2>';
		}
		if ( $content <> '' ) {
			$wp_rem_cs_var_promobox .= do_shortcode($content);
		}
		if ( isset($wp_rem_cs_var_promobox_button_url) && $wp_rem_cs_var_promobox_button_url == '' ) {
			$wp_rem_cs_var_promobox_button_url = 'javascript:void(0)';
		}
		$button_bg_color = '';
		if ( isset($wp_rem_cs_promobox_button_bg_color) && $wp_rem_cs_promobox_button_bg_color <> '' ) {
			$button_bg_color = 'style="background-color:' . esc_html($wp_rem_cs_promobox_button_bg_color) . ' !important;"';
		}
		if ( isset($wp_rem_cs_var_promobox_button_title) && $wp_rem_cs_var_promobox_button_title <> '' ) {
			$wp_rem_cs_var_promobox .='<a class="text-color promo-btn" ' . esc_html($button_bg_color) . ' href="' . esc_url($wp_rem_cs_var_promobox_button_url) . '">' . esc_html($wp_rem_cs_var_promobox_button_title) . '</a>';
		}
		$wp_rem_cs_var_promobox .= '</div>';
		$wp_rem_cs_var_promobox .= '</div>';
		if ( $wp_rem_cs_var_frame_promo_image_url_array <> '' ) {
			$wp_rem_cs_var_promobox .= '<div class="caption-img">';
			$wp_rem_cs_var_promobox .= '<figure>';
			$wp_rem_cs_var_promobox .= '<a href="#"><img src="' . esc_url($wp_rem_cs_var_frame_promo_image_url_array) . '" alt="' . esc_html($wp_rem_cs_var_promobox_title) . '"></a>';
			$wp_rem_cs_var_promobox .= '</figure>';
			$wp_rem_cs_var_promobox .= '</div>';
		}
		$wp_rem_cs_var_promobox .= '</div>';
		$wp_rem_cs_var_promobox .= '</div>';
		$wp_rem_cs_var_promobox .= '</div>';


		if ( isset($column_class) && $column_class <> '' ) {
			$wp_rem_cs_var_promobox .= '</div>';
		}

		if ( function_exists('wp_rem_cs_var_page_builder_element_sizes') ) {
			$wp_rem_cs_var_promobox .= '</div>';
		}


		return $wp_rem_cs_var_promobox;
	}

	if ( function_exists('wp_rem_cs_var_short_code') )
		wp_rem_cs_var_short_code('wp_rem_cs_promobox', 'wp_rem_cs_var_promobox');
}