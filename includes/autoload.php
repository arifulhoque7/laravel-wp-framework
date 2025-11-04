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
 * PSR-4 Autoloader Implementation
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

