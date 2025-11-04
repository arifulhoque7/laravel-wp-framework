<?php

declare(strict_types=1);

namespace LaravelWP\Database;

use Illuminate\Database\Eloquent\Model as EloquentModel;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Base Model Class
 *
 * Extends Laravel's Eloquent Model with WordPress-specific configurations.
 * All models in your plugin should extend this class to get automatic
 * WordPress table prefix handling and other WordPress-specific features.
 *
 * Usage:
 * ```php
 * namespace LaravelWP\Models;
 *
 * use LaravelWP\Database\Model;
 *
 * class Post extends Model
 * {
 *     protected $table = 'posts'; // Will become wp_posts automatically
 *     protected $fillable = ['title', 'content'];
 * }
 * ```
 *
 * @package LaravelWP\Database
 */
abstract class Model extends EloquentModel
{
    /**
     * The connection name for the model.
     *
     * @var string|null
     */
    protected $connection = 'default';

    /**
     * Indicates if the model should be timestamped.
     * Set to false if your table doesn't have created_at/updated_at columns.
     *
     * @var bool
     */
    public $timestamps = true;

    /**
     * The name of the "created at" column.
     *
     * @var string|null
     */
    const CREATED_AT = 'created_at';

    /**
     * The name of the "updated at" column.
     *
     * @var string|null
     */
    const UPDATED_AT = 'updated_at';

    /**
     * Get the table associated with the model.
     *
     * Note: WordPress table prefix is automatically handled by the database
     * connection configuration. Do NOT add prefix manually here.
     *
     * @return string
     */
    public function getTable(): string
    {
        // If table is set, return it as-is
        // The prefix is already configured in the database connection
        if (isset($this->table)) {
            return $this->table;
        }

        // Default Laravel behavior: use class name as table name
        return parent::getTable();
    }

    /**
     * Get the primary key for the model.
     *
     * @return string
     */
    public function getKeyName(): string
    {
        return $this->primaryKey ?? 'id';
    }

    /**
     * Scope a query to only include active records.
     *
     * Example usage:
     * ```php
     * $activeItems = Item::active()->get();
     * ```
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include records created in the last N days.
     *
     * Example usage:
     * ```php
     * $recentItems = Item::recent(7)->get(); // Last 7 days
     * ```
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $days Number of days
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeRecent($query, int $days = 7)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    /**
     * Get WordPress current time for model timestamps.
     *
     * @return \Illuminate\Support\Carbon
     */
    public function freshTimestamp()
    {
        return \Illuminate\Support\Carbon::parse(current_time('mysql'));
    }

    /**
     * Boot the model.
     * Add global scopes, observers, or other model events here.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        // Example: Automatically set user_id to current WordPress user
        static::creating(function ($model) {
            if (isset($model->user_id) && $model->user_id === null) {
                $model->user_id = get_current_user_id();
            }
        });
    }
}
