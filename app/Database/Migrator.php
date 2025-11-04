<?php

declare(strict_types=1);

namespace LaravelWP\Database;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Migrator Class
 *
 * Handles running and rolling back database migrations.
 * Scans the migrations directory and executes migration classes.
 *
 * @package LaravelWP\Database
 */
class Migrator
{
    /**
     * Path to migrations directory
     *
     * @var string
     */
    private string $migrationsPath;

    /**
     * List of executed migrations
     *
     * @var array
     */
    private array $ranMigrations = [];

    /**
     * Constructor
     *
     * @param string|null $migrationsPath Custom migrations path (optional)
     */
    public function __construct(?string $migrationsPath = null)
    {
        $this->migrationsPath = $migrationsPath ?? LARAVEL_WP_PATH . 'database/migrations';

        // Load executed migrations from options
        $this->ranMigrations = get_option('laravel_wp_migrations', []);
    }

    /**
     * Run all pending migrations.
     *
     * @return array Array of executed migration names
     */
    public function run(): array
    {
        $migrations = $this->getMigrationFiles();
        $executed = [];

        foreach ($migrations as $migration) {
            $migrationName = $this->getMigrationName($migration);

            // Skip if already executed
            if (in_array($migrationName, $this->ranMigrations, true)) {
                continue;
            }

            try {
                $instance = $this->resolveMigration($migration);
                $instance->up();

                // Mark as executed
                $this->ranMigrations[] = $migrationName;
                $executed[] = $migrationName;
            } catch (\Exception $e) {
                error_log("Migration failed: {$migrationName} - " . $e->getMessage());
                throw $e;
            }
        }

        // Save executed migrations
        update_option('laravel_wp_migrations', $this->ranMigrations, false);

        return $executed;
    }

    /**
     * Rollback the last batch of migrations.
     *
     * @return array Array of rolled back migration names
     */
    public function rollback(): array
    {
        $migrations = array_reverse($this->getMigrationFiles());
        $rolledBack = [];

        foreach ($migrations as $migration) {
            $migrationName = $this->getMigrationName($migration);

            // Skip if not executed
            if (!in_array($migrationName, $this->ranMigrations, true)) {
                continue;
            }

            try {
                $instance = $this->resolveMigration($migration);
                $instance->down();

                // Remove from executed list
                $this->ranMigrations = array_diff($this->ranMigrations, [$migrationName]);
                $rolledBack[] = $migrationName;
            } catch (\Exception $e) {
                error_log("Migration rollback failed: {$migrationName} - " . $e->getMessage());
                throw $e;
            }
        }

        // Save executed migrations
        update_option('laravel_wp_migrations', array_values($this->ranMigrations), false);

        return $rolledBack;
    }

    /**
     * Reset all migrations (rollback all and run again).
     *
     * @return array
     */
    public function reset(): array
    {
        $this->rollback();
        return $this->run();
    }

    /**
     * Get all migration files from the migrations directory.
     *
     * @return array
     */
    private function getMigrationFiles(): array
    {
        if (!is_dir($this->migrationsPath)) {
            return [];
        }

        $files = glob($this->migrationsPath . '/*.php');

        // Sort by filename (timestamp-based naming)
        sort($files);

        return $files ?: [];
    }

    /**
     * Get migration name from file path.
     *
     * @param string $filePath
     * @return string
     */
    private function getMigrationName(string $filePath): string
    {
        return basename($filePath, '.php');
    }

    /**
     * Resolve migration instance from file.
     *
     * @param string $filePath
     * @return Migration
     * @throws \Exception
     */
    private function resolveMigration(string $filePath): Migration
    {
        require_once $filePath;

        $migrationName = $this->getMigrationName($filePath);

        // Extract class name from filename
        // Format: YYYY_MM_DD_HHMMSS_create_table_name.php
        $parts = explode('_', $migrationName);
        $className = '';

        // Skip timestamp parts (first 4 parts: YYYY_MM_DD_HHMMSS)
        for ($i = 4; $i < count($parts); $i++) {
            $className .= ucfirst($parts[$i]);
        }

        $fullClassName = "LaravelWP\\Database\\Migrations\\{$className}";

        if (!class_exists($fullClassName)) {
            throw new \Exception("Migration class {$fullClassName} not found in {$filePath}");
        }

        $instance = new $fullClassName();

        if (!$instance instanceof Migration) {
            throw new \Exception("Migration class {$fullClassName} must extend LaravelWP\\Database\\Migration");
        }

        return $instance;
    }

    /**
     * Get list of executed migrations.
     *
     * @return array
     */
    public function getRanMigrations(): array
    {
        return $this->ranMigrations;
    }

    /**
     * Get list of pending migrations.
     *
     * @return array
     */
    public function getPendingMigrations(): array
    {
        $all = array_map(
            fn($file) => $this->getMigrationName($file),
            $this->getMigrationFiles()
        );

        return array_diff($all, $this->ranMigrations);
    }
}
