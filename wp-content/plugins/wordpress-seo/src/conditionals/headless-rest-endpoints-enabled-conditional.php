<?php 
 
  
  
 /**
 * Yoast SEO plugin file.
 *
 * @package Yoast\YoastSEO\Conditionals
 */

namespace Yoast\WP\SEO\Conditionals;

use Yoast\WP\SEO\Helpers\Options_Helper;

/**
 * Conditional that is only met when the headless rest endpoints are enabled.
 */
class Headless_Rest_Endpoints_Enabled_Conditional implements Conditional {

	/**
	 * The options helper.
	 *
	 * @var Options_Helper
	 */
	private $options;

	/**
	 * Headless_Rest_Endpoints_Enabled_Conditional constructor.
	 *
	 * @param Options_Helper $options The options helper.
	 */
	public function __construct( Options_Helper $options ) {
		$this->options = $options;
	}

	/**
	 * @inheritDoc
	 */
	public function is_met() {
		return $this->options->get( 'enable_headless_rest_endpoints' );
	}
}
