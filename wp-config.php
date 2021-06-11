<?php 
 
  
  
 
// BEGIN iThemes Security - Do not modify or remove this line
// iThemes Security Config Details: 2
define( 'DISALLOW_FILE_EDIT', true ); // Disable File Editor - Security > Settings > WordPress Tweaks > File Editor
// END iThemes Security - Do not modify or remove this line

@include __DIR__ . '/local-config.php';
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
@define('DB_NAME', 'database_name_here');

/** MySQL database username */
@define('DB_USER', 'username_here');

/** MySQL database password */
@define('DB_PASSWORD', 'password_here');

/** MySQL hostname */
@define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'w%+ct|x3/%zT~`R6joNcWds.EZ/=pw,IToaF =+2jg.J/89;(X&2|9r@8[&B.-?=');
define('SECURE_AUTH_KEY',  'FDOw#3+O[yK3Yw->XxHWE[Zle7s;}J;Eo3UvO+}texjR[f8o*:_sP ,AMZyK1%u=');
define('LOGGED_IN_KEY',    'llGcfU+!x>E$UG)7Nq+On>yd03`|XLr/}l-PrpWW3T,l$OBv.+M9Hr+FLo7SrQX#');
define('NONCE_KEY',        'Kg2 yF_=J-S|g]JSI4cCg=D[5uLmzDID/Q4,/+#XL)|-$Sy&e:x( pr:R^Kd+mZ}');
define('AUTH_SALT',        '412Ai4k G<U6I+lWnqDR}|WSatv+m%-lhH>-;/mGVMd-pL_fzkT<3RqK|)b1u)+<');
define('SECURE_AUTH_SALT', 'r*pN#2]RhFWxn|U^{<8%.(%*5t56S{,JM&[Xu4ev*v*~:UC^,NGZUOQKs~a.;7V{');
define('LOGGED_IN_SALT',   '0RA)3VF{om+YQ+P=WFz|^&+ JCc~/~J(>_[T9*Ksz*@r^fuY4`&f~r7]il0cbHT|');
define('NONCE_SALT',       '}Z5KduMDwJG(O{x.~2(.?1T8!]N[sdEajjYCcEzA*%lNf#[^/P^k?)#EstGiO>eM');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
@define('WP_DEBUG', true);

// For Real estate manager plugin
@define('FS_METHOD', 'direct');

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
