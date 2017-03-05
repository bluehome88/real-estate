<?php

/*
 *
 * @Shortcode Name :   Start function for Client shortcode/element front end view
 * @retrun
 *
 */
if (!function_exists('wp_rem_cs_clients_shortcode')) {

    function wp_rem_cs_clients_shortcode($atts, $content = null) {
        global $wp_rem_cs_var_blog_variables, $clients_style, $item_counter, $wp_rem_cs_var_clients_text, $post, $clients_section_title;
        $wp_rem_cs_var_clients = '';
        $page_element_size = isset($atts['clients_element_size']) ? $atts['clients_element_size'] : 100;
        if (function_exists('wp_rem_cs_var_page_builder_element_sizes')) {
            $wp_rem_cs_var_clients .= '<div class="' . wp_rem_cs_var_page_builder_element_sizes($page_element_size) . ' ">';
        }
        $randomid = rand(1234, 7894563);
        $defaults = array(
            'wp_rem_cs_var_column_size' => '',
            'clients_style' => '',
            'wp_rem_cs_var_clients_text' => '',
            'wp_rem_cs_var_clients_element_subtitle' => '',
            'wp_rem_var_clients_align' => '',
            'wp_rem_cs_var_clients_element_title' => '',
            'wp_rem_var_clients_view' => '',
        );
        extract(shortcode_atts($defaults, $atts));
        $item_counter = 1;

        $wp_rem_cs_var_clients_element_title = isset($wp_rem_cs_var_clients_element_title) ? $wp_rem_cs_var_clients_element_title : '';
        $wp_rem_cs_var_column_size = isset($wp_rem_cs_var_column_size) ? $wp_rem_cs_var_column_size : '';
        $clients_style = isset($clients_style) ? $clients_style : '';
        $wp_rem_cs_var_clients_text = isset($wp_rem_cs_var_clients_text) ? $wp_rem_cs_var_clients_text : '';
        $wp_rem_var_clients_view = isset($wp_rem_var_clients_view) ? $wp_rem_var_clients_view : '';

        if (isset($wp_rem_cs_var_column_size) && $wp_rem_cs_var_column_size != '') {
            if (function_exists('wp_rem_cs_var_custom_column_class')) {
                $column_class = wp_rem_cs_var_custom_column_class($wp_rem_cs_var_column_size);
            }
        }
        if (isset($column_class) && $column_class <> '') {

            $wp_rem_cs_var_clients .= '<div class="' . esc_html($column_class) . '">';
        }
        $wp_rem_cs_var_clients .= wp_rem_title_sub_align($wp_rem_cs_var_clients_element_title, $wp_rem_cs_var_clients_element_subtitle, $wp_rem_var_clients_align);
        $logo_class = '';
        if ($wp_rem_var_clients_view == 'modern') {
            $logo_class = ' modern';
        }elseif ($wp_rem_var_clients_view == 'modern-border') {
            $logo_class = ' modern has-border';
        }
        $wp_rem_cs_var_clients .='<div class="company-logo' . esc_html($logo_class) . '">';
        $wp_rem_cs_var_clients .='<ul>';
        $wp_rem_cs_var_clients .= do_shortcode($content);
        $wp_rem_cs_var_clients .='</ul>';
        $wp_rem_cs_var_clients .='</div>';


        if (isset($column_class) && $column_class <> '') {
            $wp_rem_cs_var_clients .= '</div>';
        }

        if (function_exists('wp_rem_cs_var_page_builder_element_sizes')) {
            $wp_rem_cs_var_clients .= '</div>';
        }

        return wp_rem_cs_allow_special_char($wp_rem_cs_var_clients);
    }

    if (function_exists('wp_rem_cs_var_short_code')) {
        wp_rem_cs_var_short_code('wp_rem_cs_clients', 'wp_rem_cs_clients_shortcode');
    }
}

/*
 *
 * @Shortcode Name :  Start function for Client Item shortcode/element front end view
 * @retrun
 *
 */
if (!function_exists('wp_rem_cs_clients_item')) {

    function wp_rem_cs_clients_item($atts, $content = null) {
        global $clients_style, $column_class, $item_counter, $clients_style, $wp_rem_cs_var_clients_text_color, $post;
        $defaults = array(
            'wp_rem_cs_var_clients_img_user_array' => '',
            'wp_rem_cs_var_clients_text' => '',
        );

        extract(shortcode_atts($defaults, $atts));

        $wp_rem_cs_var_clients_item = '';
        $clients_img_user = isset($wp_rem_cs_var_clients_img_user_array) ? $wp_rem_cs_var_clients_img_user_array : '';

        if ($wp_rem_cs_var_clients_text == '') {
            $wp_rem_cs_var_clients_text = 'javascript:void(0)';
        } else {
            $wp_rem_cs_var_clients_text = esc_url($wp_rem_cs_var_clients_text);
        }

        if ($clients_img_user <> '') {
            $wp_rem_cs_var_clients_item .= '<li>';
            $wp_rem_cs_var_clients_item .= '<figure>';
            $wp_rem_cs_var_clients_item .= '<a href="' . esc_html($wp_rem_cs_var_clients_text) . '">';
            $wp_rem_cs_var_clients_item .= '<img src="' . esc_url($clients_img_user) . '" alt="">';
            $wp_rem_cs_var_clients_item .= '</a>';
            $wp_rem_cs_var_clients_item .= '</figure>';
            $wp_rem_cs_var_clients_item .= '</li>';
        }

        $item_counter ++;

        return $wp_rem_cs_var_clients_item;
    }

    if (function_exists('wp_rem_cs_var_short_code')) {
        wp_rem_cs_var_short_code('clients_item', 'wp_rem_cs_clients_item');
    }
}