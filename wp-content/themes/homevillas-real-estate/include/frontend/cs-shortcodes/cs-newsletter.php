<?php

/*
 *
 * @Shortcode Name : Video 
 * @retrun
 *
 */
if ( ! function_exists('wp_rem_cs_var_newsletter') ) {

    function wp_rem_cs_var_newsletter($atts, $content = "") {
        $newsletter = '';
        $page_element_size = isset($atts['newsletter_element_size']) ? $atts['newsletter_element_size'] : 100;
        if ( function_exists('wp_rem_cs_var_page_builder_element_sizes') ) {
            $newsletter .= '<div class="' . wp_rem_cs_var_page_builder_element_sizes($page_element_size) . ' ">';
        }
        $defaults = array(
            'wp_rem_cs_var_newsletter_title' => '',
            'wp_rem_cs_var_newsletter_subtitle' => '',
            'wp_rem_var_newsletter_align' => '',
            'wp_rem_cs_var_newsletter_api_key' => '',
            'wp_rem_var_newsletter_list' => '',
        );
        extract(shortcode_atts($defaults, $atts));
        $wp_rem_cs_var_newsletter_title = isset($wp_rem_cs_var_newsletter_title) ? $wp_rem_cs_var_newsletter_title : '';
        $wp_rem_cs_var_newsletter_subtitle = isset($wp_rem_cs_var_newsletter_subtitle) ? $wp_rem_cs_var_newsletter_subtitle : '';
        $wp_rem_var_newsletter_align = isset($wp_rem_var_newsletter_align) ? $wp_rem_var_newsletter_align : '';
        $wp_rem_cs_var_newsletter_subtitle = isset($wp_rem_cs_var_newsletter_subtitle) ? $wp_rem_cs_var_newsletter_subtitle : '';
        $wp_rem_var_newsletter_list = isset($wp_rem_var_newsletter_list) ? $wp_rem_var_newsletter_list : '';
        // Column Class
        $column_class = '';
        if ( isset($wp_rem_cs_var_column_size) && $wp_rem_cs_var_column_size != '' ) {
            if ( function_exists('wp_rem_cs_var_custom_column_class') ) {
                $column_class = wp_rem_cs_var_custom_column_class($wp_rem_cs_var_column_size);
            }
        }
        // Start Element Column CLass
        if ( isset($column_class) && $column_class <> '' ) {
            $newsletter .= '<div class="' . esc_html($column_class) . '">';
        }
        // Start Video Element Content
        $newsletter .= wp_rem_title_sub_align($wp_rem_cs_var_newsletter_title, $wp_rem_cs_var_newsletter_subtitle, $wp_rem_var_newsletter_align);
        $newsletter .='<div class="newsletter classic">';
        if ( function_exists('wp_rem_cs_custom_mailchimp') ) {
            if ( '' !== $content && ' ' !== $content ) {
                $newsletter .= '<span class="newsletter-title">';
                $newsletter .= do_shortcode($content);
                $newsletter .= '</span>';
            }
            $mailchim_widget = 4;
            ob_start();
            wp_rem_cs_custom_mailchimp($mailchim_widget, $wp_rem_cs_var_newsletter_api_key, $wp_rem_var_newsletter_list);
            $newsletter .= ob_get_contents();
            ob_end_clean();
        }
        $newsletter .='</div>';
        // End Video Element Content
        // End Element Column CLass
        if ( isset($column_class) && $column_class <> '' ) {
            $newsletter .= '</div>';
        }
        if ( function_exists('wp_rem_cs_var_page_builder_element_sizes') ) {
            $newsletter .= '</div>';
        }
        return $newsletter;
    }
    if ( function_exists('wp_rem_cs_var_short_code') )
        wp_rem_cs_var_short_code('wp_rem_cs_newsletter', 'wp_rem_cs_var_newsletter');
}

