<?php
/**
 * Helper Functions
 *
 * Global helper functions available throughout the plugin.
 *
 * @package LaravelWP
 */

declare(strict_types=1);

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('laravel_wp_config')) {
    /**
     * Get configuration value
     *
     * @param string $key Configuration key (dot notation supported)
     * @param mixed $default Default value if key not found
     * @return mixed
     */
    function laravel_wp_config(string $key, mixed $default = null): mixed
    {
        return \LaravelWP\App::config($key, $default);
    }
}


