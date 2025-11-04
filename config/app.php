<?php
/**
 * Application Configuration
 *
 * This file contains the main configuration for the plugin.
 *
 * @package LaravelWP
 */

declare(strict_types=1);

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

return [
    /**
     * Plugin Information
     */
    'name' => 'Laravel WP Framework',
    'version' => LARAVEL_WP_VERSION,
    'text_domain' => 'laravel-wp-framework',

    /**
     * API Configuration
     */
    'api' => [
        'namespace' => 'laravel-wp/v1',
        'version' => '1.0',
    ],

    /**
     * Admin Configuration
     */
    'admin' => [
        'menu_slug' => 'laravel-wp-dashboard',
        'menu_title' => 'Laravel WP',
        'page_title' => 'Laravel WP Framework Dashboard',
        'capability' => 'manage_options',
        'icon' => 'dashicons-admin-generic',
        'position' => 80,
    ],

    /**
     * Frontend Configuration
     */
    'frontend' => [
        'shortcode' => 'laravel_wp_app',
    ],

    /**
     * Asset Configuration
     */
    'assets' => [
        'admin' => [
            'handle' => 'laravel-wp-admin',
            'path' => 'build/admin/index.js',
            'style_path' => 'build/admin/style-index.css',
        ],
        'frontend' => [
            'handle' => 'laravel-wp-frontend',
            'path' => 'build/frontend/index.js',
            'style_path' => 'build/frontend/style-index.css',
        ],
    ],
];

