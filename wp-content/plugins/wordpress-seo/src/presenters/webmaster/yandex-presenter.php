<?php 
 
  
  
 /**
 * Presenter class for the Pinterest Webmaster verification setting.
 *
 * @package Yoast\YoastSEO\Presenters\Webmaster
 */

namespace Yoast\WP\SEO\Presenters\Webmaster;

use Yoast\WP\SEO\Presenters\Abstract_Indexable_Tag_Presenter;

/**
 * Class Yandex_Presenter
 */
class Yandex_Presenter extends Abstract_Indexable_Tag_Presenter {

	/**
	 * The tag format including placeholders.
	 *
	 * @var string
	 */
	protected $tag_format = '<meta name="yandex-verification" content="%s" />';

	/**
	 * Retrieves the webmaster tool site verification value from the settings.
	 *
	 * @return string $verification_value The webmaster tool site verification value.
	 */
	public function get() {
		return $this->helpers->options->get( 'yandexverify', '' );
	}
}
