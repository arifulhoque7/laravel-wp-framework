<?php
/**
 * Frontend Controller
 *
 * Handles all frontend-related functionality including shortcode registration
 * and asset enqueuing for public-facing pages.
 *
 * @package LaravelWP\Controllers\Web
 */

declare(strict_types=1);

namespace LaravelWP\Controllers\Web;

use LaravelWP\App;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Frontend Controller Class
 */
class FrontendController
{
    /**
     * Register frontend hooks and actions
     *
     * @return void
     */
    public function register(): void
    {
        $shortcode = App::config('frontend.shortcode', 'laravel_wp_app');
        add_shortcode($shortcode, [$this, 'renderApp']);
        add_action('wp_enqueue_scripts', [$this, 'enqueueFrontendAssets']);
    }

    /**
     * Enqueue frontend assets (JavaScript and CSS)
     *
     * @return void
     */
    public function enqueueFrontendAssets(): void
    {
        // Only enqueue if we're on a page that uses the shortcode
        global $post;
        
        $shortcode = App::config('frontend.shortcode', 'laravel_wp_app');
        
        if (!is_a($post, 'WP_Post') || !has_shortcode($post->post_content, $shortcode)) {
            return;
        }

        $config = App::config('assets.frontend', []);
        $handle = $config['handle'] ?? 'laravel-wp-frontend';
        $assetFile = LARAVEL_WP_PATH . 'build/frontend/index.asset.php';

        if (!file_exists($assetFile)) {
            return;
        }

        $asset = require $assetFile;

        // Enqueue JavaScript
        wp_enqueue_script(
            $handle,
            LARAVEL_WP_URL . 'build/frontend/index.js',
            $asset['dependencies'] ?? [],
            $asset['version'] ?? LARAVEL_WP_VERSION,
            true
        );

        // Localize script with data
        wp_localize_script($handle, 'laravelWpFrontend', [
            'apiUrl' => rest_url(App::config('api.namespace', 'laravel-wp/v1')),
            'nonce' => wp_create_nonce('wp_rest'),
            'pluginUrl' => LARAVEL_WP_URL,
            'version' => LARAVEL_WP_VERSION,
        ]);

        // Enqueue CSS if exists
        $stylePath = LARAVEL_WP_PATH . 'build/frontend/style-index.css';
        if (file_exists($stylePath)) {
            wp_enqueue_style(
                $handle . '-style',
                LARAVEL_WP_URL . 'build/frontend/style-index.css',
                [],
                $asset['version'] ?? LARAVEL_WP_VERSION
            );
        }
    }

    /**
     * Render frontend app via shortcode
     *
     * @param array $atts Shortcode attributes
     * @return string HTML output
     */
    public function renderApp(array $atts = []): string
    {
        ob_start();
        
        $viewPath = LARAVEL_WP_PATH . 'resources/views/frontend-mount.php';
        
        if (file_exists($viewPath)) {
            require $viewPath;
        } else {
            echo '<div id="laravel-wp-frontend-app"></div>';
        }

        return ob_get_clean();
    }
}

