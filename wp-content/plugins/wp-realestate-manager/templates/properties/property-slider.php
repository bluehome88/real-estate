<?php
/**
 * Property search box
 *
 */
?>
<!--Element Section Start-->
<!--Wp-rem Element Start-->
<?php
wp_enqueue_style( 'swiper' );
wp_enqueue_script( 'swiper' );
global $wp_rem_post_property_types;
$property_location_options = isset( $atts['property_location'] ) ? $atts['property_location'] : '';
$properties_title = isset( $atts['properties_title'] ) ? $atts['properties_title'] : '';
$properties_subtitle = isset( $atts['properties_subtitle'] ) ? $atts['properties_subtitle'] : '';
$compare_property_switch = isset($atts['compare_property_switch']) ? $atts['compare_property_switch'] : 'no';
$properties_slider_alignment = isset( $atts['properties_slider_alignment'] ) ? $atts['properties_slider_alignment'] : '';
if ( $property_location_options != '' ) {
    $property_location_options = explode( ',', $property_location_options );
}
if ( $properties_title == '' ) {
    $padding_class = 'swiper-padding-top';
}

if ( $property_loop_obj->have_posts() ) {
    $flag = 1;
    ?>
    <div class="swiper-container property-slider wp-rem-property <?php echo esc_html($padding_class); ?>">
        <?php
        
            $wp_rem_element_structure = '';
            $wp_rem_element_structure = wp_rem_plugin_title_sub_align($properties_title, $properties_subtitle, $properties_slider_alignment);
            echo force_balance_tags($wp_rem_element_structure);
            
        ?>
        <div class="swiper-wrapper">
            <?php
            while ( $property_loop_obj->have_posts() ) : $property_loop_obj->the_post();
                global $post, $wp_rem_member_profile;
                $property_id = $post;

                $Wp_rem_Locations = new Wp_rem_Locations();
                $get_property_location = $Wp_rem_Locations->get_element_property_location( $property_id, $property_location_options );

                $wp_rem_property_username = get_post_meta( $property_id, 'wp_rem_property_username', true );
                $wp_rem_property_is_featured = get_post_meta( $property_id, 'wp_rem_property_is_featured', true );
                $wp_rem_property_price_options = get_post_meta( $property_id, 'wp_rem_property_price_options', true );
                $wp_rem_property_type = get_post_meta( $property_id, 'wp_rem_property_type', true );
                $wp_rem_property_price = '';

                // checking review in on in property type
                $wp_rem_property_type = isset( $wp_rem_property_type ) ? $wp_rem_property_type : '';
                if ( $property_type_post = get_page_by_path( $wp_rem_property_type, OBJECT, 'property-type' ) )
                    $property_type_id = $property_type_post->ID;
                $property_type_id = isset( $property_type_id ) ? $property_type_id : '';
                $wp_rem_user_reviews = get_post_meta( $property_type_id, 'wp_rem_user_reviews', true );
                // end checking review on in property type

                $wp_rem_property_type_price_switch = get_post_meta( $property_type_id, 'wp_rem_property_type_price', true );

                if ( $wp_rem_property_price_options == 'price' ) {
                    $wp_rem_property_price = get_post_meta( $property_id, 'wp_rem_property_price', true );
                } else if ( $wp_rem_property_price_options == 'on-call' ) {
                    $wp_rem_property_price = 'Price On Request';
                }
                $wp_rem_profile_image = $wp_rem_member_profile->member_get_profile_image( $wp_rem_property_username );
                ?>
                <div class="swiper-slide col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div class="property-grid fancy">
                        <div class="img-holder">
                            <figure>
                                <a href="<?php the_permalink(); ?>">
                                    <?php
									if (function_exists('property_gallery_first_image')) {
										$gallery_image_args = array(
											'property_id' => $property_id,
											'size' => 'wp_rem_cs_media_4',
											'class' => 'img-grid',
											'default_image_src' => esc_url(wp_rem::plugin_url() . 'assets/frontend/images/no-image9x6.jpg')
										);
										echo $property_gallery_first_image = property_gallery_first_image($gallery_image_args); 
									}
                                    ?>
                                </a>
                                <figcaption>
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
                                    do_action( 'wp_rem_favourites_frontend_button', $property_id, $book_mark_args, $figcaption_div );
                                    ?>
                                </figcaption>
                            </figure>
                        </div>
                        <?php ?>
                        <div class="text-holder">
                            <?php if ( $wp_rem_profile_image != '' ) {
                                ?>
                                <div class="post-meta">
                                    <div class="post-by">
                                        <figure>
                                            <img src="<?php echo esc_url( $wp_rem_profile_image ); ?>" alt="" width="41" height="41">
                                        </figure>
                                    </div>
                                </div>
                                <?php
                            }
                            if ( $wp_rem_property_type_price_switch == 'on' && $wp_rem_property_price != '' ) {
                                ?>
                                <span class="property-price">
                                    <span class="new-price text-color"><?php
                                        if ( $wp_rem_property_price_options == 'on-call' ) {
                                            echo force_balance_tags( $wp_rem_property_price );
                                        } else {
                                            $property_info_price = wp_rem_property_price( $property_id, $wp_rem_property_price, '<span class="guid-price">', '</span>' );
                                            echo force_balance_tags( $property_info_price );
                                        }
                                        ?></span>
                                </span>
                            <?php } ?>
                            <div class="post-title">
                                <h6><a href="<?php echo esc_url( get_permalink( $property_id ) ); ?>"><?php echo esc_html( get_the_title( $property_id ) ); ?></a></h6>
                            </div>
                            <?php
                            $ratings_data = array(
                                'overall_rating' => 0.0,
                                'count' => 0,
                            );
                            $ratings_data = apply_filters( 'reviews_ratings_data', $ratings_data, $property_id );
                            ?>
                            <?php if ( ! empty( $get_property_location ) ) { ?>
                                <ul class="property-location">
                                    <li><i class="icon-location-pin2"></i><span><?php echo esc_html( implode( ', ', $get_property_location ) ); ?></span></li>
                                </ul>
                                <?php
                            }
                            ?>
							<?php do_action('wp_rem_compare_btn', $property_id, $compare_property_switch);   ?>
                        </div>
                    </div>
                </div>
                <?php
            endwhile;
            ?>
        </div>
        <!-- Add Arrows -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
    <?php
} else {
    echo '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-property-match-error"><h6><i class="icon-warning"></i><strong> ' . wp_rem_plugin_text_srt('wp_rem_property_slider_sorry') . '</strong>&nbsp; ' . wp_rem_plugin_text_srt('wp_rem_property_slider_doesn_match') . ' </h6></div>';
}