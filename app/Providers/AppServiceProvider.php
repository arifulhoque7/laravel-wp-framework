<?php
/**
 * Application Service Provider
 *
 * Handles service registration and bootstrapping of application services.
 *
 * @package LaravelWP\Providers
 */

declare(strict_types=1);

namespace LaravelWP\Providers;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * App Service Provider Class
 */
class AppServiceProvider
{
    /**
     * Register services
     *
     * @return void
     */
    public function register(): void
    {
        $this->registerHelpers();
        $this->registerHooks();
    }

    /**
     * Register global helper functions
     *
     * @return void
     */
    private function registerHelpers(): void
    {
        $helperFile = LARAVEL_WP_PATH . 'app/Helpers.php';
        
        if (file_exists($helperFile)) {
            require_once $helperFile;
        }
    }

    /**
     * Register WordPress hooks
     *
     * @return void
     */
    private function registerHooks(): void
    {
        // Add custom hooks here as needed
    }
}

