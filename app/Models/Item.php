<?php

declare(strict_types=1);

namespace LaravelWP\Models;

use LaravelWP\Database\Model;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Item Model
 *
 * Eloquent model for items table. Demonstrates Laravel-style
 * database operations with WordPress integration.
 *
 * Usage Examples:
 * ```php
 * // Create a new item
 * $item = Item::create([
 *     'title' => 'My Item',
 *     'content' => 'Item content',
 *     'status' => 'active',
 * ]);
 *
 * // Find item by ID
 * $item = Item::find(1);
 *
 * // Update item
 * $item->title = 'Updated Title';
 * $item->save();
 *
 * // Delete item
 * $item->delete();
 *
 * // Query with conditions
 * $activeItems = Item::where('status', 'active')->get();
 * $recentItems = Item::recent(7)->get();
 * $userItems = Item::where('user_id', get_current_user_id())->get();
 *
 * // Advanced queries
 * $items = Item::where('status', 'active')
 *              ->orderBy('created_at', 'desc')
 *              ->limit(10)
 *              ->get();
 * ```
 *
 * @package LaravelWP\Models
 *
 * @property int $id
 * @property string $title
 * @property string|null $content
 * @property string $status
 * @property int|null $user_id
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class Item extends Model
{
    /**
     * The table associated with the model.
     * WordPress prefix will be automatically prepended.
     *
     * @var string
     */
    protected $table = 'items';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = true;

    /**
     * The attributes that are mass assignable.
     *
     * These fields can be filled using create() or fill() methods.
     * Always validate and sanitize data before mass assignment.
     *
     * @var array<string>
     */
    protected $fillable = [
        'title',
        'content',
        'status',
        'user_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'user_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<string>
     */
    protected $hidden = [];

    /**
     * Default values for attributes.
     *
     * @var array<string, mixed>
     */
    protected $attributes = [
        'status' => 'active',
    ];

    /**
     * Scope a query to only include active items.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include inactive items.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeInactive($query)
    {
        return $query->where('status', 'inactive');
    }

    /**
     * Scope a query to filter by user ID.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $userId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope a query to get items by current WordPress user.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByCurrentUser($query)
    {
        return $query->where('user_id', get_current_user_id());
    }

    /**
     * Get the WordPress user who created this item.
     *
     * @return \WP_User|false
     */
    public function getUser()
    {
        if ($this->user_id) {
            return get_user_by('id', $this->user_id);
        }

        return false;
    }

    /**
     * Get the author name for this item.
     *
     * @return string
     */
    public function getAuthorNameAttribute(): string
    {
        $user = $this->getUser();

        if ($user) {
            return $user->display_name;
        }

        return 'Unknown';
    }

    /**
     * Get the item's status label.
     *
     * @return string
     */
    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            'active' => 'Active',
            'inactive' => 'Inactive',
            'draft' => 'Draft',
            'archived' => 'Archived',
            default => ucfirst($this->status),
        };
    }

    /**
     * Check if item is active.
     *
     * @return bool
     */
    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    /**
     * Set the item's title.
     * Automatically sanitizes the input.
     *
     * @param string $value
     * @return void
     */
    public function setTitleAttribute(string $value): void
    {
        $this->attributes['title'] = sanitize_text_field($value);
    }

    /**
     * Set the item's content.
     * Automatically sanitizes the input.
     *
     * @param string|null $value
     * @return void
     */
    public function setContentAttribute(?string $value): void
    {
        $this->attributes['content'] = $value ? sanitize_textarea_field($value) : null;
    }

    /**
     * Boot the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        // Automatically set user_id to current WordPress user when creating
        static::creating(function ($item) {
            if ($item->user_id === null) {
                $item->user_id = get_current_user_id() ?: null;
            }
        });

        // Sanitize status
        static::saving(function ($item) {
            if (isset($item->status)) {
                $item->status = sanitize_text_field($item->status);
            }
        });
    }
}
