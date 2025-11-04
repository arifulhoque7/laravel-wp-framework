<?php

declare(strict_types=1);

namespace LaravelWP\Database;

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Events\Dispatcher;
use Illuminate\Container\Container;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * DatabaseServiceProvider
 *
 * Bootstraps Eloquent ORM with WordPress database credentials.
 * Provides Laravel-like database functionality to WordPress plugins.
 *
 * @package LaravelWP\Database
 */
class DatabaseServiceProvider
{
    /**
     * Eloquent Capsule Manager instance
     *
     * @var Capsule|null
     */
    private static ?Capsule $capsule = null;

    /**
     * Bootstrap Eloquent ORM with WordPress database connection
     *
     * This method initializes the Illuminate Database Capsule Manager
     * using WordPress database credentials, making Eloquent models
     * work seamlessly with WordPress database.
     *
     * @return void
     */
    public static function boot(): void
    {
        if (self::$capsule !== null) {
            return; // Already booted
        }

        global $wpdb;

        // Create new Capsule Manager instance
        self::$capsule = new Capsule();

        // Add WordPress database connection
        self::$capsule->addConnection([
            'driver'    => 'mysql',
            'host'      => DB_HOST,
            'database'  => DB_NAME,
            'username'  => DB_USER,
            'password'  => DB_PASSWORD,
            'charset'   => $wpdb->charset ?: 'utf8mb4',
            'collation' => $wpdb->collate ?: 'utf8mb4_unicode_ci',
            'prefix'    => $wpdb->prefix,
            'strict'    => true,
            'engine'    => null,
        ]);

        // Set the event dispatcher used by Eloquent models
        self::$capsule->setEventDispatcher(new Dispatcher(new Container()));

        // Make this Capsule instance available globally via static methods
        self::$capsule->setAsGlobal();

        // Setup Eloquent ORM
        self::$capsule->bootEloquent();
    }

    /**
     * Get the Capsule Manager instance
     *
     * @return Capsule|null
     */
    public static function getCapsule(): ?Capsule
    {
        return self::$capsule;
    }

    /**
     * Get database connection instance
     *
     * @return \Illuminate\Database\Connection
     */
    public static function connection(): \Illuminate\Database\Connection
    {
        if (self::$capsule === null) {
            self::boot();
        }

        return self::$capsule->getConnection();
    }

    /**
     * Get schema builder instance
     *
     * @return \Illuminate\Database\Schema\Builder
     */
    public static function schema(): \Illuminate\Database\Schema\Builder
    {
        return self::connection()->getSchemaBuilder();
    }

    /**
     * Get query builder instance
     *
     * @param string $table Table name (without prefix)
     * @return \Illuminate\Database\Query\Builder
     */
    public static function table(string $table): \Illuminate\Database\Query\Builder
    {
        return self::connection()->table($table);
    }
}
