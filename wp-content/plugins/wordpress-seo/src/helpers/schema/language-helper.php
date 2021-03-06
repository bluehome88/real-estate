<?php 
 
  
  
 /**
 * WPSEO plugin file.
 *
 * @package Yoast\WP\SEO\Helpers\Schema
 */

namespace Yoast\WP\SEO\Helpers\Schema;

/**
 * Class Language_Helper
 *
 * @package Yoast\WP\SEO\Helpers\Schema
 */
class Language_Helper {

	/**
	 * Adds the `inLanguage` property to a Schema piece.
	 *
	 * Must use one of the language codes from the IETF BCP 47 standard. The
	 * language tag syntax is made of one or more subtags separated by a hyphen
	 * e.g. "en", "en-US", "zh-Hant-CN".
	 *
	 * @param array $data The Schema piece data.
	 *
	 * @return array The Schema piece data with added language property
	 */
	public function add_piece_language( $data ) {
		/**
		 * Filter: 'wpseo_schema_piece_language' - Allow changing the Schema piece language.
		 *
		 * @api string $type The Schema piece language.
		 */
		$data['inLanguage'] = \apply_filters( 'wpseo_schema_piece_language', \get_bloginfo( 'language' ), $data );

		return $data;
	}
}
