<?php 
 
  
  
 /**
 * Presentation object for indexables.
 *
 * @package Yoast\YoastSEO\Presentations
 */

namespace Yoast\WP\SEO\Presentations;

/**
 * Class Indexable_Static_Home_Page_Presentation
 */
class Indexable_Static_Home_Page_Presentation extends Indexable_Post_Type_Presentation {

	/**
	 * Wraps the get_paginated_url pagination helper method.
	 *
	 * @param string $url  The un-paginated URL of the current archive.
	 * @param string $page The page number to add on to $url for the $link tag.
	 *
	 * @return string The paginated URL.
	 */
	protected function get_paginated_url( $url, $page ) {
		return $this->pagination->get_paginated_url( $url, $page );
	}

	/**
	 * @inheritDoc
	 */
	public function generate_open_graph_type() {
		return 'website';
	}
}
