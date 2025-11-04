<?php
/**
 * Admin Controller
 *
 * Handles all admin-related functionality including menu registration,
 * page rendering, and asset enqueuing for the admin dashboard.
 *
 * @package LaravelWP\Controllers\Admin
 */

declare(strict_types=1);

namespace LaravelWP\Controllers\Admin;

use LaravelWP\App;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Admin Controller Class
 */
class AdminController
{
    /**
     * Register admin hooks and actions
     *
     * @return void
     */
    public function register(): void
    {
        add_action('admin_menu', [$this, 'registerAdminMenu']);
        add_action('admin_enqueue_scripts', [$this, 'enqueueAdminAssets']);
    }

    /**
     * Register admin menu page
     *
     * @return void
     */
    public function registerAdminMenu(): void
    {
        $config = App::config('admin', []);

        add_menu_page(
            $config['page_title'] ?? 'Laravel WP Framework Dashboard',
            $config['menu_title'] ?? 'Laravel WP',
            $config['capability'] ?? 'manage_options',
            $config['menu_slug'] ?? 'laravel-wp-dashboard',
            [$this, 'renderAdminPage'],
            $config['icon'] ?? 'dashicons-admin-generic',
            $config['position'] ?? 80
        );
    }

    /**
     * Render admin page with React mount point
     *
     * @return void
     */
    public function renderAdminPage(): void
    {
        // Security check
        if (!current_user_can('manage_options')) {
            wp_die(
                esc_html__('You do not have sufficient permissions to access this page.', 'laravel-wp-framework'),
                esc_html__('Permission Denied', 'laravel-wp-framework'),
                ['response' => 403]
            );
        }

        $viewPath = LARAVEL_WP_PATH . 'resources/views/admin-mount.php';
        
        if (file_exists($viewPath)) {
            require $viewPath;
        } else {
            echo '<div id="laravel-wp-admin-app"></div>';
        }
    }

    /**
     * Enqueue admin assets (JavaScript and CSS)
     *
     * @param string $hook Current admin page hook
     * @return void
     */
    public function enqueueAdminAssets(string $hook): void
    {
        $menuSlug = App::config('admin.menu_slug', 'laravel-wp-dashboard');
        
        // Only load on our admin page
        if (strpos($hook, $menuSlug) === false) {
            return;
        }

        $config = App::config('assets.admin', []);
        $handle = $config['handle'] ?? 'laravel-wp-admin';
        $assetFile = LARAVEL_WP_PATH . 'build/admin/index.asset.php';

        if (!file_exists($assetFile)) {
            return;
        }

        $asset = require $assetFile;

        // Enqueue JavaScript
        wp_enqueue_script(
            $handle,
            LARAVEL_WP_URL . 'build/admin/index.js',
            $asset['dependencies'] ?? [],
            $asset['version'] ?? LARAVEL_WP_VERSION,
            true
        );

        // Localize script with data
        wp_localize_script($handle, 'laravelWpAdmin', [
            'apiUrl' => rest_url(App::config('api.namespace', 'laravel-wp/v1')),
            'nonce' => wp_create_nonce('wp_rest'),
            'pluginUrl' => LARAVEL_WP_URL,
            'version' => LARAVEL_WP_VERSION,
        ]);

        // Enqueue CSS if exists
        $stylePath = LARAVEL_WP_PATH . 'build/admin/style-index.css';
        if (file_exists($stylePath)) {
            wp_enqueue_style(
                $handle . '-style',
                LARAVEL_WP_URL . 'build/admin/style-index.css',
                [],
                $asset['version'] ?? LARAVEL_WP_VERSION
            );
        }
    }
}

