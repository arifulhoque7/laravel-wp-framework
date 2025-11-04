<?php
/**
 * Plugin Name: Laravel WP Framework
 * Plugin URI: https://github.com/yourusername/laravel-wp-framework
 * Description: A Laravel-inspired WordPress plugin architecture with separated admin and frontend React applications, modern PHP 8.3+ practices, and clean MVC structure.
 * Version: 1.0.0
 * Requires at least: 6.0
 * Requires PHP: 8.3
 * Author: Your Name
 * Author URI: https://yourwebsite.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: laravel-wp-framework
 * Domain Path: /languages
 */

declare(strict_types=1);

namespace LaravelWP;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
if (!defined('LARAVEL_WP_VERSION')) {
    define('LARAVEL_WP_VERSION', '1.0.0');
}
if (!defined('LARAVEL_WP_PATH')) {
    define('LARAVEL_WP_PATH', plugin_dir_path(__FILE__));
}
if (!defined('LARAVEL_WP_URL')) {
    define('LARAVEL_WP_URL', plugin_dir_url(__FILE__));
}
if (!defined('LARAVEL_WP_FILE')) {
    define('LARAVEL_WP_FILE', __FILE__);
}
if (!defined('LARAVEL_WP_BASENAME')) {
    define('LARAVEL_WP_BASENAME', plugin_basename(__FILE__));
}

// Load the autoloader
require_once LARAVEL_WP_PATH . 'includes/autoload.php';

// Bootstrap the application
require_once LARAVEL_WP_PATH . 'bootstrap/app.php';

// Initialize the application
if (class_exists('LaravelWP\App')) {
    App::init();
}

// Activation hook
register_activation_hook(__FILE__, function () {
    // Flush rewrite rules on activation
    flush_rewrite_rules();
});

// Deactivation hook
register_deactivation_hook(__FILE__, function () {
    // Flush rewrite rules on deactivation
    flush_rewrite_rules();
});

