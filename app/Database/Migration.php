<?php

declare(strict_types=1);

namespace LaravelWP\Database;

use Illuminate\Database\Schema\Blueprint;
use LaravelWP\Database\DatabaseServiceProvider;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Abstract Migration Class
 *
 * Base class for all database migrations. Provides Laravel-style
 * schema building capabilities for WordPress plugins.
 *
 * Usage:
 * ```php
 * namespace LaravelWP\Database\Migrations;
 *
 * use LaravelWP\Database\Migration;
 * use Illuminate\Database\Schema\Blueprint;
 *
 * class CreateItemsTable extends Migration
 * {
 *     public function up(): void
 *     {
 *         $this->schema()->create('items', function (Blueprint $table) {
 *             $table->id();
 *             $table->string('title');
 *             $table->text('content')->nullable();
 *             $table->timestamps();
 *         });
 *     }
 *
 *     public function down(): void
 *     {
 *         $this->schema()->dropIfExists('items');
 *     }
 * }
 * ```
 *
 * @package LaravelWP\Database
 */
abstract class Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    abstract public function up(): void;

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    abstract public function down(): void;

    /**
     * Get the schema builder instance.
     *
     * @return \Illuminate\Database\Schema\Builder
     */
    protected function schema(): \Illuminate\Database\Schema\Builder
    {
        return DatabaseServiceProvider::schema();
    }

    /**
     * Create a new table.
     *
     * @param string $table Table name (without prefix)
     * @param \Closure $callback Schema definition callback
     * @return void
     */
    protected function create(string $table, \Closure $callback): void
    {
        $this->schema()->create($table, $callback);
    }

    /**
     * Drop a table if it exists.
     *
     * @param string $table Table name (without prefix)
     * @return void
     */
    protected function dropIfExists(string $table): void
    {
        $this->schema()->dropIfExists($table);
    }

    /**
     * Modify an existing table.
     *
     * @param string $table Table name (without prefix)
     * @param \Closure $callback Schema modification callback
     * @return void
     */
    protected function table(string $table, \Closure $callback): void
    {
        $this->schema()->table($table, $callback);
    }

    /**
     * Check if a table exists.
     *
     * @param string $table Table name (without prefix)
     * @return bool
     */
    protected function hasTable(string $table): bool
    {
        return $this->schema()->hasTable($table);
    }

    /**
     * Check if a column exists in a table.
     *
     * @param string $table Table name (without prefix)
     * @param string $column Column name
     * @return bool
     */
    protected function hasColumn(string $table, string $column): bool
    {
        return $this->schema()->hasColumn($table, $column);
    }
}
