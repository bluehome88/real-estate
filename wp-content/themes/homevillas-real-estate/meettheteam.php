<?php 
 
  
  
 /**
 * Template name: Meet the Team
 *
 */
get_header();
global $post, $wp_rem_plugin_options, $wp_rem_theme_options, $Wp_rem_Captcha, $wp_rem_form_fields, $wp_rem_post_property_types;
;
$post_id = 7770;// 
wp_enqueue_script('wp-rem-prettyPhoto');
wp_enqueue_style('wp-rem-prettyPhoto');
wp_enqueue_script('map-infobox');
wp_enqueue_script('map-clusterer');


$wp_rem_base_query_args = '';
if (function_exists('wp_rem_base_query_args')) {
    $wp_rem_base_query_args = wp_rem_base_query_args();
}

$paging_var = 'paged_id';
if (!isset($_REQUEST[$paging_var])) {
    $_REQUEST[$paging_var] = '';
}

$posts_per_page = -1;
// custom property

$list_args = array(
    'posts_per_page' => $posts_per_page,
    'post_type' => 'properties',
    'post_status' => 'publish',
    'paged' => $_REQUEST[$paging_var],
    'meta_query' => array(
        'relation' => 'AND',
        array(
            'key' => 'wp_rem_property_member',
            'value' => $post_id,
            'compare' => '=',
        ),
        $wp_rem_base_query_args,
    ),
);
if( isset($_GET['member']) && isset( $_GET['member'] ) != "" ){
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
    $list_args = array(
        'posts_per_page' => $posts_per_page,
        'post_type' => 'properties',
        'post_status' => 'publish',
        'paged' => $_REQUEST[$paging_var],
        'meta_query' => array(
            'relation' => 'AND',
            array(
                'key' => 'wp_rem_property_member',
                'value' => $post_id,
                'compare' => '=',
            ),
            array(
                'key' => 'wp_rem_property_username',
                'value' => $member_id,
                'compare' => '=',
            ),
            $wp_rem_base_query_args,
        ),
    );
}
$custom_query = new WP_Query($list_args);
$post_count = $custom_query->found_posts;


// get branches for this agency.
$args = array(
    'post_type' => 'branches',
    'posts_per_page' => -1,
    'post_status' => 'publish',
    'fields' => 'ids',
    'meta_query' =>
    array(
        array(
            'relation' => 'AND',
            array(
                'key' => 'wp_rem_branch_member',
                'value' => $post_id,
                'compare' => '=',
            ),
        )
    )
);
$branches = get_posts($args);

$team_args = array(
    'role' => 'wp_rem_member',
    'meta_query' => array(
        array(
            'key' => 'wp_rem_company',
            'value' => $post_id,
            'compare' => '='
        ),
        array(
            'relation' => 'OR',
            array(
                'key' => 'wp_rem_user_status',
                'compare' => 'NOT EXISTS',
                'value' => 'completely'
            ),
            array(
                'key' => 'wp_rem_user_status',
                'value' => 'deleted',
                'compare' => '!='
            ),
        ),
        array(
            'relation' => 'OR',
            array(
                'key' => 'wp_rem_public_profile',
                'compare' => 'NOT EXISTS',
                'value' => 'completely'
            ),
            array(
                'key' => 'wp_rem_public_profile',
                'value' => 'yes',
                'compare' => '='
            ),
        ), 
    ),
);

$team_members = get_users($team_args);

/*
 * featured count query
 */

$wp_rem_base_query_args = '';
if (function_exists('wp_rem_base_query_args')) {
    $wp_rem_base_query_args = wp_rem_base_query_args();
}

$args_featured = array(
    'posts_per_page' => '1',
    'order' => 'DESC',
    'orderby' => 'date',
    'post_type' => 'properties',
    'paged' => $_REQUEST[$paging_var],
    'post_status' => 'publish',
    'meta_query' => array(
        'relation' => 'AND',
        array(
            'key' => 'wp_rem_property_member',
            'value' => $post_id,
            'compare' => '=',
        ),
        $wp_rem_base_query_args,
        array(
            'key' => 'wp_rem_property_is_featured',
            'value' => 'on',
            'compare' => '=',
        ),
    ),
);
$custom_query_featured = new WP_Query($args_featured);
$featured_count = $custom_query_featured->post_count;

$wp_rem_email_address = get_post_meta($post_id, 'wp_rem_email_address', true);
$wp_rem_email_address = isset($wp_rem_email_address) ? $wp_rem_email_address : '';
$wp_rem_cs_email_counter = rand(3433, 7865);
?>
<div class="main-section member-detail">
    <div class="page-section" >
        <div class="container">
            <div class="row">
                <?php
                // load Member template
                set_query_var('custom_query_featured', $custom_query_featured);
                set_query_var('featured_count', $featured_count);
                set_query_var('paging_var', $paging_var);
                set_query_var('paging_var_perpage', $posts_per_page);
                set_query_var('custom_query', $custom_query);
                set_query_var('post_count', $post_count);
                set_query_var('branches', $branches);
                set_query_var('team_members', $team_members);
                set_query_var('wp_rem_cs_email_counter', $wp_rem_cs_email_counter);
                // wp_rem_get_template_part('member', 'view', 'single-member');
                if( isset($_GET['member']) && isset( $_GET['member'] ) != "" )
                    get_template_part('template-parts/team-member');
                else
                    get_template_part('template-parts/meet-team');
                ?>
            </div>
        </div>
    </div>

</div>
<!-- Main End -->
<?php get_footer(); 
