<?php
/**
 * PSR-4 Autoloader
 *
 * This autoloader handles loading classes from the app directory
 * using PSR-4 standard without requiring Composer at runtime.
 *
 * @package LaravelWP
 */

declare(strict_types=1);

namespace LaravelWP;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Load Composer autoloader if available
 *
 * This loads Illuminate/Database (Eloquent ORM) and other dependencies.
 */
$composer_autoload = LARAVEL_WP_PATH . 'vendor/autoload.php';
if (file_exists($composer_autoload)) {
    require_once $composer_autoload;
}

/**
 * PSR-4 Autoloader Implementation
 *
 * Handles loading plugin classes from the app directory.
 * Works in conjunction with Composer autoloader.
 */
spl_autoload_register(function (string $class): void {
    // Project-specific namespace prefix
    $prefix = 'LaravelWP\\';

    // Base directory for the namespace prefix
    $base_dir = LARAVEL_WP_PATH . 'app/';

    // Does the class use the namespace prefix?
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        // No, move to the next registered autoloader
        return;
    }

    // Get the relative class name
    $relative_class = substr($class, $len);

    // Replace namespace separators with directory separators
    // and append with .php
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    // If the file exists, require it
    if (file_exists($file)) {
        require $file;
    }
});

