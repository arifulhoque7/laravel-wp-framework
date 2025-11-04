<?php
/**
 * Application Bootstrap
 *
 * This file bootstraps the entire application by registering
 * service providers and controllers.
 *
 * @package LaravelWP
 */

declare(strict_types=1);

namespace LaravelWP;

use LaravelWP\Controllers\Admin\AdminController;
use LaravelWP\Controllers\Web\FrontendController;
use LaravelWP\Controllers\Api\ApiController;
use LaravelWP\Providers\AppServiceProvider;
use LaravelWP\Database\DatabaseServiceProvider;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Main Application Class
 */
class App
{
    /**
     * Initialize the application
     *
     * @return void
     */
    public static function init(): void
    {
        // Load configuration
        static::loadConfig();

        // Bootstrap Eloquent ORM
        static::bootDatabase();

        // Register service provider
        $serviceProvider = new AppServiceProvider();
        $serviceProvider->register();

        // Initialize controllers
        static::initControllers();

        // Load text domain for translations
        add_action('init', [static::class, 'loadTextDomain']);
    }

    /**
     * Bootstrap Eloquent ORM database connection
     *
     * Initializes Laravel's Eloquent ORM with WordPress database credentials.
     * Must be called before any Eloquent models are used.
     *
     * @return void
     */
    private static function bootDatabase(): void
    {
        DatabaseServiceProvider::boot();
    }

    /**
     * Load plugin configuration
     *
     * @return void
     */
    private static function loadConfig(): void
    {
        $configPath = LARAVEL_WP_PATH . 'config/app.php';
        if (file_exists($configPath)) {
            $GLOBALS['laravel_wp_config'] = require $configPath;
        }
    }

    /**
     * Initialize all controllers
     *
     * @return void
     */
    private static function initControllers(): void
    {
        // Admin Controller
        $adminController = new AdminController();
        $adminController->register();

        // Frontend Controller
        $frontendController = new FrontendController();
        $frontendController->register();

        // API Controller
        $apiController = new ApiController();
        $apiController->register();
    }

    /**
     * Load plugin text domain for translations
     *
     * @return void
     */
    public static function loadTextDomain(): void
    {
        load_plugin_textdomain(
            'laravel-wp-framework',
            false,
            dirname(LARAVEL_WP_BASENAME) . '/languages'
        );
    }

    /**
     * Get configuration value
     *
     * @param string $key Configuration key (dot notation supported)
     * @param mixed $default Default value if key not found
     * @return mixed
     */
    public static function config(string $key, mixed $default = null): mixed
    {
        $config = $GLOBALS['laravel_wp_config'] ?? [];
        $keys = explode('.', $key);

        foreach ($keys as $k) {
            if (!isset($config[$k])) {
                return $default;
            }
            $config = $config[$k];
        }

        return $config;
    }
}

